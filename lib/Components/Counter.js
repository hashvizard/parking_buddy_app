import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../src/constants/colors";



export default function ({
  timer = 10,
  timerCompleted,
  showText = false,
  personalText,
}) {
  const [time, setTime] = React.useState(timer);
  const timerRef = React.useRef(time);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        timerCompleted();
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    < >
      {showText
        ? (
        <Text style={styles.subtitle}>
          {personalText}
          <Text style={styles.text}> {time} Seconds</Text>
        </Text>
          )
        : (
       <Text style={styles.text}>{time} Sec</Text>
          )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  text: {
    fontWeight: "bold",
    color: colors.appColor,
  },
  subtitle: {
 
    letterSpacing:0.8,
    fontSize: 14,
    fontWeight: '200',
    lineHeight: 23,
    color: '#263228',
},
});
