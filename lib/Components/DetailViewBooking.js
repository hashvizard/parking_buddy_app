import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Title from "./Title";
import Subtitle from "./Subtitle";
import colors from "../../src/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { dateFormatChanger, getTimeFrame } from "../../src/helpers";
import ScooterYellowIcon from "../../assets/svg/bikeyellow.svg";
import CarIcon from "../../assets/svg/Car.svg";
import Button from "./Button";
import PressButton from "./PressButton";
import { emptyUserBookingData, setEnabledHome } from "../../src/redux/actions";
const DetailViewBooking = ({ data }) => {
  const {
    searchData,
    selectedTime,
    time_duration,
    vehicle_type,
    total_amount,
    booking_charge,
    gst,
    cgst,
    parking_code,
    booking_id,
  } = useSelector((state) => state.bookingState.booking);

  const dispatch = useDispatch();

  return (
    <View>
      <View
        style={{
         
          margin:-10,
          marginTop: 10,
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            paddingHorizontal: 15,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 21, color: colors.orangeText }}>
              {data?.parking?.name}
            </Text>
            <Text style={{ color: 'black', marginVertical: 5 }}>
              {data?.parking?.address}
            </Text>
            <Text style={{ fontWeight: "500", color: "black" }}>
              Get Direction
            </Text>
          </View>
          <View
            style={{
              height: 80,
              width: 80,
              alignItems: "center",
              backgroundColor: colors.greyText,
              borderRadius: 10,
              marginLeft: 10,
              justifyContent: "center",
            }}
          >
            {data?.vehicle_type == 0 ? (
              <ScooterYellowIcon width={60} height={40} />
            ) : (
              <CarIcon width={60} height={40} />
            )}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            marginVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></View>
      </View>
    </View>
  );
};

export default DetailViewBooking;

const styles = StyleSheet.create({
  bottom_container: {
    position: "absolute",
    justifyContent: "flex-end",

    bottom: 40,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
