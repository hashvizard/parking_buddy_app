import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import SignUpScreen from "../../lib/Authentication/SignUp";
import OTPScreen from "../../lib/Authentication/OTP";
import UserDetails from "../../lib/Authentication/UserDetails";
import UploadPhoto from "../../lib/Authentication/UploadPhoto";
import PreviewPhoto from "../../lib/Authentication/PreviewPhoto";
import SetLocation from "../../lib/Authentication/SetLocation";
import Congratulation from "../../lib/Authentication/Congratulation";
import Home from "../../lib/Booking/Home";
import Search from "../../lib/Booking/Search";
import Reservation from "../../lib/Booking/Reservation";
import BookingDetails from "../../lib/Booking/BookingDetails";
import ConfirmBooking from "../../lib/Booking/Confirm";
import Booked from "../../lib/Booking/Congratulation";
import PaymentMethod from "../../lib/Booking/PaymentMethod";
import AddNewCard from "../../lib/Booking/AddNewCard";
import Voucher from "../../lib/Booking/Voucher";
import ProfileMenu from "../../lib/Others/ProfileMenu";
import EditAccount from "../../lib/Others/EditAccount";
import RegisterVehicle from "../../lib/Others/RegisterVehicle";
import RefundHistory from "../../lib/Others/RefundHistory";
import RefundRequest from "../../lib/Others/Refund";
import Support from "../../lib/Others/Support";
import Profile from "../../lib/Others/Profile";
import PreviousBookings from "../../lib/Others/PreviousBookings";
import Notifications from "../../lib/Others/Notification";
import Legal from "../../lib/Others/Legal";
import Chat from "../../lib/Others/Chat";
import AddVehicle from "../../lib/Others/AddVehicle";
import BookingInfo from "../../lib/Others/BookingDetails";
import { NavBar } from "../../lib/Components";
import BookingDataView from "../../lib/Booking/BookingDataView";
import Passes from "../../lib/Booking/Passes";
import MyPasses from "../../lib/Components/MyPasses";
import AddNewVehicle from "../../lib/Vehicle/AddNewVehicle";
import AllPasses from "../../lib/Components/AllPasses";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function () {
  const { loggedIn } = useSelector((state) => state.data);

  const HomeTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <NavBar {...props} />}
      >
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="ProfileMenu" component={ProfileMenu} />
        <Tab.Screen name="RegisterVehicle" component={RegisterVehicle} />
        <Tab.Screen name="PreviousBookings" component={PreviousBookings} />
        <Tab.Screen name="RefundHistory" component={RefundHistory} />
      </Tab.Navigator>
    );
  };

  const AuthRoutes = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
        <Stack.Screen name="PreviewPhoto" component={PreviewPhoto} />
        <Stack.Screen name="SetLocation" component={SetLocation} />
        <Stack.Screen name="Congratulation" component={Congratulation} />
      </Stack.Navigator>
    );
  };

  const HomeRoutes = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeTab} />
        <Stack.Screen name="Reservation" component={Reservation} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} />
        <Stack.Screen name="Passes" component={Passes} />
        <Stack.Screen name="MyPasses" component={MyPasses} />
        <Stack.Screen name="AllPasses" component={AllPasses} />
        <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
        <Stack.Screen name="BookingDataView" component={BookingDataView} />

        <Stack.Screen name="Voucher" component={Voucher} />
        <Stack.Screen name="Booked" component={Booked} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="AddNewCard" component={AddNewCard} />
        <Stack.Screen name="EditProfile" component={EditAccount} />
        <Stack.Screen name="RefundRequest" component={RefundRequest} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Legal" component={Legal} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="AddVehicle" component={AddNewVehicle} />
        <Stack.Screen name="BookingInfo" component={BookingInfo} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {loggedIn  ? HomeRoutes() : AuthRoutes()}
    </NavigationContainer>
  );
}
