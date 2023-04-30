import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

const PressButton = (props) => {
  return (
    <TouchableOpacity
      disabled={props?.disabled || props?.loading ? props?.disabled : false}
      onPress={() => props.pressed()}
    >
      <View
        style={[styles(props?.bgColor).button, props.style, styles.container]}
      >
        <Text
          style={{
            color: props?.disabled ? "darkgrey" : "#000",
            fontSize: 16,
            fontWeight: "500",
            textAlign:"center"
          }}
        >
          {props.text}
        </Text>
        {props?.loading && (
          <ActivityIndicator
            style={{ marginLeft: 15 }}
            size="small"
            color={"white"}
          />
        )}
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
      flexDirection: "row",
    },
    container: {
      display: "flex",
      borderWidth: 2,
      flexDirection: "row",
    },
  });

export default PressButton;
