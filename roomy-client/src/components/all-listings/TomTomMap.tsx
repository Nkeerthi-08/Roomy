"use client";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { selectTomTomData } from "@/store/services/post-service";
import { PropertyCard } from "./PropertyCard";

mapboxgl.accessToken = "pk.eyJ1IjoianV0dHUiLCJhIjoiY2x2NHhlbG5wMGNzNjJqcDV6cThhZmVnaCJ9.xAOGHa9cDK16JwlUkMmmdA";

const MarkerComponent = ({ id }: { id: string }) => (
  <div
    style={{
      backgroundColor: "black",
      width: "40px",
      height: "30px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }}
  >
    {`$${id}`}
  </div>
);

export default function TomTomMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const addressData = useSelector(selectTomTomData);

  useEffect(() => {
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    if (!addressData.isLoading && addressData.data) {
      addressData?.data.forEach((marker) => {
        const markerEl = document.createElement("div");
        markerEl.className = "marker";
        ReactDOM.render(<MarkerComponent id={marker.price} />, markerEl);

        const popupEl = document.createElement("div");
        ReactDOM.render(
          <div style={{ width: "200px", height: "100px" }}>
            <PropertyCard
              key={marker.key}
              title={marker.title}
              description={marker.description}
              price={`$${marker.price || 0} per month`}
              imageSrc={marker.imageSrc || "/next.svg"}
            />
          </div>,
          popupEl
        );

        new mapboxgl.Marker(markerEl, { offset: [0, -20] })
          .setLngLat([marker.longitude, marker.latitute])
          .setPopup(new mapboxgl.Popup().setDOMContent(popupEl))
          .addTo(map.current!);
      });

      map.current.flyTo({
        center: [addressData.data[32].longitude, addressData.data[32].latitute],
        zoom: 5,
        essential: true,
      });

      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    }
  }, [lng, lat, zoom, addressData]);

  if (addressData.isLoading) return <div>Loading...</div>;
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
