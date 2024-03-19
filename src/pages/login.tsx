import { useState } from 'react';
import { useXRPL } from '@/contexts/xrplContext';
import { useUser } from '@/contexts/userContext';
import styles from '@/styles/Login.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Login() {
    const [seed, setSeed] = useState('');
    const [isWrongSeed, setIsWrongSeed] = useState(false);
    const { setUserWallet } = useUser();
    const { getWalletFromSeed } = useXRPL();
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


    return (
        <>
            <Head>
                <title>Login - CoinMarket</title>
                <meta name="description" content="Securely access your account and manage your profile on CoinMarket." />
            </Head>
            <main className={styles.main}>
                <div className={styles.containerLogin}>
                    <h1 className={styles.titleLogin}>Import Wallet</h1>
                    { isWrongSeed && <p className={styles.errorMessage}>Wrong seed, please check the seed that you entered !</p>}
                    <div className={styles.inputContainerLogin}>
                        <input
                            type="text"
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                            placeholder="Enter your seed phrase"
                        />
                    </div>
                    <div className={styles.buttonContainerLogin}>
                        <button className={styles.importButtonLogin} onClick={handleImportWallet}>Import Wallet</button>
                        <button className={styles.disconnectButtonLogin} onClick={handleDisconnect}>Disconnect</button>
                        <button onClick={() => router.back()}>Back</button>
                    </div>
                </div>
            </main>
        </>
    );
}