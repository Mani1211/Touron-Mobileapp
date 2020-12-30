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
const Travellertype = ({
  imgSrc1,
  imgSrc2,
  imgSrc3,
  imgSrc4,
  travellerType,
  nextStep,
  setSolo,
  setFamily,
  setFriends,
  setHoneymoon,
}) => {
  return (
    <View>
      <View style={{ marginVertical: HEIGHT / 20, marginHorizontal: 5 }}>
        <Text
          style={{ fontSize: 15, textAlign: "center", fontFamily: "NewYorkl" }}
        >
          Are you the Solo traveller kind or the more the merrier kind? Select
          your tour companions.
        </Text>
      </View>
      <View>
        <View style={styles.travelTypeContainer}>
          <TouchableOpacity
            onPress={() => {
              setSolo();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView]}>
                <View style={{ position: "absolute", top: -30, right: -20 }}>
                  {travellerType == "Solo" ? <Checked /> : null}
                </View>
                <Image
                  style={{
                    height: HEIGHT / 6,
                    width: 100,
                    marginVertical: 10,
                  }}
                  source={{ uri: imgSrc1 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    marginVertical: 10,
                    fontFamily: "Andika",
                  }}
                >
                  Solo
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFamily();
              nextStep();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView]}>
                <View style={{ position: "absolute", top: -30, right: -20 }}>
                  {travellerType == "Family" ? <Checked /> : null}
                </View>
                <Image
                  style={{
                    height: HEIGHT / 6,
                    width: 130,
                    marginVertical: 10,
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
                  Family
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.travelTypeContainer}>
          <TouchableOpacity
            onPress={() => {
              setFriends();
              nextStep();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView]}>
                <View style={{ position: "absolute", top: -30, right: -20 }}>
                  {travellerType == "Friends" ? <Checked /> : null}
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
                    fontFamily: "Andika",
                  }}
                >
                  Friends
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setHoneymoon();
              nextStep();
            }}
          >
            <View style={styles.travelTypeView}>
              <View styles={[styles.travelTypeView]}>
                <View style={{ position: "absolute", top: -30, right: -20 }}>
                  {travellerType == "Honeymoon" ? <Checked /> : null}
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
                    fontFamily: "Andika",
                  }}
                >
                  Honeymoon
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Travellertype;

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
