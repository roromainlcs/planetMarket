import React from 'react';
import { useUser } from '@/contexts/userContext';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';

const NavigationBar = ({ isMarketPlace }: any) => {
    const router = useRouter();
    const { userWallet } = useUser();

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <h1>CoinMarket</h1>
            </div>
            <div className={styles.right}>
                {userWallet && userWallet.address ? (
                    <button onClick={() => router.push('/login')}>{userWallet.address}</button>
                ) : (
                    <button onClick={() => router.push('/login')}>Login</button>
                )}
                {isMarketPlace ? (
                    <button onClick={() => router.push(userWallet ? '/dashboard' : '/login')}>Go to Dashboard</button>
                ) : (
                    <button onClick={() => router.push('/')}>Go to Marketplace</button>
                )}
                
            </div>
        </nav>
    );
};

export default NavigationBar;