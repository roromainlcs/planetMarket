import React from 'react';
import styles from "@/styles/Marketplace.module.css";
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
        <div className={styles.ListNftContainer}>
            {listPlanets && listPlanets.length > 0 ? (
                listPlanets.map((planet) => (
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
                        {isMarket && <p>price: {planet.price}</p>}
                    </div>
                ))
            ) : <LoadingPlanet />}
        </div>
    );
});

export default ListPlanetsComponent;