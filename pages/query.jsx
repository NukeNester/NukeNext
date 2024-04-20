"use client";
import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import mapboxgl from "mapbox-gl";
import Axios from "axios";
import Header from "./components/Header";
import {
  useAuthInfo,
  useLogoutFunction,
  useRedirectFunctions,
} from "@propelauth/react";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Query() {
  const { isLoggedIn, user } = useAuthInfo();
  const logout = useLogoutFunction();
  const { redirectToLoginPage } = useRedirectFunctions();
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const mapContainerRef = useRef(null);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json`,
        { params: { access_token: mapboxgl.accessToken } }
      );
      const data = response.data;
      if (data.features.length > 0) {
        const firstFeature = data.features[0];
        setMapFocus(firstFeature.center, 12, 'red');
        setSearchResult({
          placeName: firstFeature.place_name,
          latitude: firstFeature.center[1],
          longitude: firstFeature.center[0],
        });
      } else {
        console.log("No results found");
        setSearchResult(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResult(null);
    }
  };

  const setMapFocus = (center, zoom, color) => {
    new mapboxgl.Marker({ color: color })
      .setLngLat(center)
      .addTo(map);
    map.flyTo({
      center: center,
      zoom: zoom,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
  };

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128],
      zoom: 10,
    });

    newMap.on("load", async () => {
      setMap(newMap);
      newMap.addControl(new mapboxgl.NavigationControl());
    });

    return () => newMap.remove();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderSearchResult = () => {
    if (searchResult) {
    //   return (
    //     <div>
    //       <h3>Search Result</h3>
    //       <p>Place Name: {searchResult.placeName}</p>
    //       <p>Latitude: {searchResult.latitude}</p>
    //       <p>Longitude: {searchResult.longitude}</p>
    //     </div>
    //   );
    }
    return null;
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogIn={redirectToLoginPage} handleLogOut={logout} />
      <Head>
        <title>Query Page</title>
      </Head>
      <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-b from-gray-300 to-green-400">
        <div className="text-center p-5 max-w-3xl w-full">
          <h1 className="text-2xl font-bold text-white">Query Page</h1>
          <p className="text-sm text-white mt-2">
            Here you can perform searches or submit queries to find specific information or resources.
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
            {/* {renderSearchResult()} */}
            <ul className="absolute z-10 list-none bg-white rounded shadow-lg mt-2 w-48">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} className="w-48 p-2 hover:bg-gray-300 cursor-pointer" onClick={() => selectSuggestion(suggestion)}>
                  {suggestion.place_name}
                </li>
              ))}
            </ul>
            {searchResult && (
              <div className="mt-4">
                <h3>{searchResult.placeName}</h3>
                <p>{searchResult.description}</p>
              </div>
            )}
          </div>
        </div>
        <div ref={mapContainerRef} style={{ height: "400px", width: "75%" }} />
      </div>
    </>
  );
}
