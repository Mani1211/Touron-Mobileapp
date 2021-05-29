import React from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const HeaderTile = ({ name, navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        marginTop: Platform.OS === "android" ? 30 : 60,
        marginLeft: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flex: 0.48 }}
      >
        <FontAwesome name="arrow-circle-left" size={34} color="black" />
      </TouchableOpacity>
      <View style={{ alignSelf: "center" }}>
        <Text
          style={{
            fontSize: 23,
            fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
            // paddingLeft: name === "Countries" ? 0 : 20,
          }}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

export default HeaderTile;
