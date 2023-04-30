import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { useEffect } from "react";

const SearchDropDown = () => {
  const [dummy, setDummy] = useState([
    {
      id: 1,
      name: "Hello World",
    },
    {
      id: 2,
      name: "Hello World 1",
    },
    {
      id: 3,
      name: "Hello World 2",
    },
    {
      id: 4,
      name: "Hello World 3",
    },
    {
      id: 5,
      name: "Hello World 4",
    },
  ]);
  const [search, setSearch] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selected, setSelected] = useState({});

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return () => {
      setDummy([
        {
          id: 4,
          name: "Hello World 3",
        },
        {
          id: 5,
          name: "Hello World 4",
        },
      ]);
    };
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
    <View style={{ margin: 10 }}>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: "darkgrey",
        }}
      >
        <TextInput
          placeholder="Where you want to go ?"
          style={{ paddingHorizontal: 15 }}
          onFocus={() => {
            fadeIn();
          }}
          onBlur={() => {
            fadeOut();
          }}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <Animated.View style={{ opacity: fadeAnim }}>
        {showDropDown &&
          dummy?.map((val) => {
            return (
              <TouchableOpacity
                key={val?.id}
                onPress={() => {
                  fadeOut();
                  setSearch(val?.name);
                  Keyboard.dismiss();
                  setSelected(val);
                }}
                style={{
                  marginTop: 5,
                  backgroundColor: "darkgrey",
                  borderRadius: 10,
                  padding: 15,
                }}
              >
                <Text style={{ color: "black" }}>{val?.name}</Text>
              </TouchableOpacity>
            );
          })}
      </Animated.View>
    </View>
  );
};

export default SearchDropDown;

const styles = StyleSheet.create({});
