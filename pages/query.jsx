// pages/Query.jsx
"use client";
import Head from "next/head";
import React, { useRef, useEffect, useState } from "react";
import GrayBox from "./components/GrayBox"; // Adjust the path as necessary
import mapboxgl from "mapbox-gl";
import Axios from "axios";
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
  const myRef = useRef(null);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth" });
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(null);
  const [searchResult, setSearchResult] = useState(null); // State to hold search result
  



  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "https://14758910.propelauthtest.com/en/login";
    }
  }, []);

  
  // Function to handle search form submission
  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      // Fetch data from Mapbox Geocoding API
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();

      // Check if there are any results
      if (data.features.length > 0) {
        const firstFeature = data.features[0];
        const { center, place_name } = firstFeature;

        //Fly to location on Map
        if (map) {
          map.flyTo({
            center: center,
            zoom: 12,
          });
        }

        // Draw a polygon to highlight the area if in United States
        drawPolygon(center, 0.05, "1");

        // Set the search result state
        setSearchResult({
          placeName: place_name,
          center: center, // Set the center object
        });

        // You can update state or display this information in your UI as needed
      } else {
        console.log("No results found");
        setSearchResult(null); // Clear search result state
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResult(null); // Clear search result state
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to render search result information
  const renderSearchResult = () => {
    if (searchResult) {
      return (
        <div>
          <h3>Search Result</h3>
          <p>Place Name: {searchResult.placeName}</p>
          <p>Latitude: {searchResult.latitude}</p>
          <p>Longitude: {searchResult.longitude}</p>
        </div>
      );
    }
    return null;
  };

  //   // useEffect to initialize the map
  //   useEffect(() => {
  //     if (process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) { // Only initialize the map if it hasn't been initialized already
  //   // useEffect to initialize the map
  //   useEffect(() => {
  //     if (process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) { // Only initialize the map if it hasn't been initialized already

  //       mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Set the access token right before using it

  //       const newMap = new mapboxgl.Map({
  //         container: "map", // Make sure this ID matches the div ID
  //         style: "mapbox://styles/mapbox/streets-v11",
  //         center: [-74.006, 40.7128], // Adjust this center as needed for your use case
  //         zoom: 9,
  //       });

  //       newMap.on('load', () => {
  //         setMap(newMap); // When the map is loaded, then set it to the state
  //       });

  //       // If you are adding controls to the map, it should be done here
  //       newMap.addControl(new mapboxgl.NavigationControl());
  //     }
  //       mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Set the access token right before using it

  //       const newMap = new mapboxgl.Map({
  //         container: "map", // Make sure this ID matches the div ID
  //         style: "mapbox://styles/mapbox/streets-v11",
  //         center: [-74.006, 40.7128], // Adjust this center as needed for your use case
  //         zoom: 9,
  //       });

  //       newMap.on('load', () => {
  //         setMap(newMap); // When the map is loaded, then set it to the state
  //       });

  //       // If you are adding controls to the map, it should be done here
  //       newMap.addControl(new mapboxgl.NavigationControl());
  //     }

  //   }, []);
  //   }, []);

  const drawPolygon = (center, radius, key) => {
    //TODO FIX THIS
    // List of sources to exclude from removal

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

    //TODO
    //Create a query that gets all order within a circle distance of the specified location
    //Return a list of all orders that match this query
    //Create a map function iterating through the list, where each sourceID is is tied to the index,
    //Create a circle based on the position for each index.
    //Radius should be based on quantity and type?

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
          "fill-color": "blue",
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
  //const mapContainerRef = useRef(null);
  //const [map, setMap] = useState(null);
  //const mapContainerRef = useRef(null);
  //const [map, setMap] = useState(null);

  // Function to fetch location data from the backend using Axios
  async function fetchLocations() {
    try {
      const response = await Axios.get(
        "https://server-iwh0.onrender.com/orders/getOrderByArea",
        {
          params: {
            topLeft: [-79.4877, 39.722], // Specify the actual coordinates for the top left corner
            bottomRight: [-75.0487, 37.9117],
          },
        }
      );
      return response.data; // Accessing data directly from Axios response
    } catch (error) {
      console.error("Failed to fetch locations", error);
      return [];
    }
  }

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128], // Central coordinates of the map
      zoom: 10,
    });

    newMap.on("load", async () => {
      setMap(newMap);
      newMap.addControl(new mapboxgl.NavigationControl());

      const locations = await fetchLocations();
      locations.forEach((location) => {
        new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .addTo(newMap);
      });
    });

    // Clean up on unmount
    return () => newMap.remove();
  }, []);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogIn={redirectToLoginPage}
        handleLogOut={logout}
      />
      <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-b from-gray-300 to-green-400">
        <div className="text-center p-5 max-w-3xl w-full">
          <h1 className="text-2xl font-bold text-white">Query Page</h1>
          <p className="text-sm text-white mt-2">
            Here you can perform searches or submit queries to find specific
            information or resources.
          </p>
          <div className="mt-4 flex justify-center">
            <form className="flex items-center" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-48 p-2 rounded-l-md border border-gray-300"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-r-md bg-blue-500 text-white"
              >
                Search
              </button>
            </form>
            {renderSearchResult()}
          </div>
        </div>
        {/* <div ref={mapContainerRef} style={{ height: '400px', width: '75%' }} /> */}
        <div id="map" style={{ height: "400px", width: "75%" }} />
        {/* <GrayBox /> */}
      </div>
    </>
  );
}
