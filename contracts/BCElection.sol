// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


// Structs
struct Candidate {
    uint id;
    string name;
    uint voteCount;
}

struct Election {
    uint id;
    string name;
    uint startTime;
    uint endTime;
    uint candidateCount;
}

struct Voter {
    string nid;
    string name;
}

// Contract
contract BCElection {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // State
    uint private electionCount;
    mapping(uint => Election) private elections;
    mapping(uint => mapping(uint => Candidate)) private  candidates;
    mapping(string => Voter) private  voters;
    mapping(string => mapping(uint => uint)) private  hasVoted; // nid => electionId => true

    // Events
    event ElectionCreated(uint indexed electionId, string name);
    event CandidateAdded(uint indexed electionId, uint candidateId, string name);
    event VoteRecorded(uint indexed electionId, uint candidateId, string nid, uint totalVotes);

    // Modifiers
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Permission denied");
        _;
    }

    modifier electionExists(uint electionId) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist");
        _;
    }

    // ----------------------------
    // Owner-only Functions
    // ----------------------------

    function registerVoter(string memory nid, string memory name) external onlyOwner {
        require(bytes(voters[nid].name).length == 0, "Voter already registered");
        voters[nid] = Voter(nid, name);
    }

    function getVoter(string memory nid) external view returns (Voter memory) {
        return voters[nid];
    }

    function createElection(
        string memory name,
        uint startTime,
        uint endTime
    ) external onlyOwner {
        require(startTime < endTime, "Invalid time range");
        require(endTime > block.timestamp, "End time must be in future");

        electionCount++;
        elections[electionCount] = Election(electionCount, name, startTime, endTime, 0);

        emit ElectionCreated(electionCount, name);
    }

    function addCandidate(uint electionId, string memory name)
        external
        onlyOwner
        electionExists(electionId)
    {
        elections[electionId].candidateCount++;
        uint candidateId = elections[electionId].candidateCount;
        candidates[electionId][candidateId] = Candidate(candidateId, name, 0);

        emit CandidateAdded(electionId, candidateId, name);
    }

    function vote(string memory nid, uint electionId, uint candidateId)
        external
        onlyOwner
        electionExists(electionId)
    {
        Election storage e = elections[electionId];
        require(block.timestamp >= e.startTime, "Election not started");
        require(block.timestamp <= e.endTime, "Election ended");
        require(candidateId > 0 && candidateId <= e.candidateCount, "Invalid candidate");

        require(bytes(voters[nid].name).length > 0, "Voter not registered");
        require(hasVoted[nid][electionId] == 0, "Already voted");

        candidates[electionId][candidateId].voteCount++;
        hasVoted[nid][electionId] = candidateId;

        emit VoteRecorded(electionId, candidateId, nid, candidates[electionId][candidateId].voteCount);
    }

    // ----------------------------
    // View Functions
    // ----------------------------

    function getCandidates(uint electionId)
        external
        view
        electionExists(electionId)
        returns (Candidate[] memory)
    {
        uint count = elections[electionId].candidateCount;
        Candidate[] memory list = new Candidate[](count);
        for (uint i = 0; i < count; i++) {
            list[i] = candidates[electionId][i + 1];
        }
        return list;
    }

    function getActiveElections() external view returns (uint[] memory) {
        uint[] memory temp = new uint[](electionCount);
        uint count = 0;

        for (uint i = 1; i <= electionCount; i++) {
            Election storage e = elections[i];
            if (block.timestamp >= e.startTime && block.timestamp <= e.endTime) {
                temp[count++] = e.id;
            }
        }

        uint[] memory active = new uint[](count);
        for (uint i = 0; i < count; i++) {
            active[i] = temp[i];
        }
        return active;
    }

    function getMyVote(string memory nid, uint electionId) external view returns (uint) {
        return hasVoted[nid][electionId];
    }
}

