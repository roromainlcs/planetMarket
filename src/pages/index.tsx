import { useEffect, useState } from "react";
import styles from "@/styles/Marketplace.module.css";
import Head from "next/head";
import NavigationBar from "@/components/NavigationBar";
import PlanetComponent from "@/components/Planet/planetComponent";
import { PlanetType } from "@/components/Planet/planetComponent";
import ListPlanetsComponent from "@/components/listPlanets/listPlanets";

export default function Marketplace() {
  const [marketPlanets, setMarketPlanets] = useState<PlanetType[] | undefined>(undefined);
  const [currentPlanet, setCurrentPlanet] = useState<PlanetType | undefined>(undefined);
  const [showPlanet, setShowPlanet] = useState<boolean>(false);

  async function getMarketPlanets() {
    console.log("getMarketPlanets");
    const res = await fetch("/api/getMarketPlanets")
    const data = await res.json();
    if (data.marketPlanets && data.marketPlanets.length > 0)
      setMarketPlanets(data.marketPlanets);
  }

  useEffect(() => {
    (!marketPlanets || marketPlanets === undefined || marketPlanets.length === 0) && getMarketPlanets();
  }, [marketPlanets]);
  
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
        {showPlanet && <PlanetComponent isMarket={true} planet={currentPlanet} onClickEvent={() => { setShowPlanet(false), setCurrentPlanet(undefined) }} />}
        <ListPlanetsComponent listPlanets={marketPlanets} setCurrentPlanet={setCurrentPlanet} setShowPlanet={setShowPlanet} isMarket={true} />
      </main>
    </>
  );
}