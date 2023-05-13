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
import { getDataApi, postDataApi } from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { loadingState } from "../../src/redux/actions";
import colors from "../../src/constants/colors";
import PressButton from "../Components/PressButton";
import ScooterYellowIcon from "../../assets/svg/bikeyellow.svg";
import CarIcon from "../../assets/svg/Car.svg";
import CarGreyIcon from "../../assets/svg/car_grey.svg";
import ScooterIcon from "../../assets/svg/Scooter.svg";
import { ScrollView } from "react-native";
import ListPasssesView from "./ListPasssesView";

const AllPasses = ({ navigation, route }) => {
  const { booking } = useSelector((state) => state.bookingState);
  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const [passes, setPasses] = useState([]);
  const [buying, setBuying] = useState(false);
  useEffect(() => {
    fetchVoucers();
  }, []);

  const buyPass = async (val) => {
    setBuying(true);
    console.log(val);
    const tempData ={
      payment_id:"34243324",
      status:'Booked',
      pass_id:val?.id,
      charges:parseInt(val?.amount),
      remaining_hours:parseInt(val?.total_hours)
    }
    try {
      const response = await postDataApi("userPass", tempData);
      if (response?.status) {
        navigation.navigate("MyPasses", { screen: "userPasses" });
      }else{
        console.log(response)
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      setBuying(false);
    }
  };

  const fetchVoucers = async () => {
    dispatch(loadingState(true));
    try {
      const response = await getDataApi("pass");

      if (response?.status) {
        setPasses(response.data);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
    }
  };

  return (
    <>
      {buying && (
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={colors.appColor} />
          <Text style={{ color: "white", marginTop: 15 }}>Please Wait..</Text>
        </View>
      )}
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
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 150 }}
            >
              {passes?.map((item, index) => (
                <ListPasssesView
                  key={index}
                  selectedItem={(selected) => {
                    buyPass(selected);
                  }}
                  data={item}
                  type
                />
              ))}
            </ScrollView>
          </View>
        )}
      </Container>
    </>
  );
};

export default AllPasses;

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
