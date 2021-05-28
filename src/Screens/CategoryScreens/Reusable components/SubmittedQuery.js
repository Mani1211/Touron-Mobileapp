import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SubmittedQuery = ({ navigation, type, setSteps }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        height: HEIGHT,
        backgroundColor: "#FFF",
      }}
    >
      <View
        style={{
          height: HEIGHT * 0.8,
          alignItems: "center",
          justifyContent: "center",
          width: WIDTH,
          paddingHorizontal: 20,
        }}
      >
        <Image
          style={{ height: HEIGHT / 2.6, width: WIDTH * 0.7 }}
          source={require("../../../../assets/Finish/5.png")}
        />
        <Text
          style={{ padding: 20, fontFamily: "Andika", textAlign: "center" }}
        >
          Congratulations!. Your query is under review and Our Planning Team
          will contact you with more details.You can see your query process in{" "}
          {type} Section
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            onPress={() => {
              if (type === "Self Plan") {
                setSteps();
                navigation.navigate("MyPlans");
              } else {
                setSteps();

                navigation.navigate("MyRequest");
              }
            }}
          >
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text
                style={{
                  textAlign: "center",
                  padding: 8,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 20,
                }}
              >
                {type}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSteps();
              navigation.navigate("Main");
            }}
          >
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
