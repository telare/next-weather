"use client";
import styles from "./styles/WeatherInsights.module.scss";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  useAppDispatch,
  useAppSelector,
} from "@/providers/dataProvider/globalStore/globalStore";
import { updateLocation } from "@/providers/dataProvider/globalStore/actions/location/types";

export default function WeatherMap() {
  const defaultLocation = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  const { lat, lon } = defaultLocation;
  const customIcon = L.icon({
    iconUrl: "/img/marker.png",
    iconSize: [32, 32],
  });

  function MapClickHandler() {
    const map = useMapEvent("click", (e) => {
      map.setView([e.latlng.lat, e.latlng.lng], map.getZoom());
      dispatch(
        updateLocation({
          lat: `${e.latlng.lat}`,
          lon: `${e.latlng.lng}`,
          cityName: "",
        })
      );
    });
    return null;
  }

  function MapFly() {
    const map = useMap();
    map.flyTo([Number(lat), Number(lon)]);
    return null;
  }
  return (
    <div
      className={styles.mapSection}
      aria-label="Interactive map section"
      aria-live="polite"
      aria-atomic="true"
      role="region"
    >
      <MapContainer
        center={[Number(lat), Number(lon)]}
        zoom={13}
        className={styles.map}
        aria-label="Interactive map showing current location"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        <MapFly />
        <Marker
          position={[Number(lat), Number(lon)]}
          icon={customIcon}
          alt="position marker"
          aria-label={`Current position: ${Number(lat)} latitude, ${Number(lon)} longitude`}
        />
      </MapContainer>
    </div>
  );
}
