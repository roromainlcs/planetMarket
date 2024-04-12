import { useEffect, useState } from "react";
import styles from "@/styles/Marketplace.module.css";
import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import PlanetComponent from "@/components/Planet/planetComponent";
import { PlanetType } from "@/components/Planet/planetComponent";
import ListPlanetsComponent from "@/components/listPlanets/listPlanets";
import Image from "next/image";

export default function Marketplace() {
  const [marketPlanets, setMarketPlanets] = useState<PlanetType[] | undefined>(
    undefined
  );
  const [currentPlanet, setCurrentPlanet] = useState<PlanetType | undefined>(
    undefined
  );
  const [showPlanet, setShowPlanet] = useState<boolean>(false);
  const [boughtNft, setBoughtNft] = useState<string>("");

  async function getMarketPlanets() {
    console.log("getMarketPlanets");
    const res = await fetch("/api/getMarketPlanets");
    const data = await res.json();
    if (data.marketPlanets)
      setMarketPlanets(data.marketPlanets);
  }

  const BuyingNft = () => {
    //load page buying nft component
    return (
      <div className={styles.planetGifContainer}>
        <h1>
          buying planet with tokenId: <br />
          {boughtNft}
        </h1>
        <Image
          src="/static/images/planet_gif1.gif"
          width={900}
          height={600}
          alt="burning next planet gif"
          className={styles.planetGif}
          unoptimized={true}
        />
      </div>
    );
  };

  useEffect(() => {
    if ((!marketPlanets || marketPlanets === undefined || marketPlanets.length === 0))
      getMarketPlanets();
  }, []);

  useEffect(() => {
    if (boughtNft !== "" && marketPlanets && marketPlanets.length > 0)
      return;
    getMarketPlanets();
  }, [boughtNft]);

  return (
    <>
      <Head>
        <title>CoinMarket</title>
        <meta
          name="description"
          content="CoinMarket: The first marketplace for buying and selling everyday items using cryptocurrency and NFT technology."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavigationBar isMarketPlace />
        <p>Marketplace</p>
        {showPlanet && (
          <PlanetComponent
            setTradedNft={setBoughtNft}
            setBurnedNft={undefined}
            isMarket={true}
            planet={currentPlanet}
            onClickEvent={() => {
              setShowPlanet(false), setCurrentPlanet(undefined);
            }}
          />
        )}
        <ListPlanetsComponent
          listPlanets={marketPlanets}
          setCurrentPlanet={setCurrentPlanet}
          setShowPlanet={setShowPlanet}
          isMarket={true}
        />
        {boughtNft !== "" && <BuyingNft />}
      </main>
    </>
  );
}
