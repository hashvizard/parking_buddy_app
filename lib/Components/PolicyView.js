import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import Container from "./Container";
import Back from "./Back";
import Title from "./Title";
import { ScrollView } from "react-native-gesture-handler";
import { convertUnderscoresToTitleCase, getDataApi } from "../../src/helpers";
import { useEffect } from "react";
import { useState } from "react";

const htmlContent = "<h1>Hello World!</h1><p>This is some HTML content.</p>";

const PolicyView = ({ navigation, route }) => {
  const { type, id } = route?.params;
  const [data, setData] = useState("");
  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await getDataApi(`legal/${id}`);
      if (response?.status) {
        setData(response.data?.data);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
    }
  };

  return (
    <Container>
      <Back navigation={navigation} />
      <Title
        style={{ marginBottom: 30 }}
        text={convertUnderscoresToTitleCase(type)}
      />
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <WebView source={{ html: data }} />
      </ScrollView>
    </Container>
  );
};

export default PolicyView;

const styles = StyleSheet.create({});
