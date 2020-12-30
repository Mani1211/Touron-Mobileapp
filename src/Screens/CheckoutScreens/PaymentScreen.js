import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const PaymentScreen = () => {
  return (
    <Animatable.View
      animation="bounceIn"
      duration={3000}
      style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
    >
      <View
        style={{
          width: WIDTH,
          height: HEIGHT / 5,
          backgroundColor: "red",
          marginVertical: 10,
        }}
      ></View>
    </Animatable.View>
  );
};

export default PaymentScreen;
