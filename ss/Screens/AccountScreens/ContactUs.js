import React from "react";
import { Feather } from "@expo/vector-icons";
import {
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
const HEIGHT = Dimensions.get("window").height;

const ContactUs = ({ navigation }) => {
  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#fff",
          alignItems: "center",

          paddingTop: Platform.OS === "ios" ? 60 : 40,
          paddingBottom: Platform.OS === "ios" ? 20 : 20,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View>
            <Feather
              name="arrow-left"
              size={28}
              color="black"
              style={{
                paddingHorizontal: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: "NewYorkl",
              paddingHorizontal: 15,
            }}
          >
            Contact Us
          </Text>
        </View>
      </View>
      <View
        style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
      >
        <Image
          style={{ height: HEIGHT / 3, width: HEIGHT / 3 }}
          source={require("../../../assets/playstore.png")}
        />
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <Text style={{ fontSize: 25, fontFamily: "NewYorkl" }}>Contact Us</Text>
        <Text style={{ fontFamily: "Andika", fontSize: 15, margin: 15 }}>
          tour On{"\n"}Workafella, Rathha Towers,{"\n"}Tek Meadows - A Block,
          4th Floor,{"\n"}Opposite to Accenture, Sholinganallur,{"\n"}OMR,
          Chennai-119{"\n"}Contact No:8667801206
        </Text>
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <Text style={{ fontFamily: "Andika", fontSize: 15, margin: 15 }}>
          tour On{"\n"}The Hive,{"\n"}Level 3 VR Mall Next to Madras
          House(Landmark),{"\n"}Thirumangalam, Chennai-40
          {"\n"}Contact No:8667801206
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContactUs;
