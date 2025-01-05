import React from 'react';
import "./listPlanets.css";
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
        <div className='listNftContainer'>
            {listPlanets && listPlanets.length > 0 ? (
                listPlanets.map((planet) => (
                    <div key={planet.NFTokenID} onClick={() => { (setTimeout(() => { setCurrentPlanet(planet) }, 500)), setShowPlanet(true) }}>
                        <p className='textName'>Planet: <span className='subtext'>{planet.Name}</span></p>
                        <p className='text'>Owner ID: <span className='subtext'>{planet.Owner}</span></p>
                        <p className='text'>Discovery date: <span className='subtext'>{planet.discovery_date}</span></p>
                        <p className='text'>The planet Token ID:</p>
                        <p className='subtext'>{planet.NFTokenID}</p>
                        <p className='text'>The NFT URI:</p>
                        <p className='subtext'>{planet.URI}</p>
                        <div className='planetLocation'>
                            <p className='text'>Location:<br/>Right ascension: <span className='subtext'>{planet.right_ascension}</span></p>
                            <p className='text'>Declination: <span className='subtext'>{planet.declination}</span></p>
                        </div>
                        {isMarket && <p>price: {planet.price}</p>}
                    </div>
                ))
            ) : <LoadingPlanet />}
        </div>
    );
});

export default ListPlanetsComponent;