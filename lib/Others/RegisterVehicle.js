import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Back, Title, Subtitle, Button, Navigation } from "../Components";
import VoucherIcon from "../../assets/svg/Voucher Icon.svg";
import ProfilePhoto from "../../assets/svg/Photo Profile.svg";
import CarIcon from "../../assets/svg/Car.svg";
import ScooterIcon from "../../assets/svg/Scooter.svg";
import { useSelector } from "react-redux";

const RegisterVehicle = ({ navigation }) => {
  const { userData } = useSelector((state) => state.data);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/MapScreen.png")}
        style={styles.pp_image}
      />
      <View style={{ margin: 20, position: "absolute" }}>
        <Back navigation={navigation} />
      </View>
      <View style={styles.bd_container}>
        <View style={styles.bar} />
        <View style={{ marginBottom: 15 }}>
          <Title
            style={{ marginBottom: 0, marginTop: 0 }}
            text={
              userData?.name != "null"
                ? userData?.name
                : "Complete your Profile"
            }
          />
          <Subtitle
            text={
              userData?.phone != "null"
                ? `+91 ${userData?.phone}`
                : "Add your mobile number"
            }
            opacity={0.5}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Passes")}>
          <View style={styles.voucher}>
            <VoucherIcon />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "#09051C",
                letterSpacing: 0.7,
                marginLeft: 10,
              }}
            >
              My Passes
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.vehicle}>
          <CarIcon width={60} height={40} />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "#09051C",
                letterSpacing: 0.7,
              }}
            >
              4 Wheeler
            </Text>
            <Text
              style={{ opacity: 0.5, fontWeight: "400", letterSpacing: 0.5 }}
            >
              MH 19 CF 4903
            </Text>
          </View>
          <TouchableOpacity style={{ marginLeft: "auto" }}>
            <View style={styles.edit_details}>
              <Text style={{ color: "#fff" }}>Edit Details</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginBottom: 75, marginTop: 15 }}>
          <Button
            bgColor="#08452315"
            navigation={navigation}
            text="Register Your Vehicle"
            route="AddVehicle"
          />
        </View>
      </View>
      {/* <Navigation active='profile' navigation={navigation} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "Poppins",
    flex: 1,
    backgroundColor: "#FEFEFF",
  },
  pp_image: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  bd_container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#fff",
  },
  bar: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 60,
    height: 5,
    backgroundColor: "#FEF6ED",
    marginBottom: 15,
  },
  voucher: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#5a6cea",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 24,
    marginBottom: 15,
    borderRadius: 22,
    padding: 15,
  },
  vehicle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#5a6cea",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 24,
    marginBottom: 15,
    borderRadius: 22,
    padding: 25,
  },
  edit_details: {
    backgroundColor: "#fecf3e",
    borderRadius: 10,
    padding: 10,
  },
});

export default RegisterVehicle;
