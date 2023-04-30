import { StyleSheet, Text, TextInput, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { BoxShadow } from "../Components";
import CheckBox from "@react-native-community/checkbox";
import { TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import { useSelector, useDispatch } from "react-redux";
import PressButton from "../Components/PressButton";
import { ScrollView } from "react-native";
import { hasValue, postDataApi } from "../../src/helpers";
import colors from "../../src/constants/colors";

const ProfileForm = ({ data = {} }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formikProps = useFormikContext();
  const { submitForm } = useFormikContext();

  const [checked, setChecked] = useState({
    toc: false,
    pricing: false,
    signIn: false,
  });

  const [backendError, setBackendError] = useState({
    mobile_validation: null,
    email_validation: null,
  });

  const checkLogin = async () => {
    let tempData = {
      email_or_phone:
        data?.login_type == "manual"
          ? formikProps.values.email_address
          : formikProps.values.mobile_number,
    };

    try {
      const response = await postDataApi(
        "get_user_data_by_emailOrPhone",
        tempData,
        false
      );
      console.log(response);
      if (response?.status) {
        if (data?.login_type == "manual") {
          setBackendError({
            mobile_validation: null,
            email_validation:
              "Email is already registered, try to login with social login.",
          });
        } else {
          setBackendError({
            mobile_validation:
              "Number is already registered, try to login with mobile number.",
            email_validation: null,
          });
        }
      } else {
        submitForm();
      }
    } catch (err) {
      console.log(err, "Receive an error");
    }
  };

  useEffect(() => {
    formikProps.setFieldValue("login_type", data?.login_type);
    formikProps.setFieldValue("socail_id", data?.socail_id);
    formikProps.setFieldValue("first_name", user?.first_name);
    formikProps.setFieldValue("last_name", user?.last_name);
    formikProps.setFieldValue("email_address", user?.email_address);
    formikProps.setFieldValue("mobile_number", user?.mobile_number);

    if (hasValue(data)) {
      if ("mobile_number" in data) {
        formikProps.setFieldValue("mobile_number", data?.mobile_number);
      } else {
      }

      formikProps.setFieldValue("first_name", data?.first_name);
      formikProps.setFieldValue("last_name", data?.last_name);
      formikProps.setFieldValue("profile_picture", data?.profile_picture);

      formikProps.setFieldValue("email_address", data?.email_address);
    }

    formikProps.validateForm();
  }, []);

  const checkDisabled = () => {
    if (
      checked?.toc &&
      checked.signIn &&
      checked.pricing &&
      formikProps.isValid
    ) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    formikProps.validateForm();
  }, [checked.toc]);

  return (
    <ScrollView><>
      <View style={styles.form_container}>
        <BoxShadow style={styles.form_inputWrap}>
          <TextInput
            onChangeText={formikProps.handleChange("first_name")}
            onBlur={formikProps.handleBlur("first_name")}
            value={formikProps.values.first_name}
            style={styles.form_input}
            placeholder="First Name"
          />
        </BoxShadow>
        {formikProps.touched.first_name && formikProps.errors.first_name && (
          <Text style={styles.errorText}>{formikProps.errors.first_name}</Text>
        )}
        <BoxShadow style={styles.form_inputWrap}>
          <TextInput
            onChangeText={formikProps.handleChange("last_name")}
            onBlur={formikProps.handleBlur("last_name")}
            value={formikProps.values.last_name}
            style={styles.form_input}
            placeholder="Last Name"
          />
        </BoxShadow>
        {formikProps.touched.last_name && formikProps.errors.last_name && (
          <Text style={styles.errorText}>{formikProps.errors.last_name}</Text>
        )}
        <BoxShadow style={styles.form_inputWrap}>
          <TextInput
            style={styles.form_input}
            maxLength={10}
            onChangeText={(val) => {
              if (backendError.mobile_validation) {
                setBackendError({ ...backendError, mobile_validation: null });
              }
              formikProps.setFieldValue("mobile_number", val);
            }}
            onBlur={formikProps.handleBlur("mobile_number")}
            value={formikProps.values.mobile_number}
            placeholder="Phone Number"
            editable={data?.mobile_number ? false : true}
          />
        </BoxShadow>
        {formikProps.touched.mobile_number &&
          formikProps.errors.mobile_number && (
            <Text style={styles.errorText}>
              {formikProps.errors.mobile_number}
            </Text>
          )}
        {backendError.mobile_validation && (
          <Text style={styles.errorText}>{backendError.mobile_validation}</Text>
        )}
        <BoxShadow style={styles.form_inputWrap}>
          <TextInput
            style={styles.form_input}
            onChangeText={(val) => {
              if (backendError.email_validation) {
                setBackendError({ ...backendError, email_validation: null });
              }
              formikProps.setFieldValue("email_address", val);
            }}
            editable={"email_address" in data ? false : true}
            onBlur={formikProps.handleBlur("email_address")}
            value={formikProps.values.email_address}
            placeholder="Email Address"
            keyboardType="email-address"
          />
        </BoxShadow>
        {formikProps.touched.email_address &&
          formikProps.errors.email_address && (
            <Text style={styles.errorText}>
              {formikProps.errors.email_address}
            </Text>
          )}

        {backendError.email_validation && (
          <Text style={styles.errorText}>{backendError.email_validation}</Text>
        )}
      </View>
      <View style={{ padding: Platform.OS == "ios" ? 10 : 0 }}>
        <View style={styles.checkbox_container}>
          <CheckBox
            disabled={false}
            value={checked.signIn}
            onValueChange={(newValue) =>
              setChecked({ ...checked, signIn: newValue })
            }
            tintColors={{ true: "#FECF3E", false: "#FECF3E" }}
            onTintColor={{ true: "#FECF3E", false: "#FECF3E" }}
            tintColor={"#FECF3E"}
            onCheckColor={"white"}
            boxType="square"
            onFillColor={"#FECF3E"}
          />
          <TouchableOpacity
            onPress={() => setChecked({ ...checked, signIn: !checked.signIn })}
          >
            <Text style={styles.label}>Keep Me Signed In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkbox_container}>
          <CheckBox
            disabled={false}
            value={checked.pricing}
            onValueChange={(newValue) =>
              setChecked({ ...checked, pricing: newValue })
            }
            tintColors={{ true: "#FECF3E", false: "#FECF3E" }}
            onTintColor={{ true: "#FECF3E", false: "#FECF3E" }}
            tintColor={"#FECF3E"}
            onCheckColor={"white"}
            boxType="square"
            onFillColor={"#FECF3E"}
          />
          <TouchableOpacity
            onPress={() =>
              setChecked({ ...checked, pricing: !checked.pricing })
            }
          >
            <Text style={styles.label}>Email Me About Special Pricing</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkbox_container}>
          <CheckBox
            style={styles.checkbox}
            disabled={false}
            value={checked.toc}
            onValueChange={(newValue) =>
              setChecked({ ...checked, toc: newValue })
            }
            tintColors={{ true: "#FECF3E", false: "#FECF3E" }}
            onTintColor={{ true: "#FECF3E", false: "#FECF3E" }}
            tintColor={"#FECF3E"}
            onCheckColor={"white"}
            boxType="square"
            onFillColor={"#FECF3E"}
          />
          <TouchableOpacity
            onPress={() => {
              setChecked({ ...checked, toc: !checked.toc });
            }}
          >
            <Text style={styles.label}>I accept Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginVertical: 15 }}>
          <PressButton
            disabled={checkDisabled()}
            pressed={checkLogin}
            text="Next"
            loading={false}
          />
        </View>
      </View>
      </>
    </ScrollView>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  form_container: {
    marginTop: 10,
  },
  form_inputWrap: {
    paddingVertical: Platform.OS === "ios" ? 15 : 5,
    paddingHorizontal: 15,
    borderColor: "lightgrey",
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: Platform.OS === "ios" ? 1 : 0,
    marginTop: Platform.OS === "ios" ? 10 : 0,
  },
  form_input: {
    fontSize: 16,
  },
  checkbox_container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 10 : 0,
  },

  label: {
    color: "#263228",
    opacity: 0.5,
    marginLeft: 10,
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
  errorText: {
    fontSize: 10,
    marginLeft: 15,
    marginBottom: 15,
    color: colors.appColor,
  },
});
