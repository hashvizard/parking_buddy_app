import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { Back, Title, Button, Container } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { loadingState } from "../../src/redux/actions";
import { postDataApi } from "../../src/helpers";

const RefundRequest = ({ navigation, route }) => {
  const { data } = route?.params;
  const { loading } = useSelector((state) => state.appState);

  const [reason, setReason] = useState("");

  const dispatch = useDispatch();

  const raiseRefundRequest = async () => {
    dispatch(loadingState(true));

    let formatedData = {
      booking_id: data?.id,
      status: 0,
      reason: reason,
    };

    try {
      const response = await postDataApi("refund", formatedData);

      if (response?.status) {
        navigation.navigate("RefundHistory");
      } else {
        console.log("Receive an error", response);
      }
    } catch (err) {
      console.log(err, "Receive an errdor");
    } finally {
      dispatch(loadingState(false));
    }
  };
  return (
    <Container style={styles.container}>
      <Back navigation={navigation} />
      <Title text="Raise Refund Request" />

      <View style={styles.form_container}>
        <View style={styles.form_inputWrap}>
          <TextInput
            style={styles.form_input}
            editable={false}
            placeholder={`Booking No. ${data?.booking_id}`}
          />
        </View>
        <View style={styles.form_inputWrap}>
          <TextInput
            style={styles.form_input}
            editable={false}
            placeholder={`Booking Start Time: ${data?.start_time}`}
          />
        </View>
        <View style={styles.form_inputWrap}>
          <TextInput
            style={styles.form_input}
            editable={false}
            placeholder={`Booking End Time: ${data?.end_time}`}
          />
        </View>
        {/* <View style={styles.form_inputWrap}>
          <TextInput
            editable={false}
            style={styles.form_input}
            placeholder={`Time: ${data?.start_time}`}
          />
          <TextInput
            style={[styles.form_input, { marginLeft: 10 }]}
            placeholder={`Time: ${data?.end_time}`}
          />
        </View> */}
        <View style={styles.form_inputWrap}>
          <TextInput
            multiline
            onChangeText={setReason}
            value={reason}
            maxLength={100}
            style={styles.form_input}
            placeholder="Reason for Refund"
          />
        </View>
        <Text>*Not more than 100 words</Text>
      </View>

      <View style={styles.bottom_container}>
        <Button
          handleRoute={true}
     
          disabled={loading || reason == ""}
          pressed={() => {
            raiseRefundRequest();
          }}
          navigation={navigation}
          text="Submit"
          //   route="Passes"
        />
      </View>
    </Container>
  );
};
export default RefundRequest;

const styles = StyleSheet.create({
  form_container: {
    marginTop: 10,
  },
  form_inputWrap: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  form_input: {
    fontSize: 16,
    flex: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#08452310",
  },
  bottom_container: {
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 20,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
