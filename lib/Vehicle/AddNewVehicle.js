import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AddVehicle from "../Others/AddVehicle";
import { Formik } from "formik";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { postDataApi } from "../../src/helpers";
import { loadingState } from "../../src/redux/actions";
import { Keyboard } from "react-native";

const AddNewVehicle = ({ navigation }) => {
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  // Handling the Validations
  const vehicleValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    type: yup.string().required("Type is required"),
    number: yup.string().required("Vehicle Number is required"),
    city: yup.string().required("city is required"),
    pincode: yup.string().required("Pincode is required"),
    address: yup.string().required("Address is required"),
  });


  const handleVehicleSubmission = async (values) => {
    let formatedData = {
      name: values?.name,
      type: values?.type,
      number: values?.number,
      rc_image: values?.rc_image,
      address: values?.address,
      pincode:values?.pincode,
      city: values?.city
    };

    try {
      var formData = new FormData();
      Object.entries(formatedData).forEach(function (key) {
        formData.append(key[0], key[1]);
      });

      const response = await postDataApi(
        `vehicle`,
        formData,
        true,
        true
      );
      if (response?.status) {
        // dispatch(emptyUserSignupData());
        Keyboard.dismiss();
        // dispatch(setUserBackendData(response.data));
        dispatch(loadingState(false));
        navigation.goBack();
      } else {
        console.log(response)
        dispatch(loadingState(false));
      }
    } catch (err) {
      dispatch(loadingState(false));
      console.log(err, "Receive an errdor");
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <Formik
        innerRef={formikRef}
        validateOnBlur={true}
        validateOnChange={true}
        validationSchema={vehicleValidationSchema}
        initialValues={{
          rc_image: "",
          name: "",
          type: 0,
          number: "",
          city: "",
          pincode: "",
          address: "",
        }}
        onSubmit={(values) => {
            handleVehicleSubmission(values);
          //   dispatch(setUserData({ ...user, ...values }));
          //   props.navigation.navigate("UploadPhoto");
        }}
      >
        <AddVehicle navigation={navigation} />
      </Formik>
    </View>
  );
};

export default AddNewVehicle;

const styles = StyleSheet.create({});
