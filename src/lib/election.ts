import { ethers } from 'ethers';
import { BCElection__factory } from "@/../typechain-types/factories/BCElection__factory";

if (!process.env.SEPOLIA_RPC_URL ||
    !process.env.PRIVATE_KEY ||
    !process.env.CONTRACT_ADDRESS) {
    throw new Error("Missing SEPOLIA_RPC_URL or PRIVATE_KEY in environment variables or Contract address");
}

const ContractAddress = process.env.CONTRACT_ADDRESS;
const Provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, Provider);
const ElectionContract = BCElection__factory.connect(ContractAddress, Wallet);

export { ElectionContract };
