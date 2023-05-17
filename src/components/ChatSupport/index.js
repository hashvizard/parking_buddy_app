import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, InputToolbar, Send,Bubble } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";
import {
  convertFirestoreTimestampsToReadableStrings,
  convertTimestampToFirestoreFormat,
} from "../../helpers";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SendIcon from "../../../assets/svg/IconSend.svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";
export function ChatSupport() {
  const { userData } = useSelector((state) => state.data);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatSupportDocRef = firestore()
      .collection("chat_support")
      .doc(`${userData?.id}`);

    const unsubscribe = chatSupportDocRef.onSnapshot((docSnapshot) => {
      if (docSnapshot.exists) {
        let data = docSnapshot.data();
        if (data?.data) {
          let tempData = convertFirestoreTimestampsToReadableStrings(
            data?.data
          );
          setMessages([...tempData].reverse());
        } else {
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'green',
          },
        }}
      />
    );
  };

  const handleSendMessage = async (message) => {
    let tempMessage = { ...message };

    tempMessage.createdAt = convertTimestampToFirestoreFormat(
      tempMessage.createdAt
    );

    const chatSupportDocRef = firestore()
      .collection("chat_support")
      .doc(`${userData?.id}`);

    try {
      await chatSupportDocRef.set(
        {
          data: firestore.FieldValue.arrayUnion(tempMessage),
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Error writing document: ", error);
    }
  };
  function renderChatEmpty() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "darkgrey", transform: [{ scaleY: -1 }] }}>
          No Previous Message found
        </Text>
      </View>
    );
  }
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    handleSendMessage(messages[0]);
  }, []);
  function renderAvatar(props) {
    return null; // hide the avatar
  }

  return (
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      renderAvatar={renderAvatar}
      onSend={(messages) => onSend(messages)}
      renderChatEmpty={renderChatEmpty}
      user={{
        _id: userData?.id,
      }}
    />
  );
}

const styles = StyleSheet.create({
  staff: {
    backgroundColor: "#fff",
    shadowColor: "#5a6cea",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 24,
    borderRadius: 18,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  staff_info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pp_image: {
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  chat_input: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: "#08452310",
    padding: 15,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
