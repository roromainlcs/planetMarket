import { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import styles from "@/styles/Marketplace.module.css";
import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import PlanetComponent from "@/components/Planet/planetComponent";
import { PlanetType, PlanetComponentProps } from "@/components/Planet/planetComponent";
import ListPlanetComponent from "@/components/listPlanet/ListPlanetComponent";

export default function Marketplace() {
  const { userWallet } = useUser();
  const [marketPlanets, setMarketNfts] = useState<Array<PlanetType> | undefined>(() => {return undefined});
  const [currentPlanet, setCurrentPlanet] = useState<PlanetType | undefined>(() => {return undefined});
  const [showPlanet, setShowPlanet] = useState<boolean>(() => {return false});

  console.log("coucou");
  useEffect(() => {
    if (userWallet) {
      // console.log("user wallet into dashboard page:", userWallet);
      // call needed function from the xrpl context using the userwallet to sign and submit all transaction process
    }
  }, [userWallet]);
  
  useEffect(() => {
    console.log("showPlanet:", showPlanet);
    if (showPlanet === false) {
      setCurrentPlanet(undefined);
    }
  }, [showPlanet, currentPlanet]);

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

  useEffect(() => {
    if (!marketPlanets || marketPlanets === undefined || marketPlanets.length === 0)
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
        {showPlanet && <PlanetComponent planet={currentPlanet} setShowPlanet={setShowPlanet}/>}
        <ListPlanetComponent marketPlanets={marketPlanets} setCurrentPlanet={setCurrentPlanet} setShowPlanet={setShowPlanet}/>
      </main>
    </>
  );
}
