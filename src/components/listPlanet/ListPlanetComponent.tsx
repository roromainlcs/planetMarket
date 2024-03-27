import React from 'react';
import styles from "@/styles/Marketplace.module.css";
import LoadingPlanet from "@/components/LoadingPlanet/loadingPlanet";
import { PlanetType } from '../Planet/planetComponent';

interface ListNftComponentProps {
    marketPlanets: Array<PlanetType> | undefined;
    setCurrentPlanet: (planet: PlanetType) => void;
    setShowPlanet: (showPlanet: boolean) => void;
}

const ListPlanetComponent: React.FC<ListNftComponentProps> = React.memo(({ marketPlanets, setCurrentPlanet, setShowPlanet }) => {
    return (
        <div className={styles.ListNftContainer}>
            {marketPlanets && marketPlanets.length > 0 ? (
                marketPlanets.map((planet) => (
                    <div key={planet.NFTokenID} onClick={() => { (setTimeout(() => { setCurrentPlanet(planet) }, 5000)), setShowPlanet(true) }}>
                        <p>Token ID: {planet.NFTokenID}</p>
                        <p>URI: {planet.URI}</p>
                        <p>Owner: {planet.Owner}</p>
                        <p>Name: {planet.Name}</p>
                        <p>Discovery date: {planet.discovery_date}</p>
                        <div className={styles.planetLocation}>
                            <p>Location:<br/>Right ascension: {planet.planetary_system_location.right_ascension}</p>
                            <p>Declination: {planet.planetary_system_location.declination}</p>
                        </div>
                    </div>
                ))
            ) : <LoadingPlanet />}
        </div>
    );
});

export default ListPlanetComponent;