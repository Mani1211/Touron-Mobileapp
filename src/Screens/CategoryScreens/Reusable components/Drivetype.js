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
}) => {
  return (
    <View>
      <View style={{ width: WIDTH, marginHorizontal: 30, marginVertical: 30 }}>
        <Text style={{ fontSize: 20 }}>1.Would you Prefer ?</Text>
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
                    height: HEIGHT / 6,
                    width: 150,
                    marginVertical: 10,
                  }}
                  source={{ uri: imgSrc1 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
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
                    height: HEIGHT / 6,
                    width: WIDTH / 3,
                    marginVertical: 10,
                  }}
                  source={{ uri: imgSrc2 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginVertical: 10,
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
            <Text style={{ fontSize: 20 }}>2.If rented Car/Bike ?</Text>
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
                  <View style={{ position: "absolute", top: -30, right: -20 }}>
                    {driverType == "Self Drive" ? <Checked /> : null}
                  </View>
                  <Image
                    style={{
                      height: HEIGHT / 6,
                      width: 130,
                      marginVertical: 10,
                    }}
                    source={{ uri: imgSrc3 }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      marginVertical: 10,
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
                  <View style={{ position: "absolute", top: -30, right: -20 }}>
                    {driverType == "Car Driver needed" ? <Checked /> : null}
                  </View>
                  <Image
                    style={{
                      height: HEIGHT / 6,
                      width: 130,
                      marginVertical: 10,
                    }}
                    source={{ uri: imgSrc4 }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      marginVertical: 10,
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
