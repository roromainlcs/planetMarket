import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/userContext';
import { useXRPL } from '@/contexts/xrplContext';
import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavigationBar from '@/components/NavigationBar';
import CreationForm from '@/components/CreationForm';
import Image from "next/image";


export default function Dashboard() {
    const [showCreationForm, setShowCreationForm] = useState(false);
    const [userOwnedNFTs, setUserOwnedNFTs] = useState<Array<any> | undefined>(undefined);
    const router = useRouter();
    const { userWallet } = useUser();
    const { getNFTFromWallet, mintNFT, burnNFT } = useXRPL();
    const [isCreatingNft, setIsCreatingNft] = useState(false);
    const [burnedNft, setBurnedNft] = useState('');

    const createNewNFT = async () => {
        if (userWallet && userWallet !== undefined) {
            setIsCreatingNft(true);
            const newNFToken = await mintNFT(userWallet, "")
            console.log("is nft created ?:", newNFToken);
            setIsCreatingNft(false);
        }
    }

    const BurnOwnedNFT = async (NFTokenID: string) => {
        if (userWallet && userWallet !== undefined) {
            setBurnedNft(NFTokenID);
            const newNFToken = await burnNFT(userWallet, NFTokenID);
            console.log("is nft burned ?:", newNFToken);
            setBurnedNft('');
        }
    }

    useEffect(() => {
        if (isCreatingNft || burnedNft != '') //refresh only when nft is created and not right before same for burned nft
            return;
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
            console.log("user wallet is not defined")
            router.push('/login');
        }
    }, [userWallet, router, isCreatingNft, burnedNft]);

    const CreatingNft = () => { //load page creating nft component
        return (
            <div className={styles.planetGifContainer}>
                <h1>Creating new planet</h1>
                <Image
                src='/static/images/planet_gif1.gif'
                width={900}
                height={600}
                alt='loading next planet gif'
                className={styles.planetGif}
                unoptimized={true}
                />
            </div>
        );
    }

    const BurningNft = () => { //load page burning nft component
        return (
            <div className={styles.planetGifContainer}>
                <h1>Burning the planet: <br/>{burnedNft}</h1>
                <Image
                src='/static/images/planet_gif1.gif'
                width={900}
                height={600}
                alt='burning next planet gif'
                className={styles.planetGif}
                unoptimized={true}
                />
            </div>
        );
    }

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
                {isCreatingNft && <CreatingNft/>}
                {burnedNft !== '' && <BurningNft/>}
            </main >
        </>
    );
}