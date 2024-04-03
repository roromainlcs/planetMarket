import React, { useEffect } from 'react';
import { useUser } from '@/contexts/userContext';
import styles from "./styles.module.css";
import { useRouter } from 'next/router';
import { useXRPL } from '@/contexts/xrplContext';

const NavigationBar = ({ isMarketPlace }: any) => {
    const router = useRouter();
    const { userWallet /*, setUserBalance */ } = useUser();
    const { getBalanceFromWallet, xrplClient } = useXRPL();

    // useEffect(() => {
    //     const getUserBalance = async () => {
    //         if (userWallet && userWallet !== undefined) {
    //             const newBalance = await getBalanceFromWallet(userWallet?.classicAddress);
    //             console.log("balance of user:", newBalance);
    //         }
    //     }
    //     userWallet && userWallet !== null && xrplClient?.isConnected() && getUserBalance();
    // }, [userWallet, xrplClient]);

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