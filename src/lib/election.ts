import { ethers } from 'ethers';
import { BCElection__factory } from "@/../typechain-types/factories/BCElection__factory";

if (!process.env.SEPOLIA_RPC_URL || 
    !process.env.PRIVATE_KEY || 
    !process.env.CONTRACT_ADDRESS) {
        throw new Error("Missing SEPOLIA_RPC_URL or PRIVATE_KEY in environment variables or Contract address");
}

const contractAddress = process.env.CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const election = BCElection__factory.connect(contractAddress, wallet);

export { election };
