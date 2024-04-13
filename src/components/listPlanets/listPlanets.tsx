import React from 'react';
import styles from "./listPlanets.module.css";
import LoadingPlanet from "@/components/LoadingPlanet/loadingPlanet";
import { PlanetType } from '../Planet/planetComponent';

interface ListNftComponentProps {
    listPlanets: Array<PlanetType> | undefined;
    setCurrentPlanet: (planet: PlanetType) => void;
    setShowPlanet: (showPlanet: boolean) => void;
    isMarket: boolean;
}

const ListPlanetsComponent: React.FC<ListNftComponentProps> = React.memo(({ listPlanets, setCurrentPlanet, setShowPlanet, isMarket }) => {
    return (
        <div className={styles.listNftContainer}>
            {listPlanets && listPlanets.length > 0 ? (
                listPlanets.map((planet) => (
                    <div key={planet.NFTokenID} onClick={() => { (setTimeout(() => { setCurrentPlanet(planet) }, 500)), setShowPlanet(true) }}>
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
                        {isMarket && <p>price: {planet.price}</p>}
                    </div>
                ))
            ) : <LoadingPlanet />}
        </div>
    );
});

export default ListPlanetsComponent;