/**
 * @format
 */

import {
  AppRegistry,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import {
  Button,
  Dialog,
  Portal,
  Provider as PaperProvider,
  Text,
  DefaultTheme,
} from "react-native-paper";
import colors from "./src/constants/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_LOGIN_CLIENT_ID,
});
console.log(DefaultTheme);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.appColor,
  },
};


const ReduxApp = () => (
  <GestureHandlerRootView style={{ ...StyleSheet.absoluteFill }}>
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" && "padding"}
        enabled
        style={StyleSheet.absoluteFill}
      >
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </KeyboardAvoidingView>
    </Provider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
