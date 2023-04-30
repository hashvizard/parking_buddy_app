import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Congrats from "../../assets/svg/Congratulation.svg";
import Lottie from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { postDataApi } from "../../src/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emptyUserSignupData, setLoggedIn, setUserBackendData } from "../../src/redux/actions";

const Congratulation = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [success, setsuccess] = useState(false);

  useEffect(() => {
    // Function to Validate an OTP through backend API

    signUp();
  }, []);

  const signUp = async () => {
    let formatedData = {
      name: `${user?.first_name} ${user?.last_name}`,
      phone: user?.mobile_number,
      email: user?.email_address,
      password: "null",
      role_id: 1,
      location: user?.my_location,
      status: "active",
      profile_image: user?.profile_picture,
      latitude: user?.latitude,
      longitude: user?.longitude,
      login_type: user?.login_type,
      socail_id: user?.socail_id,
    };

    try {
      var formData = new FormData();
      Object.entries(formatedData).forEach(function (key) {
        formData.append(key[0], key[1]);
      });

      const response = await postDataApi("user", formData, false, true);
     
      if (response?.status) {
        await AsyncStorage.setItem(
          "parking_buddy_access_token",
          response?.data?.token
        );
       
        dispatch(setUserBackendData(response.data));
        setsuccess(true);
      } else {
        console.log("Receive an error",response);
      }
    } catch (err) {
      console.log(err, "Receive an errdor");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "30%", width: "100%" }}>
        <Lottie
          source={
            success
              ? require("../../assets/json/Congrats_Blue.json")
              : require("../../assets/json/profile_create.json")
          }
          autoPlay={true}
          loop={success ? false : true}
        />
      </View>
      <View style={{}}>
        <Text style={styles.title}>
          {success ? `Congrats ${user?.first_name} !` : "Creating your"}
        </Text>
        <Text style={styles.subtitle}>
          {success ? `Your Profile Is Ready To Use` : "Account"}
        </Text>
      </View>
      {success && (
        <View style={styles.bottom_container}>
          <TouchableOpacity onPress={() => {
              dispatch(emptyUserSignupData());
              dispatch(setLoggedIn(true));
          }}>
            <View style={styles.next_container}>
              <Text
                style={{
                  color: "#000",
                  fontSize: 16,
                  fontWeight: "500",
                  letterSpacing: 0.5,
                }}
              >
                Try ParkinBuddy
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default Congratulation;

const styles = StyleSheet.create({
  container: {
    fontFamily: "Poppins",
    padding: 15,
    flex: 1,
    backgroundColor: "#fecf3e",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 27,
    lineHeight: 40,
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    marginTop: 0,
    fontSize: 20,
    color: "#263228",
    fontWeight: "300",
    lineHeight: 33,
    textAlign: "center",
  },
  next_container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  bottom_container: {
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 40,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
