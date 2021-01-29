import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SubmittedQuery = ({ navigation }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <View
        style={{
          height: HEIGHT * 0.8,
          alignItems: "center",
          justifyContent: "center",
          width: WIDTH,
        }}
      >
        <Image
          style={{ height: HEIGHT / 2.6, width: WIDTH * 0.7 }}
          source={{
            uri:
              "https://uploads-ssl.webflow.com/5ef0df6b9272f7410180a013/5ef344a6fcb9c3498e2b332a_Screenshot_11.png",
          }}
        />
        <Text style={{ padding: 20, fontFamily: "Andika" }}>
          Congratulations!. Your query is under review and tour On will contact
          you with more details.You can see your query process in My Request
          Section
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity onPress={() => navigation.navigate("MyRequest")}>
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text
                style={{
                  // backgroundColor: "red",
                  textAlign: "center",
                  padding: 8,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 20,
                }}
              >
                My Requests
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text
                style={{
                  // backgroundColor: "red",
                  textAlign: "center",
                  padding: 8,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 20,
                }}
              >
                Back to Home
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SubmittedQuery;
