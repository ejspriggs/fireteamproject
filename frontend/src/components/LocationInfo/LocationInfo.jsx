import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LocationInfo.css";

function LocationInfo({ setLocationData }) {
  const [location, setLocation] = useState({ city: "", region: "", country: "" });
  const token = import.meta.env.VITE_IPINFO_TOKEN;

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://ipinfo.io/json?token=${token}`);
        const { city, region, country, loc, timezone } = response.data;
        const [latitude, longitude] = loc.split(",");

        setLocation({
          city: city || "Unknown",
          region: region || "Unknown",
          country: country || "Unknown",
        });

        setLocationData({
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          timezone: timezone
        });
      } catch (error) {
        console.error("Error fetching IP location:", error);
      }
    };

    fetchLocation();
  }, [token, setLocationData]);

  return (
    <div className="location-info">
      <h1>My Location</h1>
      <p>
        {location.city}, {location.region}, {location.country}
      </p>
    </div>
  );
}

export default LocationInfo;
