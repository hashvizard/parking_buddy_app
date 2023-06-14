import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import MapScreen from "../../assets/svg/MapWide.svg";
import { Title, Back, Container } from "../Components";
import FindIcon from "../../assets/svg/Find icon.svg";
import ShieldIcon from "../../assets/svg/SHIELD.svg";
import CarParkedIcon from "../../assets/svg/Car Parked.svg";
import PBOrangeIcon from "../../assets/svg/PB logo Orange.svg";
import GoogleMap from "../Components/GoogleMap";
import DetailViewBooking from "../Components/DetailViewBooking";
import {
  alertBox,
  calculateHourDifference,
  formatTime,
  isTimeGreaterThan24Hours,
} from "../../src/helpers";
import colors from "../../src/constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ExtendBooking from "../Components/ExtendBooking";

const BookingDetails = ({ navigation, route }) => {
  const [data, setData] = useState(route?.params?.data);
  const [past] = useState(route?.params?.past);
  console.log(route?.params?.data, "route?.params?.data");
  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Back navigation={navigation} />
        <TouchableOpacity
          onPress={() => {
            if (!isTimeGreaterThan24Hours(data?.end_time)) {
              alertBox(
                "Refund Expired",
                "The 24 hours request refund period has already expired, We are sorry to let you know that we cannot raise your refund request. Please get in touch with us through our chat support in case of any queries"
              );
            } else {
              navigation.navigate("RefundRequest", { data: data });
            }
          }}
        >
          <Text>Request Refund</Text>
        </TouchableOpacity>
      </View>

      <Title text="Your Booking Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <DetailViewBooking data={data} />

          {/* <View style={{ marginHorizontal: -20, marginVertical: 10 }}>
                <GoogleMap width="100%" height="104" />
            </View> */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,

              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>{formatTime(data?.start_time, data?.end_time)}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

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
                        {data?.parking_code}
                      </Text>
                      <Text style={{ color: "black" }}>Parking Code</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 5,
                  }}
                >
                  <Text style={{ color: "black" }}>Duration</Text>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    {calculateHourDifference(data?.start_time, data?.end_time)}{" "}
                    hour
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

          {/* Extend Booking */}
          {!past && (
            <View style={{ marginTop: 20 }}>
              <ExtendBooking
                data={data}
                navigation={navigation}
                updateData={(duration, rate) => {
                  console.log(duration, "durationduration");
                  setData({
                    ...data,
                    end_time: duration,
                    charges: parseInt(data?.charges) + parseInt(rate),
                  });
                }}
              />
            </View>
          )}
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
                Booking ID
              </Text>
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
              >
                {data?.booking_id}
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
                  {data?.user_pass_id
                    ? "Total hours utilised"
                    : "Total Amount Paid"}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.darkGreen,
                    fontWeight: "bold",
                  }}
                >
                  {data?.user_pass_id
                    ? `${calculateHourDifference(
                        data?.start_time,
                        data?.end_time
                      )} hour`
                    : `${data?.charges}.00 INR`}
                </Text>
              </View>
            </View>
          </View>

          {/* <Text style={{ fontWeight: '700', fontSize: 16,padding:10 }}>
                Help
            </Text> */}
          {/* <TouchableOpacity>
                <View style={styles.help_item}>
                    <View style={{ flex: 2 }}>
                        <FindIcon />
                    </View>
                    <View style={{ marginLeft: 15, flexShrink: 1, flex: 9 }}>
                        <Text style={{ fontWeight: '700' }}>
                            Find Lost Item
                        </Text>
                        <Text style={{ color: '#3B3B3B40' }}>
                            We can help you get in touch with the operator
                        </Text>
                    </View>
                </View>
            </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Support")}
            style={{ marginTop: 20 }}
          >
            <View style={styles.help_item}>
              <View style={{ flex: 2 }}>
                <ShieldIcon />
              </View>
              <View style={{ marginLeft: 15, flexShrink: 1, flex: 9 }}>
                <Text style={{ fontWeight: "700" }}>Report an Issue</Text>
                <Text style={{ color: "#3B3B3B40" }}>
                  Let us know if you have any issues or concerns
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
                <View style={styles.help_item}>
                    <View style={{ flex: 2 }}>
                        <CarParkedIcon />
                    </View>
                    <View style={{ marginLeft: 15, flexShrink: 1, flex: 9 }}>
                        <Text style={{ fontWeight: '700' }}>
                            Provide Parking Feedback
                        </Text>
                        <Text style={{ color: '#3B3B3B40' }}>
                            For issues that aren’t safety related
                        </Text>
                    </View>
                </View>
            </TouchableOpacity> */}
          {/* <TouchableOpacity>
                <View style={styles.help_item}>
                    <View style={{ flex: 2 }}>
                        <PBOrangeIcon />
                    </View>
                    <View style={{ marginLeft: 15, flexShrink: 1, flex: 9 }}>
                        <Text style={{ fontWeight: '700' }}>
                            Get Booking Help
                        </Text>
                        <Text style={{ color: '#3B3B3B40' }}>
                            Need help for something else? Find it here
                        </Text>
                    </View>
                </View>
            </TouchableOpacity> */}
        </>
      </ScrollView>
    </Container>
  );
};
const styles = StyleSheet.create({
  help_item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10,
  },
});
export default BookingDetails;
