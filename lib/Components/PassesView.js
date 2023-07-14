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
import CarGreyIcon from "../../assets/svg/car_grey.svg";
import ScooterIcon from "../../assets/svg/Scooter.svg";

import Button from "./Button";
import PressButton from "./PressButton";
import { bookingData, setEnabledHome } from "../../src/redux/actions";
import ListPasssesView from "./ListPasssesView";
import { TouchableOpacity } from "react-native";
const PassesView = ({
  navigation,
  type = "userPasses",
  data = [],
  showLoader = false,
  onPressed= (val)=> {},
  active = null,
  setActive = (val) => {},
}) => {
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

  const bookNow = async (pass) => {
    if (type != "userPasses")  {
      if(showLoader){
        dispatch(bookingData({ pass: pass }));
        onPressed(pass);
      }
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
       
        {data?.map((item, index) => (
          <ListPasssesView
            key={index}
            all={false}
            navigation={navigation}
            selectedItem={(selected) => {
              bookNow(selected);
            }}
            data={item}
            type
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PassesView;

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
