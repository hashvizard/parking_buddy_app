import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Back, Container, Subtitle, Title } from "../Components";

import { postDataApi } from "../../src/helpers";
import { useDispatch, useSelector } from "react-redux";
import { loadingState } from "../../src/redux/actions";
import colors from "../../src/constants/colors";

import { ScrollView } from "react-native";

const ParkingPasses = ({ navigation, route }) => {
  const { loading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    fetchPassesParkings();
  }, []);

  const fetchPassesParkings = async () => {
    dispatch(loadingState(true));
    try {
      const response = await postDataApi("getParkingsByPassId", {
        pass_id: route?.params?.pass_id,
      });
      if (response?.status) {
        console.log(response?.data, "I have these parkings");
        setParkings(response?.data);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
    }
  };

  return (
    <>
      <Container style={{ marginBottom: 0, paddingBottom: 0 }}>
        <Back navigation={navigation} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginBottom: 5 }}>
            <Title
              style={{
                lineHeight: null,
                marginBottom: 0,
              }}
              text="Accessible Parkings"
            />
            <Subtitle
              text="You can access below mentioned parkings using this pass"
              opacity={0.5}
            />
          </View>
        </View>

        {loading && parkings.length == 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="small" color={colors.appColor} />
            <Text style={{ marginVertical: 10, textAlign: "center" }}>
              Looking for Accessible Parkings
            </Text>
          </View>
        ) : parkings.length == 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Title
              style={{
                lineHeight: null,
                marginBottom: 0,
              }}
              text="Parkings"
            />
            <Subtitle text="No Parkings found..." opacity={0.5} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 150 }}
            >
              {parkings?.map((item, index) => (
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: colors.greyText,
                    marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 15,
                      backgroundColor: colors.darkGreen,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.orangeText,
                        fontSize: 18,
                      }}
                    >
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        fontSize: 18,
                      }}
                    ></Text>
                  </View>
                  <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.darkGreen,
                        }}
                      >
                        {item?.address}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </Container>
    </>
  );
};

export default ParkingPasses;

const styles = StyleSheet.create({
  bottom_container: {
    position: "absolute",
    justifyContent: "flex-end",

    bottom: 40,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
