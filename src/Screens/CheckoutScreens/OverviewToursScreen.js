import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
import { AntDesign } from "@expo/vector-icons";

const OverviewToursScreen = ({ navigation, route }) => {
  const selectedTours = route.params.selectedTours;
  const selectedCity = route.params.selectedCity;
  const [finalTour, setFinalTour] = useState([...selectedTours]);
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          paddingTop: 50,
        }}
      >
        <View style={{ margin: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("SelfTourHome")}
            >
              <View style={{ marginLeft: WIDTH / 18 }}>
                <AntDesign name="indent-left" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <View style={{ marginLeft: WIDTH / 6 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "Avenir",
                  margin: 20,
                  color: "#4E4E4E",
                }}
              >
                My Tours!
              </Text>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 190, height: 185 }}
              source={require("../../../assets/g2.png")}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Avenir",
                margin: 20,
                color: "#4E4E4E",
              }}
            >
              Hurray!! 🥳 🥳 🥳
            </Text>
            <Text style={{ color: "#C5C5CC" }}>
              You have successfully selected the tours you want
            </Text>
          </View>
        </View>

        {finalTour.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View style={{ margin: 10, flex: 0.3 }}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 10 }}
                source={{ uri: item.imageUrl }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                height: 70,
                flex: 0.99,
                marginTop: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  marginTop: 5,
                  fontFamily: "Avenir",
                }}
              >
                {item.tourName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "flex-start",
                }}
              >
                <Text style={{ fontSize: 15, marginRight: 5 }}>
                  {item.cityName} |
                </Text>
                <Text style={{ fontSize: 15 }}>{item.tourType}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ bottom: 0, width: WIDTH }}>
          <TouchableOpacity
            style={{ flex: 1.5 }}
            onPress={() => {
              navigation.navigate("Progress", {
                selectedTours: selectedTours,
                finalTour: finalTour,
                selectedCity: selectedCity,
              });
            }}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.progressText}>Go to Progress Page</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default OverviewToursScreen;

const styles = new StyleSheet.create({
  progressText: {
    fontSize: 15,
    color: "white",
    fontFamily: "Avenir",
  },
  buttonContainer: {
    backgroundColor: "#28C9E1",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
  },
});
