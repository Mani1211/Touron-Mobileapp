import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Banner = ({ setReview, close }) => {
  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "black",
        zIndex: 10,
        // opacity: 0.98,
        height: HEIGHT,
        width: WIDTH,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          marginRight: WIDTH / 10,
          marginBottom: 20,
        }}
      >
        <MaterialIcons
          name="close"
          size={34}
          color="#fff"
          onPress={() => close()}
        />
      </TouchableOpacity>
      <View
        style={{
          // height: HEIGHT / 2,
          width: WIDTH * 0.8,
          backgroundColor: "white",
          alignItems: "center",
          borderRadius: 10,
          opacity: 1,
          textAlign: "center",
        }}
      >
        <Image
          source={require("../../../../assets/intros/Review.png")}
          style={{
            height: WIDTH / 3,
            width: WIDTH / 3,
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
          How are we doing ?
        </Text>
        <Text
          style={{
            textAlign: "center",
            padding: 20,
            fontFamily: "Andika",
            fontSize: 13,
            lineHeight: 16,
          }}
        >
          Your feedback keeps our small team motivated to make{" "}
          <Text style={{ fontWeight: "bold" }}>tour On</Text> even better
        </Text>
        {Platform.OS === "android" ? (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://play.google.com/store/apps/details?id=com.touron.travelapp"
              );
            }}
          >
            <Text style={styles.button}>Love It!</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://apps.apple.com/in/app/tour-on/id1544389334"
              );
            }}
          >
            <Text style={styles.button}>Love It!</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            setReview();
          }}
        >
          <Text style={styles.button}>Could Be Better</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 9, textAlign: "center", padding: 20 }}>
          Get exciting offer codes when you send in your feedback!
        </Text>
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  button: {
    color: "white",
    fontFamily: "Avenir",
    fontSize: 18,
    backgroundColor: "#E28633",
    paddingVertical: 10,
    textAlign: "center",
    marginBottom: 20,
    width: WIDTH * 0.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
