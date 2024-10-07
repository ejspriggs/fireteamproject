import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import LocationInfo from "./components/LocationInfo/LocationInfo";
import Temperature from "./components/Temperature/Temperature";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import TopAppBar from "./components/TopAppBar/TopAppBar";
import NavigationDrawer from "./components/NavigationDrawer/NavigationDrawer";
import SignIn from "./components/Account/SignIn";
import SignUp from "./components/Account/SignUp";
import Map from "./components/Map/Map";
import axios from "axios";
import AlertBanner from "./components/AlertBanner/AlertBanner";
import "./App.css";
import "leaflet/dist/leaflet.css";

const predefinedLocations = [
  {
    name: "Mom",
    city: "San Francisco",
    region: "California",
    country: "US",
    latitude: 37.7749,
    longitude: -122.4194,
    timezone: "America/Los_Angeles"
  },
  {
    name: "Lake House",
    city: "South Lake Tahoe",
    region: "California",
    country: "US",
    latitude: 38.9399,
    longitude: -119.9772,
    timezone: "America/Los_Angeles"
  },
  {
    name: "Dorm",
    city: "Denver",
    region: "Colorado",
    country: "US",
    latitude: 39.7392,
    longitude: -104.9903,
    timezone: "America/Denver"
  },
  {
    name: "Grandma",
    city: "London",
    region: "England",
    country: "UK",
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: "Europe/London"
  },
];

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    timezone: null
  });
  const [fireData, setFireData] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("My Location");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLocationSelect = (location) => {
    if (location.name === "My Location") {
      setLocationData({ latitude: null, longitude: null, timezone: null });
    } else {
      setSelectedLocation(location.name);
      setLocationData({
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone
      });
    }
  };

  useEffect(() => {
    const fetchFireAlert = async () => {
      try {
        const response = await axios.get("/api/fire/fire-alerts");
        const fireData = response.data;
        if (fireData) {
          setAlertMessage("Fire Alert in this Area!");
          setAlertVisible(true);
          setTimeout(() => {
            setAlertVisible(false);
          }, 5000);
        }
      } catch (error) {
        console.error("Error fetching fire alerts:", error);
      }
    };
  
    const fetchFireData = async () => {
      if (locationData.latitude && locationData.longitude) {
        try {
          const response = await axios.get("/api/fire/lat-lng", {
            params: {
              lat: locationData.latitude,
              lng: locationData.longitude,
            },
          });
          if (response.data && response.data.data) {
            setFireData(response.data.data); 
          } else {
            setFireData([]);
          }
        } catch (error) {
          console.error("Error fetching fire data:", error);
        }
      }
    };
  
    fetchFireData();
    const intervalId = setInterval(() => {
      fetchFireAlert();
    }, 10000);
  
    return () => clearInterval(intervalId);
  }, [locationData]);

  const LocationPage = () => {
    const { locationName } = useParams();
    const location = predefinedLocations.find((loc) => loc.name.replace(/\s+/g, "").toLowerCase() === locationName);

    if (!location) {
      return <div>Location not found</div>;
    }

    return (
      <div className="location-info">
        <h1>{location.name}</h1>
        <p>
          {location.city}, {location.region}, {location.country}
        </p>
        <Temperature latitude={location.latitude} longitude={location.longitude} />
        <HourlyForecast latitude={location.latitude} longitude={location.longitude} timezone={location.timezone}/>
        <Map latitude={location.latitude} longitude={location.longitude} fireData={fireData} />
      </div>
    );
  };

  const allLocations = [
    { name: "My Location", latitude: locationData.latitude, longitude: locationData.longitude },
    ...predefinedLocations,
  ];

  return (
    <div className="mobile-view">
      <TopAppBar toggleDrawer={toggleDrawer} />

      <NavigationDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        locations={allLocations}
        onLocationSelect={handleLocationSelect}
      />

      <AlertBanner message={alertMessage} visible={alertVisible} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <LocationInfo setLocationData={setLocationData} />

              {locationData.latitude && locationData.longitude && (
                <>
                  <Temperature latitude={locationData.latitude} longitude={locationData.longitude} />
                  <HourlyForecast latitude={locationData.latitude} longitude={locationData.longitude} timezone={locationData.timezone} />
                  <Map latitude={locationData.latitude} longitude={locationData.longitude} fireData={fireData} />
                </>
              )}
            </>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/location/:locationName" element={<LocationPage />} />
      </Routes>
    </div>
  );
}

export default App;