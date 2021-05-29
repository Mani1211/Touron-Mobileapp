import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
import { AntDesign } from "@expo/vector-icons";
// import { SelfTourContext } from "../../context/ SelfTourContext";
import { AuthContext } from "./../../context/AuthContext";

const OverviewToursScreen = ({ setStep, prevStep }) => {
  const { details, setDetails } = useContext(AuthContext);
  const selectedTours = details.selectedTours;
  const [finalTour, setFinalTour] = useState([...selectedTours]);
  return (
    <ScrollView style={{ backgroundColor: "#fff", marginBottom: 20 }}>
      <View
        style={{
          width: WIDTH * 0.9,
          alignItems: "flex-end",
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 30,
          position: "relative",
          paddingVertical: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            prevStep();
          }}
        >
          <View>
            <AntDesign name="arrowleft" size={28} />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
            flex: 0.45,
          }}
        >
          My Tours
        </Text>

        <TouchableOpacity>
          <View>{/* <AntDesign name="arrowright" size={28} /> */}</View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 50,
        }}
      >
        <View style={{ margin: 10 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: 190, height: 185 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fstats%20and%20Default%2Fg2.png?alt=media&token=93905c8a-2663-4402-9f0e-f8b9501b55e3",
              }}
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
              setDetails({
                ...details,
                finalTour: finalTour,
              });
              setStep();
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
    backgroundColor: "#E28633",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
  },
});
