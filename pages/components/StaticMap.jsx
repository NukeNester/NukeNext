import React from "react";

const StaticMap = ({ lat, lng }) => {
  const mapboxToken =
    "pk.eyJ1IjoidHR1bmVzdHVkaW8iLCJhIjoiY2xjbGg5anpuNjM3MjN4bGtob205NXJmOSJ9.OD2j3O1OXw1oCXIUqF-ZuQ"; // Replace with your Mapbox token
  const width = 400;
  const height = 300;
  const zoom = 12;
  const style = "streets-v11"; // You can choose different styles like 'light-v10', 'dark-v10', 'satellite-v9', etc.

  const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${lng},${lat},${zoom}/${width}x${height}?access_token=${mapboxToken}`;

  return (
    <img
      src={mapImageUrl}
      alt="Mapbox Static Map"
      style={{ width: "100%", height: "auto" }}
    />
  );
};

export default StaticMap;
