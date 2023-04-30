import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SearchDropDown from "./src/components/SearchDropDown";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DetailView = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 21, color: "black" }}>
              Show Data
            </Text>
            <Text>Getting the Best out of it</Text>
          </View>
          <View>
            <Icon name="check-circle" color={"green"} size={40} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "red",
            marginTop: 20,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              paddingHorizontal: 15,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 21, color: "black" }}
              >
                Show Data
              </Text>
              <Text>Getting the Best out of it</Text>
              <Text style={{ color: "white" }}>Get Direction</Text>
            </View>
            <View
              style={{
                height: 80,
                borderWidth: 2,
                width: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="check-circle" color={"green"} size={40} />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              marginVertical: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                borderRadius: 20,
                height: 30,
                width: 30,
                marginLeft: -15,
                backgroundColor: "#f7f7f7",
              }}
            />
            <Text>- - - - - Showing more things below it - - - - -</Text>
            <View
              style={{
                borderRadius: 20,
                height: 30,
                width: 30,
                marginRight: -15,
                backgroundColor: "#f7f7f7",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginBottom: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flexGrow: 1,
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>Friday 23 May</Text>
                <Text>07:35 PM to 8:25 PM</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Booking Id</Text>
                  <Text style={{ marginHorizontal: 10 }}>ABCDDDD</Text>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 21 }}>843412</Text>
                <Text>Parking Code</Text>
              </View>
              <View style={{ marginHorizontal: 15 }}>
                <Text>Duration</Text>
                <Text>2 hour</Text>
              </View>
            </View>
            <View
              style={{
                height: 80,
                borderWidth: 2,
                width: 80,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="check-circle" color={"green"} size={40} />
            </View>
          </View>
        </View> */}
        <View style={{  borderRadius: 10 ,backgroundColor:"green"}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
            
              backgroundColor:"red",
              borderRadius: 10,
            }}
          >
            <Text>sd</Text>
            <Text>sd</Text>
          </View>
          <View style={{ marginVertical: 15, paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text>sd</Text>
              <Text>sd</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text>sd</Text>
              <Text>sd</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text>sd</Text>
              <Text>sd</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text>sd</Text>
              <Text>sd</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailView;

const styles = StyleSheet.create({});
