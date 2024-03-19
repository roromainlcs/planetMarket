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
    const router = useRouter();
    const { userWallet } = useUser();
    const { xrplClient } = useXRPL();

    useEffect(() => {
        if (!userWallet) {
            router.push('/login');
        } else {
            // console.log("user wallet into dashboard page:", userWallet);
            // call needed function from the xrpl context using the userwallet to sign and submit all transaction process
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
                <button onClick={() => setShowCreationForm(true)}>Create Announcement</button>
                {showCreationForm && <CreationForm onClose={() => setShowCreationForm(false)} />}
            </main>
        </>
    );
}