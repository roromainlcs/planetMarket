import styles from './planet.module.css';
import LoadingPlanet from '../LoadingPlanet/loadingPlanet';

interface PlanetType {
    NFTokenID: string,
    URI: string,
    Owner: string,
    Name: string,
    discovery_date: string,
    planetary_system_location: {
      right_ascension: string,
      declination: string
    }
  }

interface PlanetComponentProps {
    planet: PlanetType | undefined,
    onClickEvent: () => void;
}

const PlanetComponent: React.FC<PlanetComponentProps> = ({ planet, onClickEvent }) => {
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
              <p>Location:<br/>Right ascension: {planet.planetary_system_location.right_ascension}</p>
              <p>Declination: {planet.planetary_system_location.declination}</p>
            </div>
          </>
        ) || <LoadingPlanet/>}
        </div>
      </div>
    );
  }

export default PlanetComponent;
export type { PlanetType, PlanetComponentProps };