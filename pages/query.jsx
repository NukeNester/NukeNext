"use client";
import Head from "next/head";
import React, { useRef, useEffect, useState } from "react";
import GrayBox from "./components/GrayBox"; // Adjust the path as necessary
import mapboxgl from "mapbox-gl";
import axios from "axios";
import Header from "./components/Header";
import {
  withAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
  useAuthInfo,
} from "@propelauth/react";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Query() {
  const { loading, isLoggedIn, user } = useAuthInfo();
  const logout = useLogoutFunction();
  const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(null);
  const [searchResult, setSearchResult] = useState(null); // State to hold search result
  const [suggestions, setSuggestions] = useState([]);
  const [orders, setOrders] = useState(null);

  //API Used To Get Orders
  const getOrders = async () => {
    let response = null;
    try {
      if (user.email == "echen9870@gmail.com") {
        response = await axios.get(
          "https://server-iwh0.onrender.com/orders/getAllOrder"
        );
        setOrders(response.data);
      } else {
        response = await axios.get(
          `https://server-iwh0.onrender.com/orders/getOrderByEmail/${user.email}`
        );
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  //Posts Markers on Existing Orders By Organization
  const initializeMap = async () => {
    //Setups the params for the map
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-76.902221, 39.299901], // Central coordinates of the map
      zoom: 10,
    });
    //Loads the Map and Pins All the Orders
    map.on("load", async () => {
      setMap(map);
      map.addControl(new mapboxgl.NavigationControl());
      if (orders) {
        console.log("Adding order pins");
        orders.forEach((order) => {
          new mapboxgl.Marker()
            .setLngLat([order.longitude, order.latitude])
            .addTo(map);
        });
      }
    });
  };

  //onEffect that automatically grabs all the orders made by the organization and initializes the maps
  useEffect(() => {
    getOrders();
    setTimeout(1);
    initializeMap();
    console.log("Initialized Map");
  }, []);

  useEffect(() => {
    initializeMap();
  }, [orders]);

  // Function to handle search form submission
  const handleSearchChange = async (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.length > 2) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${mapboxgl.accessToken}&autocomplete=true`
        );
        const data = await response.json();
        setSuggestions(data.features);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  async function getPopulationDensity(latitude, longitude) {
    try {
      const response = await fetch(
        `http://api.geonames.org/findNearbyPostalCodesJSON?lat=${latitude}&lng=${longitude}&username=echen9870`
      );
      const data = await response.json();
      if (data.postalCodes && data.postalCodes.length > 0) {
        const populationDensity =
          data.postalCodes[0].population / data.postalCodes[0].areaInSqKm;
        return populationDensity;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }

  async function getSeismicActivity(latitude, longitude, radius = 100) {
    try {
      const response = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch seismic activity. Status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching seismic activity:", error);
      return null;
    }
  }

  async function getTerrainType(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.mapbox.com/v4/mapbox.terrain-rgb/${longitude},${latitude}/1000x1000.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch terrain data. Status: ${response.status}`
        );
      }

      const data = await response.json();
      // Analyze elevation data to determine terrain type
      const elevationData = data;
      const terrainType = analyzeElevationData(elevationData);
      return terrainType;
    } catch (error) {
      console.error("Error fetching terrain data:", error);
      return null;
    }
  }

  const selectSuggestion = async (place) => {
    setSearchQuery(place.place_name);

    setSearchResult({
      placeName: place.place_name,
      latitude: place.center[1],
      longitude: place.center[0],
      populationDensity: await getPopulationDensity(
        place.center[1],
        place.center[0]
      ),
    });
    setSuggestions([]);
    if (map) {
      map.flyTo({
        center: place.center,
        zoom: 12,
      });
      drawPolygon(place.center, 0.05, "highlight-area");
    }
  };

  const drawPolygon = (center, radius, key) => {
    // Remove all existing layers except excluded layers
    Object.keys(map.getStyle().sources).forEach((source) => {
      if (source == key) {
        const layerId = map
          .getStyle()
          .layers.find((layer) => layer.source === source)?.id;
        if (layerId) {
          map.removeLayer(layerId);
        }
        map.removeSource(source);
      }
    });

    // Generate coordinates for the circular polygon
    const coordinates = generateCircleCoordinates(center, 0.01);

    //Add the layers to the map
    addPolygonLayer(map, key, key, coordinates);
  };

  // Add the source and layer
  const addPolygonLayer = (map, sourceId, layerId, coordinates) => {
    map
      .addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [coordinates],
          },
        },
      })
      .addLayer({
        id: layerId,
        type: "fill",
        source: sourceId,
        layout: {},
        paint: {
          "fill-color": "red",
          "fill-opacity": 0.5,
        },
      });
  };

  // Function to generate coordinates for a circular polygon
  const generateCircleCoordinates = (center, radius) => {
    const coordinates = [];
    const numSegments = 64; // Number of line segments to approximate the circle

    for (let i = 0; i < numSegments; i++) {
      const angle = (i / numSegments) * Math.PI * 2;
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      coordinates.push([x, y]);
    }

    // Close the polygon by repeating the first coordinate
    coordinates.push(coordinates[0]);
    return coordinates;
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogIn={redirectToLoginPage}
        handleLogOut={logout}
      />
      <div className="pb-96 flex flex-col justify-center items-center">
        <div className="text-center p-5 max-w-3xl w-full">
          <h1 className="text-5xl font-bold text-white">Search</h1>
          <p className="text-lg text-white my-4">
            Here you can perform searches or submit queries to find specific
            information or resources.
          </p>
          <div className="mt-4 flex justify-center pb-6">
            <input
              type="text"
              placeholder="Search a Location..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-80 p-2 rounded-md border border-gray-300"
            />
            <ul className="absolute z-10 list-none bg-white rounded shadow-lg mt-2 w-48">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="w-48 p-2 hover:bg-gray-300 cursor-pointer"
                  onClick={() => selectSuggestion(suggestion)}
                >
                  {suggestion.place_name}
                </li>
              ))}
            </ul>
            {searchResult && (
              <div className="mt-4 border border-gray-300 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">
                  {searchResult.placeName}
                </h3>
                <p className="text-sm text-gray-600">
                  {searchResult.description}
                </p>
                <p className="text-sm text-gray-600">
                  Population Density: {searchResult.populationDensity}
                </p>
                <p className="text-sm text-gray-600">
                  Seismic Activity: {searchResult.seismicActivity}
                </p>
                <p className="text-sm text-gray-600">
                  Terrain Type: {searchResult.terrainType}
                </p>
              </div>
            )}
          </div>
        </div>
        <div id="map" style={{ height: "400px", width: "80%" }} />
      </div>
    </>
  );
}
