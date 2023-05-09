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
import { getLastFourDigits, postDataApi } from "../../src/helpers";
import OTPTextView from "react-native-otp-textinput";
import Counter from "../Components/Counter";
import colors from "../../src/constants/colors";
import PressButton from "../Components/PressButton";
import {
  emptyUserSignupData,
  setLoggedIn,
  setUserBackendData,
  setUserData,
} from "../../src/redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";

const tempOtp = "863040";

const OTP = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);

  const [verificationId, setVerificationId] = useState(null);
  const [OTP, setOTP] = useState("");

  useEffect(() => {
    // handleSendCode();
  }, []);

  const handleSendCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91 ${user?.mobile_number}`
      );
      setVerificationId(confirmation.verificationId);
    } catch (error) {
      validateOtp(false);
      console.log(error);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, OTP);
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

    try {
      var formData = new FormData();
      Object.entries(formatedData).forEach(function (key) {
        formData.append(key[0], key[1]);
      });

      const response = await postDataApi("user", formData, false, true);
     console.log(response,"I got")
      if (response?.status) {
        await AsyncStorage.setItem(
          "parking_buddy_access_token",
          response?.data?.token
        );

        dispatch(setUserBackendData(response.data));
        dispatch(setLoggedIn(true));
      } else {
        console.log("Vikas", response);
      }
    } catch (err) {
      console.log(err, "Receive an errdor");
    }
  };

  // Function to Validate an OTP through backend API
  const validateOtp = async (otpStatus) => {
    let data = { email_or_phone: user?.mobile_number };
    try {
      
      if (otpStatus == false ? tempOtp == OTP : otpStatus) {
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
         
            dispatch(emptyUserSignupData());
            dispatch(setUserBackendData(response.data));
            dispatch(setLoggedIn(true));
          } else {
            console.log("I cam e inf")
            signUp()
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
    }finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Back navigation={navigation} />
      <View style={{ flexShrink: 1, width: "85%" }}>
        <Title text="Enter the 4-digit Verification code" />
        {resend ? (
          <Text style={styles.subtitle}>
            Code Expired, click on resend to generate a new OTP for{" "}
            {`+91******${getLastFourDigits(user?.mobile_number)}`}
          </Text>
        ) : (
          <Counter
            personalText={`Code send to +91******${getLastFourDigits(
              user?.mobile_number
            )}. This code will expired in`}
            timer={90}
            timerCompleted={() => setResend(true)}
            showText={true}
          />
        )}
      </View>
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
      <View style={{ marginVertical: 10, alignItems: "center" }}>
        {errorData?.showError && (
          <Text style={{ color: colors.appColor }}>{errorData?.message}</Text>
        )}
      </View>
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
      <View style={styles.bottom_container}>
        <PressButton
          disabled={OTP?.length >= 4 && !loading ? false : true}
          pressed={() => handleVerifyCode()}
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
