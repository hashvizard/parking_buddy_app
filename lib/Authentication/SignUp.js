import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import FacebookIcon from "../../assets/svg/facebook.svg";
import GoogleIcon from "../../assets/svg/google.svg";
import { Title, Subtitle, Button, BoxShadow, Container } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyUserSignupData,
  setLoggedIn,
  setNotificationEmpty,
  setUserBackendData,
  setUserData,
} from "../../src/redux/actions";
import PressButton from "../Components/PressButton";
import {
  facebookLogin,
  getFcmToken,
  parseDisplayName,
  postDataApi,
} from "../../src/helpers";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { loadingState } from "../../src/redux/actions";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [loginType, setLoginType] = useState(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const fbLogin = async () => {
    setLoginType(0);
    dispatch(loadingState(true));
    facebookLogin()
      .then((data) => {
        let fbData = {
          first_name: data?.firstName,
          last_name: data?.lastName,
          email_address: data?.email,
          mobile_number: "",
          // profile_picture: data?.imageURL,
          socail_id: data?.userID,
          login_type: "facebook",
        };
        let loginData = { email_or_phone: data?.email };
        logInCheck(loginData, fbData);
        dispatch(loadingState(false));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(loadingState(false));
      });
  };

  const googleLogin = async () => {
    setLoginType(1);
    dispatch(loadingState(true));
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth()
        .signInWithCredential(googleCredential)
        .then((user) => {
          const { firstName, lastName } = parseDisplayName(
            user?.user?.displayName
          );

          let googleData = {
            first_name: firstName,
            last_name: lastName,
            email_address: user?.user?.email,
            mobile_number: user?.user?.phoneNumber,
            profile_picture: user?.user?.photoURL,
            socail_id: user?.user?.uid,
            login_type: "google",
          };
          let loginData = { email_or_phone: user?.user?.email };
          GoogleSignin.revokeAccess().then(() => {
            GoogleSignin.signOut();
            logInCheck(loginData, googleData);
          });
        });
    } catch (error) {
      dispatch(loadingState(false));
      console.log(error);
    }
  };

  const signUp = async (socailData) => {
    // socailData
    let formatedData = {
      name: `${socailData.first_name} ${socailData.last_name}`,
      phone: user?.mobile_number,
      email: socailData?.email_address,
      password: null,
      role_id: 1,
      location: null,
      status: "active",
      // profile_image: socailData?.profile_picture,
      latitude: null,
      longitude: null,
      login_type: socailData?.login_type,
      socail_id: socailData?.socail_id,
    };

    formatedData.fcm_token = await getFcmToken();

    try {
      // var formData = new FormData();
      // Object.entries(formatedData).forEach(function (key) {
      //   formData.append(key[0], key[1]);
      // });

      const response = await postDataApi("user", formatedData, false);

      if (response?.status) {
        await AsyncStorage.setItem(
          "parking_buddy_access_token",
          response?.data?.token
        );
        dispatch(setNotificationEmpty([]));
        dispatch(emptyUserSignupData());
        dispatch(setUserBackendData(response.data));
        dispatch(setLoggedIn(true));
      } else {
        console.log("Error Responsedd", response);
      }
    } catch (err) {
      dispatch(loadingState(false));
      console.log(err, "Receive an errdor");
    } finally {
      dispatch(loadingState(false));
    }
  };

  const logInCheck = async (data, socailData) => {
    let fcm_token = await getFcmToken();

    let tempData = { ...data, fcm_token: fcm_token };

    try {
      const response = await postDataApi(
        "get_user_data_by_emailOrPhone",
        tempData,
        false
      );
      if (response?.status) {
        await AsyncStorage.setItem(
          "parking_buddy_access_token",
          response?.data?.token
        );
        dispatch(setNotificationEmpty([]));
        dispatch(emptyUserSignupData());
        dispatch(setUserBackendData(response.data));
        dispatch(setLoggedIn(true));
      } else {
        signUp(socailData);
      }
    } catch (err) {
      console.log(err, "Receive an error");
    }
  };
  return (
    <Container>
      <View
        style={{
          flexShrink: 1,
          width: "100%",
          marginTop: 40,
          marginBottom: 15,
        }}
      >
        <Title text="Enter your mobile number" />
        <Subtitle text="By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated dialer, from ParkinBuddy and its affiliates to the number provided." />
        <TouchableOpacity onPress={() => navigation.navigate("Legal")}>
          <Subtitle text="Also you agree to accept the Privacy Policy and Terms and Conditions." />
        </TouchableOpacity>
      </View>
      <View style={styles.mob_container}>
        <TextInput
          style={styles.cc_mobile}
          editable={loading ? false : true}
          selectTextOnFocus={false}
          value="+91"
          placeholderTextColor="#c1c1c1"
        />
        <TextInput
          style={styles.mobile_no}
          maxLength={10}
          value={user?.mobile_number}
          onChangeText={(text) =>
            dispatch(setUserData({ ...user, mobile_number: text }))
          }
          placeholder="Enter your mobile number"
          placeholderTextColor="#26322840"
          keyboardType="number-pad"
        />
      </View>
      {!keyboardVisible && (
        <View style={styles.suw_container}>
          <TouchableOpacity disabled={loading} onPress={fbLogin}>
            <BoxShadow style={styles.log_button}>
              {loading && loginType == 0 ? (
                <ActivityIndicator animating={true} color="white" />
              ) : (
                <FacebookIcon width={30} height={30} />
              )}

              <Text style={styles.log_button_text}>Continue with Facebook</Text>
            </BoxShadow>
          </TouchableOpacity>
          <TouchableOpacity disabled={loading} onPress={googleLogin}>
            <BoxShadow style={styles.log_button}>
              {loading && loginType == 1 ? (
                <ActivityIndicator animating={true} color="white" />
              ) : (
                <GoogleIcon width={28} height={29} />
              )}

              <Text style={styles.log_button_text}>Continue with Google</Text>
            </BoxShadow>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ alignItems: "center" }}>
        <PressButton
          disabled={user?.mobile_number?.length >= 10 ? false : true}
          text="Next"
          pressed={() => {
            navigation.navigate("OTP");
          }}
        />
      </View>
    </Container>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  mob_container: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  cc_mobile: {
    letterSpacing: 0.9,
    flex: 1,
    backgroundColor: "#08452320",
    borderRadius: 10,
    padding: 15,
    color: "#26322890",
    marginRight: 10,
    textAlign: "center",
    fontSize: 16,
  },
  mobile_no: {
    letterSpacing: 0.9,
    flex: 4,
    backgroundColor: "#08452320",
    borderRadius: 10,
    padding: 15,
    color: "#26322890",
    fontSize: 16,
  },
  suw_container: {
    marginTop: 20,
  },
  log_button: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 22,
  },
  log_button_text: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    color: "#09051C",
    marginLeft: 10,
    letterSpacing: 0.7,
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
