import styles from './planet.module.css';
import LoadingPlanet from '../LoadingPlanet/loadingPlanet';
import prisma from '@/../lib/prisma';
import { useState } from 'react';
import { useXRPL } from '@/contexts/xrplContext';
import { useUser } from '@/contexts/userContext';

interface PlanetType {
  NFTokenID: string;
  offerID: string;
  URI: string;
  Owner: string;
  Name: string;
  discovery_date: string;
  createdAt: string;
  updatedAt: string;
  right_ascension: string;
  declination: string;
  price?: number;
};

interface PlanetComponentProps {
    planet: PlanetType | undefined,
    onClickEvent: () => void;
    isMarket: boolean;
    setBurnedNft: ((setBurnedNft: string) => void) | undefined;
    setTradedNft: ((setTradedNft: string) => void);
}



const PlanetComponent: React.FC<PlanetComponentProps> = ({ planet, onClickEvent, isMarket, setBurnedNft, setTradedNft }) => {
  const [price, setPrice] = useState<number>(0);
  const { createOffer, acceptOffer} = useXRPL();
  const { userWallet } = useUser();

  const sellNft = async () => {
    console.log(JSON.stringify({...planet, price: price}));
    if (!userWallet || planet === undefined || price === 0 || price === undefined) {
      console.log("something went wrong, userWallet:", userWallet, "planet:", planet, "price:", price);
      return;
    }
    setTradedNft(planet.NFTokenID);
    const offerTsxId = await createOffer(userWallet, planet.NFTokenID, price);
    // mettre le offerTsxId dans l'object nft stocker sur le back pour pouvoir le recup quand on veut le buy
    const response = await fetch('/api/sellPlanet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...planet, price: price, offerID: offerTsxId}),// rajouter le offertsxId dans l'object pour pouvoir le recup et le mettre dans l'acceptation de l'offre par l'autre wallet
    });
    console.log(response, offerTsxId);
    setTradedNft('');
  }

  const buyNft = async () => {
    if (!userWallet || planet === undefined || planet.offerID === undefined)
      return;
    setTradedNft(planet.NFTokenID);
    const accepted = await acceptOffer(userWallet, planet.offerID);
    console.log("is transaction accepted: ", accepted);
    if (accepted) {
      const response = await fetch('/api/removePlanetFromSales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({NFTokenID: planet.NFTokenID}),
      });
    }
    setTradedNft('');
    onClickEvent();
  }

  return(
    <div className={styles.planetBg} onClick={onClickEvent}>
      <div className={styles.planetContainer} onClick={(event) => {event.stopPropagation();}}>
      {(planet !== undefined && 
        <>
          <p className={styles.textName}>Planet: <span className={styles.subtext}>{planet.Name}</span></p>
          <p className={styles.text}>Owner ID: <span className={styles.subtext}>{planet.Owner}</span></p>
          <p className={styles.text}>Discovery date: <span className={styles.subtext}>{planet.discovery_date}</span></p>
          <p className={styles.text}>The planet Token ID:</p>
          <p className={styles.subtext}>{planet.NFTokenID}</p>
          <p className={styles.text}>The NFT URI:</p>
          <p className={styles.subtext}>{planet.URI}</p>
          <div className={styles.planetLocation}>
              <p className={styles.text}>Location:<br/>Right ascension: <span className={styles.subtext}>{planet.right_ascension}</span></p>
              <p className={styles.text}>Declination: <span className={styles.subtext}>{planet.declination}</span></p>
          </div>
          {(isMarket &&
          <div className={styles.buyContainer}>
            <p>price: {planet.price}</p>
            <button onClick={buyNft}>Buy Nft</button>
          </div>) ||
          (!isMarket && 
          <>
            <button onClick={sellNft}>Sell Nft</button>
            <label>Price:</label>
            <input type="number" placeholder="price" step={0.01} onChange={(e) => {setPrice(parseFloat(e.target.value))}}></input>
            <button onClick={() => {setBurnedNft !== undefined && setBurnedNft(planet.NFTokenID)}}>Burn Nft</button>
          </>)}
        </>
      ) || <LoadingPlanet/>}
      </div>
    </div>
  );
}

export default PlanetComponent;
export type { PlanetType, PlanetComponentProps };