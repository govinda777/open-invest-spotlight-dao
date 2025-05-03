import { ethers } from 'ethers';
import { spawn } from 'child_process';

let hardhatProcess: any;

export async function startLocalBlockchain() {
  return new Promise((resolve, reject) => {
    hardhatProcess = spawn('npx', ['hardhat', 'node'], {
      stdio: 'pipe',
    });

    hardhatProcess.stdout.on('data', (data: Buffer) => {
      if (data.toString().includes('Started HTTP and WebSocket JSON-RPC server')) {
        resolve(true);
      }
    });

    hardhatProcess.stderr.on('data', (data: Buffer) => {
      console.error(`Hardhat error: ${data}`);
    });

    hardhatProcess.on('error', (error: Error) => {
      reject(error);
    });
  });
}

export async function stopLocalBlockchain() {
  if (hardhatProcess) {
    hardhatProcess.kill();
  }
}

export async function getTestAccounts() {
  const provider = new ethers.JsonRpcProvider('http://localhost:8545');
  const accounts = await provider.listAccounts();
  return accounts;
}

export async function getTestWallet(index = 0) {
  const provider = new ethers.JsonRpcProvider('http://localhost:8545');
  const accounts = await provider.listAccounts();
  return new ethers.Wallet(provider, accounts[index]);
} 