import React, { useState } from "react";
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
  name,
  number,
  budget,
}) => {
  const [val, setVal] = useState();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <View style={{ alignItems: "center", justifyContent: "center" }}>
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
                placeholder="250000"
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
                value={number}
                keyboardType="number-pad"
                style={{ width: 85 }}
                onChangeText={(value) => {
                  setVal(value);
                  setNumber(value);
                }}
                placeholder="8986754345"
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
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Checkout;
