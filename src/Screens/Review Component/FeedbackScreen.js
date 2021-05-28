import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { database } from "firebase";
import { AuthContext } from "./../../context/AuthContext";
import Banner from "./Reusable/Banner";
import { Input } from "native-base";

const FeedbackScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [customerName, setCustomerName] = useState("");
  const [feedback, setFeedback] = useState("");
  const { width, height } = useWindowDimensions();
  const [greeting, setGreeting] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);

  const submit = () => {
    if (customerName !== "" && feedback !== "") {
      setError(false);
      const feedbackDetails = {
        name: customerName,
        feedback: feedback,
        userId: userInfo.userID,
      };
      database()
        .ref(`customerFeedbacks`)
        .push(feedbackDetails)
        .then(() => {
          setGreeting(true);
          setError(false);
          setCustomerName("");
          setFeedback("");
        })
        .catch((err) => Alert.alert(err.message));
    } else {
      setError(true);
    }
  };

  const render = () => {
    switch (step) {
      case 1:
        return <Banner setReview={() => setStep(2)} close={() => setStep(2)} />;
      case 2:
        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              {greeting && (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    backgroundColor: "black",
                    // opacity: 0.8,
                    zIndex: 10,
                    height: height,
                    width: width,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setGreeting(false)}
                >
                  <View>
                    <View
                      style={{
                        // height: HEIGHT / 2,
                        width: width * 0.8,
                        backgroundColor: "white",
                        alignItems: "center",
                        borderRadius: 10,
                        opacity: 1,
                        textAlign: "center",
                      }}
                    >
                      <Image
                        source={require("../../../assets/intros/Greeting.png")}
                        style={{
                          height: height / 2.8,
                          width: width * 0.8,
                          marginTop: 10,
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontFamily: "Avenir",
                          fontSize: 20,
                        }}
                      >
                        Thank You !
                      </Text>
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 20,
                          fontFamily: "Andika",
                        }}
                      >
                        By Making Your Voice Heard,you help us improve{" "}
                        <Text style={{ fontWeight: "bold" }}>tour On</Text> even
                        better
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              <View
                style={{
                  display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "space-between",
                  marginTop: Platform.OS === "android" ? 30 : 60,
                  marginLeft: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    // setStep(1);
                    navigation.toggleDrawer();
                  }}
                >
                  <Feather name="arrow-left" style={{ fontSize: 30 }} />
                </TouchableOpacity>
              </View>
              <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
                <Text
                  style={{
                    fontSize: 35,
                    fontWeight: "bold",
                    fontFamily: "Avenir",
                  }}
                >
                  Give Feedback
                </Text>
                <View style={{ paddingVertical: 20 }}>
                  <Text style={{ fontSize: 20, fontFamily: "Andika" }}>
                    What's your Name ?
                  </Text>
                  <TextInput
                    value={customerName}
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      marginTop: 5,
                      borderColor: "#333",
                      height: 50,
                      paddingHorizontal: 10,
                    }}
                    onChangeText={(data) => setCustomerName(data)}
                  />
                </View>
                <View style={{ paddingVertical: 20 }}>
                  <Text style={{ fontSize: 20, fontFamily: "Andika" }}>
                    Care to share to more about it ?
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      marginTop: 5,
                      textAlign: "justify",
                      borderColor: "#333",
                      paddingHorizontal: 10,
                      height: height / 3,
                    }}
                  >
                    <TextInput
                      multiline
                      value={feedback}
                      style={{
                        // height: 200,
                        // marginBottom: 150,
                        padding: 5,
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                      onChangeText={(data) => setFeedback(data)}
                    />
                  </View>
                </View>
                {error && (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                      fontSize: 20,
                      fontFamily: "Avenir",
                    }}
                  >
                    Both fields are required !!
                  </Text>
                )}

                <TouchableOpacity
                  onPress={submit}
                  style={{
                    paddingVertical: 18,
                    backgroundColor: "#E28633",
                    textAlign: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: 20,
                      fontFamily: "Avenir",
                    }}
                  >
                    Submit Feedback
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        );
    }
  };
  return <>{render()}</>;
};

export default FeedbackScreen;
