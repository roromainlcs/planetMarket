import { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import styles from "@/styles/Marketplace.module.css";
import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";

export default function Marketplace() {
  const { userWallet } = useUser();
  const [marketNfts, setMarketNfts] = useState<Array<any> | undefined>(() => {return undefined});

  useEffect(() => {
    if (userWallet) {
      // console.log("user wallet into dashboard page:", userWallet);
      // call needed function from the xrpl context using the userwallet to sign and submit all transaction process
    }
  }, [userWallet]);

  const LoadingPlanet = () => { //load page burning nft component
    return (
        <div className={styles.planetGifContainer}>
            <Image
            src='/static/images/planet_gif2.gif'
            width={600}
            height={600}
            alt='loading gif'
            className={styles.planetGif}
            unoptimized={true}
            />
        </div>
    );
  }
  
  const getMarketNFTs = async () => {
    // call the xrpl context to get the nfts available on the market
    setTimeout(() => {
      setMarketNfts(
        [
          {
            "NFTokenID": "1",
            "URI": "https://ipfs.io/ipfs/QmZz2fQ2yqV9wX1a8QWx8G7tQ1m6JfVH1F6JG1",
            "Owner": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
            "Name": "le soleil",
            "discovery_date": "2014-04-17",
            "planetary_system_location": {
              "right_ascension": "19h 54m 36.6519s",
              "declination": "+43° 57' 18.081\""
            }
          },
          {
            "NFTokenID": "2",
            "URI": "https://ipfs.io/ipfs/QmZz2fQ2yqV9wX1a8QWx8G7tQ1m6JfVH1F6JG1",
            "Owner": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
            "Name": "le soleil",
            "discovery_date": "2014-04-17",
            "planetary_system_location": {
              "right_ascension": "19h 54m 36.6519s",
              "declination": "+43° 57' 18.081\""
            }
          },
          {
            "NFTokenID": "3",
            "URI": "https://ipfs.io/ipfs/QmZz2fQ2yqV9wX1a8QWx8G7tQ1m6JfVH1F6JG1",
            "Owner": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
            "Name": "le soleil",
            "discovery_date": "2014-04-17",
            "planetary_system_location": {
              "right_ascension": "19h 54m 36.6519s",
              "declination": "+43° 57' 18.081\""
            }
          },
          {
            "NFTokenID": "4",
            "URI": "https://ipfs.io/ipfs/QmZz2fQ2yqV9wX1a8QWx8G7tQ1m6JfVH1F6JG1",
            "Owner": "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh",
            "Name": "le soleil",
            "discovery_date": "2014-04-17",
            "planetary_system_location": {
              "right_ascension": "19h 54m 36.6519s",
              "declination": "+43° 57' 18.081\""
            }
          }
        ]
      )
    }, 2500);
  };

  const ListNftComponent = () => {
    return (
      <div className={styles.ListNftContainer}>
        {
          marketNfts && marketNfts.length > 0 ? (marketNfts.map((nft) => {
            return (
              <div key={nft.NFTokenID}>
                <p>Token ID: {nft.NFTokenID}</p>
                <p>URI: {nft.URI}</p>
                <p>Owner: {nft.Owner}</p>
                <p>Name: {nft.Name}</p>
                <p>Discovery date: {nft.discovery_date}</p>
                <div className={styles.planetLocation}>
                  <p>Location:<br/>Right ascension: {nft.planetary_system_location.right_ascension}</p>
                  <p>Declination: {nft.planetary_system_location.declination}</p>
                </div>
              </div>
            );
          })) : <LoadingPlanet/>
        }
      </div>
    );
  };

  useEffect(() => {
    if (!marketNfts || marketNfts === undefined || marketNfts.length === 0)
      getMarketNFTs();
  }); 
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
        <ListNftComponent/>
      </main>
    </>
  );
}
