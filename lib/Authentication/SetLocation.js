import React, { Component, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import Map from "../../assets/svg/MapScreen.svg";
import {
  Back,
  Title,
  Subtitle,
  Button,
  BoxShadow,
  Container,
} from "../Components";
import PinLogo from "../../assets/svg/Pin Logo.svg";
import { getCurrentLocation } from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../src/redux/actions";
import PressButton from "../Components/PressButton";
import MapView, { PROVIDER_GOOGLE, Circle } from "react-native-maps";
import colors from "../../src/constants/colors";

const SetLocation = ({ navigation }) => {
  const mapRef = useRef(null);
 
  
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);

  const getUserLocation = async () => {
    setFetching(true);
    
    try {
      const locationData = await getCurrentLocation();
      dispatch(setUserData({ ...user, ...locationData }));
      navigation.navigate("Congratulation");
    } catch (error) {
      console.log(error);
    }finally{
      setFetching(false);
    }
   
    
  };

  const [mapData, setMapData] = useState({
    latitude: 30.357714,
    longitude: 78.06976,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    try {
      if (user?.latitude && user?.longitude) {
        if (fetching) {
          if (mapRef.current) {
          
            mapRef.current.animateToRegion({
              latitude: user?.latitude,
              longitude: user?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setMapData({
              latitude: user?.latitude,
              longitude: user?.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });

         
          }
        }
      }
    } catch (error) {
      console.log(error, "I fds");
    }
    // setMapData({ latitude: user?.latitude, longitude: user?.longitude });
  }, [fetching]);

  return (
    <Container>
      <Back navigation={navigation} />
      <View style={{ flexShrink: 1, width: "85%" }}>
        <Title text="Set Your Location" />
        <Subtitle text="We need this information to give you a better experience" />
      </View>
      <View style={{ flex: 1, margin: -15 }}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            ...mapData,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          <Circle
       
            center={{
              ...mapData,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            radius={1000}
            strokeWidth={0}
            fillColor="rgba(0, 0, 255, 0.1)"
          />
        </MapView>

        <BoxShadow style={styles.loc_content_wrapper}>
          {fetching ? <ActivityIndicator size="small" /> : <TouchableOpacity onPress={()=>  getUserLocation()}><PinLogo  /></TouchableOpacity>}
          <PressButton
            pressed={() => {
             
             
                getUserLocation();
              
            }}
            text={
              user?.my_location ? "Good to go.." : "Allow us to fetch location."
            }
          />
        </BoxShadow>
      </View>
    </Container>
  );
};
export default SetLocation;

const styles = StyleSheet.create({
  mapScreen: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loc_container: {
    marginTop: 50,
    marginHorizontal: -20,
    flex: 1,
    position: "relative",
  },
  loc_content_wrapper: {
    display: "flex",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomEndRadius: 30,
    padding: 15,
  },
  use_loc_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  set_loc_container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F6F6F695",
    borderRadius: 15,
    marginTop: 15,
  },
  bottom_container: {
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 40,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
  mapScreen: {
    width: "100%",
    height: "110%",
  },
});
