/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import Lottie from "lottie-react-native";
import Navigation from "./src/Navigation";
import DialogBox from "./lib/Components/DialogBox";


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 4000);
  }

  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Lottie
            style={styles.lottie}
            source={require("./assets/json/loader.json")}
            autoPlay
            loop={false}
          />
        </View>
      </View>
    );
    return (
      <View style={styles.MainContainer}>
        <Navigation />
        {this.state.isVisible === true ? Splash_Screen : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lottie: {
    width: "100%",
  },
  SplashScreen_RootView: {
    justifyContent: "center",
    flex: 1,
    margin: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },

  SplashScreen_ChildView: {
    flex: 1,
  },
});
