import hre from "hardhat";

async function main() {
    const Evoting = await hre.ethers.getContractFactory("BCElection");
    const contract = await Evoting.deploy();
    console.log(await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
