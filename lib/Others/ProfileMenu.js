import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Back,
  Subtitle,
  Title,
  Navigation,
  Container,
  BoxShadow,
} from "../Components";
import EditIcon from "../../assets/svg/Edit.svg";
import RegisteredVehicleIcon from "../../assets/svg/Registered Vehicle.svg";
import ParkedCarIcon from "../../assets/svg/Car Parked.svg";
import CardIcon from "../../assets/svg/CardOrange.svg";
import SupportIcon from "../../assets/svg/Support.svg";
import RefundHistoryIcon from "../../assets/svg/BANKNOTE.svg";
import PromotionIcon from "../../assets/svg/Promotion.svg";
import LegalIcon from "../../assets/svg/Legal.svg";
import LogoutIcon from "../../assets/svg/Logout.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  alertBox,
  setLoggedIn,
  setUserBackendData,
} from "../../src/redux/actions";
import DialogBox from "../Components/DialogBox";

const ProfileMenu = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.data);
  return (
    <>
      <DialogBox
        title={"Log Out"}
        description={"Are you sure you want to log out ?"}
        actionText={"Log Out"}
        pressed={() => {
          dispatch(alertBox(false));
        }}
        alertSucces={() => {
          dispatch(setUserBackendData({}));
          dispatch(setLoggedIn(false));
          dispatch(alertBox(false));
        }}
      />
      <Container>
        <BoxShadow
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 35,
            marginTop: 20,
            padding: 15,
            borderRadius: 15,
          }}
        >
          <Image
            source={
              userData?.profile_image == "null"
                ? require("../../assets/images/user.png")
                : { uri: userData?.profile_image }
            }
            style={styles.pp_image}
          />

          <View style={{ justifyContent: "center" }}>
            <Title
              style={{ marginBottom: 0, marginTop: 0 }}
              text={userData?.name}
            />
            <Subtitle text={`+91 ${userData?.phone} `} />
          </View>
          <TouchableOpacity
            style={{ marginLeft: "auto" }}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <EditIcon />
          </TouchableOpacity>
        </BoxShadow>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterVehicle")}
          >
            <View style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <RegisteredVehicleIcon />
              </View>

              <Text style={styles.menuText}>Registered Vehicles</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreviousBookings")}
          >
            <View style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <ParkedCarIcon />
              </View>

              <Text style={styles.menuText}>Previous Bookings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyPasses")}>
            <View style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <CardIcon />
              </View>

              <Text style={styles.menuText}>E-Pass</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PaymentMethod")}
          >
            <View style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <CardIcon />
              </View>

              <Text style={styles.menuText}>Payment Methods</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Support")}>
            <View style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <SupportIcon />
              </View>

              <Text style={styles.menuText}>Support</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("RefundHistory")}
          >
            <View style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <RefundHistoryIcon />
              </View>

              <Text style={styles.menuText}>Refund History</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Voucher")}>
            <View style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <PromotionIcon />
              </View>

              <Text style={styles.menuText}>Promotions</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Legal")}>
            <View style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <LegalIcon />
              </View>

              <Text style={styles.menuText}>Legal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(alertBox(true))}>
            <View style={styles.menuItem}>
              <View style={{ flex: 1 }}>
                <LogoutIcon />
              </View>

              <Text style={styles.menuText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <Navigation active='profile' navigation={navigation} /> */}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  pp_image: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginRight: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
    padding: 3,
  },
  menuText: {
    fontWeight: "400",
    letterSpacing: 0.5,
    flex: 7,
    fontSize: 20,
    color: "#263228",
  },
});

export default ProfileMenu;
