import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Wallet } from 'xrpl';

interface xrplContextType {
    xrplClient: Client | undefined;
    getWalletFromSeed: (seed: string) => Promise<Wallet | undefined>;
}

const XRPLContext = createContext<xrplContextType | undefined>(undefined);

export const useXRPL = () => {
    const context = useContext(XRPLContext);
    if (!context) {
        throw new Error('useXRPL must be used within a xrplProvider');
    }
    return context;
};


export const XRPLProvider: ({ children }: any) => React.JSX.Element = ({ children }: any) => {
    const [xrplClient, setXRPLClient] = useState<Client | undefined>(undefined);

    const getWalletFromSeed = async (seed: string) => {
        if (!seed || seed.length !== 31) return (undefined);
        const wallet = Wallet.fromSeed(seed);
        return (wallet ? wallet : undefined);
    };

    useEffect(() => {
        const initializeXRPLClient = async () => {
            const client = new Client('wss://s.altnet.rippletest.net:51233');
            client && setXRPLClient(client);
        }

        initializeXRPLClient();

        if (xrplClient) {
            xrplClient.connect();
        }
        return () => {
            if (xrplClient) {
                xrplClient.disconnect();
            }
        };
    }, []);

    return (
        <XRPLContext.Provider value={{ xrplClient, getWalletFromSeed }}>
            {children}
        </XRPLContext.Provider>
    );
};