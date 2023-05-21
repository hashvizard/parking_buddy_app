import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Back, Title, Container, Button, BoxShadow } from "../Components";
import VoucherIcon from "../../assets/svg/Voucher Icon.svg";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext } from "formik";
import colors from "../../src/constants/colors";
import PressButton from "../Components/PressButton";
import { loadingState, vehicleData } from "../../src/redux/actions";
import { ScrollView } from "react-native";
import { chooseFile, delDataApi, hasValue, imageCrop } from "../../src/helpers";
import GalleryIcon from "../../assets/svg/Gallery.svg";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import CarIcon from "../../assets/svg/Car.svg";
import ScooterIcon from "../../assets/svg/Scooter.svg";
import CarGreyIcon from "../../assets/svg/car_grey.svg";
import ScooterYellowIcon from "../../assets/svg/bikeyellow.svg";
const AddVehicle = ({ navigation, route }) => {
  const { loading } = useSelector((state) => state.appState);
 
  const { vehicles } = useSelector(
    (state) => state.vehicleReducer.myVehicle
  );

  const [deleting, setDeleting] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const formikProps = useFormikContext();
  const { submitForm } = useFormikContext();

  // const [toggleCheckBox, setToggleCheckBox] = useState(false);
  // const [selectedValue, setSelectedValue] = useState("java");
  // const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    try {
      const { data } = route?.params;
      if (data) {
        formikProps.setFieldValue("name", data?.name);
        formikProps.setFieldValue("type", data?.type);
        formikProps.setFieldValue("number", data?.number);
        formikProps.setFieldValue("rc_image", data?.rc_image);
        formikProps.setFieldValue("address", data?.address);
        formikProps.setFieldValue("pincode", data?.pincode);
        formikProps.setFieldValue("city", data?.city);
      }
      setEdit(true);
    } catch (error) {
      setEdit(false);
      console.log(error);
    }
  }, []);


  // NOTE : Need to be fixed
  const handleVehicleDelete = async () => {
    setDeleting(true);
    try {
      const { data } = route?.params;

      const response = await delDataApi(
        `vehicle/${data?.id}`,
        true,
      );
      if (response?.status) {
        let tempData = [...vehicles].filter(obj => obj.id !== data?.id);
        
        dispatch(vehicleData({ vehicles: tempData }));
        navigation.goBack();
      } else {
    
        setDeleting(false);
      }
    } catch (err) {
      setDeleting(false);
      console.log(err, "Receive an errdor");
    } finally {
      setDeleting(false);
    }
  };

  const checkDisabled = () => {
    if (formikProps.isValid) {
      return false;
    } else {
      return true;
    }
  };

  const fromGallery = async () => {
    chooseFile("photo")
      .then((response) => {
        cropImage(response.uri);
      })
      .catch((err) => console.log("Error While image Selection :", err));
  };

  const cropImage = async (path) => {
    imageCrop(path)
      .then((response) => {
        // dispatch(setUserData({ ...user, profile_picture: response.path }));
      })
      .catch((err) => console.log("Error While image Selection :", err));
  };

  return (
    <Container>
      <Back navigation={navigation} />
      <View
        style={{
          flexShrink: 1,
          width: "85%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title text="Add A New Vehicle For Faster Checkout!" />
        {edit && (
          <Pressable
            onPress={() => handleVehicleDelete()}
            style={{ flexGrow: 1, alignItems: "flex-end", width: "25%" }}
          >
            {deleting ? (
              <ActivityIndicator size="small" color={colors.appColor} />
            ) : (
              <Icon name="trash-can" size={34} color={colors.appColor} />
            )}
          </Pressable>
        )}
      </View>
      <ScrollView>
        <View style={styles.form_container}>
          {/* <TouchableOpacity style={{marginBottom:19}}>
            <BoxShadow style={styles.log_button}>
              <TouchableOpacity
                onPress={() => fromGallery()}
                style={styles.icon_container}
              >
                <GalleryIcon />
              </TouchableOpacity>
           
            </BoxShadow>
            <Text style={styles.log_button_text}>Add Car Image</Text>
          </TouchableOpacity> */}
        <View style={styles.vehicle_wrapper}>
                  <TouchableOpacity
                    style={[
                      styles.vehicle,
                      formikProps.values.type === 1
                        ? { borderWidth: 2, borderColor: "#FECF3E80" }
                        : null,
                    ]}
                    onPress={() =>
                      formikProps.setFieldValue("type", 1)
                     
                    }
                  >
                    {formikProps.values.type == 0 ? (
                      <CarGreyIcon width={80} height={50} />
                    ) : (
                      <CarIcon width={80} height={50} />
                    )}

                    <Text style={styles.vehicle_text}>4 Wheeler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.vehicle,
                      formikProps.values.type === 0
                        ? { borderWidth: 2, borderColor: "#FECF3E80" }
                        : null,
                      { marginLeft: 10 },
                    ]}
                    onPress={() =>
                      formikProps.setFieldValue("type", 0)
                    }
                  >
                    {formikProps.values.type == 1 ? (
                      <ScooterIcon width={80} height={50} />
                    ) : (
                      <ScooterYellowIcon width={80} height={50} />
                    )}

                    <Text style={styles.vehicle_text}>2 Wheeler</Text>
                  </TouchableOpacity>
                </View>



          <View style={styles.form_inputWrap}>
            <View style={{ width: "100%" }}>
              <TextInput
                onChangeText={formikProps.handleChange("name")}
                onBlur={formikProps.handleBlur("name")}
                value={formikProps.values.name}
                style={[styles.form_input, { flex: 3 }]}
                placeholder="Name Of Owner"
              />
            </View>
            {/* <TextInput
              onChangeText={formikProps.handleChange("type")}
              onBlur={formikProps.handleBlur("type")}
              value={formikProps.values.type}
              style={[styles.form_input, { marginLeft: 10 }]}
              placeholder="Type"
            /> */}
            
          </View>

          {formikProps.touched.name && formikProps.errors.name && (
            <Text style={styles.errorText}>{formikProps.errors.name}</Text>
          )}

          <View style={styles.form_inputWrap}>
            <TextInput
              onChangeText={formikProps.handleChange("number")}
              onBlur={formikProps.handleBlur("number")}
              value={formikProps.values.number}
              style={styles.form_input}
              placeholder="Vehicle Registration Number"
            />
          </View>
          {formikProps.touched.number && formikProps.errors.number && (
            <Text style={styles.errorText}>{formikProps.errors.number}</Text>
          )}
          <View style={styles.form_inputWrap}>
            <TextInput
              style={styles.form_input}
              onChangeText={formikProps.handleChange("city")}
              onBlur={formikProps.handleBlur("city")}
              value={formikProps.values.city}
              placeholder="City"
            />

            <TextInput
              onChangeText={formikProps.handleChange("pincode")}
              onBlur={formikProps.handleBlur("pincode")}
              value={formikProps.values.pincode}
              style={[styles.form_input, { marginLeft: 10 }]}
              maxLength={6}
              placeholder="Pincode"
              keyboardType="number-pad"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {formikProps.touched.city && formikProps.errors.city && (
              <Text style={{ ...styles.errorText, width: "50%" }}>
                {formikProps.errors.city}
              </Text>
            )}
            {formikProps.touched.pincode && formikProps.errors.pincode && (
              <Text style={{ ...styles.errorText, width: "50%" }}>
                {formikProps.errors.pincode}
              </Text>
            )}
          </View>
          <View style={styles.form_inputWrap}>
            <TextInput
              style={styles.form_input}
              placeholder="Address"
              onChangeText={formikProps.handleChange("address")}
              onBlur={formikProps.handleBlur("address")}
              value={formikProps.values.address}
            />
          </View>
          {formikProps.touched.address && formikProps.errors.address && (
            <Text style={styles.errorText}>{formikProps.errors.address}</Text>
          )}
        </View>
      </ScrollView>
      <View style={{ alignItems: "center", marginVertical: 15 }}>
        <PressButton
          disabled={checkDisabled()}
          pressed={() => {
            dispatch(loadingState(true));
            submitForm();
          }}
          text="Submit"
          loading={loading}
        />
      </View>

      {/* <View style={styles.bottom_container}>
        <Button navigation={navigation} text="Submit" route="Booked" />
      </View> */}
    </Container>
  );
};
const styles = StyleSheet.create({
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
  errorText: {
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 15,
    color: colors.appColor,
  },
  form_input: {
    fontSize: 16,
    flex: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#08452310",
  },
  checkbox_container: {
    flexDirection: "row",
    alignItems: "center",
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
  log_button_text: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 22,
    color: "#263228",
  },
  vehicle_wrapper: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vehicle_text: {
    marginTop: 10,
    fontSize: 15,
    color: "#a8ada9",
  },
  vehicle: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#08452310",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddVehicle;
