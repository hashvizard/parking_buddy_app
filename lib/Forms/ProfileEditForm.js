import { StyleSheet, Text, TextInput, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { BoxShadow } from "../Components";
import CheckBox from "@react-native-community/checkbox";
import { TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import { useSelector, useDispatch } from "react-redux";
import PressButton from "../Components/PressButton";
import { ScrollView } from "react-native";
import { hasValue, parseDisplayName, postDataApi } from "../../src/helpers";
import { loadingState } from "../../src/redux/actions";
import colors from "../../src/constants/colors";

const ProfileEditForm = ({
  data = {},
  userData = {},
  backendError,
  setBackendError,
}) => {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const formikProps = useFormikContext();
  const { submitForm } = useFormikContext();

  const checkLogin = async () => {
    dispatch(loadingState(true));
    submitForm();
  };

  useEffect(() => {
    console.log(userData?.email)
    formikProps.setFieldValue(
      "first_name",
      parseDisplayName(userData?.name)?.firstName
    );
    formikProps.setFieldValue(
      "last_name",
      parseDisplayName(userData?.name)?.lastName
    );
    formikProps.setFieldValue("email_address", userData?.email);
    formikProps.setFieldValue("mobile_number", userData?.phone);
    setTimeout(function () {
      formikProps.validateForm();
    }, 1000);
  }, []);

  const checkDisabled = () => {
    if (formikProps.isValid) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ScrollView>
      <View style={styles.form_container}>
        <View style={styles.form_inputWrap}>
          <TextInput
            style={styles.form_input}
            placeholder={userData?.name != null ? parseDisplayName(userData?.name)?.firstName : 'First Name'}
            onChangeText={formikProps.handleChange("first_name")}
            onBlur={formikProps.handleBlur("first_name")}
            value={formikProps.values.first_name}
          />

          <TextInput
            style={[styles.form_input, { marginLeft: 10 }]}
            onChangeText={formikProps.handleChange("last_name")}
            onBlur={formikProps.handleBlur("last_name")}
            value={formikProps.values.last_name}
            placeholder={userData?.name != null ? parseDisplayName(userData?.name)?.lastName: 'Last Name'}
          />
        </View>
        <View style={styles.form_inputWrap}>
          <TextInput
            style={styles.form_input}
            maxLength={10}
            placeholder={userData?.phone != null ? userData?.phone :"Add Your Phone Number"}
            onChangeText={(val) => {
              if (backendError.mobile_validation) {
                setBackendError({ ...backendError, mobile_validation: null });
              }
              formikProps.setFieldValue("mobile_number", val);
            }}
            keyboardType="number-pad"
            onBlur={formikProps.handleBlur("mobile_number")}
            editable={userData.login_type == "manual" ? false : true}
          />
        </View>
        <View style={styles.errorPadding}>
          {formikProps.touched.mobile_number &&
            formikProps.errors.mobile_number && (
              <Text style={styles.errorText}>
                {formikProps.errors.mobile_number}
              </Text>
            )}

          {backendError.mobile_validation && (
            <Text style={styles.errorText}>
              {backendError.mobile_validation}
            </Text>
          )}
        </View>
        <View style={styles.form_inputWrap}>
          <TextInput
            style={styles.form_input}
            placeholder={userData?.email != null ? userData?.email :"Email Address"}
            keyboardType="email-address"
            editable={
              userData.login_type == "facbook" ||
              userData.login_type == "google"
                ? false
                : true
            }
            onChangeText={(val) => {
              if (backendError.email_validation) {
                setBackendError({ ...backendError, email_validation: null });
              }
              formikProps.setFieldValue("email_address", val);
            }}
            onBlur={formikProps.handleBlur("email_address")}
            value={formikProps.values.email_address != null ? formikProps.values.email_address :''}
          />
        </View>
        <View style={styles.errorPadding}>
          {formikProps.touched.email_address &&
            formikProps.errors.email_address && (
              <Text style={styles.errorText}>
                {formikProps.errors.email_address}
              </Text>
            )}

          {backendError.email_validation && (
            <Text style={styles.errorText}>
              {backendError.email_validation}
            </Text>
          )}
        </View>
        <View style={{ padding: Platform.OS == "ios" ? 10 : 0 }}>
          <View style={{ alignItems: "center", marginVertical: 15 }}>
            <PressButton
              disabled={checkDisabled()}
              pressed={checkLogin}
              text="Submit"
              loading={loading}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileEditForm;

const styles = StyleSheet.create({
  pp_image: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: "#fecf3e",
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 25,
  },
  errorText: {
    color: colors.appColor,

    fontSize: 12,
  },
  form_container: {
    marginTop: 10,
  },
  form_inputWrap: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  form_input: {
    fontSize: 16,
    flex: 1,
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#08452320",
    letterSpacing: 0.7,
  },
  errorPadding: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  checkbox_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -10,
  },
  label: {
    color: "#263228",
    opacity: 0.5,
  },
  bottom_container: {
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 20,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
