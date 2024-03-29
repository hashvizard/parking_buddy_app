import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Title from "./Title";
import Subtitle from "./Subtitle";
import colors from "../../src/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  dateFormatChanger,
  getTimeFrame,
  getTimeFrameOnly,
  handleNavigate,
  hasValue,
} from "../../src/helpers";
import ScooterYellowIcon from "../../assets/svg/bikeyellow.svg";
import CarIcon from "../../assets/svg/Car.svg";
import Button from "./Button";
import PressButton from "./PressButton";
import {
  emptyUserBookingData,
  setEnabledHome,
  showBottomSheetContainer,
} from "../../src/redux/actions";
import { useState } from "react";
import { useEffect } from "react";
const DetailView = ({ navigation, route }) => {
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
    cuponCode,
  } = useSelector((state) => state.bookingState.booking);

  const [pass, setPass] = useState(false);

  useEffect(() => {
    if (route?.params?.pass) {
      setPass(true);
    } else {
      setPass(false);
    }
  }, []);

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginBottom: 5 }}>
          <Title
            style={{
              lineHeight: null,
              marginBottom: 0,
            }}
            text="Booking Confirmed"
          />
          <Subtitle
            text="Please show booking pass at the parking"
            opacity={0.5}
          />
        </View>
        <View>
          <Icon name="check-circle" color={"green"} size={40} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View
          style={{
            backgroundColor: colors.darkGreen,
            marginTop: 20,
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
                {searchData?.name}
              </Text>
              <Text style={{ color: colors.greyText, marginVertical: 5 }}>
                {`${searchData?.address}, ${searchData?.city}, ${searchData?.state} - ${searchData?.pin_code}`}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  handleNavigate(searchData.latitude, searchData.longitude);
                }}
              >
                <Text style={{ fontWeight: "500", color: "white" }}>
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
          <View
            style={{
              width: "100%",
              marginVertical: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                borderRadius: 20,
                height: 30,
                width: 30,
                marginLeft: -15,
                backgroundColor: "#f7f7f7",
              }}
            />
            <Text style={{ color: "white" }}>
              - - - - - Show your parking code at parking - - - - -
            </Text>
            <View
              style={{
                borderRadius: 20,
                height: 30,
                width: 30,
                marginRight: -15,
                backgroundColor: "#f7f7f7",
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ color: colors.greyText }}>
              {getTimeFrame(selectedTime, time_duration)?.time_frame}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginBottom: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexGrow: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View
                    style={{
                      marginTop: 5,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {/* <Text style={{ color: colors.greyText }}>Booking Id:</Text>
                  <Text style={{ color: "white", fontWeight: "bold",marginLeft:10 }}>
                  {booking_id}
                  </Text> */}
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",

                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontWeight: "bold",

                          fontSize: 21,
                          color: colors.orangeText,
                        }}
                      >
                        {parking_code}
                      </Text>
                      <Text style={{ color: colors.greyText }}>
                        Parking Code
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 5,
                  }}
                >
                  <Text style={{ color: colors.greyText }}>Duration</Text>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {time_duration} hour
                  </Text>
                </View>
                <View
                  style={{
                    height: 80,

                    width: 80,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 80,
                      height: 80,
                      aspectRatio: 1,
                      resizeMode: "cover",
                    }}
                    source={require("../../assets/images/qr.png")}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            borderRadius: 10,
            backgroundColor: colors.greyText,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
              backgroundColor: colors.darkGreen,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
              Booking ID
            </Text>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
              {booking_id}
            </Text>
          </View>
          <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.darkGreen,
                  fontWeight: "bold",
                }}
              >
                {pass ? "Total hours utilised" : "Total Amount Paid"}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.darkGreen,
                  fontWeight: "bold",
                }}
              >
                {pass ? `${time_duration} hour` : `${total_amount}.00 INR`}
              </Text>
            </View>
            {/* <View style={{ borderTopWidth: 1, marginVertical: 10 }} /> */}
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.darkGreen,
                  fontWeight: "bold",
                }}
              >
                Taxes and fees
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.darkGreen,
                  fontWeight: "bold",
                }}
              >
                {booking_charge + gst + cgst}.00 INR
              </Text>
            </View> */}
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: colors.darkGreen }}>
                Booking Charge
              </Text>
              <Text style={{ fontSize: 16, color: colors.darkGreen }}>
                {booking_charge}.00 INR
              </Text>
            </View> */}
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: colors.darkGreen }}>
                State Good and Service Tax
              </Text>
              <Text style={{ fontSize: 16, color: colors.darkGreen }}>
                {gst}.00 INR
              </Text>
            </View> */}

            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: colors.darkGreen }}>
                Central Good and Service Tax
              </Text>
              <Text style={{ fontSize: 16, color: colors.darkGreen }}>
                {cgst}.00 INR
              </Text>
            </View> */}
          </View>
        </View>
        {hasValue(cuponCode) && !pass && (
          <View
            style={{
              borderRadius: 10,
              backgroundColor: colors.greyText,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,

                backgroundColor: colors.darkGreen,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
              >
                Offers Applied
              </Text>
            </View>
            <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.darkGreen,
                    fontWeight: "bold",
                  }}
                >
                  {cuponCode?.code}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.darkGreen,
                    fontWeight: "bold",
                  }}
                >
                  -{" "}
                  {cuponCode?.type == "number"
                    ? `Rs ${cuponCode?.discount}.00`
                    : `${cuponCode?.discount}%`}
                </Text>
              </View>
              <View style={{ borderTopWidth: 1, marginVertical: 10 }} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 16, color: colors.darkGreen }}>
                  {cuponCode?.title}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 15,
          marginTop: 10,
        }}
      >
        <View style={styles.bottom_container}>
          <PressButton
            style={{
              justifyContent: "center",
            }}
            disabled={false}
            pressed={() => {
              dispatch(emptyUserBookingData());
              dispatch(setEnabledHome(true));

              dispatch(showBottomSheetContainer(false));
              navigation.navigate("HomeScreen");
            }}
            text="Go back to HomeScreen"
            loading={false}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailView;

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
