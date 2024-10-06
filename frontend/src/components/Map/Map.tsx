import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "./Map.css";

const fireEmojiIcon = new L.DivIcon({
  html: "🔥",
  className: "fire-emoji-icon",
});

const DefaultIcon = new L.DivIcon({
  html: "👥",
  className: "person-emoji-icon",
});

const SetBounds = ({ fireData, latitude, longitude }) => {
  const map = useMap();

  if (fireData.length > 0) {
    const bounds = L.latLngBounds(fireData.map((fire) => [fire.lat, fire.lng]));
    if (latitude && longitude) {
      bounds.extend([latitude, longitude]);
    }
    map.fitBounds(bounds);
  }

  return null;
};

const Map = ({ latitude, longitude, fireData }) => {
  const center = latitude && longitude ? [latitude, longitude] : [0, 0];

  return (
    <div className="map-container">
      <h3 className="map-title">Map</h3>
      <MapContainer center={center} zoom={12} style={{ height: "500px", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <SetBounds fireData={fireData} latitude={latitude} longitude={longitude} />

        {latitude && longitude && (
          <Marker position={center} icon={DefaultIcon}>
            <Popup>Your location</Popup>
          </Marker>
        )}

        {fireData &&
          fireData.length > 0 &&
          fireData.map((fire, index) => (
            <Marker key={index} position={[fire.lat, fire.lng]} icon={fireEmojiIcon}>
              <Popup>
                <div>
                  <p>
                    <strong>Fire Detected:</strong> {fire.detectedAt}
                  </p>
                  <p>
                    <strong>Confidence:</strong> {fire.confidence}
                  </p>
                  <p>
                    <strong>FRP:</strong> {fire.frp}
                  </p>
                  <p>
                    <strong>FWI:</strong> {fire.fwi}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
