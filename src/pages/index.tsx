import { useEffect } from "react";
import { useUser } from "@/contexts/userContext";
import styles from "@/styles/Marketplace.module.css";
import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";

export default function Marketplace() {
  const { userWallet } = useUser();

  useEffect(() => {
    if (userWallet) {
      // console.log("user wallet into dashboard page:", userWallet);
      // call needed function from the xrpl context using the userwallet to sign and submit all transaction process
    }
  }, [userWallet]);

  return (
    <>
      <Head>
        <title>CoinMarket</title>
        <meta name="description" content="CoinMarket: The first marketplace for buying and selling everyday items using cryptocurrency and NFT technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavigationBar isMarketPlace />
        <p>Marketplace</p>
      </main>
    </>
  );
}
