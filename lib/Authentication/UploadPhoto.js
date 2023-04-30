import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  Back,
  Title,
  Subtitle,
  Button,
  BoxShadow,
  Container,
} from "../Components";
import CameraIcon from "../../assets/svg/camera.svg";
import GalleryIcon from "../../assets/svg/Gallery.svg";
import { chooseFile, imageCrop, openCamera } from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../src/redux/actions";
import CloseIcon from "../../assets/svg/Close Icon.svg";

const UploadPhoto = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fromGallery = async () => {
    chooseFile("photo")
      .then((response) => {
        cropImage(response.uri);
      })
      .catch((err) => console.log("Error While image Selection :", err));
  };

  const fromCamera = async () => {
    openCamera("photo")
      .then((response) => {
        cropImage(response.uri);
      })
      .catch((err) => console.log("Error While image Selection :", err));
  };

  const cropImage = async (path) => {
    imageCrop(path)
      .then((response) => {
        dispatch(setUserData({ ...user, profile_picture: response.path }));
      })
      .catch((err) => console.log("Error While image Selection :", err));
  };

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Back navigation={navigation} />
        <View style={styles.skip_container}>
          <TouchableOpacity onPress={() => navigation.navigate("SetLocation")}>
            <Text style={styles.skip_text}>SKIP</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexShrink: 1, width: "75%" }}>
        <Title text="Upload Your Profile Photo" />
        <Subtitle text="This image will be displayed in your account profile for security purposes" />
      </View>
      {user?.profile_picture ? (
        <View style={styles.photo_container}>
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: user?.profile_picture }}
              style={{ width: 245, height: 245, borderRadius: 15 }}
            />
            <TouchableOpacity
              onPress={() => {
                dispatch(setUserData({ ...user, profile_picture: "" }));
              }}
              style={styles.closeIcon}
            >
              <CloseIcon width={30} height={30} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity>
            <BoxShadow style={styles.log_button}>
              <TouchableOpacity
                onPress={() => fromGallery()}
                style={styles.icon_container}
              >
                <GalleryIcon />
              </TouchableOpacity>
              <Text style={styles.log_button_text}>From Gallery</Text>
            </BoxShadow>
          </TouchableOpacity>
          <TouchableOpacity>
            <BoxShadow style={styles.log_button}>
              <TouchableOpacity
                onPress={() => fromCamera()}
                style={styles.icon_container}
              >
                <CameraIcon />
              </TouchableOpacity>
              <Text style={styles.log_button_text}>Take Photo</Text>
            </BoxShadow>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.bottom_container}>
        <Button navigation={navigation} text="Next" route="SetLocation" />
      </View>
    </Container>
  );
};
export default UploadPhoto;

const styles = StyleSheet.create({
  log_button: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
  },
  icon_container: {
    marginBottom: 5,
  },
  photo_container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    borderRadius: 50,
    backgroundColor: "#c1c1c1",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
});
