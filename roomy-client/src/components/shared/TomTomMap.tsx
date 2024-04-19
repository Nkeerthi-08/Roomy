"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom";

mapboxgl.accessToken = "pk.eyJ1IjoianV0dHUiLCJhIjoiY2x2NHhlbG5wMGNzNjJqcDV6cThhZmVnaCJ9.xAOGHa9cDK16JwlUkMmmdA";

const MarkerComponent = ({ id }: { id: number }) => (
  <div
    style={{
      backgroundColor: "black",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }}
  >
    {id}
  </div>
);

const PopupComponent = ({ name, population }: { name: string; population: number }) => (
  <div>
    <h3>{name}</h3>
    <p>Population: {population}</p>
  </div>
);

export default function TomTomMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [markers, setMarkers] = useState([
    {
      id: 1,
      lat: 42.35,
      lng: -70.9,
      data: {
        name: "Boston",
        population: 694583,
      },
    },
    {
      id: 2,
      lat: 42.36,
      lng: -71.06,
      data: {
        name: "Cambridge",
        population: 113630,
      },
    },
    {
      id: 3,
      lat: 42.37,
      lng: -71.11,
      data: {
        name: "Somerville",
        population: 78962,
      },
    },
  ]);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add markers to the map
    // Add markers to the map
    markers.forEach((marker) => {
      const markerEl = document.createElement("div");
      markerEl.className = "marker";
      ReactDOM.render(<MarkerComponent id={marker.id} />, markerEl);

      const popupEl = document.createElement("div");
      ReactDOM.render(<PopupComponent {...marker.data} />, popupEl);

      new mapboxgl.Marker(markerEl, { offset: [0, -20] })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new mapboxgl.Popup().setDOMContent(popupEl))
        .addTo(map.current!);
    });

    map.current.flyTo({
      center: [markers[0].lng, markers[0].lat],
      zoom: 12,
      essential: true, // This animation is considered essential with respect to prefers-reduced-motion
    });

    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [lng, lat, zoom, markers]);

  return (
    <div
      style={{
        width: "40%",
        height: "667px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
