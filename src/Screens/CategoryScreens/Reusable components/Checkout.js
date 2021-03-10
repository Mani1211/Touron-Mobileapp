import React, { useState, useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import { AuthContext } from "./../../../context/AuthContext";
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Checkout = ({
  imgSrc,
  setName,
  setBudget,
  setNumber,
  submitData,
  prevStep,
  name,
  number,
  tourName,
  budget,
}) => {
  const [val, setVal] = useState();
  const [userInfo, setUserInfo] = useState({});
  const { user } = useContext(AuthContext);
  console.log("userInfo", userInfo);

  const getUserData = () => {
    if (user !== null) {
      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          // console.log("data", data);s
          if (data === null) {
            return;
          }
          setUserInfo(data.val());
          setName(data.val().name);
          setNumber(data.val().phoneNumber);
        });
    }
  };
  console.log("number", number);
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View
            style={{
              width: WIDTH * 0.9,
              alignItems: "flex-end",
              justifyContent: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 30,
              position: "relative",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                // navigation.goBack("Home");
                prevStep();
              }}
            >
              <View>
                <AntDesign name="arrowleft" size={28} />
              </View>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 20,
                fontFamily: "NewYorkl",
                marginTop: Platform.OS == "android" ? HEIGHT / 14 : 80,
              }}
            >
              {tourName}
            </Text>

            <TouchableOpacity>
              <View></View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: HEIGHT / 2.5,
              width: WIDTH,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              style={{ height: HEIGHT / 2.5, width: 300 }}
              source={{ uri: imgSrc }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: HEIGHT / 13,
                flexDirection: "row",
                width: WIDTH * 0.9,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Andika",
                  width: WIDTH / 2,
                  textAlign: "left",
                }}
              >
                Name:
              </Text>
              <TextInput
                onChangeText={(value) => setName(value)}
                placeholder="Vikash"
                value={name}
                maxLength={10}
                style={{ width: 80 }}
              />
            </View>
            <View
              style={{
                height: HEIGHT / 13,
                flexDirection: "row",
                width: WIDTH * 0.9,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Andika",
                  paddingRight: 100,
                  width: WIDTH / 2,
                  textAlign: "left",
                }}
              >
                Budget:
              </Text>
              <TextInput
                onChangeText={(value) => setBudget(value)}
                keyboardType="number-pad"
                value={budget}
                style={{ width: 80 }}
                placeholder="10000 min"
              />
            </View>
            <View
              style={{
                height: HEIGHT / 13,
                flexDirection: "row",
                width: WIDTH * 0.9,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Andika",
                  width: WIDTH / 2,
                  textAlign: "left",
                }}
              >
                Whatsapp Number:
              </Text>
              <TextInput
                onChangeText={(value) => setNumber(value)}
                keyboardType="number-pad"
                placeholder="9098909565"
                value={number.toString()}
              />
            </View>
            <View
              style={{
                height: HEIGHT / 13,
                width: WIDTH * 0.9,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {budget.length >= 5 && name !== "" && number.length === 10 ? (
                <TouchableOpacity onPress={() => submitData()}>
                  <View
                    style={{
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 20,
                      marginTop: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 18,
                        padding: 10,
                      }}
                    >
                      Submit
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Checkout;
