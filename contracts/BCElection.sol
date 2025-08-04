// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BCElection
 * @dev A blockchain-based election system with voter registration, candidate management, and secure voting.
 */

// Structs
struct Candidate {
    uint id;
    string name;
    string image;
    bool active;
    uint voteCount;
}

struct Election {
    uint id;
    string name;
    string description;
    uint startTime;
    uint endTime;
    bool active;
    uint candidateCount;
}

struct Voter {
    string nid;
    string name;
    string image;
}

contract BCElection {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // State
    uint private electionCount;
    mapping(uint => Election) private elections;
    mapping(uint => mapping(uint => Candidate)) private candidates;
    mapping(string => Voter) private voters;

    // Mapping to track votes: voter NID => electionId => candidateId
    mapping(string => mapping(uint => uint)) private hasVoted;

    // Events
    event ElectionCreated(uint indexed electionId, string name);
    event ElectionChanged(uint indexed electionId);
    event CandidateAdded(uint indexed electionId, uint indexed candidateId, string name);
    event CandidateChanged(uint indexed electionId, uint indexed candidateId);
    event VoteCasted(uint indexed electionId, uint indexed candidateId, string nid, uint totalVotes);

    // Modifiers

    /**
     * @dev Restricts access to only the contract owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Permission denied");
        _;
    }

    /**
     * @dev Ensures the election exists.
     * @param electionId The ID of the election.
     */
    modifier electionExists(uint electionId) {
        require(electionId > 0 && electionId <= electionCount, "Election does not exist");
        _;
    }

    /**
     * @dev Ensures the election not modified when running.
     * @param electionId The ID of the election.
     */
    modifier restrictModificationRunningElection(uint electionId) {
        require(block.timestamp < elections[electionId].startTime, "Election already started or ended");
        _;
    }

    /**
     * @notice Returns the current block timestamp.
     * @return The current Unix timestamp.
     */
    function CurrentTime() public view returns (uint256) {
        return block.timestamp;
    }

    // ----------------------------
    // Owner-only Functions
    // ----------------------------

    /**
     * @notice Registers a voter with their NID and name.
     * @param nid National ID of the voter.
     * @param name Full name of the voter.
     */
    function RegisterVoter(string memory nid, string memory name, string memory image) external onlyOwner {
        require(bytes(voters[nid].name).length == 0, "Voter already registered");
        voters[nid] = Voter(nid, name, image);
    }

    /**
     * @notice Registers a voter with their NID and name.
     * @param nid National ID of the voter.
     * @param name Full name of the voter.
     */
    function UpdateVoter(string memory nid, string memory name, string memory image) external onlyOwner {
        require(bytes(voters[nid].name).length != 0, "Voter not found");
        require(keccak256(bytes(voters[nid].name)) != keccak256(bytes(name)), "Voter name can not be same");
        Voter storage v = voters[nid];
        v.name = name;
        v.image = image;
    }

    /**
     * @notice Creates a new election.
     * @param name Name of the election.
     * @param description Description of the election.
     * @param startTime Unix timestamp of when the election starts.
     * @param endTime Unix timestamp of when the election ends.
     */
    function CreateElection(
        string memory name,
        string memory description,
        uint startTime,
        uint endTime,
        bool active
    ) external onlyOwner {
        require(startTime < endTime, "Invalid time range");
        require(endTime > block.timestamp, "End time must be in future");

        electionCount++;
        elections[electionCount] = Election(electionCount, name, description, startTime, endTime, active, 0);

        emit ElectionCreated(electionCount, name);
    }

    /**
     * @notice Updates an existing election (only before it starts).
     * @param electionId ID of the election.
     * @param name New name.
     * @param description New description.
     * @param startTime New start time.
     * @param endTime New end time.
     * @param active If election active
     */
    function UpdateElection(
        uint electionId,
        string memory name,
        string memory description,
        uint startTime,
        uint endTime,
        bool active
    ) external onlyOwner electionExists(electionId) restrictModificationRunningElection(electionId) {
        require(startTime < endTime, "Invalid time range");
        require(endTime > block.timestamp, "End time must be in future");
       
        Election storage e = elections[electionId];
        e.name = name;
        e.description = description;
        e.startTime = startTime;
        e.endTime = endTime;
        e.active = active;

        emit ElectionChanged(electionId);
    }

    /**
     * @notice Adds a new candidate to an election.
     * @param electionId ID of the election.
     * @param name Name of the candidate.
     * @param image The changed image
     * @param active active status to check if the candidate deleted or not
     */
    function CreateCandidate(uint electionId, string memory name, string memory image, bool active)
        external
        onlyOwner
        electionExists(electionId)
        restrictModificationRunningElection(electionId)
    {
        elections[electionId].candidateCount++;
        uint candidateId = elections[electionId].candidateCount;
        candidates[electionId][candidateId] = Candidate(candidateId, name, image, active, 0);
        emit CandidateAdded(electionId, candidateId, name);
    }

    /**
     * @notice Update a candidate of a election ( Only before election)
     * @param electionId ID of the election.
     * @param candidateId ID of the candidate.
     * @param name The changed name
     * @param image The changed image
     * @param active active status to check if the candidate deleted or not
     */
    function UpdateCandidate(uint electionId, uint candidateId, string memory name, string memory image, bool active)
        external
        onlyOwner
        electionExists(electionId)
        restrictModificationRunningElection(electionId)
    {
        require(block.timestamp < elections[electionId].startTime, "Election already started or ended");
        require(candidateId > 0 && candidateId <= elections[electionId].candidateCount, "No candidate with this ID");

        Candidate storage c = candidates[electionId][candidateId];
        c.active = active;
        c.name = name;
        c.image = image;
        emit CandidateChanged(electionId, candidateId);
    }

    /**
     * @notice Casts a vote for a candidate in an election.
     * @param nid Voter's National ID.
     * @param electionId ID of the election.
     * @param candidateId ID of the candidate.
     */
    function Vote(string memory nid, uint electionId, uint candidateId)
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

        emit VoteCasted(electionId, candidateId, nid, candidates[electionId][candidateId].voteCount);
    }

    // ----------------------------
    // View Functions
    // ----------------------------

    /**
     * @notice Returns voter information for a given NID.
     * @param nid National ID of the voter.
     * @return The Voter struct.
     */
    function VoterByNid(string memory nid) external view returns (Voter memory) {
        return voters[nid];
    }

    /**
     * @notice Returns the election by ID.
     * @param electionId ID of the election.
     * @return The Election struct.
     */
    function ElectionById(uint electionId) external view returns (Election memory) {
        return elections[electionId];
    }

    /**
     * @notice Returns the number of candidates in an election.
     * @param _electionId ID of the election.
     * @return Number of candidates.
     */
    function ElectionCandidateCount(uint256 _electionId)
        public
        view
        electionExists(_electionId)
        returns (uint256)
    {
        return elections[_electionId].candidateCount;
    }

    /**
     * @notice Returns a candidate by ID.
     * @param _electionId ID of the election.
     * @param _candidateId ID of the candidate.
     * @return Candidate ID, name, and vote count.
     */
    function CandidateById(
        uint256 _electionId, 
        uint256 _candidateId
    )
        public
        view
        electionExists(_electionId)
        returns (Candidate memory)
    {
        require(_candidateId > 0 && _candidateId <= elections[_electionId].candidateCount, "Invalid candidate ID");
        return candidates[_electionId][_candidateId];
    }

    /**
     * @notice Returns all active candidates for an election.
     * @param electionId ID of the election.
     * @return Array of active Candidate structs.
     */
    function CandidatesByElection(uint electionId)
        external
        view
        electionExists(electionId)
        returns (Candidate[] memory)
    {
        uint candidateCount = elections[electionId].candidateCount;
        Candidate[] memory temp = new Candidate[](candidateCount);
        uint activeCount = 0;

        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[electionId][i].active) {
                temp[activeCount++] = candidates[electionId][i];
            }
        }

        Candidate[] memory activeCandidates = new Candidate[](activeCount);
        for (uint j = 0; j < activeCount; j++) {
            activeCandidates[j] = temp[j];
        }

        return activeCandidates;
    }

    /**
     * @notice Returns a list of all currently active elections.
     * @return Array of Election structs.
     */
    function ActiveElections() external view returns (Election[] memory) {
        uint[] memory temp = new uint[](electionCount);
        uint count = 0;

        for (uint i = 1; i <= electionCount; i++) {
            Election storage e = elections[i];
            if (block.timestamp >= e.startTime && block.timestamp <= e.endTime && e.active) {
                temp[count++] = e.id;
            }
        }

        Election[] memory active = new Election[](count);
        for (uint i = 0; i < count; i++) {
            active[i] = elections[temp[i]];
        }

        return active;
    }

    /**
     * @notice Returns a list of all currently archieved elections.
     * @return Array of Election structs.
     */
    function ArchievedElections() external view returns (Election[] memory) {
        uint[] memory temp = new uint[](electionCount);
        uint count = 0;

        for (uint i = 1; i <= electionCount; i++) {
            Election storage e = elections[i];
            if (block.timestamp > e.endTime || !e.active) {
                temp[count++] = e.id;
            }
        }

        Election[] memory active = new Election[](count);
        for (uint i = 0; i < count; i++) {
            active[i] = elections[temp[i]];
        }

        return active;
    }

    /**
     * @notice Returns the candidate ID a voter has voted for in a specific election.
     * @param nid Voter's National ID.
     * @param electionId ID of the election.
     * @return Candidate ID voted for.
     */
    function VotedCandidate(string memory nid, uint electionId)
        external
        view
        returns (uint)
    {
        return hasVoted[nid][electionId];
    }
}

