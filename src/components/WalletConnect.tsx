
import React, { useState } from 'react';
import { Button } from './ui/button';

// Adding a proper type definition for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to use this feature');
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      {!account ? (
        <Button onClick={connectWallet} disabled={isConnecting} className="animate-pulse">
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      ) : (
        <Button variant="outline" className="font-mono">
          {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </Button>
      )}
    </div>
  );
};
