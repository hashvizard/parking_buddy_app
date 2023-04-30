import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { Back, Title, Button, BoxShadow, Container } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../src/redux/actions";
import * as yup from "yup";
import { Formik, FormikProps } from "formik";
import ProfileForm from "../Forms/ProfileForm";
import PressButton from "../Components/PressButton";

const UserDetails = (props) => {

  const [data, setdata] = useState(props?.route?.params);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formikRef = useRef(null);
  const [toc, setToc] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [signed, setSigned] = useState(false);

  // Handling the Validations
  const profileValidationSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    mobile_number: yup
      .string()
      .min(10, ({ min }) => `Mobile number should have atlest ${min} digits`)
      .max(10, ({ max }) => `Mobile number should have atlest ${min} digits`)
      .required("Mobile Number is required"),
    last_name: yup.string().required("Last Name is required"),
    email_address: yup.string().email().required("Email address is required"),
  });

  return (
    <Container>
      <Back navigation={props.navigation} />
      <View style={{ width: "75%" }}>
        <Title text="Tell Us A Little Bit About You!" />
      </View>
      <Formik
        innerRef={formikRef}
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={profileValidationSchema}
        initialValues={{
          mobile_number: "",
          first_name: "",
          last_name: "",
          email_address: "",
          socail_id:"",
          login_type:"manual",
        }}
        onSubmit={(values) => {
          dispatch(setUserData({...user,...values}))
          props.navigation.navigate("UploadPhoto")
        }}
      >
      <ProfileForm data={data} />
      </Formik>
    
    </Container>
  );
};
export default UserDetails;

const styles = StyleSheet.create({
  form_container: {
    marginTop: 10,
  },
  form_inputWrap: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 22,
  },
  form_input: {
    fontSize: 16,
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
    bottom: 40,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
