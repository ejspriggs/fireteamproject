import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import LocationInfo from "./components/LocationInfo/LocationInfo";
import Temperature from "./components/Temperature/Temperature";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import TopAppBar from "./components/TopAppBar/TopAppBar";
import NavigationDrawer from "./components/NavigationDrawer/NavigationDrawer";
import SignIn from "./components/Account/SignIn";
import SignUp from "./components/Account/SignUp";
import StatusBar from "./components/StatusBar/StatusBar";
import Map from "./components/Map/Map";
import axios from "axios";
import "./App.css";
import "leaflet/dist/leaflet.css";

const predefinedLocations = [
  {
    name: "Mom's House",
    city: "San Francisco",
    region: "California",
    country: "US",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    name: "Lake House",
    city: "South Lake Tahoe",
    region: "California",
    country: "US",
    latitude: 38.9399,
    longitude: -119.9772,
  },
  {
    name: "Summer Camp",
    city: "Denver",
    region: "Colorado",
    country: "US",
    latitude: 39.7392,
    longitude: -104.9903,
  },
  {
    name: "Grandma's Place",
    city: "London",
    region: "England",
    country: "UK",
    latitude: 51.5074,
    longitude: -0.1278,
  },
];

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [locationData, setLocationData] = useState({ latitude: null, longitude: null });
  const [fireData, setFireData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("My Location"); // Track selected location

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.name);
    setLocationData({
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  useEffect(() => {
    if (locationData.latitude && locationData.longitude) {
      const fetchFireData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/fire/lat-lng", {
            params: {
              lat: locationData.latitude,
              lng: locationData.longitude,
            },
          });
          setFireData(response.data);
        } catch (error) {
          console.error("Error fetching fire data:", error);
        }
      };

      fetchFireData();
    }
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
        <HourlyForecast latitude={location.latitude} longitude={location.longitude} />
        <Map latitude={location.latitude} longitude={location.longitude} fireData={fireData} />
      </div>
    );
  };

  return (
    <div className="mobile-view">
      <StatusBar />
      <TopAppBar toggleDrawer={toggleDrawer} />

      <NavigationDrawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        locations={predefinedLocations}
        onLocationSelect={handleLocationSelect}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <LocationInfo setLocationData={setLocationData} />

              {locationData.latitude && locationData.longitude && (
                <>
                  <Temperature latitude={locationData.latitude} longitude={locationData.longitude} />
                  <HourlyForecast latitude={locationData.latitude} longitude={locationData.longitude} />
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
