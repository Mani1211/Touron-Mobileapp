import React from "react";

import { Switch } from "react-native-paper";
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Roadtripques2 = ({
  imgSrc,
  attr1,
  attr2,
  attr3,
  que1,
  que2,
  que3,
  func1,
  func2,
  func3,
  placeholder3,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              height: HEIGHT / 3.3,
              width: WIDTH,
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Image
              style={{ height: "100%", width: WIDTH * 0.8 }}
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
              Get the best planned road trip
            </Text>
            <View
              style={{
                height: HEIGHT / 3,
                marginTop: 20,
                width: WIDTH * 0.9,
                marginHorizontal: 40,
                justifyContent: "space-around",
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
                  <Text style={{ fontSize: 14, fontFamily: "Andika" }}>
                    {que1}
                  </Text>
                </View>
                <View style={{ width: WIDTH / 3 }}>
                  <Switch value={attr1} onValueChange={func1} color="#e74c3c" />
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
                  <Text style={{ fontSize: 14, fontFamily: "Andika" }}>
                    {que2}
                  </Text>
                </View>
                <View style={{ width: WIDTH / 3 }}>
                  <Switch value={attr2} onValueChange={func2} color="#e74c3c" />
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
                  <Text style={{ fontSize: 14, fontFamily: "Andika" }}>
                    {que3}
                  </Text>
                </View>
                <View style={{ width: WIDTH / 3 }}>
                  <TextInput
                    placeholder={placeholder3}
                    multiline
                    style={{ fontSize: 14, textAlign: "center" }}
                    value={attr3}
                    onChangeText={(value) => func3(value)}
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

export default Roadtripques2;
