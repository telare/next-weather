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
import { RootState, setCityName } from "@/providers/global-store";
import L from "leaflet";

export default function Map() {
  const { value } = useSelector((state: RootState) => state.cityName);
  const dispatch = useDispatch();
  const { lat, lon } = value;
  const customIcon = L.icon({
    iconUrl: "/img/marker.png",
    iconSize: [32, 32],
  });

  function MapClickHandler() {
    const map = useMapEvent("click", (e) => {
      map.setView([e.latlng.lat, e.latlng.lng], map.getZoom());
      dispatch(
        setCityName({
          lat: `${e.latlng.lat}`,
          lon: `${e.latlng.lng}`,
          name: "",
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
    <div className={styles.left__col_map}>
      <MapContainer
        center={[Number(lat), Number(lon)]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        <MapFly />
        <Marker
          position={[Number(lat), Number(lon)]}
          icon={customIcon}
        ></Marker>
      </MapContainer>
    </div>
  );
}
