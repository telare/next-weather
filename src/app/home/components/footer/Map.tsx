"use client";
import styles from "./styles/Footer.module.scss";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { RootState } from "@/providers/global-store";
import L from "leaflet";
export default function Map() {
  const { value } = useSelector((state: RootState) => state.cityName);
  const { lat, lon } = value;
  const customIcon = L.icon({
    iconUrl: "/img/marker.png",
    iconSize: [32, 32],
  });
  return (
    <div className={styles.left__col_map}>
      <MapContainer
        center={[Number(lat), Number(lon)]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[Number(lat), Number(lon)]}
          icon={customIcon}
        ></Marker>
      </MapContainer>
    </div>
  );
}
