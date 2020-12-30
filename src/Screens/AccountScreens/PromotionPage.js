import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Linking,
  TextInput,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import { Spinner } from "native-base";
import * as Notifications from "expo-notifications";
const PromotionPage = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [finishMessage, setFinishMessage] = useState(false);
  const [err, setErr] = useState(false);
  const getExpoId = () => {
    let user = [];
    firebase
      .database()
      .ref("/userGeneralInfo")
      .on("value", (data) => {
        data.forEach((c) => {
          user.push(c.val().pushNotificationToken);
        });
      });

    setUsers(user);
  };

  const send = () => {
    if (title != "" && body != "" && url != "") {
      setLoaded(true);
      try {
        setErr(false);
        users.forEach((u) => {
          sendPushNotification(u);
        });
        setLoaded(false);
        setFinishMessage(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErr(true);
    }
  };

  const sendPushNotification = async (expoToken) => {
    const messages = {
      to: expoToken,
      sound: "default",
      title: title,
      body: body,
      data: {
        url: "",
      },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });
  };

  useEffect(() => {
    getExpoId();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const url = response.notification.request.content.data.url;
        Linking.openURL(url).catch((err) =>
          console.error("An error occurred", err)
        );
      }
    );
    return () => subscription.remove();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#81ecec",
        shadowColor: "red",
        shadowOpacity: 1,
      }}
    >
      <View style={{ marginTop: HEIGHT / 10 }}>
        <Text style={{ fontSize: 30, fontFamily: "Andika" }}>
          Promotional page
        </Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            keyboardType="visible-password"
            keyboardAppearance="dark"
            value={title}
            keyboardType="email-address"
            onChangeText={(value) => setTitle(value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={body}
            style={styles.input}
            placeholder="Body"
            keyboardType="visible-password"
            keyboardAppearance="dark"
            keyboardType="email-address"
            onChangeText={(value) => setBody(value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={url}
            style={styles.input}
            placeholder="Url"
            keyboardType="visible-password"
            keyboardAppearance="dark"
            keyboardType="email-address"
            onChangeText={(value) => setUrl(value)}
          />
        </View>
        {err ? (
          <Text style={{ fontFamily: "Avenir", color: "red", fontSize: 20 }}>
            All fields are required
          </Text>
        ) : null}
        <View style={styles.otpButtonContainer}>
          {loaded ? (
            <View style={{ paddingVertical: -10 }}>
              <Spinner color="white" />
            </View>
          ) : (
            <>
              {finishMessage ? (
                <TouchableOpacity
                  onPress={() => {
                    setFinishMessage(false);
                    setTitle("");
                    setBody("");
                    setUrl("");
                    setErr(false);
                  }}
                >
                  <Text style={styles.optButtonText}>
                    {" "}
                    Notification Has been sent to all users
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    send();
                  }}
                >
                  <Text style={styles.optButtonText}>Send Notification</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default PromotionPage;

const styles = new StyleSheet.create({
  optButtonText: {
    textAlign: "center",
    paddingVertical: 20,
    color: "white",
    fontSize: 16,
    fontFamily: "Andika",
  },
  otpButtonContainer: {
    marginBottom: HEIGHT / 8,
    backgroundColor: "black",
    borderRadius: 10,
    width: WIDTH * 0.9,
    alignContent: "center",
    position: "relative",
  },
  input: {
    marginHorizontal: 20,
    width: WIDTH * 0.8,
    height: 60,
    color: "white",
    fontFamily: "Andika",
  },
  inputContainer: {
    height: 60,
    borderRadius: 10,
    backgroundColor: "#0005",
    marginBottom: 20,
  },
});
