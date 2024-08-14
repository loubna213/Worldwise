import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

const Map = () => {
  const { cities } = useCities()
  const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation()
  const [mapPosition, setMapPosition] = useState([51.505, -0.09])

  const [mapLat, mapLng] = useUrlPosition()

  useEffect(function() {
    if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(function() {
    if(geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  }, [geolocationPosition])
  

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition ? <Button type='position' onClick={getPosition}>{isLoadingPosition ? 'Loading...' : 'use your position'}</Button> : null}
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          cities.map(city => (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                {city.notes}
              </Popup>
            </Marker>
          ))
        }
        <ChangeCenter position={mapPosition}/>
        <DetectClick/>
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}

export default Map;
  