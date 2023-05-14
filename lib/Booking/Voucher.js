import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Back, Title, Button, Container, BoxShadow } from "../Components";
import VoucherIcon from "../../assets/svg/Voucher Icon.svg";
import PromotionMask from "../../assets/svg/Pattern.svg";
import colors from "../../src/constants/colors";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingData,
  loadingState,
  setEnabledHome,
  showBottomSheetContainer,
} from "../../src/redux/actions";
import { dummy } from "../../src/dummyData";
import { ScrollView } from "react-native";
import { getDataApi, postDataApi } from "../../src/helpers";

const data = dummy.ALL_CUPONOUNS;

const Voucher = ({ navigation }) => {
  const [voucher, setVocher] = useState("");
  const [backendError, setbackendError] = useState(null);
  const [cupons, setCupons] = useState([]);

  const { booking } = useSelector((state) => state.bookingState);
  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const handleTextChange = (newText) => {
    if (backendError) {
      setbackendError(null);
    }
    setVocher(newText.toUpperCase());
  };

  useEffect(() => {
    fetchVoucers();
  }, []);

  const fetchVoucers = async () => {
    try {
      const response = await getDataApi("voucher");

      if (response?.status) {
        setCupons(response?.data);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
    }
  };

  const validateCupond = async () => {
    dispatch(loadingState(true));

    let data = {
      code: voucher,
      vehicle_type: booking?.vehicle_type,
    };

    try {
      const response = await postDataApi("validateCoupon", data, true);

      if (response?.status) {
        dispatch(bookingData({ cuponCode: response?.data }));
        dispatch(setEnabledHome(false));
        dispatch(showBottomSheetContainer(true));
        navigation.goBack();
      } else {
        setbackendError(response?.message);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      dispatch(loadingState(false));
    }
  };

  const applyCupon = (cupon) => {
    dispatch(bookingData({ cuponCode: cupon }));
    navigation.goBack();
  };

  return (
    <Container>
      <Back navigation={navigation} />
      <Title text="Voucher Promotions" />
      <BoxShadow style={styles.enter_voucher}>
        <TextInput
          editable={loading ? false : true}
          style={{
            color: "#263228",
            letterSpacing: 0.7,
            fontWeight: "500",
            flex: 1,
            paddingVertical: 0,
          }}
          placeholder="Enter Voucher Code"
          value={voucher}
          onChangeText={handleTextChange}
          placeholderTextColor="#c1c1c1"
        />
        <TouchableOpacity
          onPress={() => {
            validateCupond();
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              color={"white"}
              style={{ marginRight: 25 }}
            />
          ) : (
            <Text style={{ color: voucher ? colors.appColor : "#263228" }}>
              APPLY
            </Text>
          )}
        </TouchableOpacity>
      </BoxShadow>
      {backendError && (
        <Text
          style={{ marginBottom: 20, marginLeft: 20, color: colors.appColor }}
        >
          {backendError}
        </Text>
      )}
      <View style={styles.more_voucher}>
        <VoucherIcon />
        <Text
          style={{
            color: "#263228",
            letterSpacing: 0.7,
            fontWeight: "500",
            marginLeft: 10,
          }}
        >
          More Vouchers
        </Text>
      </View>
      <ScrollView>
        {cupons.map((item, index) => (
          <View style={styles.voucher} key={index}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                position: "relative",
              }}
            >
              <PromotionMask />
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 30 }}
                >
                  {item?.type == "percentage"
                    ? `${item.discount}%`
                    : `₹ ${item.discount}`}
                </Text>
                <Text style={{ color: "white" }}>OFF</Text>
              </View>
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  letterSpacing: 0.7,
                  fontWeight: "500",
                  color: "#fecf3e",
                }}
              >
                {item?.title}
              </Text>
              <TouchableOpacity
                style={{ justifyContent: "flex-end", marginTop: 15 }}
                onPress={() => applyCupon(item)}
              >
                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.availNow}>Avail Now</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  enter_voucher: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  more_voucher: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  voucher: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#084523",
    borderRadius: 18,
    marginBottom: 15,
    paddingTop: 20,
  },
  availNow: {
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "500",
    color: "#fecf3e",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    letterSpacing: 0.7,
  },
  bottom_container: {
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fecf3e",
    borderRadius: 15,
  },
});

export default Voucher;
