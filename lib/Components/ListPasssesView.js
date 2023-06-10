import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../src/constants/colors";
import ScooterYellowIcon from "../../assets/svg/bikeyellow.svg";
import CarIcon from "../../assets/svg/Car.svg";

const ListPasssesView = ({ data = [], type = "", selectedItem, key = 0,navigation }) => {

  return (
    <TouchableOpacity
      key={key}
      onPress={() => selectedItem(data)}
      // key={data?.id}
      style={{
        backgroundColor: colors.darkGreen,
        marginTop: 20,
        minHeight: 150,
        overflow: "hidden",
        borderRadius: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,

          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: "100%",
            width: "30%",
            alignItems: "center",
            backgroundColor: colors.greyText,

            justifyContent: "center",
          }}
        >
          {data?.vehicle_type == 0 ? (
            <ScooterYellowIcon width={150} height={40} />
          ) : (
            <CarIcon width={150} height={40} />
          )}
        </View>

        <View style={{ flex: 1, padding: 25 }}>
          {data?.amount && (
            <Text
              style={{
                fontSize: 21,
                color: colors.orangeText,
              }}
            >
              Rs {data?.amount}
            </Text>
          )}
            {data?.end_time && (
            <Text style={{ color: colors.greyText, marginTop: 5 }}>
              {`Expiry time : ${data?.end_time}`}
            </Text>
          )}
          {data?.expiry_time && (
            <Text style={{ color: colors.greyText, marginTop: 5 }}>
              {`Expiry Duration : ${data?.expiry_time} Days`}
            </Text>
          )}
          {data?.remaining_hours && (
            <Text
              style={{ fontWeight: "500", color: "white", marginVertical: 5 }}
            >
              {`Remaining Hours : ${data?.remaining_hours} hrs`}
            </Text>
          )}
          {data?.total_hours && (
            <Text
              style={{ fontWeight: "500", color: "white", marginVertical: 5 }}
            >
              {`Total Hours : ${data?.total_hours} Hours`}
            </Text>
          )}
          <Text
            style={{
              fontSize: 21,
              color: colors.orangeText,
              marginBottom: 10,
            }}
          >
            {data?.title}
          </Text>
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate("Passesparkings",{pass_id:data?.pass_id})
          }}
          >
          <Text
            style={{
              fontSize: 14,
              color: colors.textWhite,
              marginBottom: 10,
            }}
          >
            Check for accessible parkings
          </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          borderRadius: 20,
          position: "absolute",
          top: "40%",
          height: 30,
          width: 30,
          marginLeft: -15,
          backgroundColor: "#f7f7f7",
        }}
      />

      <View
        style={{
          borderRadius: 20,
          position: "absolute",
          top: "40%",
          right: 0,
          height: 30,
          width: 30,
          marginRight: -15,
          backgroundColor: "#f7f7f7",
        }}
      />
    </TouchableOpacity>
  );
};

export default ListPasssesView;

const styles = StyleSheet.create({});
