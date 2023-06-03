import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DetailView from "../Components/DetailView";
import { Back, Container } from "../Components";

const BookingDataView = ({ navigation,route }) => {
  return (
    <Container style={{marginBottom:0,paddingBottom:0}}>
      {/* <Back navigation={navigation} /> */}
      <DetailView navigation={navigation} route={route}/>
    </Container>
  );
};

export default BookingDataView;

const styles = StyleSheet.create({});
