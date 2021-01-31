import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Tourname = ({ imgSrc, step, description }) => {
  return (
    <View>
      <View
        style={{
          width: WIDTH,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: imgSrc }}
          style={{ height: HEIGHT / 3.5, width: 230, marginTop: 20 }}
        />
      </View>

      <View style={{ marginHorizontal: WIDTH / 9 }}>
        <Text style={{ fontSize: 14, fontFamily: "Andika" }}>
          {description}
        </Text>
      </View>

      <TouchableOpacity onPress={step}>
        <View style={styles.buttonContainer}>
          <LinearGradient
            colors={["#9EB19E", "#9EB19E"]}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    padding: 15,
    fontSize: 16,
    fontFamily: "Andika",
  },
});

export default Tourname;
