import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { postDataApi, throttle } from "../../src/helpers";
import { bookingData, setMapData } from "../../src/redux/actions";
import { useDispatch, useSelector } from "react-redux";

const SearchList = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();
  const { isEnabled, loading, showBottomSheet } = useSelector(
    (state) => state.appState
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchSearchData = async () => {
    let data = {
      text: search,
    };
    try {
      const response = await postDataApi("getTopParkings", data, true);

      if (response?.status) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    }
  };

  const throttledFunction = throttle(fetchSearchData, 2000);

  useEffect(() => {
    throttledFunction();
  }, [search]);

  const fadeIn = () => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowDropDown(true);
    });
  };

  const fadeOut = () => {
    Animated.spring(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowDropDown(false);
    });
  };

  return (
    <View style={isEnabled ? {} : styles.header}>
      <View
        style={{
          paddingVertical: 5,
          width: "100%",
          flex: 1,
          backgroundColor: isEnabled ? "#08452310" : "white",
          borderRadius: 15,
        }}
      >
        <TextInput
          placeholder="Where you want to go ?"
          style={{ paddingHorizontal: 15, paddingVertical: Platform.OS == 'ios' ? 15 : null }}
          onFocus={() => {
            setShowDropDown(true);
            fadeIn();
          }}
          onBlur={() => {
            setShowDropDown(false);
            fadeOut();
          }}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <Animated.View style={{ opacity: fadeAnim }}>
        {showDropDown &&
          data?.map((val) => {
            return (
              <TouchableOpacity
                key={val?.id}
                onPress={() => {
                  fadeOut();
                  setSearch(val?.name);
                  Keyboard.dismiss();

                  dispatch(
                    bookingData({
                      searchData: val,
                      longitude: val.longitude,
                      latitude: val.latitude,
                      parking_id: val.id,
                      formatted_address: val.address,
                    })
                  );
                }}
                style={{
                  marginTop: 5,
                  padding: 15,
                  width: "100%",
                  flex: 1,
                  backgroundColor: isEnabled ? "#08452310" : "white",
                  borderRadius: 15,
                }}
              >
                <Text style={{ fontSize: 15, color: "black" }}>
                  {val?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </Animated.View>
    </View>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#08452310",
    borderRadius: 15,
    padding: 4,
  },
});
