import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../src/constants/colors";
import { useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import {
  addHoursToDate,
  alertBox,
  formatDateTime,
  getDataApi,
  paymentGateway,
  postDataApi,
  timestampToMysqlDatetimeWithOffset,
} from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { loadingState, setUserNotifications } from "../../src/redux/actions";

const ExtendBooking = ({ data, navigation, updateData }) => {
  const [duration, setDuration] = useState(1);
  let { rate } = data?.parking?.parking_meta[0];
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const checkForPasses = async () => {
    let end_time = addHoursToDate(data?.end_time, parseInt(duration));
    console.log();
    setLoading(true);
    try {
      const response = await postDataApi("getUserPassesByParkingId", {
        parking_id: data?.parking?.id,
      });
      if (response?.status) {
        let tempdata = response.data.filter(function (item) {
          return (
            item.vehicle_type == data?.vehicle_type &&
            parseInt(item?.remaining_hours) >= parseInt(duration)
          );
        });

        if (tempdata.length > 0) {
          navigation.navigate("ExtendPasses", {
            usePasses: tempdata,
            backendData: data,
            duration: duration,
            rate: rate,
            extended: (val, pass, paymentId) => {
              extendBooking(val, pass, paymentId);
            },
          });
        } else {
          makepayment();
        }
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAvailability = async () => {
    let end_time = addHoursToDate(data?.end_time, parseInt(duration));

    setLoading(true);
    console.log(data, "Ihabe");
    const datas = {
      parking_id: data?.parking?.id,
      start_time: data?.end_time,
      end_time: end_time,
      vehicle_type: data?.vehicle_type,
    };
    try {
      const response = await postDataApi("checkParkingAvailability", datas);
      if (response?.status) {
        checkForPasses();
      } else {
        alertBox("Extend Error", "Booking Spot is not available");
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      setLoading(false);
    }
  };

  const makepayment = async () => {
    console.log(rate, duration, "Yhdfhhdf");
    setLoading(true);
    try {
      await paymentGateway(
        rate * duration,
        userData,
        (paymentID) => {
          extendBooking(null, false, paymentID);
        },
        (err) => {
          setLoading(false);
          console.log(err, "errrrrr");
        }
      );
    } catch (error) {
      setLoading(false);
    }
  };

  const extendBooking = async (val, pass, paymentId) => {
    setLoading(true);

    let end_time = addHoursToDate(data?.end_time, parseInt(duration));

    const datas = {
      payment_id: paymentId,
      user_pass_id: pass ? val?.id : null,
      used_hours: pass ? duration : null,
      booking_id: data?.id,
      extended_time: end_time,
      extra_charge: duration * rate,
    };

    console.log("Data i sent from front End", datas);
    try {
      const response = await postDataApi("extendParticularBooking", datas);
      console.log(response);
      if (response?.status) {
        console.log(response?.data, "My Bookings");
        updateData(end_time, parseInt(duration * rate));
        alertBox("Booking Extended", "Your Booking has been extended");

        let tempDataFailed = {
          type: "bookingExtend",
          status: "success",
          time: formatDateTime(),
          data: response?.data,
        };
        dispatch(setUserNotifications(tempDataFailed));
      } else {
        alertBox("Booking Error", response?.message);
        let tempDataFailed = {
          type: "bookingExtend",
          status: "failed",
          time: formatDateTime(),
          data: {},
        };
        dispatch(setUserNotifications(tempDataFailed));
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
      let tempDataFailed = {
        type: "bookingExtend",
        status: "failed",
        time: formatDateTime(),
        data: {},
      };
      dispatch(setUser(tempDataFailed));
    } finally {
      dispatch(loadingState(false));
      setLoading(false);
    }
  };
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: "row",

          backgroundColor: colors.greyText,
          paddingVertical: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (duration > 1) {
              setDuration((prevState) => prevState - 1);
            }
          }}
          style={{ padding: 10, borderRadius: 50, backgroundColor: "darkgrey" }}
        >
          <Icon name="minus" size={30} color={"white"} />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ fontSize: 25, fontWeight: "bold", color: colors.appColor }}
          >
            {duration}
          </Text>
          <Text>Hours</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (duration < 24) {
              setDuration((prevState) => prevState + 1);
            }
          }}
          style={{
            padding: 10,
            borderRadius: 50,
            backgroundColor: colors.darkGreen,
          }}
        >
          <Icon name="plus" size={30} color={"white"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 1,
          marginVertical: 4,
          borderColor: colors.appColor,
        }}
      />
      <View
        style={{
          backgroundColor: colors.greyText,
          padding: 10,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
          }}
        >
          <Text style={{ color: colors.darkGreen, fontSize: 15 }}>Rate</Text>
          <Text style={{ color: colors.darkGreen, fontSize: 15 }}>
            ₹ {rate}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            marginBottom: 5,
          }}
        >
          <Text style={{ color: colors.darkGreen, fontSize: 15 }}>
            Duration
          </Text>
          <Text style={{ color: colors.darkGreen, fontSize: 15 }}>
            {duration} Hours
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            marginBottom: 5,
          }}
        >
          <Text style={{ color: colors.darkGreen, fontSize: 15 }}>
            Sub-Total
          </Text>
          <Text style={{ color: colors.darkGreen, fontSize: 15 }}>
            ₹ {rate * duration}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              color: colors.darkGreen,
              fontWeight: "bold",
              fontSize: 23,
            }}
          >
            Total
          </Text>
          <Text
            style={{
              color: colors.darkGreen,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            ₹ {rate * duration}
          </Text>
        </View>
        <TouchableOpacity
          onPress={checkAvailability}
          disabled={loading}
          style={{
            margin: 5,
            padding: 15,
            justifyContent: "space-around",
            flexDirection: "row",
            backgroundColor: colors.appColor,
            marginTop: 15,
            borderRadius: 10,
          }}
        >
          {loading && <ActivityIndicator size="small" />}
          <Text style={{ textAlign: "center" }}>
            {loading ? "Please Wait..." : " Pay to Extend Booking"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExtendBooking;

const styles = StyleSheet.create({});
