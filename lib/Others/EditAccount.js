import React, { useState, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Back, Title, Container } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseFile,
  imageCrop,
  parseDisplayName,
  postDataApi,
  putDataApi,
} from "../../src/helpers";
import { TouchableOpacity } from "react-native";
import {
  emptyUserSignupData,
  loadingState,
  setUserBackendData,
  setUserData,
} from "../../src/redux/actions";
import * as yup from "yup";
import { Formik } from "formik";
import ProfileEditForm from "../Forms/ProfileEditForm";

const EditAccount = ({ navigation }) => {
  const { userData } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const formikRef = useRef(null);

  const [backendError, setBackendError] = useState({
    mobile_validation: null,
    email_validation: null,
  });

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
        dispatch(setUserData({ ...user, profile_picture: response.data }));
      })
      .catch((err) => console.log("Error While image Selection :", err));
  };

  const showImage = () => {
    if (user.profile_picture) {
      return { uri: `data:image/jpeg;base64,${user.profile_picture}` };
    } else if (userData.profile_image && userData.profile_image != "null") {
      return { uri: userData.profile_image };
    } else {
      return require("../../assets/images/user.png");
    }
  };
  // Handling the Validations
  const profileValidationSchema = yup.object().shape({
    mobile_number: yup
      .string()
      .min(10, ({ min }) => `Mobile number should have atlest ${min} digits`)
      .max(10, ({ max }) => `Mobile number should have atlest ${max} digits`)
      .required("Mobile Number is required"),
    email_address: yup.string().email().required("Email address is required"),
  });

  const handleProfileSubmission = async (values) => {
    let formatedData = {
      name: `${
        values?.first_name
          ? values?.first_name
          : parseDisplayName(userData?.name)?.firstName
      } ${
        values?.last_name ? values?.last_name : parseDisplayName(userData?.name)
      }`,
      phone: values?.mobile_number ? values?.mobile_number : userData?.phone,
      email: values?.email_address ? values?.email_address : userData?.email,
    };

    try {
      var formData = new FormData();
      Object.entries(formatedData).forEach(function (key) {
        formData.append(key[0], key[1]);
      });

      if (user.profile_picture) {
        formData.append("has_image", true);
        formData.append("profile_image", user.profile_picture);
      } else {
        formData.append("has_image", false);
        formData.append("profile_image", userData.profile_image);
      }

      const response = await postDataApi(
        `user_update_request/${userData?.id}`,
        formData,
        true,
        true
      );
      if (response?.status) {
        dispatch(emptyUserSignupData());
        dispatch(setUserBackendData(response.data));
        dispatch(loadingState(false));
        navigation.goBack();
      } else {
        if (userData?.login_type == "manual") {
          setBackendError({
            mobile_validation:
              "Number is already registered, try to create a new account with this number.",
            email_validation: null,
          });
        } else {
          setBackendError({
            mobile_validation: null,
            email_validation: "Email is already registered.",
          });
        }
        dispatch(loadingState(false));
      }
    } catch (err) {
      dispatch(loadingState(false));
      console.log(err, "Receive an errdor");
    }
  };

  return (
    <Container>
      <Back navigation={navigation} />

      <View>
        <Title text="Edit Account" />
      </View>
      <TouchableOpacity onPress={() => fromGallery()}>
        <Image source={showImage()} style={styles.pp_image} />
      </TouchableOpacity>
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
          socail_id: "",
          login_type: "manual",
        }}
        onSubmit={(values) => {
          handleProfileSubmission(values);
        }}
      >
        <ProfileEditForm
          userData={userData}
          backendError={backendError}
          setBackendError={(data) => setBackendError(data)}
        />
      </Formik>
    </Container>
  );
};
export default EditAccount;

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
