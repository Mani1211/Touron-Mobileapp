import React from "react";
import { Feather } from "@expo/vector-icons";
import { Text, View, Platform, TouchableOpacity } from "react-native";
const Header = ({ navigation }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        paddingTop: Platform.OS === "ios" ? 35 : 0,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={{
          flexBasis: "40%",
        }}
      >
        <Feather
          name="menu"
          color="#000"
          style={{
            fontSize: 30,
            paddingTop: Platform.OS === "ios" ? 10 : 10,

            fontWeight: "bold",
          }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            flexBasis: "60%",
            alignSelf: "flex-start",
            fontSize: 30,
            fontFamily: "PlaylistScript",
            color: "#263768",
          }}
        >
          tour On
        </Text>
      </View>
    </View>
  );
};

export default Header;
