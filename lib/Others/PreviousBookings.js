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
import { formatTime, getDataApi } from "../../src/helpers";
import colors from "../../src/constants/colors";

const Booking = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("BookingInfo", { data: item })}
    >
      <BoxShadow style={styles.booking}>
        {item?.vehicle_type == 0 ? (
          <ScooterYellowIcon width={100} height={40} />
        ) : (
          <CarIcon width={100} height={40} />
        )}

        <View>
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
          <Text style={{ opacity: 0.5, fontWeight: "400", letterSpacing: 0.5 }}>
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
const data = [
  { id: 1, type: 2, time: "from 13:00-14:00", date: "21-03-2022" },
  { id: 2, type: 4, time: "from 21:00-23:00", date: "08-03-2022" },
  { id: 3, type: 2, time: "from 3:00-14:00", date: "13-03-2022" },
  { id: 4, type: 4, time: "from 15:00-18:00", date: "14-03-2022" },
];

const PreviousBookings = ({ navigation }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    dispatch(loadingState(true));
    try {
      const response = await getDataApi("getUserBookings");
      if (response?.status) {
        console.log(response.data);
        setUserBookings(response.data);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
    }
  };

  const bookings = data.map((d) => (
    <Booking
      key={d.id}
      navigation={navigation}
      type={d.type}
      time={d.time}
      date={d.date}
    />
  ));

  return (
    <Container>
      <Back
        onPress
        onPressButton={() => {
          navigation.navigate("ProfileMenu");
        }}
      />
      <Title text="Previous Bookings" />

      {loading && userBookings.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="small" color={colors.appColor} />
          <Text style={{ marginVertical: 10, textAlign: "center" }}>
            Looking for Previous Bookings
          </Text>
        </View>
      ) : userBookings.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Title text="My Bookings" />
          <Text style={{ marginVertical: 10, textAlign: "center" }}>
            No Bookings found...
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, marginHorizontal: -15 }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 100 }}
            data={userBookings}
            renderItem={({ item }) => (
              <Booking item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </Container>
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
});
