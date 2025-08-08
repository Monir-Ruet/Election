import { expect } from "chai";
import hre from "hardhat";
import { BCElection } from "../typechain-types";

describe("BCElection", () => {
  let election: BCElection;
  let owner: any;

  beforeEach(async () => {
    [owner] = await hre.ethers.getSigners();
    const ElectionFactory = await hre.ethers.getContractFactory("BCElection", owner);
    election = await ElectionFactory.deploy();
    await election.waitForDeployment();
  });

  it("should register a voter", async () => {
    await election.RegisterVoter("1234", "Alice", "fake_image_url");
    const voter = await election.VoterByNid("1234");
    expect(voter.name).to.equal("Alice");
    expect(voter.nid).to.equal("1234");
    expect(voter.image).to.equal("fake_image_url");
  });

  it("should update a voter", async () => {
    await election.RegisterVoter("1234", "Alice", "fake_image_url");
    const voter = await election.VoterByNid("1234");
    expect(voter.name).to.equal("Alice");
    expect(voter.nid).to.equal("1234");
    expect(voter.image).to.equal("fake_image_url");

    await election.UpdateVoter("1234", "Alice Updated", "updated_image_url");
    const updatedVoter = await election.VoterByNid("1234");
    expect(updatedVoter.name).to.equal("Alice Updated");
    expect(updatedVoter.image).to.equal("updated_image_url");
  });

  it("should create an election", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now;
    const end = start + 3600;

    const tx = await election.CreateElection("National Election Bangladesh", "desc", start, end);
    await tx.wait();

    const active = await election.RunningElections();
    expect(active.length).to.equal(1);
  });

  it("should update an election", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 10;
    const end = start + 3600;

    let tx = await election.CreateElection("National Election Bangladesh", "desc", start, end);
    await tx.wait();

    tx = await election.UpdateElection(1, "Updated Election", "Updated desc", start, end);
    await tx.wait();

    const electionDetails = await election.ElectionById(1);
    expect(electionDetails.name).to.equal("Updated Election");
    expect(electionDetails.description).to.equal("Updated desc");

  });

  it("should create an election but not start yet", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 60;
    const end = start + 3600;

    const tx = await election.CreateElection("National Election Bangladesh", "desc", start, end);
    await tx.wait();

    const electionDetails = await election.ElectionById(1);
    expect(electionDetails[4]).to.equal("National Election Bangladesh");
    expect(electionDetails[5]).to.equal("desc");

    const active = await election.RunningElections();
    expect(active.length).to.equal(0);
  });

  it("should add a candidate to election", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 100;
    const end = start + 1000;

    await election.CreateElection("Test Election", "desc", start, end);
    await election.CreateCandidate(1, "Candidate A", "image_url", true);

    const count = await election.ElectionCandidateCount(1);
    expect(count).to.equal(1);

    const candidates = await election.CandidatesByElection(1);
    expect(candidates.length).to.equal(1);

    const candidate = await election.CandidateById(1, 1);
    expect(candidate[3]).to.equal("Candidate A");
  });

  it("should update a candidate to election", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 100;
    const end = start + 1000;

    await election.CreateElection("Test Election", "desc", start, end);
    await election.CreateCandidate(1, "Candidate A", "image_url", true);

    const count = await election.ElectionCandidateCount(1);
    expect(count).to.equal(1);

    const candidates = await election.CandidatesByElection(1);
    expect(candidates.length).to.equal(1);

    const candidate = await election.CandidateById(1, 1);
    expect(candidate[3]).to.equal("Candidate A");
    await election.UpdateCandidate(1, 1, "Candidate B", "image_url", true);

    const updatedCandidate = await election.CandidateById(1, 1);
    expect(updatedCandidate[3]).to.equal("Candidate B");
  });

  it("should allow voting and track votes", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 100;
    const end = start + 10000;

    await election.CreateElection("Election", "desc", start, end);
    await election.CreateCandidate(1, "Candidate X", "image_url_candidate", true);
    await election.RegisterVoter("1001", "Voter One", "image_url_voter");
    await election.UpdateElection(1, "Updated Election", "desc", start - 100, end)

    await election.Vote("1001", 1, 1);
    const vote = await election.VotedCandidate("1001", 1);
    expect(vote).to.equal(1);
  });

  it("should prevent double voting", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 100;
    const end = start + 36000;

    await election.CreateElection("Election", "desc", start, end);
    await election.CreateCandidate(1, "Candidate X", "image_candidate", true);
    await election.RegisterVoter("1001", "Voter One", "image_voter");
    await election.UpdateElection(1, "Updated Election", "desc", start - 100, end)
    await election.Vote("1001", 1, 1);

    await expect(
      election.Vote("1001", 1, 1)
    ).to.be.revertedWith("Already voted");
  });

  it("should return active elections correctly", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now;
    const end = start + 3600;

    await election.CreateElection("Live Election", "desc", start, end);

    const active = await election.RunningElections();
    expect(active.length).to.equal(1);
  });

  it("should return archieved elections", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 5000;
    const end = start + 10600;

    await election.CreateElection("Live Election", "desc", start, end);

    const active = await election.PendingElections();
    expect(active.length).to.equal(1);
  });
});
