import React, { createContext, useState, useContext, useEffect } from 'react';
import { Wallet } from 'xrpl';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useXRPL } from './xrplContext';
import { cpSync } from 'fs';

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
  const [userBalance, setUserBalance] = useState<number | undefined>(undefined);
  const { localStorageData, localReadingData } = useLocalStorage();
  const { getWalletFromSeed } = useXRPL();

  useEffect(() => {
    // try to get the seed from local storage
    // if got set the seed into localSeed
    // if not do nothing
  }, []);

  useEffect(() => {
    // check if local seed = a correct seed to take
    // if yes trying to set the userWallet using the function getWalletFromSeed from xrpl context and set the userwallet into the state
    // if not do nothing
  }, [localSeed]);

  useEffect(() => {
    // check if userwallet is filled
    // if yes try to get the userbalance using the function getUserBalance from xrpl context and set the value into the state
    // if not that mean the wallet is empty, do nothing
  }, [userWallet]);

  return (
    <UserContext.Provider value={{ userWallet, setUserWallet }}>
      {children}
    </UserContext.Provider>
  );
};