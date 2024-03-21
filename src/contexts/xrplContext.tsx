import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Wallet, convertStringToHex, SubmittableTransaction, Request } from 'xrpl';

interface xrplContextType {
    xrplClient: Client | undefined;
    getWalletFromSeed: (seed: string | undefined) => Promise<Wallet | undefined>;
    generateNewWallet: () => Promise<Wallet | undefined>;
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

    const getWalletFromSeed = async (seed: string | undefined) => {
        if (!seed || seed.length !== 31) return (undefined);
        const wallet = Wallet.fromSeed(seed);
        return (wallet ? wallet : undefined);
    };

    const generateNewWallet = async () => {
        if (xrplClient && xrplClient !== null) {
            const wallet = (await xrplClient?.fundWallet(null, { faucetHost: undefined }))?.wallet
            return (wallet ? wallet : undefined);
        }
    };

    // const mintNFT = async (userWallet: Wallet, URI: string) => {
    //     const transaction: SubmittableTransaction = {
    //         "TransactionType": "NFTokenMint",
    //         "Account": userWallet?.classicAddress,
    //         "URI": convertStringToHex("This is a new test string"),
    //         "Flags": 8,
    //         "TransferFee": 10000,
    //         "NFTokenTaxon": 0
    //     };
    //     const tsx = await xrplClient?.submitAndWait(transaction, { wallet: userWallet });
    //     console.log("result from nft transaction mint:", tsx);
    // };

    // const getNFTFromWallet = async (walletAddress: string) => {
    //     const requestData: any = {
    //         method: "account_nfts",
    //         account: walletAddress,
    //     };
        
    //     const listOfNFT = await xrplClient?.request(requestData);
    //     console.log("list of nfts of the account:", walletAddress, "equal to:", listOfNFT);
    // };

    // const burnNFT = async (userWallet: Wallet, NFTokenID: string) => {
    //     const transaction: SubmittableTransaction = {
    //         "TransactionType": "NFTokenBurn",
    //         "Account": userWallet?.classicAddress,
    //         "NFTokenID": NFTokenID,
    //     };

    //     const tsx = await xrplClient?.submitAndWait(transaction, { wallet: userWallet })
    //     console.log("result from nft transaction burn:", tsx);
    // };

    useEffect(() => {
        if (xrplClient) {
            xrplClient.connect();
            console.log("client connected");
        } else {
            console.log("xrplClient not found");
        }
        return () => {
            if (xrplClient) {
                xrplClient.disconnect();
                console.log("client Disconnected");
            } else {
                console.log("xrplClient not found");
            }
        };
    }, [xrplClient]);

    useEffect(() => {
        const initializeXRPLClient = async () => {
            const client = new Client('wss://s.altnet.rippletest.net:51233');
            client && setXRPLClient(client);
        }

        initializeXRPLClient();
    }, []);

    return (
        <XRPLContext.Provider value={{ xrplClient, getWalletFromSeed, generateNewWallet }}>
            {children}
        </XRPLContext.Provider>
    );
};