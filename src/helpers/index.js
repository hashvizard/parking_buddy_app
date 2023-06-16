import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { Alert, PermissionsAndroid, Platform, Linking } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Geolocation from "react-native-geolocation-service";
import { LoginManager, AccessToken, Profile } from "react-native-fbsdk-next";
import moment from "moment";
import RazorpayCheckout from "react-native-razorpay";
import messaging from "@react-native-firebase/messaging";
import colors from "../constants/colors";

export const paymentGateway = async (amount, user, cb, errorCb) => {
  const options = {
    // Configure your payment options here (e.g., key, amount, currency, etc.)
    key: process.env.RAZORPAY_KEY,
    amount: parseInt(amount) * 100, // Amount in paise (e.g., 10000 = ₹100)
    currency: "INR",
    name: "Parking Buddy",
    description: "Book your parking slot",
    image:
      "https://www.shutterstock.com/image-vector/street-signage-road-sign-parking-600w-522601459.jpg",

    prefill: {
      email: user?.email,
      contact: user?.phone,
      name: user?.name,
    },
    theme: { color: colors.appColor },
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      cb(data?.razorpay_payment_id);
    })
    .catch((error) => {
      errorCb(error);
    });
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

export async function getFcmToken() {
  let fcmToken = await AsyncStorage.getItem("fcmToken");

  if (!fcmToken) {
    try {
      let token = await messaging().getToken();

      if (token) {
        await AsyncStorage.setItem("fcmToken", token);
        return token;
      }
    } catch (error) {
      console.log("error", error);
      return null;
    }
  }
  return fcmToken;
}

export const NotificationListerner = () => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
      }
    });
  messaging().onMessage(async (remoteMessage) => {
    console.log(remoteMessage, "Notification on foreground state...");
  });
};

export const parseDisplayName = (displayName) => {
  const nameParts = displayName?.split(" ");
  if (nameParts?.length === 1) {
    return [nameParts[0], ""];
  } else {
    const firstName = nameParts?.shift();
    const lastName = nameParts?.join(" ");
    return {
      firstName: firstName,
      lastName: lastName,
    };
  }
};

// -------------------- API structure handler -------------- //

// const BASE_URL = "http://10.0.2.2:8000/api/";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

/**
 * Making Header for requests
 */
const requestHeaderCreator = async (file, requireToken) => {
  const token = await AsyncStorage.getItem("parking_buddy_access_token");

  let tempHeaders = {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/json",
    },
  };

  if (file) {
    tempHeaders.headers["Content-Type"] = "multipart/form-data";
  }

  if (requireToken) {
    const tokenHeaders = {
      Authorization: `Bearer ${token}`,
      ...tempHeaders.headers,
    };
    tempHeaders = {
      headers: tokenHeaders,
    };
  }

  return tempHeaders;
};

/**
 * call API
 *
 * @param {string} url
 * @param {object} data
 * @returns
 */
export const postDataApi = async (
  url,
  data = {},
  requireToken = true,
  contiansFile = false
) => {
  try {
    console.log(BASE_URL,"I ahhs")
    const response = await axios.post(
      BASE_URL + url,
      data,
      await requestHeaderCreator(contiansFile, requireToken)
    );

    return response.data;
  } catch (err) {
    console.log(err)
    // Reason: Using any as the error could be of any type
    return err.response.data;
  }
};



/**
 * call GET API
 *
 * @param {string} url
 * @returns
 */
export const getDataApi = async (
  url,
  requireToken = true,
  contiansFile = false
) => {
  try {
    const response = await axios.get(
      BASE_URL + url,
      await requestHeaderCreator(contiansFile, requireToken)
    );
    return response.data;
  } catch (err) {
    // Reason: Using any as the error could be of any type

    return err.response.data;
  }
};

/**
 * call put API
 *
 * @param {string} url
 * @param {object} data
 * @returns
 */
export const putDataApi = async (
  url,
  data,
  requireToken = true,
  contiansFile = false
) => {
  try {
    const response = await axios.post(
      BASE_URL + url,
      data,
      await requestHeaderCreator(contiansFile, requireToken)
    );

    return response.data;
  } catch (err) {
    console.log(err.response.data, "ssdsdsdd");
    // Reason: Using any as the error could be of any type
    return err.response.data;
  }
};

/**
 * call delete API
 *
 * @param {string} url
 * @returns
 */
export const delDataApi = async (
  url,
  requireToken = true,
  contiansFile = false
) => {
  try {
    const response = await axios.delete(
      BASE_URL + url,
      await requestHeaderCreator(contiansFile, requireToken)
    );
    return response.data;
  } catch (err) {
    // Reason: Using any as the error could be of any type
    return err.response.data;
  }
};

// -------------------- Basic Function Handlers --------------- //

export const getLastFourDigits = (str) => {
  if (str?.length < 4) {
    // If the input string is less than 4 characters, return the entire string
    return str;
  } else {
    // Extract the last 4 characters from the input string
    const lastFourDigits = str?.slice(-4);
    return lastFourDigits;
  }
};

// Function to Get Choose File From Gallery
export const chooseFile = (type) =>
  new Promise((resolve, reject) => {
    const options = {
      mediaType: type,
      quality: 1,

    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        reject("User cancelled camera picker");
        return;
      } else if (response.errorCode === "camera_unavailable") {
        reject("Camera not available on device");
        return;
      } else if (response.errorCode === "permission") {
        reject("Permission not satisfied");
        return;
      } else if (response.errorCode === "others") {
        reject(response.errorMessage);
        return;
      }
      resolve(response?.assets[0]);
    });
  });

// Function to Get Camera Permission
export const cameraPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === "android") {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        .then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve("granted");
          }
          return reject("Camera Permission denied");
        })
        .catch((error) => {
          console.log("Ask Camera permission error: ", error);
          return reject(error);
        });
    }
  });

// Function to Get Camera Permission
export const externalStoragePermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === "android") {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )
        .then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve("granted");
          }
          return reject("External Permission denied");
        })
        .catch((error) => {
          console.log("Ask External permission error: ", error);
          return reject(error);
        });
    }
  });

// Function to use the camera
export const openCamera = (type) =>
  new Promise(async (resolve, reject) => {
    const options = {
      mediaType: type,
      quality: 1,
    };
    if (Platform.OS === "android") {
      const cameraPermissionAllowed = await cameraPermission();
      const writePermissionAllowed = await externalStoragePermission();
      if (
        cameraPermissionAllowed !== PermissionsAndroid.RESULTS.GRANTED &&
        writePermissionAllowed !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        reject("Camera permission denied.");
        return;
      }
    }
    try {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          reject("User cancelled camera picker");
          return;
        } else if (response.errorCode === "camera_unavailable") {
          reject("Camera not available on device");
          return;
        } else if (response.errorCode === "permission") {
          reject("Permission not satisfied");
          return;
        } else if (response.errorCode === "others") {
          reject(response.errorMessage);
          return;
        }

        resolve(response?.assets[0]);
      });
    } catch (error) {
      console.log("Ask External permission error: ", error);
      reject(error);
    }
  });

// Function to crop an image
export const imageCrop = (path) =>
  new Promise(async (resolve, reject) => {
    try {
      ImagePicker.openCropper({
        path: path,
        width: 300,
        height: 300,
        cropping: true,
        includeBase64:true
      }).then((image) => {
        resolve(image);
      });
    } catch (error) {
      console.log("Ask External permission error: ", error);
      reject(error);
    }
  });

// Function to Get User Location Permission
export const locationPermission = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === "ios") {
      try {
        const permissionStatus = await Geolocation.requestAuthorization(
          "whenInUse"
        );
        if (permissionStatus === "granted") {
          return resolve("granted");
        }
        reject("Permission not granted");
      } catch (error) {
        return reject(error);
      }
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
      .then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve("granted");
        }
        return reject("Location Permission denied");
      })
      .catch((error) => {
        console.log("Ask Location permission error: ", error);
        return reject(error);
      });
  });

// Function to Get User Current Location
export const getCurrentLocation = () =>
  new Promise(async (resolve, reject) => {
    const askLocationPermission = await locationPermission();
    if (askLocationPermission !== PermissionsAndroid.RESULTS.GRANTED) {
      reject("Location permission denied.");
      return;
    }
    Geolocation.getCurrentPosition(
      (position) => {
        const cords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          direction: position?.coords?.heading,
        };

        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${cords.latitude},${cords.longitude}&key=${process.env.GOOGLE_MAP_API}`
        )
          .then((response) => response.json())
          .then((data) => {
            // Extract location data from the API response
            const results = data.results;
            if (results.length > 0) {
              const address = results[0].formatted_address;
              const city = results[0].address_components.find((component) =>
                component.types.includes("locality")
              ).long_name;
              const country = results[0].address_components.find((component) =>
                component.types.includes("country")
              ).long_name;
              // Handle location data as needed
              let data = {
                my_location: `Address: ${address}, City: ${city}, Country: ${country}`,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              resolve(data);
            }
          })
          .catch((error) => {
            // Handle error, if any
            console.log(error);
            reject(error);
          });
      },
      (error) => {
        reject(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });

// Facebook Login
export const facebookLogin = () =>
  new Promise(async (resolve, reject) => {
    try {
      await LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        async function (result) {
          if (result.isCancelled) {
            reject("Failed");
            console.log("Login cancelled");
          } else {
            Profile.getCurrentProfile().then(async function (profileData) {
              if (profileData) {
                const userProfileData = { ...profileData };
                const tokenData = await AccessToken.getCurrentAccessToken();
                if (tokenData?.accessToken) {
                  if (!userProfileData.email) {
                    var api =
                      "https://graph.facebook.com/v2.8/" +
                      tokenData.userID +
                      "?fields=name,email&access_token=" +
                      tokenData.accessToken;
                    try {
                      const additionalData = await (await fetch(api))?.json();
                      if (additionalData?.email) {
                        userProfileData.email = additionalData.email;
                      }
                    } catch (e) {
                      console.log("Facebook email not found: ", e);
                      reject("Failed");
                    }
                  }
                  resolve(userProfileData);
                  reject("Failed");
                } else {
                  onError("Facebook Signin failed.");
                }
              } else {
                console.log("I reach here");
              }
            });
          }
        },
        function (error) {
          console.log("Login fail with error: " + error);
          reject("Failed");
        }
      );
    } catch (error) {
      console.log("Ask External permission error: ", error);
      reject("Failed");
    }
  });

export function hasValue(obj) {
  return Object.keys(obj).length > 0;
}
// '2023-04-17T10:50:09.249Z'
export function getTimeStamp(val) {
  const timestamp = Math.round(new Date(val).getTime());
  return timestamp;
}

// '2023-04-17T10:50:09.249Z'
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  const hours = date.getHours();
  const minutes = padZero(date.getMinutes());
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = padZero(hours % 12 || 12);
  return `${day} ${month}, ${formattedHours}:${minutes} ${ampm}`;
}

function getMonthName(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month];
}

function padZero(number) {
  return String(number).padStart(2, "0");
}

export function checkObjectValues(obj) {
  return Object.values(obj).every(
    (value) => value !== null && value !== undefined && value !== ""
  );
}

export const getTimeFrame = (timestamp, hoursToAdd, rate = 0) => {
  // Replace "your_timestamp" with your actual timestamp value

  var your_timestamp = new Date(timestamp);

  // Add 4 hours to the timestamp
  // your_timestamp.setHours(your_timestamp.getHours() + hoursToAdd);

  // Format the start and end times as "h:mm a"
  var start_time = your_timestamp.toLocaleTimeString("en-US", {
    day: "2-digit",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  var end_time = new Date(
    your_timestamp.getTime() + parseInt(hoursToAdd) * 60 * 60 * 1000
  ).toLocaleTimeString("en-US", {
    day: "2-digit",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Calculate the total hours between the start and end times and round to the nearest integer
  var total_hours = Math.round(
    (your_timestamp.getTime() +
      parseInt(hoursToAdd) * 60 * 60 * 1000 -
      your_timestamp.getTime()) /
      (1000 * 60 * 60)
  );

  return {
    total_amount: parseInt(rate) * parseInt(total_hours),
    time_frame: `${start_time} - ${end_time}`,
  };
};

export function cuponCode(number, amount, unit) {
  if (number == 0) {
    return 0;
  }
  if (unit === "percentage") {
    // Calculate the percentage of the amount and subtract it from the amount

    return (number / 100) * amount;
  } else if (unit == "number") {
    // Subtract the number from the amount

    return number;
  } else {
    // Invalid unit, return the original amount
    return amount;
  }
}

export function throttle(callback, delay) {
  let lastCalled = 0;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCalled < delay) {
      return;
    }

    lastCalled = now;
    callback.apply(this, args);
  };
}
// output: "Thursday 26 May, 22"
export const dateFormatChanger = (timestamp) => {
  // Create a Moment object from the timestamp

  const momentObj = moment(timestamp);

  // Format the Moment object into the desired string format
  const formattedString = momentObj.format("dddd DD MMMM, YY");

  return formattedString; // output: "Thursday 26 May, 22"
};

export function replaceDataById(arr, id, newData) {
  return arr.map((item) => {
    if (item.id === id) {
      return { ...item, ...newData };
    }
    return item;
  });
}

export function timestampToMysqlDatetime(timestamp) {
  const date = new Date(timestamp); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());
  const second = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function timestampToMysqlDatetimeWithOffset(timestamp, offset) {
  const date = new Date(timestamp); // Convert seconds to milliseconds
  date.setHours(date.getHours() + offset); // Add offset hours
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());
  const second = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function formatTime(startTime, endTime, start = false) {

  // Convert the start time and end time to Date objects
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Extract the day, month, and year from the start time
  const day = startDate.toLocaleDateString(undefined, { day: "numeric" });
  const month = startDate.toLocaleDateString(undefined, { month: "short" });

  const day2 = endDate.toLocaleDateString(undefined, { day: "numeric" });
  const month2 = endDate.toLocaleDateString(undefined, { month: "short" });

  const year = startDate.toLocaleDateString(undefined, { year: "numeric" });

  // Extract the hours and minutes from the start time and end time
  const startHours = startDate.getHours();
  const startMinutes = startDate.getMinutes();
  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();

  // Determine whether the start time is in the morning or afternoon
  const startPeriod = startHours >= 12 ? "Pm" : "Am";

  // Convert the start hours to 12-hour format
  const startHours12 = startHours % 12 || 12;

  // Determine whether the end time is in the morning or afternoon
  const endPeriod = endHours >= 12 ? "Pm" : "Am";

  // Convert the end hours to 12-hour format
  const endHours12 = endHours % 12 || 12;

  // Format the start and end times
  const startTimeFormatted = `${day} ${month}, ${startHours12}:${startMinutes
    .toString()
    .padStart(2, "0")} ${startPeriod}`;
  const endTimeFormatted = `${day2} ${month2}, ${endHours12}:${endMinutes
    .toString()
    .padStart(2, "0")} ${endPeriod}`;

  // Return the formatted times
  if (start) {
    return startTimeFormatted;
  }
  return `${startTimeFormatted} - ${endTimeFormatted}`;
}

export function convertUnderscoresToTitleCase(str) {
  // Replace underscores with spaces and split the string into an array of words
  const words = str.replace(/_/g, " ").split(" ");

  // Capitalize the first letter of each word
  const titleCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the words back into a single string with spaces
  const titleCaseStr = titleCaseWords.join(" ");

  return titleCaseStr;
}

export const alertBox = (title, description) =>
  Alert.alert(title, description, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

export const getTimeFrameOnly = (timestamp, hoursToAdd, rate = 0) => {
  // Replace "your_timestamp" with your actual timestamp value

  var your_timestamp = new Date(timestamp);

  // Add 4 hours to the timestamp
  // your_timestamp.setHours(your_timestamp.getHours() + hoursToAdd);

  // Format the start and end times as "h:mm a"
  var start_time = your_timestamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  var end_time = new Date(
    your_timestamp.getTime() + parseInt(hoursToAdd) * 60 * 60 * 1000
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${start_time} - ${end_time}`;
};

export function checkTime(dateString) {
  const currentTime = new Date();
  const inputTime = new Date(dateString);

  if (inputTime.getTime() < currentTime.getTime()) {
    inputTime.setDate(inputTime.getDate() + 1);
  }

  return inputTime.toISOString();
}

export function convertTimestampToFirestoreFormat(timestampString) {
  const timestamp = new Date(timestampString);

  const seconds = Math.floor(timestamp.getTime() / 1000);
  const nanoseconds = (timestamp.getTime() % 1000) * 1000000;

  return { seconds, nanoseconds };
}

export function convertFirestoreTimestampsToReadableStrings(array) {
  return array.map((obj) => {
    const seconds = obj.createdAt.seconds;
    const nanoseconds = obj.createdAt.nanoseconds;

    const date = new Date(seconds * 1000 + nanoseconds / 1000000);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const secondsWithMs =
      date.getUTCSeconds().toString().padStart(2, "0") +
      "." +
      date.getUTCMilliseconds().toString().padStart(3, "0");
    const timezoneOffset = date.getTimezoneOffset();

    const timezoneHours = Math.floor(Math.abs(timezoneOffset) / 60)
      .toString()
      .padStart(2, "0");
    const timezoneMinutes = (Math.abs(timezoneOffset) % 60)
      .toString()
      .padStart(2, "0");
    const timezoneSign = timezoneOffset < 0 ? "+" : "-";

    const timestampString = `${year}-${month}-${day}T${hours}:${minutes}:${secondsWithMs}Z`;

    return { ...obj, createdAt: timestampString };
  });
}

export function decodeAndFetchFirstValue(jsonString) {
  // Decode the JSON string
  const decodedData = JSON.parse(jsonString);

  // Check if the decoded data is an array and has elements
  if (Array.isArray(decodedData) && decodedData.length > 0) {
    // Return the first value from the array
    return decodedData[0];
  }

  // Return null if the decoded data is not an array or has no elements
  return null;
}


export function formatDateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function separateExpiredAndNonExpiredObjects(array) {
  const expiredObjects = [];
  const nonExpiredObjects = [];
  const currentTime = new Date();

  array.forEach(obj => {
    const endTime = new Date(obj.end_time);

    if (endTime < currentTime) {
      expiredObjects.push(obj);
    } else {
      nonExpiredObjects.push(obj);
    }
  });

  return {
    expired: expiredObjects,
    nonExpired: nonExpiredObjects
  };
}


export function filterArrayByEndTime(array) {
  const today = new Date(); // Get current date
  const filteredArray = array.filter(item => {
    const endTime = new Date(item.end_time); // Convert end_time to a Date object
    return endTime > today; // Compare end_time with today's date
  });
  return filteredArray;
}


export const handleNavigate = (latitude,longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url);
};


export  const isTimeGreaterThan24Hours = (timeString) => {
  // Parse the given time string into a Date object
  const givenTime = new Date(timeString);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time that is 24 hours in the past
  const pastTime = new Date(currentTime.getTime() - (24 * 60 * 60 * 1000));

  // Compare the given time with the past time
  return givenTime > pastTime;
};

export function calculateHourDifference(start, end) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();

  const durationInHours = Math.floor((endTime - startTime) / (1000 * 60 * 60));

  return durationInHours;
}


export function  addHoursToDate(inputDate, hoursToAdd) {

  console.log(inputDate,hoursToAdd,"hoursToAddhoursToAddhoursToAddhoursToAdd")
  if (!inputDate) {
    return null; // or handle the case when the input date is not provided
  }

  const timeZoneOffset = 330; // Offset for Mumbai, India in minutes (330 = UTC+5:30)
  const [datePart, timePart] = inputDate.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hour, minute, second] = timePart.split(':');

  // Create a new Date object with the adjusted date and time components
  const updatedDateObj = new Date(
    parseInt(year), parseInt(month) - 1, parseInt(day),
    parseInt(hour), parseInt(minute), parseInt(second)
  );

  // Add hours and time zone offset
  const updatedTime = updatedDateObj.getTime() + (hoursToAdd * 3600000) + (timeZoneOffset * 60000);
  updatedDateObj.setTime(updatedTime);

  // Format the new date as a string
  const newDateStr = updatedDateObj.toISOString().split(".")[0].replace("T", " ");

  return newDateStr;
}