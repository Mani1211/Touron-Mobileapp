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
import { AntDesign } from "@expo/vector-icons";

import Checked from "./Checked";
const Travellertype = ({
  travellerType,
  prevStep,
  nextStep,
  tourName,
  setSolo,
  setFamily,
  setFriends,
  setHoneymoon,
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

        <TouchableOpacity
          onPress={() => {
            nextStep();
          }}
        >
          <View></View>
        </TouchableOpacity>
      </View>
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
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/local-tourism-concept_23-2148606915.jpg",
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
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/big-happy-family-with-flat-design_23-2147834774.jpg",
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
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/group-happy-students-with-backpacks-books-stand-together_131590-216.jpg",
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
                    width: 180,
                    marginVertical: 10,
                    resizeMode: "center",
                  }}
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/people-holding-travel-related-icons_53876-64662.jpg",
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
                  Group
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
