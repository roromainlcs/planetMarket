import React from 'react';
import styles from "@/styles/Marketplace.module.css";
import LoadingPlanet from "@/components/LoadingPlanet/loadingPlanet";
import { PlanetType } from '../Planet/planetComponent';

interface ListNftComponentProps {
    marketPlanets: Array<PlanetType> | undefined;
    setCurrentPlanet: (planet: PlanetType) => void;
    setShowPlanet: (showPlanet: boolean) => void;
}

const ListMarketPlanetsComponent: React.FC<ListNftComponentProps> = React.memo(({ marketPlanets, setCurrentPlanet, setShowPlanet }) => {
    return (
        <div className={styles.ListNftContainer}>
            {marketPlanets && marketPlanets.length > 0 ? (
                marketPlanets.map((planet) => (
                    <div key={planet.NFTokenID} onClick={() => { (setTimeout(() => { setCurrentPlanet(planet) }, 500)), setShowPlanet(true) }}>
                        <p>Token ID: {planet.NFTokenID}</p>
                        <p>URI: {planet.URI}</p>
                        <p>Owner: {planet.Owner}</p>
                        <p>Name: {planet.Name}</p>
                        <p>Discovery date: {planet.discovery_date}</p>
                        <div className={styles.planetLocation}>
                            <p>Location:<br/>Right ascension: {planet.right_ascension}</p>
                            <p>Declination: {planet.declination}</p>
                        </div>
                        <p>price: {planet.price}</p>
                    </div>
                ))
            ) : <LoadingPlanet />}
        </div>
    );
});

export default ListMarketPlanetsComponent;