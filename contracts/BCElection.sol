// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

struct Candidate {
    uint voteCount;
    uint id;
    bool active;
    string name;
    string image;
}

struct Election {
    uint id;
    uint startTime;
    uint endTime;
    uint candidateCount;
    string name;
    string description;
}

struct Voter {
    string nid;
    string name;
    string image;
}

contract BCElection {
    address public immutable owner;
    uint private electionCount;

    mapping(uint => Election) private elections;
    mapping(uint => mapping(uint => Candidate)) private candidates;
    mapping(string => Voter) private voters;
    mapping(string => mapping(uint => uint)) private hasVoted;
    string[] private voterNids;

    event ElectionCreated(uint indexed electionId, string name);
    event ElectionChanged(uint indexed electionId);
    event CandidateAdded(uint indexed electionId, uint indexed candidateId, string name);
    event CandidateChanged(uint indexed electionId, uint indexed candidateId);
    event VoteCasted(uint indexed electionId, uint indexed candidateId, string nid, uint totalVotes);

    modifier onlyOwner() {
        require(msg.sender == owner, "Permission denied");
        _;
    }

    modifier electionExists(uint id) {
        require(id > 0 && id <= electionCount, "Invalid election");
        _;
    }

    modifier beforeElection(uint id) {
        require(block.timestamp < elections[id].startTime, "Election already started");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // ---------------------------
    // Owner Functions
    // ---------------------------
    function RegisterVoter(string memory nid, string memory name, string memory image) external onlyOwner {
        require(bytes(voters[nid].name).length == 0, "Already registered");
        voters[nid] = Voter(nid, name, image);
        voterNids.push(nid);
    }

    function UpdateVoter(string memory nid, string memory name, string memory image) external onlyOwner {
        Voter storage v = voters[nid];
        require(bytes(v.name).length != 0, "Not registered");
        require(keccak256(bytes(v.name)) != keccak256(bytes(name)), "No change");
        v.name = name;
        v.image = image;
    }

    function CreateElection(string memory name, string memory description, uint startTime, uint endTime)
        external onlyOwner {
        require(startTime < endTime && endTime > block.timestamp, "Invalid time");

        electionCount++;
        elections[electionCount] = Election({
            id: electionCount,
            name: name,
            description: description,
            startTime: startTime,
            endTime: endTime,
            candidateCount: 0
        });

        emit ElectionCreated(electionCount, name);
    }

    function UpdateElection(uint id, string memory name, string memory description, uint startTime, uint endTime)
        external onlyOwner electionExists(id) beforeElection(id) {
        require(startTime < endTime && endTime > block.timestamp, "Invalid time");

        Election storage e = elections[id];
        e.name = name;
        e.description = description;
        e.startTime = startTime;
        e.endTime = endTime;

        emit ElectionChanged(id);
    }

    function CreateCandidate(uint id, string memory name, string memory image, bool active)
        external onlyOwner electionExists(id) beforeElection(id) {
        Election storage e = elections[id];
        e.candidateCount++;
        uint cid = e.candidateCount;
        candidates[id][cid] = Candidate(0, cid, active, name, image);
        emit CandidateAdded(id, cid, name);
    }

    function UpdateCandidate(uint eid, uint cid, string memory name, string memory image, bool active)
        external onlyOwner electionExists(eid) beforeElection(eid) {
        require(cid > 0 && cid <= elections[eid].candidateCount, "Invalid candidate");

        Candidate storage c = candidates[eid][cid];
        c.name = name;
        c.image = image;
        c.active = active;

        emit CandidateChanged(eid, cid);
    }

    function Vote(string memory nid, uint eid, uint cid)
        external onlyOwner electionExists(eid) {
        Election storage e = elections[eid];
        require(block.timestamp >= e.startTime && block.timestamp <= e.endTime, "Out of time");
        require(cid > 0 && cid <= e.candidateCount, "Invalid candidate");
        require(bytes(voters[nid].name).length > 0, "Not registered");
        require(hasVoted[nid][eid] == 0, "Already voted");

        candidates[eid][cid].voteCount++;
        hasVoted[nid][eid] = cid;

        emit VoteCasted(eid, cid, nid, candidates[eid][cid].voteCount);
    }

    // ---------------------------
    // Views
    // ---------------------------
    function GetVoters(uint offset) external view returns (Voter[] memory) {
        uint limit = 25;
        require(offset < voterNids.length, "Offset out of range");
        uint end = offset + limit;
        if (end > voterNids.length) {
            end = voterNids.length;
        }
        uint size = end - offset;
        Voter[] memory result = new Voter[](size);

        for (uint i = 0; i < size; i++) {
            result[i] = voters[voterNids[offset + i]];
        }

        return result;
    }

    function VoterByNid(string memory nid) external view returns (Voter memory) {
        return voters[nid];
    }

    function ElectionById(uint id) external view returns (Election memory) {
        return elections[id];
    }

    function ElectionCandidateCount(uint id) external view electionExists(id) returns (uint) {
        return elections[id].candidateCount;
    }

    function CandidateById(uint eid, uint cid)
        external view electionExists(eid) returns (Candidate memory) {
        require(cid > 0 && cid <= elections[eid].candidateCount, "Invalid ID");
        return candidates[eid][cid];
    }

    function CandidatesByElection(uint id)
        external view electionExists(id) returns (Candidate[] memory) {
        uint total = elections[id].candidateCount;
        uint count = 0;

        Candidate[] memory temp = new Candidate[](total);
        for (uint i = 1; i <= total; ++i) {
            Candidate storage c = candidates[id][i];
            if (c.active) {
                temp[count++] = c;
            }
        }

        Candidate[] memory active = new Candidate[](count);
        for (uint i = 0; i < count; ++i) {
            active[i] = temp[i];
        }

        return active;
    }

    function RunningElections() external view returns (Election[] memory) {
        return _filterElections(1);
    }

    function ArchievedElections() external view returns (Election[] memory) {
        return _filterElections(2);
    }

    function PendingElections() external view returns (Election[] memory) {
        return _filterElections(3);
    }

    function VotedCandidate(string memory nid, uint id) external view returns (uint) {
        return hasVoted[nid][id];
    }

    function _filterElections(uint electionType) private view returns (Election[] memory) {
        uint[] memory ids = new uint[](electionCount);
        uint count = 0;

        for (uint i = 1; i <= electionCount; ++i) {
            Election storage e = elections[i];
            if ((electionType == 1 && block.timestamp >= e.startTime && block.timestamp <= e.endTime) ||
                 (electionType == 2 && (block.timestamp > e.endTime)) ||
                 (electionType == 3 && block.timestamp < e.startTime)) {
                ids[count++] = e.id;
            }
        }

        Election[] memory filtered = new Election[](count);
        for (uint i = 0; i < count; ++i) {
            filtered[i] = elections[ids[i]];
        }

        return filtered;
    }
}
