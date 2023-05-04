import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  Keyboard,
} from "react-native";
import Logo from "../../assets/svg/PB_Logo.svg";
import CaretDownIcon from "../../assets/svg/caret-down.svg";
import CarIcon from "../../assets/svg/Car.svg";
import ScooterIcon from "../../assets/svg/Scooter.svg";
import CarGreyIcon from "../../assets/svg/car_grey.svg";
import ScooterYellowIcon from "../../assets/svg/bikeyellow.svg";
import { Navigation, Title, Container } from "../Components";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ActivityIndicator, SegmentedButtons } from "react-native-paper";
import colors from "../../src/constants/colors";
import {
  bookingData,
  setEnabledHome,
  setMapData,
  setUserData,
  showBottomSheetContainer,
  vehicleData,
} from "../../src/redux/actions";
import {
  checkObjectValues,
  formatTimestamp,
  getCurrentLocation,
  getDataApi,
  getTimeStamp,
  hasValue,
  postDataApi,
} from "../../src/helpers";
import FilterIcon from "../../assets/svg/Filter.svg";
import EyeClosedIcon from "../../assets/svg/EyeClosed.svg";
import EyeOpenedIcon from "../../assets/svg/EyeOpened.svg";
import GoogleMap from "../Components/GoogleMap";
import { loadingState } from "../../src/redux/actions";
import { dummy } from "../../src/dummyData";
import { Marker } from "react-native-maps";
import BottomSheet from "../Components/BottomSheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BookingDetails from "./BookingDetails";
import SearchDropDown from "../Components/SearchDropDown";
import SearchList from "../Components/SearchList";
import { ScrollView } from "react-native";

const Home = ({ navigation }) => {
  const { mapData } = useSelector((state) => state.mapData);
  const { booking } = useSelector((state) => state.bookingState);
 
  const { user } = useSelector((state) => state.user);

  const { isEnabled, loading, showBottomSheet } = useSelector(
    (state) => state.appState
  );

  useEffect(() => {
    askForLocation();
  }, []);

  useEffect(() => {
    getVehiclesData();
  }, []);

  const getVehiclesData = async () => {
    // dispatch(loadingState(true));
    try {
      const response = await getDataApi(`vehicle`, true);
      if (response?.status) {
        // dispatch(emptyUserSignupData());
        // dispatch(setUserBackendData(response.data));
    
        dispatch(vehicleData({vehicles:response?.data}))
        
      } else {
        console.log(response, "I Got An Error while fetching Vehicles");
      }
    } catch (err) {
      console.log(err, "Receive an errdor");
    } finally {
      // dispatch(loadingState(false));
    }
  };

  const askForLocation = async () => {
    try {
      const locationData = await getCurrentLocation();
      dispatch(setUserData({ ...user, ...locationData }));
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  const [value, setValue] = React.useState("Hours");
  const [wheeler, setWheeler] = useState("four");
  const [hours, setHours] = useState("hours");
  const [time, settime] = useState("");
  const [showUnits, setshowUnits] = useState(false);
  const [currentParking, setCurrentParking] = useState({});

  const [availableSpot, setAvilableSpot] = useState(true);

  const toggleSwitch = () => {
    dispatch(loadingState(true));
    fetchParkings();
    dispatch(setEnabledHome(!isEnabled));
  };

  const toggleSpotSwitch = () => {
    setAvilableSpot((previousState) => !previousState);
  };

  var hrs = [];

  for (let i = 2; i <= 24; i++) {
    hrs.push(<Picker.Item key={i} label={i + " hours"} value={i} />);
  }

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  // Set the minimum date to the current time
  const minimumDate = new Date();
  // Set the maximum date to 24 hours from the current time
  const maximumDate = new Date();
  maximumDate.setDate(maximumDate.getDate() + 1);

  const handleConfirm = (date) => {
    setTimePickerVisible(false);
    settime(formatTimestamp(date));
    dispatch(
      bookingData({
        selectedTime: getTimeStamp(date),
      })
    );
  };

  useEffect(() => {
    fetchParkings();
  }, [booking?.longitude, booking?.latitude]);

  console.log(mapData?.parkings, "mapData?.parkings");

  const fetchParkings = async () => {
    let data = {
      latitude: booking?.latitude,
      longitude: booking?.longitude,
      vehicle_type: booking?.vehicle_type,
    };
    try {
      const response = await postDataApi("getParkingsNearMe", data, true);

      if (response?.status) {
        dispatch(setMapData({ parkings: response.data }));
      }
    } catch (error) {
      console.log("Error While Fetching Data : ", error);
    } finally {
      dispatch(loadingState(false));
    }
  };
  const handleFocus = () => {};

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => dispatch(showBottomSheetContainer(false))
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <BottomSheetModalProvider>
      <Container style={{ padding: 0 }}>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          titleStyle={styles.titleStyle}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onConfirm={handleConfirm}
          onCancel={() => setTimePickerVisible(false)}
        />

        <View style={{ flex: 1 }}>
          <GoogleMap>
            {mapData?.parkings?.map((item, index) => {
              if (!availableSpot || item?.remaining != 0) {
                return (
                  <Marker
                    key={index}
                    onPress={() => {
                      console.log(item);
                      setCurrentParking(item);
                      dispatch(showBottomSheetContainer(true));
                    }}
                    coordinate={{
                      latitude: item?.latitude,
                      longitude: item?.longitude,
                    }}
                    centerOffset={(0, 0)}
                  >
                    <Image
                      source={require("../../assets/images/PB_Logo.png")}
                      style={{ width: 30, height: 30 }}
                    />
                  </Marker>
                );
              } else {
                return;
              }
            })}
          </GoogleMap>
        </View>
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            backgroundColor: !isEnabled ? null : "#fff",
            padding: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          {isEnabled && (
            <View style={styles.header}>
              <View style={{ width: "50%" }}>
                <Title style={{ fontSize: 30 }} text="Book Your Parking" />
              </View>
              <Logo />
            </View>
          )}
          <View style={styles.form_container}>
            <View>
              {/*
                
                GOGGLE PLACE SEARCH
                
                <GooglePlacesAutocomplete
                  placeholder="Where Do You Want To Go Today?"
                  fetchDetails={true}
                  enablePoweredByContainer={false}
                  isRowScrollable={true}
                  onFocus={handleFocus}
                  styles={{
                    textInputContainer: {
                      width: "100%",
                    },
                    textInput: {
                      color: "black",
                      fontSize: 16,
                      paddingLeft: isEnabled ? 5 : 15,
                      backgroundColor: isEnabled ? "transparent" : "white",
                    },
                  }}
                  // textInputStyle={{
                  //   backgroundColor: colors.appColor,
                  // }}
                  placeholderTextColor="#a8ada9"
                  onPress={(data, details = null) => {
                    dispatch(
                      bookingData({
                        searchData: details,
                        longitude: details.geometry.location.lng,
                        latitude: details.geometry.location.lat,
                        place_id: details.place_id,
                        formatted_address: details.formatted_address,
                      })
                    );
                  }}
                  query={{
                    key: process.env.GOOGLE_MAP_API,
                    language: "en",
                    types: "geocode",
                  }}
                /> 
                
                
                */}

              <SearchList />
            </View>
            {isEnabled && (
              <>
                <View style={styles.vehicle_wrapper}>
                  <TouchableOpacity
                    style={[
                      styles.vehicle,
                      booking.vehicle_type === 1
                        ? { borderWidth: 2, borderColor: "#FECF3E80" }
                        : null,
                    ]}
                    onPress={() =>
                      dispatch(
                        bookingData({
                          vehicle_type: 1,
                        })
                      )
                    }
                  >
                    {booking.vehicle_type == 0 ? (
                      <CarIcon width={80} height={50} />
                    ) : (
                      <CarGreyIcon width={80} height={50} />
                    )}

                    <Text style={styles.vehicle_text}>4 Wheeler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.vehicle,
                      booking.vehicle_type === 0
                        ? { borderWidth: 2, borderColor: "#FECF3E80" }
                        : null,
                      { marginLeft: 10 },
                    ]}
                    onPress={() =>
                      dispatch(
                        bookingData({
                          vehicle_type: 0,
                        })
                      )
                    }
                  >
                    {booking.vehicle_type == 1 ? (
                      <ScooterYellowIcon width={80} height={50} />
                    ) : (
                      <ScooterIcon width={80} height={50} />
                    )}

                    <Text style={styles.vehicle_text}>2 Wheeler</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.time_wrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      setTimePickerVisible(true);
                    }}
                    style={styles.time}
                  >
                    <TextInput
                      editable={false}
                      value={time}
                      style={styles.form_input}
                      placeholder="Time"
                      placeholderTextColor="#a8ada9"
                    />
                  </TouchableOpacity>

                  <View style={styles.hours}>
                    <TextInput
                      keyboardType="numeric"
                      style={{
                        fontSize: 15,

                        color: "black",
                      }}
                      value={booking.time_duration}
                      onChangeText={(val) => {
                        dispatch(
                          bookingData({
                            time_duration: val,
                          })
                        );
                      }}
                      placeholder={booking?.time_duration_unit}
                      placeholderTextColor="#a8ada9"
                    />
                    <TouchableOpacity
                      onPress={() => setshowUnits(!showUnits)}
                      style={{
                        height: 40,
                        width: 20,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text>hrs</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
          {isEnabled && (
            <>
              <View style={styles.search_container}>
                <TouchableOpacity
                  disabled={!checkObjectValues(booking) || loading}
                  onPress={toggleSwitch}
                >
                  <View style={styles.search_btn}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: !checkObjectValues(booking)
                          ? "darkgrey"
                          : "#000000",
                      }}
                    >
                      {loading ? "Looking for Parkings.." : "Search"}
                    </Text>
                    {loading && (
                      <ActivityIndicator size="small" color="white" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        {!isEnabled && (
          <View style={styles.available}>
            {availableSpot ? (
              <EyeOpenedIcon width="30" height="30" />
            ) : (
              <EyeClosedIcon width="30" height="30" />
            )}

            <Text style={{ fontWeight: "500", fontSize: 16, color: "#084523" }}>
              Only Show Available Spots
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#084523" }}
              thumbColor={availableSpot ? "#fff" : "#fff"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSpotSwitch}
              value={availableSpot}
            />
          </View>
        )}
      </Container>
      {hasValue(currentParking) && (
        <BottomSheet
          points={["1%", "33%", "50%", "80%"]}
          scrollable={true}
          defaultPointIndex={2}
        >
          <BookingDetails
            navigation={navigation}
            parkingData={currentParking}
          />
        </BottomSheet>
      )}
    </BottomSheetModalProvider>
  );
};
export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form_container: {
    marginTop: 15,
  },
  form_input: {
    fontSize: 15,

    color: "darkgrey",
  },
  destination: {
    padding: 10,
    backgroundColor: "#08452310",
    borderRadius: 15,
  },
  vehicle_wrapper: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vehicle: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "#08452310",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  vehicle_text: {
    marginTop: 10,
    fontSize: 15,
    color: "#a8ada9",
  },
  time_wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  time: {
    backgroundColor: "#08452310",
    borderRadius: 15,
    padding: 10,
    flex: 2,
  },

  available: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 100,
    left: 15,
    right: 15,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#08452312",
    borderRadius: 15,
    padding: 15,
  },
  hours: {
    backgroundColor: "#08452310",
    borderRadius: 15,
    padding: 10,
    fontSize: 15,
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  search_container: {
    marginBottom: 10,
    borderRadius: 15,
    marginTop: 15,
  },
  search_btn: {
    backgroundColor: "#fecf3e",
    borderRadius: 15,
    color: "#fff",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  filter: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#08452312",
    borderRadius: 15,
    flex: 1,
  },

  datePickerContainerStyle: {
    backgroundColor: "red",
  },
  titleStyle: {
    color: "red",
  },
  cancelTextStyle: {
    color: "#333333",
  },
  confirmTextStyle: {
    color: "#333333",
  },
  dateText: {
    color: "#333333",
  },

  searchbar_container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: 5,
    borderRadius: 5,
    marginRight: 10,

    backgroundColor: "#08452310",
    flex: 8,
  },
});
