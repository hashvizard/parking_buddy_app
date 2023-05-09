import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Back, Container, Subtitle, Title } from "../Components";
import PassesView from "../Components/PassesView";
import { getDataApi } from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { loadingState } from "../../src/redux/actions";
import colors from "../../src/constants/colors";
import PressButton from "../Components/PressButton";
import ScooterYellowIcon from "../../assets/svg/bikeyellow.svg";
import CarIcon from "../../assets/svg/Car.svg";
import CarGreyIcon from "../../assets/svg/car_grey.svg";
import ScooterIcon from "../../assets/svg/Scooter.svg";

const MyPasses = ({ navigation, route }) => {
  const { booking } = useSelector((state) => state.bookingState);
  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const [active, setActive] = useState(1);

  const [data, setData] = useState([]);
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    fetchVoucers();
  }, []);

  const fetchVoucers = async () => {
    dispatch(loadingState(true));
    try {
      const response = await getDataApi("getcurrentUserPasses");

      if (response?.status) {
  
        setData(response.data);
        try {
          let { screen } = route?.params;
          if (screen == "userPasses") {
            let tempdata = response.data.filter(function (item) {
              return item.vehicle_type == active;
            });
            setPasses(tempdata);
          } else {
            let tempdata = response.data.filter(function (item) {
              return item.vehicle_type == booking.vehicle_type;
            });
            setPasses(tempdata);
          }
        } catch (err) {
          let tempdata = response.data.filter(function (item) {
            return item.vehicle_type == booking.vehicle_type;
          });
          setPasses(tempdata);
        }
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
      {route?.params?.screen == "userPasses" && (
        <View
          style={{
            marginTop: 10,

            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              let tempdata = data.filter(function (item) {
                return item.vehicle_type == 1;
              });
              setPasses(tempdata);
              setActive(1);
            }}
            style={{
              width: "48%",
              alignItems: "center",
              backgroundColor: colors.greyText,
              borderRadius: 10,
            }}
          >
            {active == 1 ? (
              <CarIcon width={"60%"} height={100} />
            ) : (
              <CarGreyIcon width={"60%"} height={100} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let tempdata = data.filter(function (item) {
                return item.vehicle_type == 0;
              });
              setPasses(tempdata);
              setActive(0);
            }}
            style={{
              width: "48%",
              alignItems: "center",
              backgroundColor: colors.greyText,
              borderRadius: 10,
            }}
          >
            {active == 0 ? (
              <ScooterYellowIcon width={80} height={100} />
            ) : (
              <ScooterIcon width={80} height={100} />
            )}
          </TouchableOpacity>
        </View>
      )}

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
          type="userPasses"
          data={passes}
          active={active}
          setActive={(val) => {
            let tempdata = passes.filter(function (item) {
              return item.vehicle_type == val;
            });
            setPasses(tempdata);
            setActive(val);
          }}
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
            disabled={false}
            pressed={() => {
             navigation.navigate("AllPasses")
            }}
            text="Buy a New Pass"
            loading={false}
          />
        </View>
      </View>
    </Container>
  );
};

export default MyPasses;

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
