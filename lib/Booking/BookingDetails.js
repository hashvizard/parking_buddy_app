import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Back, Title, Subtitle, Button, BoxShadow } from "../Components";
import VoucherIcon from "../../assets/svg/Voucher Icon.svg";
import CarIcon from "../../assets/svg/Car.svg";
import ScooterIcon from "../../assets/svg/Scooter.svg";
import GoogleMap from "../Components/GoogleMap";
import { useDispatch, useSelector } from "react-redux";
import ScooterYellowIcon from "../../assets/svg/bikeyellow.svg";
import {
  alertBox,
  cuponCode,
  formatDateTime,
  getDataApi,
  getTimeFrame,
  hasValue,
  paymentGateway,
  postDataApi,
  timestampToMysqlDatetime,
  timestampToMysqlDatetimeWithOffset,
} from "../../src/helpers";
import { bookingData, loadingState, setUserNotifications } from "../../src/redux/actions";
import DetailView from "../Components/DetailView";
import BookingCard from "../Components/BookingCard";
import { ScrollView } from "react-native";
// import BottomSheet from "../Components/BottomSheet";

const BookingDetails = ({ navigation, parkingData }) => {
  const { booking } = useSelector((state) => state.bookingState);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.appState);
  const { userData } = useSelector((state) => state.data);

  const [applied, setApplied] = useState({
    sub_total: 0,

    booking_charge: 0,

    cuponDiscount: 0,

    total_amount: 0,
  });

  useEffect(() => {
    dispatch(bookingData({ searchData: parkingData }));
  }, [parkingData]);

  useEffect(() => {
    let discount = cuponCode(
      booking?.cuponCode.discount ? booking?.cuponCode.discount : 0,
      getTimeFrame(
        booking?.selectedTime,
        booking?.time_duration,
        parkingData?.rate
      )?.total_amount,
      booking?.cuponCode.discount ? booking?.cuponCode.type : "number"
    );


    let sub_total = getTimeFrame(
      booking?.selectedTime,
      booking?.time_duration,
      parkingData?.rate
    )?.total_amount;

    let total = sub_total + booking?.booking_charge - discount;

    setApplied({
      sub_total: sub_total,

      booking_charge: booking?.booking_charge,

      cuponDiscount: Math.round(discount),

      total_amount: Math.round(total),
    });
  }, [booking.cuponCode, parkingData]);

  const checkForPasses = async () => {
    dispatch(bookingData({ total_amount: applied?.total_amount }));
    // navigation.navigate("Passes");
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

        if (tempdata.length > 0) {
          navigation.navigate("Passes");
        } else {
          makepayment()
        }
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
    }
  };


  const makepayment = async () => {
    dispatch(loadingState(true));

    try {
      await paymentGateway(
        applied?.total_amount,
        userData,
        (paymentID) => {
          bookNow(null, false, paymentID);
        },
        (err) => {
        

          let tempDataFailed = {
            type: "booking",
            status: "failed",
            time: formatDateTime(),
            data: booking?.searchData,
          };
          dispatch(setUserNotifications(tempDataFailed));
          dispatch(loadingState(false));
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
      dispatch(loadingState(false));
    } 
  };

  const bookNow = async (val, pass, paymentId) => {
    dispatch(loadingState(true));
    const data = {
      payment_id: paymentId,
      status: "success",
      user_pass_id: null,
      used_hours: null,
      charges: applied?.total_amount,
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
      console.log(response);
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
        navigation.navigate("BookingDataView");
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
      dispatch(loadingState(false));
    }
  };


  return (
    <ScrollView>
      <View style={styles.bd_container}>
        {/* <View>
        <Title
          style={{
            lineHeight: null,
            marginBottom: 0,
          }}
          text="Booking Details"
        />
        <Subtitle text={parkingData?.parking_data?.title} opacity={0.5} />
      </View> */}
        <BookingCard />

        <TouchableOpacity onPress={() => navigation.navigate("Voucher")}>
          <BoxShadow style={styles.voucher}>
            <VoucherIcon />
            <Text style={{ marginLeft: 10, marginRight: 25 }}>
              {hasValue(booking?.cuponCode)
                ? `Voucher Applied - ${booking?.cuponCode?.code}`
                : "You Have No Vouchers"}
            </Text>
          </BoxShadow>
        </TouchableOpacity>
        {booking?.vehicle_type == 1 ? (
          <BoxShadow style={styles.vehicle}>
            <CarIcon width={60} height={40} />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontWeight: "700" }}>
                {booking?.vehicle_type == 1 ? "4" : "2"} Wheeler Parking
              </Text>
              <Text style={{ opacity: 0.5 }} textBreakStrategy="simple">
                {
                  getTimeFrame(booking?.selectedTime, booking?.time_duration)
                    ?.time_frame
                }
              </Text>
              <Text style={{ fontWeight: "700", color: "#fecf3e" }}>
                ₹ {parkingData.rate}/hour
              </Text>
            </View>
          </BoxShadow>
        ) : (
          <BoxShadow style={styles.vehicle}>
            <ScooterYellowIcon width={60} height={40} />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontWeight: "700" }}>
                {booking?.vehicle_type == 1 ? "4" : "2"} Wheeler Parking
              </Text>
              <Text style={{ opacity: 0.5 }} textBreakStrategy="simple">
                {
                  getTimeFrame(booking?.selectedTime, booking?.time_duration)
                    ?.time_frame
                }
              </Text>
              <Text style={{ fontWeight: "700", color: "#fecf3e" }}>
                ₹ {parkingData.rate}/hour
              </Text>
            </View>
          </BoxShadow>
        )}
        <View style={styles.amount}>
          <View style={styles.calc}>
            <Text style={{ color: "#fff" }}>Sub-Total</Text>
            <Text style={{ color: "#fff" }}>₹ {applied.sub_total}</Text>
          </View>
      
          <View style={styles.calc}>
            <Text style={{ color: "#fff" }}>
              Discount {" "}
              {booking.cuponCode.type == "percentage"
                ? `- ${booking.cuponCode.discount}% Off`
                : booking.cuponCode.discount
                ? `- ₹ ${booking.cuponCode.discount} Off`
                : ""}
            </Text>
            <Text style={{ color: "#fff" }}>₹ {applied?.cuponDiscount}</Text>
          </View>
          <View style={styles.calc}>
            <Text style={{ color: "#fff", fontSize: 18 }}>Total</Text>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              ₹ {applied.total_amount}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Button
              handleRoute={true}
              disabled={loading}
              pressed={() => {
                checkForPasses();
              }}
              bgColor="#fff"
              navigation={navigation}
              text="Reserve My Spot"
              route="Passes"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Poppins",
    flex: 1,
    backgroundColor: "#FEFEFF",
  },
  bd_container: {
    padding: 20,
  },
  bar: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 60,
    height: 5,
    backgroundColor: "#FEF6ED",
    marginBottom: 15,
  },
  voucher: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 22,
    padding: 20,
  },
  vehicle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 22,
    padding: 25,
  },
  amount: {
    backgroundColor: "#FECF3E",
    borderRadius: 15,
    padding: 15,
  },
  calc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default BookingDetails;
