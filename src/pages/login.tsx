import { useState } from 'react';
import { useXRPL } from '@/contexts/xrplContext';
import { useUser } from '@/contexts/userContext';
import styles from '@/styles/Login.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Login() {
    const [loadingWallet, setLoadingWallet] = useState(false);
    const [seed, setSeed] = useState('');
    const [generatedSeed, setGeneratedSeed] = useState("");
    const [isWrongSeed, setIsWrongSeed] = useState(false);
    const { userWallet, setUserWallet } = useUser();
    const { getWalletFromSeed, generateNewWallet } = useXRPL();
    const router = useRouter();

    const handleImportWallet = async () => {
        // Random seed that we can use to connect on xrpl: sEdS4f6ijKHTMK9Zkd1DuSGXxz9mpaH
        const wallet = await getWalletFromSeed(seed);
        if (!wallet) {
            setIsWrongSeed(true);
        } else {
            console.log("wallet received and will be set");
            setUserWallet(wallet);
            router.back();
        }
    };

    const handleDisconnect = () => {
        setUserWallet(undefined);
        router.push('/');
    };

    const handleWalletCreation = async () => {
        setLoadingWallet(true);
        const newWallet = await generateNewWallet();
        setUserWallet(newWallet);
        newWallet && newWallet?.seed && setGeneratedSeed(newWallet?.seed);
        setLoadingWallet(false);
    };

    if (loadingWallet) {
        return (
            <main className={styles.main}>
                <div className={styles.containerLogin}>
                    <h1 className={[styles.titleLogin, styles.loadingWallet].join(' ')}>Loading your wallet...</h1>
                    <div></div>
                </div>
            </main>
        );
    }
    return (
        <>
            <Head>
                <title>Login - CoinMarket</title>
                <meta name="description" content="Securely access your account and manage your profile on CoinMarket." />
            </Head>
            <main className={styles.main}>
                <div className={styles.containerLogin}>
                    <h1 className={styles.titleLogin}>You are {userWallet ? "connected" : "not connected"}</h1>
                    {isWrongSeed && <p className={styles.errorMessage}>Wrong seed, please check the seed that you entered !</p>}
                    {generatedSeed && <p className={styles.successfulMessage}>You are connected and you succesfuly created a new wallet with the seed: {generatedSeed}. Please keep it secretly to be able to connect again !</p>}
                    {(userWallet &&
                    <div className={styles.displayWalletContainer}>
                        <p className={styles.loginText}>current wallet address:</p>
                        <p className={styles.loginText}>{userWallet.address}</p>
                    </div>
                    ) || 
                    <form className={styles.inputContainerLogin} onSubmit={handleImportWallet}>
                        <input
                            type="text"
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                            placeholder="Enter your seed phrase"
                        />
                    </form>
                    }
                    <div className={styles.buttonContainerLogin}>
                        {(!userWallet && 
                        <>
                            <button className={styles.createButtonLogin} onClick={handleWalletCreation}>Create wallet</button>
                            <button className={styles.importButtonLogin} onClick={handleImportWallet}>Import Wallet</button>
                        </>
                        ) ||
                        <button className={styles.disconnectButtonLogin} onClick={handleDisconnect}>Disconnect</button>
                        }
                        <button onClick={() => router.back()}>Back</button>
                    </div>
                </div>
            </main>
        </>
    );
}

