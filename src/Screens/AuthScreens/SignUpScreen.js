import React, { useState, useRef, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";
import { database, auth } from "firebase";
import { Spinner } from "native-base";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function SignUpScreen({ navigation }) {
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(0);
  const [sessionID, setSessionID] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { setIsLoggedIn, user, setUser } = useContext(AuthContext);
  const [err, setErr] = useState("");
  const [numerr, setNumErr] = useState(false);
  const [emailerr, setEmailErr] = useState(false);
  const [nameerr, setNameErr] = useState(false);
  const [passerr, setPassErr] = useState(false);
  const [otperr, setOtpErr] = useState(false);
  const [expoToken, setExpoToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [passVisible, setPassVisible] = useState(false);

  const storeToken = async (value) => {
    try {
      const token = AsyncStorage.getItem("userToken");
      const pToken = JSON.stringify(token);

      if (pToken) {
        await AsyncStorage.removeItem("userToken");
        const userToken = JSON.stringify(value);
        await AsyncStorage.setItem("userToken", userToken);
      } else {
        const userToken = JSON.stringify(value);
        await AsyncStorage.setItem("userToken", userToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    setLoaded(false);
  };
  const prevStep = () => {
    setStep(step - 1);
    setLoaded(false);
  };

  const sendOtp = () => {
    console.log("clicked");
    setEmailErr(false);
    setNumErr(false);
    setPassErr(false);
    setNameErr(false);

    if (
      number.length === 10 &&
      email.includes("@") &&
      password !== "" &&
      name !== " "
    ) {
      setLoaded(true);

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          setUser(user.user);
          database().ref(`userGeneralInfo/${user.user.uid}`).set({
            phoneNumber: number,
            name: name,
            address: "",
            age: "",
            gender: "",
            aboutMe: "",
            travellerType: "",
            admin: false,
            pushNotificationToken: "",
            photoURL: "",
            email: email,
            profession: "",
            userID: user.user.uid,
          });
          user.user
            .updateProfile({
              displayName: name,
            })
            .then((displayName) => console.log(displayName))
            .catch((err) => console.log(err));
          setIsLoggedIn(true);
          storeToken(user.user);
          axios
            .get(
              `https://2factor.in/API/V1/8697a4f2-e821-11ea-9fa5-0200cd936042/SMS/+91${number}/AUTOGEN/touron`
            )
            .then((response) => {
              let session = response.data.Details;
              console.log(session, "RESPONSE DATA");
              setLoaded(false);
              setSessionID(session);
              nextStep();
            })
            .catch((err) => {
              console.log(err, "kjhk");
            });
        })
        .catch((err) => {
          setLoaded(false);
          setErr(err.message);
          console.log(err.message);
        });
    } else {
      if (email.includes("@") === false) {
        setEmailErr(true);
      }
      if (number.length !== 10) {
        setNumErr(true);
      }
      if (name == "") {
        setNameErr(true);
      }
      if (password.length < 6) {
        setPassErr(true);
      }
    }
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      console.log(finalStatus, existingStatus, "stst");

      if (existingStatus !== "granted" || Platform.OS === "android") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;

        console.log(finalStatus, "fianl");
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoToken(token));
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const verifyOtp = () => {
    setLoaded(true);
    axios
      .get(
        `https://2factor.in/API/V1/8697a4f2-e821-11ea-9fa5-0200cd936042/SMS/VERIFY/${sessionID}/${code}`
      )
      .then((response) => {
        console.log(response, "RESPONSE");
        const status = response.data.Details;
        console.log(status, "STATUS");
        if (status == "OTP Matched") {
          setName("");
          setNumber("");
          setPassword("");
          setEmail("");
          setUser(user);
          setIsLoggedIn(true);
          storeToken(user);
          setLoaded(false);
          navigation.replace("Main");
          prevStep();
        }
      })
      .catch((err) => {
        setLoaded(false);
        console.log(err, "err");
        setOtpErr(true);
      });
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      auth().onAuthStateChanged((user) => {
        setUser(user);
      });
    }
    return () => (mounted = false);
  }, []);

  const renderView = (step) => {
    switch (step) {
      case 0:
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.skip}>
              <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Text
                  style={{ fontSize: 18, color: "#333", fontFamily: "Andika" }}
                >
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <Animatable.View
                animation="fadeInUp"
                duration={1500}
                style={{
                  alignItems: "flex-end",
                  alignItems: "center",
                  marginTop: HEIGHT / 6,
                }}
              >
                <View
                  style={{ marginBottom: HEIGHT / 7, alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 40,
                      color: "white",
                      fontFamily: "NewYorkl",
                    }}
                  >
                    Sign Up
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={name}
                    placeholder="Name"
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    keyboardType="default"
                    onChangeText={(value) => setName(value)}
                    placeholderTextColor="white"
                  />
                </View>
                {!nameerr ? null : (
                  <View
                    style={
                      ([styles.inputContainer],
                      { backgroundColor: "transparent", marginBottom: 0 })
                    }
                  >
                    <Text
                      style={{
                        color: "yellow",
                        marginBottom: 10,
                        fontSize: 16,
                      }}
                    >
                      Enter Your Name
                    </Text>
                  </View>
                )}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    value={email}
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    keyboardType="default"
                    onChangeText={(value) => setEmail(value)}
                    placeholderTextColor="white"
                  />
                </View>
                {!emailerr ? (
                  null && err !== ""
                ) : (
                  <View
                    style={
                      ([styles.inputContainer],
                      { backgroundColor: "transparent", marginBottom: 10 })
                    }
                  >
                    <Text style={{ color: "yellow", margin: 0, fontSize: 16 }}>
                      Enter a Valid email id
                    </Text>
                    <Text style={{ color: "yellow", margin: 0, fontSize: 16 }}>
                      {err}
                    </Text>
                  </View>
                )}
                {err == "" ? null : (
                  <View
                    style={
                      ([styles.inputContainer],
                      { backgroundColor: "transparent", marginBottom: 10 })
                    }
                  >
                    <Text style={{ color: "yellow", margin: 0, fontSize: 14 }}>
                      {err}
                    </Text>
                  </View>
                )}

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={number}
                    placeholder="Whatsapp Number"
                    keyboardAppearance="dark"
                    keyboardType="number-pad"
                    placeholderTextColor="white"
                    onChangeText={(value) => setNumber(value)}
                  />
                </View>
                {!numerr ? null : (
                  <View
                    style={
                      ([styles.inputContainer],
                      { backgroundColor: "transparent", marginBottom: 10 })
                    }
                  >
                    <Text style={{ color: "yellow", margin: 0, fontSize: 16 }}>
                      Phone number should be 10 number
                    </Text>
                  </View>
                )}
                <View
                  style={[
                    styles.inputContainer,
                    {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                      alignItems: "center",
                    },
                  ]}
                >
                  <TextInput
                    style={{ width: WIDTH / 2, color: "#fff" }}
                    placeholder="Password"
                    onChangeText={(value) => setPassword(value)}
                    secureTextEntry={passVisible ? true : false}
                    keyboardType="default"
                  />
                  <Entypo
                    onPress={() => setPassVisible(!passVisible)}
                    name={!passVisible ? "eye-with-line" : "eye"}
                    size={24}
                    color="#fff"
                  />
                </View>
                {!passerr ? null : (
                  <View
                    style={
                      ([styles.inputContainer],
                      { backgroundColor: "transparent", marginBottom: 10 })
                    }
                  >
                    <Text style={{ color: "yellow", margin: 0, fontSize: 16 }}>
                      Password should be atleast minimum 6 charecters
                    </Text>
                  </View>
                )}

                <View style={styles.otpButtonContainer}>
                  {loaded ? (
                    <View style={{ paddingVertical: -10 }}>
                      <Spinner color="white" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        sendOtp();
                      }}
                    >
                      <Text style={styles.optButtonText}>Send Otp</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 20,
                    width: WIDTH * 0.9,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignInScreen")}
                  >
                    <Text
                      style={{
                        fontWeight: "900",
                        textAlign: "center",
                        color: "white",
                        marginVertical: WIDTH / 14,
                      }}
                    >
                      Already have an account? Try Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            </View>
          </ScrollView>
        );
      case 1:
        return (
          <View>
            <View
              style={{
                marginVertical: HEIGHT / 10,
                position: "absolute",
                bottom: HEIGHT * 0.7,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "white",
                  fontFamily: "Andika",
                }}
              >
                Enter the otp send to
              </Text>
              <Text
                style={{ fontSize: 25, color: "white", fontFamily: "Andika" }}
              >
                +91 {number}
              </Text>
            </View>
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Otp"
                  keyboardAppearance="dark"
                  keyboardType="number-pad"
                  onChangeText={(value) => setCode(value)}
                />
              </View>
              {!otperr ? null : (
                <View
                  style={
                    ([styles.inputContainer],
                    { backgroundColor: "transparent", marginBottom: 0 })
                  }
                >
                  <Text
                    style={{
                      color: "red",
                      marginBottom: 0,
                      fontSize: 20,
                    }}
                  >
                    Enter Valid Otp
                  </Text>
                </View>
              )}

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    prevStep();
                  }}
                >
                  <View style={styles.otpButton}>
                    <Text style={styles.otpText}> Back</Text>
                  </View>
                </TouchableOpacity>

                <View style={[styles.otpButton, { backgroundColor: "white" }]}>
                  {loaded ? (
                    <View>
                      <Spinner
                        color="black"
                        size="large"
                        style={{ padding: 20, margin: -15 }}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        verifyOtp();
                      }}
                    >
                      <Text style={[styles.otpText, { color: "black" }]}>
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Animatable.View
          duration={1000}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <ImageBackground
            style={{
              width: WIDTH,
              height: HEIGHT + 30,
              position: "absolute",
              //zIndex: -2,
            }}
            source={{
              uri: "https://images.pexels.com/photos/2249602/pexels-photo-2249602.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            }}
          />
          {renderView(step)}
        </Animatable.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default SignUpScreen;

const styles = new StyleSheet.create({
  otpButton: {
    marginTop: HEIGHT / 25,
    marginBottom: 85,
    backgroundColor: "black",
    borderRadius: 10,
    width: WIDTH / 3,
    alignContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    position: "relative",
  },
  otpText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "white",
    fontSize: 16,
    fontFamily: "Andika",
    // fontWeight: "bold",
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
    width: WIDTH * 0.9,

    backgroundColor: "#0005",
    marginBottom: 20,
  },
  optButtonText: {
    textAlign: "center",
    paddingVertical: 20,
    color: "white",
    fontSize: 16,
    fontFamily: "Andika",
    //  fontWeight: "bold",
  },
  otpButtonContainer: {
    marginBottom: HEIGHT / 8,
    backgroundColor: "black",
    borderRadius: 10,
    width: WIDTH * 0.9,
    alignContent: "center",
    position: "relative",
  },
  skip: {
    position: "absolute",
    right: 20,
    color: "#333",
    fontWeight: "bold",
    marginTop: HEIGHT / 20,
  },
});
