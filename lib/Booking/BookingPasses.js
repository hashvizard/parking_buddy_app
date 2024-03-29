import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Back, Container, Subtitle, Title } from "../Components";
import PassesView from "../Components/PassesView";
import {
  alertBox,
  formatDateTime,
  getDataApi,
  paymentGateway,
  postDataApi,
  timestampToMysqlDatetime,
  timestampToMysqlDatetimeWithOffset,
} from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingData,
  loadingState,
  setUserNotifications,
} from "../../src/redux/actions";
import colors from "../../src/constants/colors";
import PressButton from "../Components/PressButton";

const BookingPasses = ({ navigation }) => {
  const { booking } = useSelector((state) => state.bookingState);
  const { loading } = useSelector((state) => state.appState);
  const { userData } = useSelector((state) => state.data);

  const dispatch = useDispatch();
  const [passes, setPasses] = useState([]);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    try {
      let { passesData } = route?.params;
      setPasses(passesData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchVoucers = async () => {
    dispatch(loadingState(true));
    try {
      const response = await getDataApi("getcurrentUserPasses");
      if (response?.status) {
        let tempdata = response.data.filter(function (item) {
          return (
            item.vehicle_type == booking.vehicle_type &&
            parseInt(item?.remaining_hours) >= parseInt(booking?.time_duration)
          );
        });
        setPasses(tempdata);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
    }
  };
  const currentTimestamp = Date.now();

  const bookingId = `${booking?.total_amount}${currentTimestamp}${booking?.parking_id}${userData?.id}`;

  const makepayment = async () => {
    setWait(true);

    try {
      await paymentGateway(
        booking?.total_amount,
        userData,
        (paymentID) => {
          bookNow(null, false, paymentID);
        },
        (err) => {
          setWait(false);
          let tempDataFailed = {
            type: "booking",
            status: "failed",
            time: formatDateTime(),
            data: booking?.searchData,
          };
          dispatch(setUserNotifications(tempDataFailed));

          console.log(err, "errrrrr");
        }
      );
    } catch (error) {
      let tempDataFailed = {
        type: "booking",
        status: "failed",
        time: formatDateTime(),
        data: booking?.searchData,
      };
      dispatch(setUserNotifications(tempDataFailed));
      setWait(false);
    }
  };

  const bookNow = async (val, pass, paymentId) => {
    setWait(true);
    const data = {
      payment_id: paymentId,
      status: "success",
      user_pass_id: pass ? val?.id : null,
      used_hours: pass ? booking?.time_duration : null,
      charges: booking?.total_amount,
      vehicle_type: booking?.vehicle_type,
      end_time: timestampToMysqlDatetimeWithOffset(
        booking?.selectedTime,
        parseInt(booking?.time_duration)
      ),
      start_time: timestampToMysqlDatetime(booking?.selectedTime),
      parking_id: booking?.parking_id,
    };

    try {
      const response = await postDataApi("booking", data);
      if (response?.status) {
        let tempDataSuccess = {
          type: "booking",
          status: "success",
          time: formatDateTime(),
          data: booking?.searchData,
        };
        dispatch(setUserNotifications(tempDataSuccess));
        dispatch(
          bookingData({
            booking_id: response?.data?.booking_id,
            parking_code: response?.data?.parking_code,
          })
        );
        navigation.navigate("BookingDataView", {
          pass: pass,
        });
      } else {
        let tempDataFailed = {
          type: "booking",
          status: "failed",
          time: formatDateTime(),
          data: booking?.searchData,
        };
        dispatch(setUserNotifications(tempDataFailed));
        alertBox("Booking Error", response?.message);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      setWait(false);
    }
  };

  return (
    <Container style={{ marginBottom: 0, paddingBottom: 0 }}>
      <Back navigation={navigation} />
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
            text="Parkinbuddy E-Pass"
          />
          <Subtitle text="Use your pass for faster checkout" opacity={0.5} />
        </View>
      </View>
      {loading && passes.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="small" color={colors.appColor} />
          <Text style={{ marginVertical: 10, textAlign: "center" }}>
            Looking for passes
          </Text>
        </View>
      ) : passes.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Title
            style={{
              lineHeight: null,
              marginBottom: 0,
            }}
            text="Passes"
          />
          <Subtitle text="No passes found..." opacity={0.5} />
        </View>
      ) : (
        <PassesView
          navigation={navigation}
          type="bookingPasses"
          showLoader={true}
          onPressed={(val) => {
            if (!wait) {
              bookNow(val, true, bookingId);
            }
          }}
          data={passes}
        />
      )}
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
            disabled={wait}
            pressed={() => {
              makepayment();
            }}
            text={wait ? "Please Wait.." : "Use Online Payment"}
            loading={wait}
          />
        </View>
      </View>
    </Container>
  );
};

export default BookingPasses;

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
