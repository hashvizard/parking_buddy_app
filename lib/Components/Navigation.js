import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import BoxShadow from "./BoxShadow";
import HomeIcon from "../../assets/svg/Home.svg";
import BellIcon from "../../assets/svg/bell.svg";
import SearchIcon from "../../assets/svg/search.svg";
import ProfileIcon from "../../assets/svg/Profile.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setNotificationSeen } from "../../src/redux/actions";

const Navigation = (props) => {
  
   
    

  const ActiveText = () => {
    return (
      <Text
        style={{
          fontSize: 12,
          fontWeight: "700",
          marginLeft: 10,
          textTransform: "capitalize",
        }}
      >
        {props.active}
      </Text>
    );
  };
  return (
    <BoxShadow style={styles.navigation_container}>
      <TouchableOpacity onPress={{}}>
        <View
          style={
            props.active === "HomeScreen" ? styles.active : styles.inactive
          }
        >
          <HomeIcon width={20} height={20} />
          {props.active === "HomeScreen" ? <ActiveText /> : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Search")}>
        <View
          style={props.active === "search" ? styles.active : styles.inactive}
        >
          <SearchIcon />
          {props.active === "search" ? <ActiveText /> : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Notifications")}
      >
        <View
          style={[
            { position: "relative" },
            props.active === "notification" ? styles.active : styles.inactive,
          ]}
        >
          <BellIcon />
          {notifications.length > seen && (
            <View style={styles.badge}>
              <Text style={styles.badge_text}>7</Text>
            </View>
          )}
          {props.active === "notification" ? <ActiveText /> : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ProfileMenu")}
      >
        <View
          style={props.active === "profile" ? styles.active : styles.inactive}
        >
          <ProfileIcon />
          {props.active === "profile" ? <ActiveText /> : null}
        </View>
      </TouchableOpacity>
    </BoxShadow>
  );
};

const styles = StyleSheet.create({
  navigation_container: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    bottom: 10,
    left: 10,
    right: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  active: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff7e9",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  inactive: {
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF5151",
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
    width: 15,
    height: 15,
  },
  badge_text: {
    fontSize: 8,
    color: "#fff",
    padding: 1,
    textAlign: "center",
  },
});

export default Navigation;
