import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Tourname = ({ imgSrc, step, description, tourName, navigation }) => {
  return (
    <View>
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
            navigation.goBack("Home");
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
            flex: 0.6,
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
        <Text
          style={{
            fontSize: Platform.OS === "ios" ? 14 : 13,
            fontFamily: "Andika",
          }}
        >
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
    marginBottom: 65,
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
