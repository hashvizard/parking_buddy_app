import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity
    style
      disabled={props?.disabled ? props?.disabled : false}
      onPress={() => props.navigation.navigate(props.route)}
    >
      <View
        style={[
          styles(props?.bgColor).button,
          props.style,
        ]}
      >
        <Text style={{ color:props?.disabled ? "darkgrey" :"#000", fontSize: 16, fontWeight: "500" }}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = (bgColor, paddingHorizontal) =>
  StyleSheet.create({
    button: {
      backgroundColor: bgColor ? bgColor : "#fecf3e",
      borderRadius: 15,
      paddingHorizontal: 60,
      paddingVertical: 15,
    },
  });

export default Button;
