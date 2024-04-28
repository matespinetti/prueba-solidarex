"use client";
import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { Button } from "./ui/button";
import {
  addUserExchangeCenter,
  removeUserExchangeCenter,
} from "@/actions/map-actions";
import { useToast } from "./ui/use-toast";
import { Home } from "lucide-react";
import {
  RequestType,
  fromLatLng,
  geocode,
  setKey,
  setLanguage,
  setRegion,
} from "react-geocode";

setKey(process.env.NEXT_PUBLIC_MAPS_API_KEY as string);
setLanguage("es");
setRegion("es");

interface Props {
  id: string;
  latitude: number;
  longitude: number;
  isUserExchangeCenter: boolean;
}

async function getAdressFromLatLng(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const response = await geocode(
      RequestType.LATLNG,
      `${latitude},${longitude}`
    );
    const adress = response.results[0].formatted_address;
    return adress;
    console.log(response);
  } catch (error) {
    console.error(error);
    return "No address found";
  }
}
export const MarkerWithInfowindow = ({
  id,
  latitude,
  longitude,
  isUserExchangeCenter,
}: Props) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isUserExchangeCenterState, setIsUserExchangeCenter] =
    useState(isUserExchangeCenter);

  const [address, setAddress] = useState("");

  useEffect(() => {
    async function getAdress() {
      const adress = await getAdressFromLatLng(latitude, longitude);
      setAddress(adress);
    }

    getAdress();
  }, [latitude, longitude]);

  const { toast } = useToast();

  async function handleCenterToggle() {
    let response;
    if (isUserExchangeCenterState) {
      response = await removeUserExchangeCenter(
        "clvh8xxa20002v754bijpb2ln",
        id
      );
    } else {
      response = await addUserExchangeCenter("clvh8xxa20002v754bijpb2ln", id);
    }
    if (response) {
      toast({
        title: `Successfully ${
          isUserExchangeCenterState ? "removed" : "added"
        } exchange center`,
        variant: "default",
        className: "bg-green-500",
      });
      setIsUserExchangeCenter(!isUserExchangeCenterState);
    } else {
      toast({
        title: `Failed to ${
          isUserExchangeCenterState ? "remove" : "add"
        } exchange center`,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: latitude, lng: longitude }}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      >
        <Home color={isUserExchangeCenterState ? "green" : "red"} />
      </AdvancedMarker>

      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <div className="flex flex-col gap-3">
            This is an example for the <p>{address}</p>
            combined with an Infowindow.
            <Button
              variant={isUserExchangeCenterState ? "destructive" : "default"}
              onClick={() => {
                handleCenterToggle();
              }}
            >
              {isUserExchangeCenterState ? "Remove" : "Add"}
            </Button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
