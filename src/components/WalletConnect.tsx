import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface WalletConnectProps {
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet is already connected
    if (window.ethereum?.selectedAddress) {
      setIsConnected(true);
      setAddress(window.ethereum.selectedAddress);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        setAddress(accounts[0]);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('No Ethereum provider found');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
  };

  return (
    <div className={className}>
      {isConnected ? (
        <>
          <span className="text-dao-purple mr-2">Connected</span>
          <Button variant="outline" className="border-dao-purple text-dao-purple" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </>
      ) : (
        <Button variant="outline" className="border-dao-purple text-dao-purple" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect; 