import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Logo from "../../assets/svg/PB_Logo.svg";
import CaretDownIcon from "../../assets/svg/caret-down.svg";

import ScooterIcon from "../../assets/svg/Scooter.svg";
import MiniMap from "../../assets/svg/MiniMap.svg";
import ScooterYellowIcon from "../../assets/svg/bikeyellow.svg";
import CarIcon from "../../assets/svg/Car.svg";
import {
  Title,
  Back,
  Navigation,
  Container,
  BoxShadow,
  Subtitle,
} from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { loadingState } from "../../src/redux/actions";
import {
  formatTime,
  getDataApi,
  separateExpiredAndNonExpiredObjects,
} from "../../src/helpers";
import colors from "../../src/constants/colors";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const Booking = ({ item, navigation , past = false}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("BookingInfo", { data: item ,past })}
    >
      <BoxShadow style={styles.booking}>
        <BoxShadow style={styles.vehicle}>
          {item?.vehicle_type == 0 ? (
            <ScooterYellowIcon width={100} height={40} />
          ) : (
            <CarIcon width={100} height={40} />
          )}
        </BoxShadow>
        <View>
          <Text
            style={{
              color: colors.orangeText,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {item?.parking?.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              color: "#09051C",
              letterSpacing: 0.7,
            }}
          >
            {item.vehicle_type == 1 ? "4 Wheel Park" : "2 Wheel Park"}
          </Text>
          <Text
            textBreakStrategy="simple"
            style={{ opacity: 0.5, fontWeight: "400",fontSize:11, letterSpacing: 0.5 }}
          >
            {formatTime(item?.start_time, item.end_time)}
          </Text>
          {/* <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              letterSpacing: 0.7,
              color: "#fecf3e",
            }}
          >
            {item.start_time}
          </Text> */}
        </View>
      </BoxShadow>
    </TouchableOpacity>
  );
};

const PreviousBookings = ({ navigation,past= false }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [userBookings, setUserBookings] = useState([]);
  const [pastBooking, setPastBooking] = useState([]);
  const [currentBooking, setCurrentBooking] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchBookings();
    }, [focused])
  );

  const fetchBookings = async () => {
    dispatch(loadingState(true));
    try {
      const response = await getDataApi("getUserBookings");
      if (response?.status) {
        let tempData = separateExpiredAndNonExpiredObjects(
          response.data.reverse()
        );
        setPastBooking(tempData?.expired);
        setCurrentBooking(tempData?.nonExpired);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
    }
  };

  const CurrentBooking = () => {
    return (
      <View style={{ flex: 1 }}>
        {loading && currentBooking.length == 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="small" color={colors.appColor} />
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              Looking for Current Bookings
            </Text>
          </View>
        ) : currentBooking.length == 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              No Bookings found...
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1,padding:15 }}>
            <FlatList
             showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              data={currentBooking}
              renderItem={({ item }) => (
                <Booking item={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    );
  };

  const PastBookings = () => {
    return (
      <View style={{ flex: 1 }}>
        {loading && pastBooking.length == 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="small" color={colors.appColor} />
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              Looking for Past Bookings
            </Text>
          </View>
        ) : pastBooking.length == 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              No Bookings found...
            </Text>
          </View>
        ) : (
          <View style={{ flex: 1,padding:15 }}>
            <FlatList
            showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              data={pastBooking}
              renderItem={({ item }) => (
                <Booking item={item} navigation={navigation} past={true} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 15 }}>
        <Back
          onPress
          onPressButton={() => {
            navigation.navigate("ProfileMenu");
          }}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            borderBottomColor: colors.appColor,
            borderBottomWidth: 2,
          },
        }}
      >
        <Tab.Screen name="Current Bookings" component={CurrentBooking} />
        <Tab.Screen name="Past Bookings" component={PastBookings} />
      </Tab.Navigator>
    </View>
  );
};
export default PreviousBookings;

const styles = StyleSheet.create({
  booking: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  pp_image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  vehicle: {
    marginRight: 10,
    paddingVertical: 20,
    backgroundColor: "#08452310",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
