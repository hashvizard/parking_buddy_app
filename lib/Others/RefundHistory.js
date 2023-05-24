import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Back, Title, Navigation, Container, BoxShadow } from "../Components";
import RefundRaisedIcon from "../../assets/svg/REFUND.svg";
import RefundProgressIcon from "../../assets/svg/RefundInProgress.svg";
import RefundApprovedIcon from "../../assets/svg/RefundApproved.svg";
import RefundDeniedIcon from "../../assets/svg/RefundDenied.svg";
import { getDataApi } from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { loadingState } from "../../src/redux/actions";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import colors from "../../src/constants/colors";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const checkIcon = (val) => {
  switch (val) {
    case 0:
      return <RefundRaisedIcon />;

    case 1:
      return <RefundProgressIcon />;

    case 2:
      return <RefundApprovedIcon />;

    case 3:
      return <RefundDeniedIcon />;
    default:
      return <RefundRaisedIcon />;
  }
};

const checkStatus = (val, amount) => {
  switch (val) {
    case 0:
      return "Refund request raised";

    case 1:
      return "Refund request in progress";

    case 2:
      return `Refund request approved. Amount refunded, Rs ${amount}`;

    case 3:
      return "Refund request denied. Amount refunded, Rs 0";
    default:
      return "Refund request raised";
  }
};

const History = ({ item,navigation }) => {
  console.log(item,"Idh")
  return (
    <BoxShadow style={styles.refundHistory}>
      <View style={styles.icon}>{checkIcon(item?.status)}</View>
      <TouchableOpacity
    
      style={styles.wrapper}>
        <Text style={styles.date}>
          {new Date(item?.created_at)
            .toISOString()
            .substr(0, 10)}
          , request No. {item?.refund_request_id}
        </Text>

      
        <Text style={styles.status}>
          {checkStatus(item?.status, item?.booking?.charges)}
        </Text>
        <Text style={styles.date}>
         BOOKING ID. {item?.booking?.booking_id}
        </Text>
      </TouchableOpacity>
    </BoxShadow>
  );
};

const RefundHistory = ({ navigation }) => {
  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const [refund, setRefund] = useState([]);

  const focused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      fetchRefundRequest()
    }, [focused])
  );



  const fetchRefundRequest = async () => {
    dispatch(loadingState(true));

    try {
      const response = await getDataApi("getUserAllRefundRequest");

      if (response?.status) {
        setRefund(response?.data.reverse());
      } else {
        console.log(response, "sd");
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
    }
  };

  return (
    <Container>
      <Back
        navigation={navigation}
        onPress={true}
        onPressButton={() => {
          navigation.navigate("ProfileMenu");
        }}
      />
      <Title text="Refund History" />

      {loading && refund.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="small" color={colors.appColor} />
          <Text style={{ marginVertical: 10, textAlign: "center" }}>
            Looking for Refund Requests
          </Text>
        </View>
      ) : refund.length == 0 ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Title text="Refunds" />
          <Text style={{ marginVertical: 10, textAlign: "center" }}>
            No Refund Request found...
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1, marginHorizontal: -15 }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 100,paddingHorizontal:10 }}
            ListFooterComponent={() => (
              <View style={{paddingHorizontal:15}}>
                <Text style={{ marginTop: 15, letterSpacing: 0.7 }}>
                  In case of an issue, reach out to our support team on{" "}
                  <Text
                    style={{
                      marginBottom: 15,
                      color: "#263228",
                      letterSpacing: 0.7,
                      fontWeight: "500",
                    }}
                  >
                    Inquiries@parkinbuddy.in.
                  </Text>{" "}
                  Our Support Team will reach out to you in 24-48 Hrs.
                </Text>
              </View>
            )}
            data={refund}
            renderItem={({ item }) => <History item={item} navigation={navigation} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}

      {/* <Navigation active='profile' navigation={navigation}/> */}
    </Container>
  );
};
export default RefundHistory;

const styles = StyleSheet.create({
  refundHistory: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 5,
  },
  icon: {
    flex: 2.5,
  },
  wrapper: {
    flex: 8,
    marginLeft:15
  },
  date: {
    fontWeight: "700",
  },
  status: {
    color: "#3B3B3B40",
  },
});
