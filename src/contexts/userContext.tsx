import React, { createContext, useState, useContext, useEffect } from 'react';
import { Wallet } from 'xrpl';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useXRPL } from './xrplContext';

interface UserContextType {
  userWallet: Wallet | undefined
  setUserWallet: React.Dispatch<React.SetStateAction<Wallet | undefined>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: ({ children }: any) => React.JSX.Element = ({ children }: any) => {
  const [userWallet, setUserWallet] = useState<Wallet | undefined>(undefined);
  const [localSeed, setLocalSeed] = useState<string | undefined>(undefined);
  const { localReadingData } = useLocalStorage();
  const { getWalletFromSeed } = useXRPL();

  useEffect(() => {
    const userSeed = localReadingData("seed");
    setLocalSeed(userSeed ? userSeed : undefined);
  }, []);

  useEffect(() => {
    const setWalletFromLocalSeed = async () => {
      const wallet = await getWalletFromSeed(localSeed);
      wallet && wallet !== undefined && setUserWallet(wallet);
    }
    localSeed && localSeed !== undefined && localSeed?.length === 31 && setWalletFromLocalSeed();
  }, [localSeed]);

  return (
    <UserContext.Provider value={{ userWallet, setUserWallet}}>
      {children}
    </UserContext.Provider>
  );
};