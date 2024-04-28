"use client";
import { APIProvider } from "@vis.gl/react-google-maps";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}
      libraries={["marker"]}
    >
      {children}
    </APIProvider>
  );
};
