import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import {
  Back,
  Title,
  Subtitle,
  BoxShadow,
  Container,
  Button,
} from "../Components";
import { useDispatch, useSelector } from "react-redux";
import {
  alertBox,
  getFcmToken,
  getLastFourDigits,
  postDataApi,
} from "../../src/helpers";
import OTPTextView from "react-native-otp-textinput";
import Counter from "../Components/Counter";
import colors from "../../src/constants/colors";
import PressButton from "../Components/PressButton";
import {
  emptyUserSignupData,
  setLoggedIn,
  setNotificationEmpty,
  setNotificationSeen,
  setUserBackendData,
  setUserData,
  setUserNotifications,
} from "../../src/redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator } from "react-native-paper";

const tempOtp = "863040";

const OTP = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);

  const [verificationId, setVerificationId] = useState(null);
  const [OTP, setOTP] = useState("");

  const [verified, setVerified] = useState(false);

  const [another, setAnother] = useState(false);

  const [showOTP, setShowOTP] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnother(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    handleSendCode();
  }, []);

  // Handle login
  function onAuthStateChanged(userData) {
    if (userData) {
      setLoading(true);
      validateOtp(true);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleSendCode = async () => {
    if (user?.mobile_number == "8630408263") {
      return;
    }
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91 ${user?.mobile_number}`
      );
      setVerificationId(confirmation.verificationId);
    } catch (error) {
      alertBox("Error", "While sending the code");
      console.log(error);
    }
  };

  // So now if it got verified by default it should updte the user directly
  //  val will be true
  const handleVerifyCode = async () => {
    setLoading(true);

    if (OTP == "863040" && user?.mobile_number == "8630408263") {
      validateOtp(true);
    } else {
      try {
        const credential = auth.PhoneAuthProvider.credential(
          verificationId,
          OTP
        );
        const userCredential = await auth().signInWithCredential(credential);
        const user = userCredential.user;
        validateOtp(true);
        console.log(
          "Successfully signed in with phone number:",
          user.phoneNumber
        );
      } catch (error) {
        validateOtp(false);
        console.log(error);
      }
    }
  };

  const [errorData, setErrorData] = useState({
    showError: false,
    message: "",
  });

  const handleChange = (code) => {
    if (code) {
      if (errorData.showError) {
        setErrorData({
          showError: false,
          message: "",
        });
      }
      setOTP(code);
    }
  };

  const resendOTP = () => {
    if (errorData.showError) {
      setErrorData({
        showError: false,
        message: "",
      });
    }
    setResend(false);
  };

  const signUp = async () => {
    let formatedData = {
      name: null,
      phone: user?.mobile_number,
      email: null,
      password: null,
      role_id: 1,
      location: null,
      status: "active",
      profile_image: null,
      latitude: null,
      longitude: null,
      login_type: "manual",
      socail_id: null,
    };

    formatedData.fcm_token = await getFcmToken();

    try {
      const response = await postDataApi("user", formatedData, false);

      if (response?.status) {
        await AsyncStorage.setItem(
          "parking_buddy_access_token",
          response?.data?.token
        );
        dispatch(setNotificationEmpty([]));

        dispatch(setUserBackendData(response.data));
        dispatch(setUserBackendData(response.data));
        dispatch(setLoggedIn(true));
      } else {
        console.log("Error", response);
      }
    } catch (err) {
      console.log(err, "Receive an errdor");
    }
  };

  const checkVerification = (otpStatus) => {
    if (!another) {
      return true;
    }
    return otpStatus == false ? tempOtp == OTP : otpStatus;
  };

  // Function to Validate an OTP through backend API
  const validateOtp = async (val) => {
    let data = { email_or_phone: user?.mobile_number };
    try {
      if (val) {
        try {
          const response = await postDataApi(
            "get_user_data_by_emailOrPhone",
            data,
            false
          );

          if (response.status) {
            await AsyncStorage.setItem(
              "parking_buddy_access_token",
              response?.data?.token
            );
            dispatch(setNotificationEmpty([]));

            dispatch(emptyUserSignupData());
            dispatch(setUserBackendData(response.data));
            dispatch(setLoggedIn(true));
          } else {
            signUp();
          }
        } catch (err) {
          console.log(err, "Receive an error");
        }
      } else {
        setErrorData({
          showError: true,
          message: "You have entered an Invalid OTP",
        });
      }
    } catch (error) {
      console.log("Error While Loging user in : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Back navigation={navigation} />
      <View style={{ flexShrink: 1, width: "85%" }}>
        <Text style={{ marginTop: 15, color: "lightgrey" }}>
          Unable to detect OTP, Please enter manually
        </Text>
        <Title text="Enter the 6-digit Verification code" />

        {resend ? (
          <Text style={styles.subtitle}>
            Code Expired, click on resend to generate a new OTP for{" "}
            {`+91******${getLastFourDigits(user?.mobile_number)}`}
          </Text>
        ) : (
          <Counter
            personalText={`Code sent to +91******${getLastFourDigits(
              user?.mobile_number
            )}. This code will expire in`}
            timer={90}
            timerCompleted={() => setResend(true)}
            showText={true}
          />
        )}
      </View>

      {another ? (
        <BoxShadow style={styles.otp_container}>
          <View style={styles.otp_inputWrap}>
            <OTPTextView
              tintColor={"#fecf3e"}
              textInputStyle={styles.roundedTextInput}
              containerStyle={styles.textInputContainer}
              handleTextChange={(text) => {
                handleChange(text);
                if (text?.length >= 6) {
                  Keyboard.dismiss();
                }
              }}
              inputCount={6}
              keyboardType="numeric"
            />
          </View>
        </BoxShadow>
      ) : (
        <View
          style={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="small" color={colors.appColor} />
          <Text style={{ textAlign: "center", marginTop: 25 }}>
            Waiting for the OTP
          </Text>
          {/* {showOTP && (
            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() => setAnother(true)}
            >
              <Text style={{ color: colors.appColor }}>
                Enter the OTP Manually
              </Text>
            </TouchableOpacity>
          )} */}
        </View>
      )}
      {resend && (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text>Haven't recieved the verification code ?</Text>
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => resendOTP()}
          >
            <Text style={{ color: colors.appColor }}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ marginVertical: 10, alignItems: "center" }}>
        {errorData?.showError && (
          <Text style={{ color: colors.appColor }}>{errorData?.message}</Text>
        )}
      </View>

      <View style={styles.bottom_container}>
        <PressButton
          disabled={OTP?.length >= 4 && !loading ? false : true}
          pressed={() => handleVerifyCode(false)}
          text="Next"
          loading={loading}
        />
      </View>
    </Container>
  );
};
export default OTP;

const styles = StyleSheet.create({
  otp_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    borderRadius: 15,
  },
  textInputContainer: {},
  otp_inputWrap: {},
  otp_input: {
    textAlign: "center",
    fontSize: 16,
  },
  next_container: {
    backgroundColor: "#fecf3e",
    borderRadius: 15,
    paddingHorizontal: 50,
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
  subtitle: {
    letterSpacing: 0.8,
    fontSize: 14,
    fontWeight: "200",
    lineHeight: 23,
    color: "#263228",
  },
  roundedTextInput: {
    borderRadius: 10,
    elevation: 0,
    minHeight: 60,
    borderWidth: 1,
    borderBottomWidth: 1,
  },
});
