import { View, Text } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import mapdesign from "../../src/constants/mapdesign";

const GoogleMap = ({ children }) => {
  const {booking} = useSelector(state => state.bookingState)
  const { mapData } = useSelector((state) => state.mapData);

  const mapRef = useRef(null); // Create a ref for the MapView component
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }); // Set initial region
  useEffect(() => {
    if (mapData?.longitude && mapData?.latitude) {
      setRegion({
        latitude: mapData?.latitude,
        longitude: mapData?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      centerMapOnLocation({
        longitude: mapData?.longitude,
        latitude: mapData?.latitude,
      });
    }
  }, [mapData?.longitude, mapData?.latitude]);


  useEffect(() => {
    if (booking?.longitude && booking?.latitude) {
      setRegion({
        latitude: booking?.latitude,
        longitude: booking?.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      centerMapOnLocation({
        longitude: booking?.longitude,
        latitude: booking?.latitude,
      });
    }
  }, [booking?.latitude,booking?.longitude]);

  
  // Function to center the map on a location
  const centerMapOnLocation = (location) => {
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
 // Function to handle map click
 const handleMapClick = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log(`Clicked location: ${latitude}, ${longitude}`);
  };
  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      onPress={handleMapClick} // Add onPress event handler
      ref={mapRef} // Set the ref to the MapView component
      region={region}
      customMapStyle={mapdesign}
    >
           
      {children}
    </MapView>
  );
};

export default GoogleMap;
