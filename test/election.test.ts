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
    await election.registerVoter("1234", "Alice");
    const voter = await election.getVoter("1234");
    expect(voter.name).to.equal("Alice");
    expect(voter.nid).to.equal("1234");
  });

  it("should create an election", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now;
    const end = start + 3600;

    const tx = await election.createElection("National Election Bangladesh", start, end);
    await tx.wait();

    const active = await election.getActiveElections();
    expect(active.length).to.equal(1);
  });

  it("should create an election but not start yet", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 60;
    const end = start + 3600;

    const tx = await election.createElection("National Election Bangladesh", start, end);
    await tx.wait();

    const active = await election.getActiveElections();
    expect(active.length).to.equal(0);
  });

  it("should add a candidate to election", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 10;
    const end = start + 1000;

    await election.createElection("Test Election", start, end);
    await election.addCandidate(1, "Candidate A");

    const candidates = await election.getCandidates(1);
    expect(candidates.length).to.equal(1);
    expect(candidates[0].name).to.equal("Candidate A");
  });

  it("should allow voting and track votes", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now + 1;
    const end = start + 10000;

    await election.createElection("Election", start, end);
    await election.addCandidate(1, "Candidate X");
    await election.registerVoter("1001", "Voter One");

    await election.vote("1001", 1, 1);
    const vote = await election.getMyVote("1001", 1);
    expect(vote).to.equal(1);

    const candidate = await election.getCandidates(1);
    expect(candidate[0].voteCount).to.equal(1);
  });

  it("should prevent double voting", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now;
    const end = start + 36000;

    await election.createElection("Election", start, end);
    await election.addCandidate(1, "Candidate X");
    await election.registerVoter("1001", "Voter One");

    await election.vote("1001", 1, 1);

    await expect(
      election.vote("1001", 1, 1)
    ).to.be.revertedWith("Already voted");
  });

  it("should return active elections correctly", async () => {
    const now = (await hre.ethers.provider.getBlock("latest"))!.timestamp;
    const start = now;
    const end = start + 3600;

    await election.createElection("Live Election", start, end);

    const active = await election.getActiveElections();
    expect(active.length).to.equal(1);
    expect(active[0]).to.equal(1);
  });
});
