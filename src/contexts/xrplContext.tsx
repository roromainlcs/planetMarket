import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Wallet, convertStringToHex, SubmittableTransaction, TxResponse } from 'xrpl';
import { NFTokenCreateOffer, NFTokenCreateOfferMetadata } from 'xrpl/dist/npm/models/transactions/NFTokenCreateOffer';

interface xrplContextType {
    xrplClient: Client | undefined;
    getWalletFromSeed: (seed: string | undefined) => Promise<Wallet | undefined>;
    generateNewWallet: () => Promise<Wallet | undefined>;
    getNFTFromWallet: (walletAddress: string) => Promise<any | undefined>;
    getBalanceFromWallet: (walletAddress: string) => Promise<Number | undefined>;
    mintNFT: (userWallet: Wallet, URI: nftUriType) => Promise<boolean | undefined>;
    burnNFT: (userWallet: Wallet, NFTokenID: string) => Promise<boolean | undefined>;
    createOffer: (userWallet: Wallet, NFTokenID: string, price: number) => Promise<string>;
    acceptOffer: (userWallet: Wallet, offerNFTokenID: string) => Promise<boolean>;
}

interface nftUriType {
    name: string;
    discovery_date: string;
    right_ascension: string;
    declination: string;
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
        if (xrplClient && xrplClient !== null && xrplClient !== undefined) {
            const wallet = (await xrplClient?.fundWallet(null, { faucetHost: undefined }))?.wallet
            return (wallet ? wallet : undefined);
        }
    };

    const getBalanceFromWallet = async (walletAddress: string) => {
        const balance = await xrplClient?.getXrpBalance(walletAddress);
        console.log("balance got from the wallet address:", balance);
        return (balance);
    }

    const mintNFT = async (userWallet: Wallet, URI: nftUriType) => {
        const transaction: SubmittableTransaction = {
            "TransactionType": "NFTokenMint",
            "Account": userWallet?.classicAddress,
            "URI": convertStringToHex(JSON.stringify(URI)),
            "Flags": 8,
            "TransferFee": 10000,
            "NFTokenTaxon": 0,
        };
        const tsx = await xrplClient?.submitAndWait(transaction, { wallet: userWallet });
        console.log("result from nft transaction mint:", tsx);
        return (tsx && tsx !== null ? true : false);
    };

    const getNFTFromWallet = async (walletAddress: string) => {
        const requestData: any = {
            method: "account_nfts",
            account: walletAddress,
        };
        if (xrplClient && !xrplClient.isConnected()) {
            await xrplClient.connect();
            console.log("reconnecting client");
        }
        const listOfNFT: any | undefined = await xrplClient?.request(requestData);
        console.log("list of nfts of the account:", walletAddress, "equal to:", listOfNFT?.result?.account_nfts);
        return (listOfNFT?.result?.account_nfts ? listOfNFT?.result?.account_nfts : undefined);
    };

    const burnNFT = async (userWallet: Wallet, NFTokenID: string) => {
        const transaction: SubmittableTransaction = {
            "TransactionType": "NFTokenBurn",
            "Account": userWallet?.classicAddress,
            "NFTokenID": NFTokenID,
        };

        const tsx = await xrplClient?.submitAndWait(transaction, { wallet: userWallet })
        console.log("result from nft transaction burn:", tsx);
        return (tsx && tsx !== null ? true : false);
    };

    const createOffer = async (userWallet: Wallet, NFTokenID: string, price: number) => {
        const transactionBlob: SubmittableTransaction = {
            "TransactionType": "NFTokenCreateOffer",
            "Account": userWallet?.classicAddress,
            "NFTokenID": NFTokenID,
            "Amount": (price * 100000).toString(),
            "Flags": 1
        };
        const tsx: any = await xrplClient?.submitAndWait(transactionBlob, { wallet: userWallet });
        return (tsx?.result?.meta && tsx?.result?.meta?.offer_id ? tsx?.result?.meta?.offer_id : undefined);
    };

    const acceptOffer = async (userWallet: Wallet, offerNFTokenID: string) => {
        console.log("offerNFTokenID:", offerNFTokenID, "userWallet:", userWallet?.classicAddress);
        const transactionBlob: SubmittableTransaction = {
            "TransactionType": "NFTokenAcceptOffer",
            "Account": userWallet?.classicAddress,
            "NFTokenSellOffer": offerNFTokenID,
        };
        const tsx = await xrplClient?.submitAndWait(transactionBlob, { wallet: userWallet });
        console.log("result from accept offer transaction:", tsx);
        return (tsx && tsx !== null ? true : false);
    };

    useEffect(() => {
        if (xrplClient && !xrplClient.isConnected()) {
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
        <XRPLContext.Provider value={{ xrplClient, getWalletFromSeed, generateNewWallet, getNFTFromWallet, getBalanceFromWallet, mintNFT, burnNFT, createOffer, acceptOffer }}>
            {children}
        </XRPLContext.Provider>
    );
};

export type { nftUriType };