import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AddVehicle from "../Others/AddVehicle";
import { Formik } from "formik";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { postDataApi, putDataApi, replaceDataById } from "../../src/helpers";
import { loadingState, vehicleData } from "../../src/redux/actions";
import { Keyboard } from "react-native";

const AddNewVehicle = ({ navigation, route }) => {
  const { vehicles } = useSelector((state) => state.vehicleReducer.myVehicle);


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
      pincode: values?.pincode,
      city: values?.city,
    };

    try {
      var formData = new FormData();
      Object.entries(formatedData).forEach(function (key) {
        formData.append(key[0], key[1]);
      });

      const response = await postDataApi(`vehicle`, formData, true, true);
      if (response?.status) {
        Keyboard.dismiss();
    
        let tempdata = [...vehicles]
        tempdata.push(response?.data);
        dispatch(vehicleData({ vehicles: tempdata }));
        navigation.goBack();
      } else {
        console.log(response,"Error");
      }
    } catch (err) {
      dispatch(loadingState(false));
      console.log(err, "Receive an errdor");
    }
  };

  // NOTE : Need to be fixed
  const handleVehicleUpdate = async (values, data) => {
   
    let formatedData = {
      id:data?.id,
      name: values?.name,
      type:  values?.type,
      number: values?.number,
      rc_image: values?.rc_image,
      address: values?.address,
      pincode: values?.pincode,
      city: values?.city,
    };

    try {
      var formData = new FormData();
      Object.entries(formatedData).forEach(function (key) {
        formData.append(key[0], key[1]);
      });

      const response = await postDataApi(
        'vehicleUpdate',
        formData,
        true,
        true
      );
      if (response?.status) {
      
        let tempData = await  replaceDataById(vehicles, data?.id, response?.data);
        dispatch(vehicleData({ vehicles: tempData }));
        navigation.goBack();
      } else {
        console.log(response,"Error");
      }
    } catch (err) {
      dispatch(loadingState(false));
      console.log(err, "Receive an errdor");
    } finally {
      dispatch(loadingState(false));
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
          try {
            const { data } = route?.params;
            if (data) {
             
              handleVehicleUpdate(values, data);
            }
          } catch (error) {
            handleVehicleSubmission(values);
          }

          //   dispatch(setUserData({ ...user, ...values }));
          //   props.navigation.navigate("UploadPhoto");
        }}
      >
        <AddVehicle navigation={navigation} route={route} />
      </Formik>
    </View>
  );
};

export default AddNewVehicle;

const styles = StyleSheet.create({});
