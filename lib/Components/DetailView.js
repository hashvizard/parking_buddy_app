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
const DetailView = ({ navigation }) => {
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
              <Text style={{ fontWeight: "500", color: "white" }}>
                Get Direction
              </Text>
            </View>
            <View
              style={{
                height: 80,
                borderWidth: 2,
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
              <View>
                <Text style={{ color: colors.greyText }}>
                  {dateFormatChanger(selectedTime)}
                </Text>
                <Text
                  style={{ color: "white", fontWeight: "bold", marginTop: 5 }}
                >
                  {getTimeFrame(selectedTime, time_duration)?.time_frame}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={{ color: colors.greyText }}>Booking Id</Text>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    23fw32d
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginVertical: 5,
                    fontSize: 21,
                    color: colors.orangeText,
                  }}
                >
                  843412
                </Text>
                <Text style={{ color: colors.greyText }}>Parking Code</Text>
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <Text style={{ color: colors.greyText }}>Duration</Text>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {time_duration} hour
                </Text>
              </View>
            </View>
            {/* <View
              style={{
                height: 80,
                borderWidth: 2,
                width: 80,
                backgroundColor:"white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="check-circle" color={"green"} size={40} />
            </View> */}
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
              Order Id
            </Text>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
              12323
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
                Total Amount Paid
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.darkGreen,
                  fontWeight: "bold",
                }}
              >
                {total_amount}.00 INR
              </Text>
            </View>
            <View style={{ borderTopWidth: 1, marginVertical: 10 }} />
            <View
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
            </View>
            <View
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
            </View>
            <View
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
            </View>

            <View
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
                ICICIIBNFREE
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.darkGreen,
                  fontWeight: "bold",
                }}
              >
                - {booking_charge + gst + cgst}.00 INR
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
                ICICIIBNFREE Free offer Applied you have saved{" "}
                {booking_charge + gst + cgst}.00 INR
              </Text>
            </View>
          </View>
        </View>
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
              // dispatch(setEnabledHome(true));
              // navigation.navigate("HomeScreen");
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
