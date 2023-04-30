import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Back, Container, Subtitle, Title } from "../Components";
import PassesView from "../Components/PassesView";
import { getDataApi } from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { loadingState } from "../../src/redux/actions";
import colors from "../../src/constants/colors";
import PressButton from "../Components/PressButton";

const Passes = ({ navigation }) => {
  const { booking } = useSelector((state) => state.bookingState);
  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    fetchVoucers();
  }, []);

  const fetchVoucers = async () => {
    dispatch(loadingState(true));
    try {
      const response = await getDataApi("getcurrentUserPasses");

      if (response?.status) {
        console.log(response.data);
        let tempdata = response.data.filter(function (item) {
          return item.vehicle_type == booking.vehicle_type;
        });
        setPasses(tempdata);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
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
            text="ParkingBuddy E-Pass"
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
        <PassesView navigation={navigation} type="bookingPasses" data={passes} />
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
            disabled={false}
            pressed={() => {
              // dispatch(setEnabledHome(true));
              navigation.navigate("ConfirmBooking");
            }}
            text="Use Online Payment"
            loading={false}
          />
        </View>
      </View>
    </Container>
  );
};

export default Passes;

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
