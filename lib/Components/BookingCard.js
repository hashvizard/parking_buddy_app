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
import { setEnabledHome } from "../../src/redux/actions";
import { TouchableOpacity } from "react-native";
const BookingCard = ({ navigation }) => {
  const {
    searchData,
    selectedTime,
    time_duration,
    vehicle_type,
    total_amount,
    booking_charge,
    gst,
    cgst,
  } = useSelector((state) => state.bookingState.booking);

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        
      >
        <View
          style={{
            backgroundColor: colors.white,
            marginTop: 20,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 21, color: colors.orangeText }}>
                {searchData?.name}
              </Text>
              <Text style={{ color: "darkgrey", marginVertical: 5 }}>
                {`${searchData?.address}, ${searchData?.city}, ${searchData?.state} - ${searchData?.pin_code}`}
              </Text>
              <TouchableOpacity style={{paddingTop:10}}>
              <Text style={{ fontWeight: "500", color: colors.darkGreen,fontSize:18 }}>
                Get Direction
              </Text>
              </TouchableOpacity>
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
              {vehicle_type == 0 ? (
                <ScooterYellowIcon width={60} height={40} />
              ) : (
                <CarIcon width={60} height={40} />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
   <View style={{borderTopWidth:2,marginVertical:20,borderStyle:"dashed",borderColor:colors.greyText}} />
    </View>
  );
};

export default BookingCard;

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
