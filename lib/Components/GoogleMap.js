import { View, Text } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import mapdesign from "../../src/constants/mapdesign";

const GoogleMap = ({ children }) => {
  const { isEnabled } = useSelector(
    (state) => state.appState
  );


  const {booking} = useSelector(state => state.bookingState)
  const { mapData } = useSelector((state) => state.mapData);
  const { user } = useSelector((state) => state.user);

  const mapRef = useRef(null); // Create a ref for the MapView component
  const [region, setRegion] = useState({
    latitude:user?.longitude ? user?.longitude : 37.78825,
    longitude: user?.latitude ? user?.latitude : -122.4324,
    latitudeDelta: 0.0275,
    longitudeDelta: 0.0275,
  }); // Set initial region

  useEffect(() => {
    setRegion({
      latitude:user?.latitude ? user?.latitude : 37.78825,
      longitude: user?.longitude ? user?.longitude : -122.4324,
      latitudeDelta: 0.0275,
      longitudeDelta: 0.0275,
    });
  }, [user?.longitude,user?.latitude])
  
  
  useEffect(() => {
    if (mapData?.longitude && mapData?.latitude) {
      setRegion({
        latitude: mapData?.latitude,
        longitude: mapData?.longitude,
        latitudeDelta: 0.0275,
        longitudeDelta: 0.0275,
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
        latitudeDelta: 0.0275,
        longitudeDelta: 0.0275,
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
      latitudeDelta: 0.0275,
      longitudeDelta: 0.0275,
    });
  };


  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation={isEnabled}
      provider={PROVIDER_GOOGLE}
      showsCompass={false}
      ref={mapRef} // Set the ref to the MapView component
      region={region}
      customMapStyle={mapdesign}
    >
           
      {children}
    </MapView>
  );
};

export default GoogleMap;
