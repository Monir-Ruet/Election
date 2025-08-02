import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

import { abi } from '../artifacts/contracts/BCElection.sol/BCElection.json';

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, abi, wallet);

    const result = await contract.getVoter("abc");
    console.log("Result from contract:", result);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});