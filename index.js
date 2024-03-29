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
import messaging from "@react-native-firebase/messaging";
import { SafeAreaView } from "react-native-safe-area-context";

GoogleSignin.configure({
  webClientId: process.env.GOOGLE_LOGIN_CLIENT_ID,
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.appColor,
  },
};

// Register background handler
// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log("Message handled in the background!", remoteMessage);
// });

const ReduxApp = () => (
  <GestureHandlerRootView style={{ ...StyleSheet.absoluteFill }}>
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === "ios" ? 40 : 0 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" && "padding"}
          enabled
          style={StyleSheet.absoluteFill}
        >
          <PaperProvider theme={theme}>
            <App />
          </PaperProvider>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Provider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
