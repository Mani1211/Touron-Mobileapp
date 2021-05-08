import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Checked from "./Checked";
import { AntDesign } from "@expo/vector-icons";
const Travelmode = ({
  imgSrc1,
  imgScr2,
  prevStep,
  nextStep,
  tourName,
  travelMode,
  setTrain,
  name1,
  name2,
  setFlight,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
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
            fontFamily: "NewYorkl",
            marginTop: Platform.OS == "android" ? HEIGHT / 14 : 40,
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
          marginTop: HEIGHT / 20,
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{ fontSize: 20, textAlign: "center", fontFamily: "NewYorkl" }}
        >
          Preferred mode of travel
        </Text>
      </View>

      <View style={{ marginHorizontal: 10 }}>
        <View
          style={{
            height: HEIGHT / 3.3,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setTrain();
              nextStep();
            }}
          >
            <View style={styles.tourImageContainer}>
              <View style={{ position: "absolute", top: 10, right: -20 }}>
                {travelMode == name1 ? <Checked /> : null}
              </View>
              <Image
                style={{
                  height: 120,
                  marginTop: 20,
                  width: 160,
                }}
                source={{ uri: imgSrc1 }}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginTop: 20,
              fontFamily: "Andika",
            }}
          >
            {name1}
          </Text>
        </View>

        <View
          style={{
            height: HEIGHT / 3,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setFlight();
              nextStep();
            }}
          >
            <View style={styles.tourImageContainer}>
              <View style={{ position: "absolute", top: 10, right: -25 }}>
                {travelMode == name2 ? <Checked /> : null}
              </View>
              <Image
                style={{
                  height: 150,
                  width: 180,
                }}
                source={{ uri: imgScr2 }}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              marginVertical: 20,
              fontSize: 20,
              fontFamily: "Andika",
            }}
          >
            {name2}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Travelmode;

const styles = StyleSheet.create({
  tourImageContainer: {
    height: 150,
    alignItems: "center",
    width: 200,
    justifyContent: "center",
  },
});
