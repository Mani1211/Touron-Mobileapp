import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Expediture = ({
  imgSrc,
  expediture1,
  expediture2,
  expediture3,
  startPoint,
  setStartPoint,
  setExpediture1,
  prevStep,
  nextStep,
  tourName,
  setExpediture2,
  setExpediture3,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
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
              prevStep();
              // navigation.goBack("Home");
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
              marginTop: Platform.OS == "android" ? HEIGHT / 14 : 40,
            }}
          >
            {tourName}
          </Text>

          {expediture1 !== "" &&
          startPoint !== "" &&
          expediture2 !== "" &&
          expediture3 !== "" ? (
            <TouchableOpacity
              onPress={() => {
                nextStep();
              }}
            >
              <View>
                <AntDesign name="arrowright" size={28} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                nextStep();
              }}
            >
              <View></View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              height: HEIGHT / 2.9,
              width: WIDTH,
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: "100%", width: WIDTH * 0.7 }}
              source={{ uri: imgSrc }}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                fontFamily: "NewYorkl",
              }}
            >
              List your last three expeditions
            </Text>
            <View
              style={{
                height: HEIGHT / 2.65,
                marginTop: 20,
                width: WIDTH * 0.9,
                marginHorizontal: 40,

                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: HEIGHT / 13,
                  flexDirection: "row",
                  width: WIDTH * 0.9,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={{ width: WIDTH / 2 }}>
                  <Text style={{ fontSize: 14 }}>Expediture 1</Text>
                </View>
                <View style={{ width: WIDTH / 3 }}>
                  <TextInput
                    value={expediture1}
                    placeholder="Paris 2018"
                    multiline
                    onChangeText={(value) => setExpediture1(value)}
                  />
                </View>
              </View>
              <View
                style={{
                  height: HEIGHT / 13,
                  flexDirection: "row",
                  width: WIDTH * 0.9,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={{ width: WIDTH / 2 }}>
                  <Text style={{ fontSize: 14 }}>Expediture 2</Text>
                </View>
                <View style={{ width: WIDTH / 3 }}>
                  <TextInput
                    value={expediture2}
                    placeholder="London 2015"
                    multiline
                    onChangeText={(value) => setExpediture2(value)}
                  />
                </View>
              </View>

              <View
                style={{
                  height: HEIGHT / 13,
                  flexDirection: "row",
                  width: WIDTH * 0.9,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View style={{ width: WIDTH / 2 }}>
                  <Text style={{ fontSize: 14 }}>Expediture 3</Text>
                </View>
                <View style={{ width: WIDTH / 3 }}>
                  <TextInput
                    value={expediture3}
                    placeholder="Goa 2019"
                    multiline
                    onChangeText={(value) => setExpediture3(value)}
                  />
                </View>
              </View>

              <View
                style={{
                  height: HEIGHT / 13,
                  width: WIDTH * 0.85,
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <View>
                  <Text style={{ fontSize: 14 }}>
                    Where would you like to start your trip from?
                  </Text>
                </View>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <TextInput
                    style={{
                      borderColor: "#333",
                      width: WIDTH * 0.75,
                    }}
                    value={startPoint}
                    multiline
                    onChangeText={(value) => setStartPoint(value)}
                    placeholder="Chennai"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Expediture;
