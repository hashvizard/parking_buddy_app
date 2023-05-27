import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Back, Title, Container, BoxShadow, Navigation } from "../Components";
import SuccessIcon from "../../assets/svg/Success Icon.svg";
import TopUpIcon from "../../assets/svg/Top Up Icon.svg";
import CancelIcon from "../../assets/svg/Cancel Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationSeen } from "../../src/redux/actions";
import { FlatList } from "react-native-gesture-handler";
import RefundRaisedIcon from "../../assets/svg/REFUND.svg";
import RefundProgressIcon from "../../assets/svg/RefundInProgress.svg";
import RefundApprovedIcon from "../../assets/svg/RefundApproved.svg";
import RefundDeniedIcon from "../../assets/svg/RefundDenied.svg";
import VoucherIcon from "../../assets/svg/Voucher Icon.svg";
import ChatIcon from "../../assets/svg/Chat.svg";

const getData = (type, status, time, data) => {
  let tempData = {
    data: data,
    icon: <CancelIcon />,
    nText: "Booking Unsuccessful",
    nTime: time ?? "11:00 Am, 22 August 2022",
  };

  if (type == "booking") {
    if (status == "success") {
      tempData.icon = <SuccessIcon />;
      tempData.nText = `Parking spot at ${data?.name} has been successfully booked`;
      return tempData;
    }
    if (status == "failed") {
      tempData.icon = <CancelIcon />;
      tempData.nText = `Booking Unsuccessful for ${data?.name}`;

      return tempData;
    }
  } else if (type == "passes") {
    if (status == "success") {
      tempData.icon = <SuccessIcon />;
      tempData.nText = `Successfully Bought the ${data?.title} for ${
        data?.vehicle_type == 1 ? "4" : "2"
      } wheeler`;

      return tempData;
    }
    if (status == "failed") {
      tempData.icon = <CancelIcon />;
      tempData.nText = `Failed to buy the ${data?.title} for ${
        data?.vehicle_type == 1 ? "4" : "2"
      } wheeler`;

      return tempData;
    }
  } else if (type == "refund") {
    switch (status) {
      case 0:
        tempData.icon = <RefundRaisedIcon />;
        tempData.nText = "Refund Request Raised";

        return tempData;

      case 1:
        tempData.icon = <RefundProgressIcon />;
        tempData.nText = "Refund Request In progress";
        tempData.nTime = "11:00 Am, 22 August 2022";
        return tempData;

      case 2:
        tempData.icon = <RefundApprovedIcon />;
        tempData.nText = "Refund Request Approved";
        tempData.nTime = "11:00 Am, 22 August 2022";
        return tempData;

      case 3:
        tempData.icon = <RefundDeniedIcon />;
        tempData.nText = "Refund Request Denied";
        tempData.nTime = "11:00 Am, 22 August 2022";
        return tempData;
      default:
        tempData.icon = <RefundRaisedIcon />;
        tempData.nText = "Refund Request Raised";
        tempData.nTime = "11:00 Am, 22 August 2022";
        return tempData;
    }
  } else if (type == "coupon") {
    tempData.icon = <VoucherIcon />;
    tempData.nText = "10% Off on Parkings";
    tempData.nTime = "11:00 Am, 22 August 2022";
    return tempData;
  } else if (type == "chat") {
    tempData.icon = <ChatIcon />;
    tempData.nText = "You have a message from the Support Team";
    tempData.nTime = "11:00 Am, 22 August 2022";
    return tempData;
  }
};

const Item = ({ item, navigation }) => {
  const handleNavigation = () => {
    if (item?.type == "booking" && item?.status == "success") {
      navigation.navigate("PreviousBookings");
      return;
    }
    if (item?.type == "passes" && item?.status == "success") {
      navigation.navigate("MyPasses");
      return;
    }
    if (item?.type == "refund") {
      navigation.navigate("RefundHistory");
      return;
    }
    if (item?.type == "chat") {
      navigation.navigate("Chat");
      return;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleNavigation();
      }}
    >
      <BoxShadow style={styles.notification}>
        <View style={styles.icon}>
          {getData(item?.type, item?.status, item?.time, item?.data).icon}
        </View>
        <View style={styles.text_wrapper}>
          <Text style={styles.n_text}>
            {getData(item?.type, item?.status, item?.time, item?.data).nText}
          </Text>
          <Text style={styles.n_time}>
            {getData(item?.type, item?.status, item?.time, item?.data).nTime}
          </Text>
        </View>
      </BoxShadow>
    </TouchableOpacity>
  );
};

const Notifications = ({ navigation }) => {
  const dispatch = useDispatch();
  const { notifications, seen } = useSelector((state) => state.notifications);

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(setNotificationSeen(notifications.length));
    let tempData = [...notifications].reverse();

    setData(tempData);
  }, [notifications]);

  return (
    <Container>
      <Back navigation={navigation} />
      <View style={{ marginBottom: 15 }}>
        <Title text="Notifications" />
      </View>
      <FlatList
        style={{ margin: -15 }}
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
        data={data}
        renderItem={({ item }) => <Item item={item} navigation={navigation} />}
        keyExtractor={(item, index) => index}
      />
    </Container>
  );
};
export default Notifications;

const styles = StyleSheet.create({
  notification: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 15,
    padding: 25,
  },
  icon: {
    flex: 3,
  },
  text_wrapper: {
    flex: 9,
  },
  n_text: {
    fontWeight: "700",
  },
  n_time: {
    color: "#3B3B3B40",
  },
});
