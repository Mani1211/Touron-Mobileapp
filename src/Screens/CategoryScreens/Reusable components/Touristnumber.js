import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { AntDesign } from "@expo/vector-icons";

const Touristnumber = ({
  imgSrc1,
  imgScr2,
  adult,
  tourName,
  children,
  nextStep,
  prevStep,
  setAdult,
  setChildren,
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
            // navigation.goBack("Home");
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
            marginTop: Platform.OS == "android" ? HEIGHT / 14 : 80,
            flex: adult > 0 ? 0 : 0.5,
          }}
        >
          {tourName}
        </Text>

        <TouchableOpacity
          onPress={() => {
            nextStep();
          }}
        >
          <View>
            {adult > 0 ? <AntDesign name="arrowright" size={28} /> : null}
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: HEIGHT / 20 }}>
        <Text style={{ fontSize: 22, fontFamily: "NewYorkl" }}>
          No of Persons
        </Text>
      </View>
      <View style={{ marginHorizontal: 10, marginTop: 30 }}>
        <View
          style={{
            height: HEIGHT / 3.3,
          }}
        >
          <View style={styles.tourImageContainer}>
            <Image
              style={{
                height: 100,
                width: 130,
                marginBottom: 10,
              }}
              source={{ uri: imgSrc1 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity onPress={() => setAdult(adult - 1)}>
              <Text
                style={{
                  fontSize: 30,
                  backgroundColor: "#9EB19E",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 100,
                  marginTop: 10,
                }}
              >
                -
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="0"
              style={{ fontSize: 20, fontFamily: "Andika" }}
              value={adult.toString()}
              keyboardType="number-pad"
              onChangeText={(value) => setAdult(+value)}
            />
            <TouchableOpacity onPress={() => setAdult(adult + 1)}>
              <Text
                style={{
                  fontSize: 30,
                  backgroundColor: "#9EB19E",
                  padding: 10,
                  borderRadius: 100,
                  marginTop: 10,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontFamily: "Andika" }}
          >
            Adults
          </Text>
        </View>

        <View
          style={{
            height: HEIGHT / 3.5,
          }}
        >
          <View style={styles.tourImageContainer}>
            <Image
              style={{
                height: 100,
                width: 130,
              }}
              source={{ uri: imgScr2 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity onPress={() => setChildren(children - 1)}>
              <Text
                style={{
                  fontSize: 30,
                  backgroundColor: "#9EB19E",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 100,
                  marginTop: 10,
                }}
              >
                -
              </Text>
            </TouchableOpacity>
            <TextInput
              style={{ fontSize: 20, fontFamily: "Andika" }}
              placeholder="0"
              value={children.toString()}
              keyboardType="number-pad"
              onChangeText={(value) => setChildren(+value)}
            />
            <TouchableOpacity onPress={() => setChildren(children + 1)}>
              <Text
                style={{
                  fontSize: 30,
                  backgroundColor: "#9EB19E",
                  padding: 10,
                  borderRadius: 100,
                  marginTop: 10,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontFamily: "Andika" }}
          >
            Childrens
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Touristnumber;

const styles = StyleSheet.create({
  tourImageContainer: {
    height: 100,
    alignItems: "center",
    width: 200,
    justifyContent: "center",
  },
});
