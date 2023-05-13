import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import Container from "./Container";
import Back from "./Back";
import Title from "./Title";
import { ScrollView } from "react-native-gesture-handler";
import { convertUnderscoresToTitleCase } from "../../src/helpers";

const htmlContent = "<h1>Hello World!</h1><p>This is some HTML content.</p>";

const PolicyView = ({ navigation, route }) => {
  const { type } = route?.params;

  return (
    <Container>
      <Back navigation={navigation} />
      <Title
        style={{ marginBottom: 30 }}
        text={convertUnderscoresToTitleCase(type)}
      />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <WebView source={{ html: htmlContent }} />
      </ScrollView>
    </Container>
  );
};

export default PolicyView;

const styles = StyleSheet.create({});
