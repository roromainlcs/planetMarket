import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/userContext';
import { useXRPL } from '@/contexts/xrplContext';
import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavigationBar from '@/components/NavigationBar';
import CreationForm from '@/components/CreationForm';

export default function Dashboard() {
    const [showCreationForm, setShowCreationForm] = useState(false);
    const [userOwnedNFTs, setUserOwnedNFTs] = useState<Array<any> | undefined>(undefined);
    const router = useRouter();
    const { userWallet } = useUser();
    const { getNFTFromWallet, mintNFT, burnNFT } = useXRPL();

    const createNewNFT = async () => {
        if (userWallet && userWallet !== undefined) {
            const newNFToken = await mintNFT(userWallet, "")
            console.log("is nft created ?:", newNFToken);
        }
    }

    const BurnOwnedNFT = async (NFTokenID: string) => {
        if (userWallet && userWallet !== undefined) {
            const newNFToken = await burnNFT(userWallet, NFTokenID);
            console.log("is nft created ?:", newNFToken);
        }
    }

    useEffect(() => {
        const getNFTOwned = async () => {
            if (userWallet !== undefined && userWallet?.classicAddress !== undefined) {
                const NFTs: [] = await getNFTFromWallet(userWallet.classicAddress);
                console.log("Nfts received and owned by the userWallet:", NFTs);
                setUserOwnedNFTs(NFTs);
            }
        }

        if (userWallet && userWallet !== undefined) {
            console.log("user wallet into dashboard page:", userWallet);
            getNFTOwned();
        } else {
            router.push('/login');
        }
    }, [userWallet, router]);

    return (
        <>
            <Head>
                <title>Dashboard - CoinMarket</title>
                <meta name="description" content="Effortlessly manage your listings and transactions on CoinMarket." />
            </Head>
            <main className={styles.main}>
                <NavigationBar />
                <p>Dashboard</p>
                <button onClick={async () => createNewNFT()}>Create New NFT</button>
                {
                    userOwnedNFTs && userOwnedNFTs !== null && userOwnedNFTs !== undefined && userOwnedNFTs?.map((nft: any, index: number) =>
                        <div key={index}>
                            <p>This is a founded NFTs {nft?.NFTokenID}</p>
                            <button onClick={async () => BurnOwnedNFT(nft?.NFTokenID)}>Burn the NFT</button>
                        </div>)
                }
            </main >
        </>
    );
}