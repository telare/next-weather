"use client";
import styles from "./styles/Footer.module.scss";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateLocation } from "@/providers/globalStore";
import L from "leaflet";
import { useContext } from "react";
import { DataContext } from "@/providers/dataProvider/dataProvider";
import Skeleton from "@shared/components/Skeletons/Skeleton";

export default function WeatherMap() {
  const defaultLocation = useSelector((state: RootState) => state.location.value);
  const weather = useContext(DataContext);
  const dispatch = useDispatch();
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
  if (weather.isLoading) return <Skeleton className={styles.mapSection} />;
  return (
    <div className={styles.mapSection}>
      <MapContainer
        center={[Number(lat), Number(lon)]}
        zoom={13}
        className={styles.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        <MapFly />
        <Marker position={[Number(lat), Number(lon)]} icon={customIcon} />
      </MapContainer>
    </div>
  );
}
