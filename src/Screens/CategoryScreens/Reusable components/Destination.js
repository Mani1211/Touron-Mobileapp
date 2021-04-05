import React from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Keyboard,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Destination = ({
  imgSrc,
  destination,
  startPoint,
  tourName,
  nextStep,
  prevStep,
  preferanece,
  setDestination,
  setPreferanece,
  setStartPoint,
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

          {destination !== "" && startPoint !== "" ? (
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
              height: HEIGHT / 2.5,
              width: WIDTH,
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Image
              style={{ height: HEIGHT / 3, width: WIDTH * 0.8 }}
              source={{ uri: imgSrc }}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontFamily: "NewYorkl",
              }}
            >
              FIND THE BEST PLANNED TOUR
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
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={{ width: WIDTH / 2.5 }}>
                  <Text style={{ fontSize: 14, fontFamily: "Andika" }}>
                    Enter the holiday destination
                  </Text>
                </View>
                <View>
                  <TextInput
                    value={destination}
                    style={{ width: 100 }}
                    multiline
                    onChangeText={(value) => setDestination(value)}
                    placeholder="Ex.Maldives"
                  />
                </View>
              </View>
              <View
                style={{
                  height: HEIGHT / 13,
                  flexDirection: "row",
                  width: WIDTH * 0.9,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View style={{ width: WIDTH / 2.5 }}>
                  <Text style={{ fontSize: 14, fontFamily: "Andika" }}>
                    Departure City
                  </Text>
                </View>
                <View>
                  <TextInput
                    value={startPoint}
                    multiline
                    style={{ width: 100 }}
                    onChangeText={(value) => setStartPoint(value)}
                    placeholder="Ex.Chennai"
                  />
                </View>
              </View>
              <View
                style={{
                  height: HEIGHT / 13,
                  width: WIDTH * 0.9,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Andika",
                    paddingRight: Platform.OS === "ios" ? 23 : 5,
                  }}
                >
                  Your preferences when you travel (Optional):
                </Text>
                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <TextInput
                    style={{
                      borderColor: "#333",
                      width: WIDTH * 0.75,
                    }}
                    value={preferanece}
                    multiline
                    onChangeText={(value) => setPreferanece(value)}
                    placeholder="Favourite food like that ...."
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

export default Destination;
