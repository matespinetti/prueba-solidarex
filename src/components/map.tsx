"use client";
import {
  ExchangeCenterUserSchema,
  getExchangeCenters,
} from "@/actions/map-actions";
import { MarkerWithInfowindow } from "@/components/marker-with-info-window";
import { ExchangeCenter } from "@prisma/client";
import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";

import React, { useEffect, useState } from "react";

interface userLocationProps {
  latitude: number;
  longitude: number;
}
export const MapWithData = () => {
  const [centers, setCenters] = useState<ExchangeCenterUserSchema[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [center, setCenter] = useState<userLocationProps>({
    latitude: -31.416668,
    longitude: -64.183334,
  });
  useEffect(() => {
    async function fetchCenters() {
      const fetchedCenters = await getExchangeCenters();
      console.log({ fetchedCenters });
      setCenters(fetchedCenters);
    }

    function getUserLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setCenter({ latitude, longitude });
        });
      }
    }

    getUserLocation();
    fetchCenters();
    setLoaded(true);
  }, []);

  return (
    <>
      {loaded ? (
        <div className="flex flex-row h-[60vh] w-[60vw]">
          <Map
            mapId={"bf51a910020fa25a"}
            defaultZoom={10}
            center={{
              lat: center.latitude,
              lng: center.longitude,
            }}
            onCenterChanged={(center) => {
              setCenter({
                latitude: center.detail.center.lat,
                longitude: center.detail.center.lng,
              });
            }}
            gestureHandling={"greedy"}
            disableDefaultUI
          >
            {centers!.map((center) => {
              console.log(center);
              return (
                <MarkerWithInfowindow
                  key={center.id}
                  id={center.id}
                  latitude={center.latitude}
                  longitude={center.longitude}
                  isUserExchangeCenter={
                    Number(center.isUserExchangeCenter) === 1
                  }
                />
              );
            })}
          </Map>
          <div>
            {centers.map((center) => {
              return (
                <div key={center.id}>
                  <h1>{center.id}</h1>
                  <h2>{center.latitude}</h2>
                  <h2>{center.longitude}</h2>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
