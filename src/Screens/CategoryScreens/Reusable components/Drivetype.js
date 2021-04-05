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
const Drivetype = ({
  imgSrc1,
  imgSrc2,
  imgSrc3,
  imgSrc4,
  setRent,
  setOwned,
  setSelf,
  setDriver,
  driveType,
  driverType,
  nextStep,
  prevStep,
}) => {
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
            prevStep();
            // navigation.goBack("Home");
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
          }}
        >
          Road Trip
        </Text>

        {driveType !== "" && driverType !== "" ? (
          <TouchableOpacity
            onPress={() => {
              nextStep();
            }}
          >
            <View>
              <AntDesign name="arrowright" size={28} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              nextStep();
            }}
          >
            <View></View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: WIDTH, marginHorizontal: 30, marginVertical: 30 }}>
        <Text style={{ fontSize: 20, fontFamily: "NewYorkl" }}>
          1.Would you Prefer ?
        </Text>
      </View>
      <View>
        <View style={styles.travelTypeContainer}>
          <TouchableOpacity
            onPress={() => {
              setRent();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView]}>
                <View style={{ position: "absolute", top: -20, right: -20 }}>
                  {driveType == "Rented Bike/Car" ? <Checked /> : null}
                </View>
                <Image
                  style={{
                    height: HEIGHT / 8,
                    width: WIDTH / 2.4,
                    marginTop: 40,
                  }}
                  source={{
                    uri:
                      "https://thumbs.dreamstime.com/b/vintage-car-sketch-coloring-book-black-white-drawing-monochrome-retro-cartoon-transport-vector-illustration-78499966.jpg",
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "Andika",

                    marginVertical: 10,
                  }}
                >
                  Rented Bike/Car
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOwned();
              nextStep();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView, { width: WIDTH / 1.8 }]}>
                <View style={{ position: "absolute", top: -30, right: -20 }}>
                  {driveType == "Own Bike/Car" ? <Checked /> : null}
                </View>
                <Image
                  style={{
                    height: HEIGHT / 8,
                    width: WIDTH / 2.4,
                    marginTop: 40,
                  }}
                  source={{ uri: imgSrc2 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginVertical: 10,
                    fontFamily: "Andika",
                  }}
                >
                  Own Bike/Car
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {driveType == "Rented Bike/Car" ? (
        <View>
          <View style={{ width: WIDTH, marginHorizontal: 30, marginTop: 20 }}>
            <Text style={{ fontSize: 20, fontFamily: "NewYorkl" }}>
              2.If rented Car/Bike ?
            </Text>
          </View>
          <View style={styles.travelTypeContainer}>
            <TouchableOpacity
              onPress={() => {
                setSelf();
                nextStep();
              }}
            >
              <View style={styles.travelTypeView}>
                <View styles={[styles.travelTypeView]}>
                  <View style={{ position: "absolute", top: 0, right: -20 }}>
                    {driverType == "Self Drive" ? <Checked /> : null}
                  </View>
                  <Image
                    style={{
                      height: HEIGHT / 8,
                      width: WIDTH / 2.4,
                      marginTop: 40,
                    }}
                    source={{
                      uri:
                        "https://thumbs.dreamstime.com/b/vintage-car-sketch-coloring-book-black-white-drawing-monochrome-retro-cartoon-transport-vector-illustration-78499966.jpg",
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      marginVertical: 10,
                      fontFamily: "Andika",
                    }}
                  >
                    Self Drive
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setDriver();
                nextStep();
              }}
            >
              <View style={styles.travelTypeView}>
                <View styles={[styles.travelTypeView]}>
                  <View style={{ position: "absolute", top: 10, right: -20 }}>
                    {driverType == "Car Driver needed" ? <Checked /> : null}
                  </View>
                  <Image
                    style={{
                      height: HEIGHT / 8,
                      width: WIDTH / 2.4,
                      marginTop: 40,
                    }}
                    source={{ uri: imgSrc4 }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      marginVertical: 10,
                      fontFamily: "Andika",
                    }}
                  >
                    Driver needed
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Drivetype;

const styles = StyleSheet.create({
  travelTypeContainer: {
    width: WIDTH,

    height: HEIGHT / 3.7,
    flexDirection: "row",
  },
  travelTypeView: {
    width: WIDTH / 2,
    height: HEIGHT / 3.9,
    alignItems: "center",
  },
});
