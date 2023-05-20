import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import BoxShadow from "./BoxShadow";
import HomeIcon from "../../assets/svg/Home.svg";
import BellIcon from "../../assets/svg/bell.svg";
import SearchIcon from "../../assets/svg/search.svg";
import ProfileIcon from "../../assets/svg/Profile.svg";
import { useDispatch, useSelector } from "react-redux";
import { setEnabledHome } from "../../src/redux/actions";
import { useEffect } from "react";

const NavBar = (props) => {
  const { isEnabled, showBottomSheet } = useSelector((state) => state.appState);

  const { notifications, seen } = useSelector((state) => state.notifications);


  useEffect(() => {
    console.log(notifications.length > seen);
  }, [notifications])
  

  const dispatch = useDispatch();
  const ActiveText = ({ active }) => {
    return (
      <Text
        style={{
          fontSize: 12,
          color: "#263228",
          fontWeight: "500",
          marginLeft: 10,
          textTransform: "capitalize",
        }}
      >
        {active}
      </Text>
    );
  };
  if (showBottomSheet) {
    return;
  }
  return (
    <BoxShadow style={styles.navigation_container}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setEnabledHome(true));
          props.navigation.navigate("HomeScreen");
        }}
      >
        <View style={props.state.index === 0 ? styles.active : styles.inactive}>
          <HomeIcon width={20} height={20} />
          {props.state.index === 0 ? <ActiveText active="HomeScreen" /> : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Notifications")}
      >
        <View
          style={[
            { position: "relative" },
            props.state.index === 1 ? styles.active : styles.inactive,
          ]}
        >
          <BellIcon />
          {notifications.length <= seen ? null : (
            <View style={styles.badge}>
              <Text style={styles.badge_text}>
                {notifications.length - seen}
              </Text>
            </View>
          )}

          {props.state.index === 1 ? (
            <ActiveText active="Notifications" />
          ) : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("ProfileMenu")}
      >
        <View style={props.state.index >= 2 ? styles.active : styles.inactive}>
          <ProfileIcon />
          {props.state.index >= 2 ? <ActiveText active="Profile" /> : null}
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
    bottom: 15,
    left: 15,

    right: 15,
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
    padding: 10,
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
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

export default NavBar;
