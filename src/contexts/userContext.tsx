import React, { createContext, useState, useContext } from 'react';
import { Wallet } from 'xrpl';

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

  return (
    <UserContext.Provider value={{ userWallet, setUserWallet }}>
      {children}
    </UserContext.Provider>
  );
};