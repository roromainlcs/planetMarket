import styles from './planet.module.css';
import LoadingPlanet from '../LoadingPlanet/loadingPlanet';
import prisma from '@/../lib/prisma';
import { useState } from 'react';

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

function buyNft() {
  console.log("NFT sold, put logic here");

}

const PlanetComponent: React.FC<PlanetComponentProps> = ({ planet, onClickEvent, isMarket }) => {
  const [price, setPrice] = useState<number>(0);

  async function sellNft() {
    console.log(JSON.stringify({...planet, price: price}));
    const response = await fetch('/api/sellPlanet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...planet, price: price}),
    });
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
            <button onClick={buyNft}>Buy Nft</button>
          </>) ||
          (!isMarket && 
          <>
            <button onClick={sellNft}>sell Nft</button>
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