import styles from './planet.module.css';
import LoadingPlanet from '../LoadingPlanet/loadingPlanet';
import prisma from '@/../lib/prisma';
import { useState } from 'react';
import { useXRPL } from '@/contexts/xrplContext';
import { useUser } from '@/contexts/userContext';

interface PlanetType {
  NFTokenID: string;
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
}



const PlanetComponent: React.FC<PlanetComponentProps> = ({ planet, onClickEvent, isMarket }) => {
  const [price, setPrice] = useState<number>(0);
  const { createOffer, acceptOffer} = useXRPL();
  const { userWallet } = useUser();

  const sellNft = async (NFTokenID: string) => {
    console.log(JSON.stringify({...planet, price: price}));
    if (userWallet) {
      const offerTsxId = await createOffer(userWallet, NFTokenID, price);
      // mettre le offerTsxId dans l'object nft stocker sur le back pour pouvoir le recup quand on veut le buy
      console.log("transaction to create offer", offerTsxId);
    }
    const response = await fetch('/api/sellPlanet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...planet, price: price}),// rajouter le offertsxId dans l'object pour pouvoir le recup et le mettre dans l'acceptation de l'offre par l'autre wallet
    });
    console.log("response", response);
  }

  const buyNft = async (offerId: string) => {
    if (userWallet && offerId) {
      const booleanTsx = await acceptOffer(userWallet, offerId);
      console.log("transaction to acceot offer", booleanTsx);
    }
    console.log("NFT sold, put logic here");
  }

  return(
    <div className={styles.planetBg} onClick={onClickEvent}>
      <div className={styles.planetContainer} onClick={(event) => {event.stopPropagation();}}>
      {(planet !== undefined && 
        <>
          <p>Token ID: {planet.NFTokenID}</p>
          <p>URI: {planet.URI}</p>
          <p>Owner: {planet.Owner}</p>
          <p>Name: {planet.Name}</p>
          <p>Discovery date: {planet.discovery_date}</p>
          <div className={styles.planetLocation}>
            <p>Location:<br/>Right ascension: {planet.right_ascension}</p>
            <p>Declination: {planet.declination}</p>
          </div>
          {(isMarket &&
          <>
            <p>price: {planet.price}</p>
            <button onClick={async () => {await buyNft(/*planet.offerID*/ 'offer id string')}}>Buy Nft</button>
          </>) ||
          (!isMarket && 
          <>
            <button onClick={async () => {await sellNft(planet.NFTokenID)}}>sell Nft</button>
            <label>Price:</label>
            <input type="number" placeholder="price" step={0.01} onChange={(e) => {setPrice(parseFloat(e.target.value))}}></input>
          </>)}
        </>
      ) || <LoadingPlanet/>}
      </div>
    </div>
  );
}

export default PlanetComponent;
export type { PlanetType, PlanetComponentProps };