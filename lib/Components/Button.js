import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import colors from "../../src/constants/colors";
import { useSelector } from "react-redux";

const Button = (props) => {

  return (
    <TouchableOpacity
      style
      disabled={props?.disabled ? props?.disabled : false}
      onPress={() => {
        if (props?.handleRoute) {
          props?.pressed();
        } else {
          props.navigation.navigate(props.route);
        }
      }}
    >
      <View style={[styles(props?.bgColor).button, props.style,{display:"flex",flexDirection:"row",alignItems:"center",
    justifyContent:"space-around"}]}>
        <Text
          style={{
            color: props?.disabled ? "darkgrey" : "#000",
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          {props.text}
        </Text>
        {props?.disabled && <ActivityIndicator size="small" color={colors.appColor} style={{marginLeft:15}} />}
  
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
