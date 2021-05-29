import React from "react";
import ProgressiveImage from "./../../../Reusable Components/ProgressiveImage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const CountryCityTile = ({ navigation, navName, item, name }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navName, {
          item: item,
        });
      }}
    >
      <View style={styles.tileStyle}>
        <Text style={styles.name}>{name}</Text>

        <Image
          fadeDuration={1000}
          style={styles.cityImage}
          source={{ uri: item.imageUrl }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CountryCityTile;

const styles = StyleSheet.create({
  cityImage: {
    height: HEIGHT / 3.8 + 10,
    width: WIDTH / 2.8,
    borderRadius: 10,
    marginBottom: 15,
    marginRight: 10,
  },
  tileStyle: {
    flexDirection: "column",
    position: "relative",
    marginTop: 15,
    marginBottom: 40,
  },
  name: {
    fontSize: 17,
    zIndex: 1,
    bottom: 23,
    position: "absolute",
    color: "white",
    fontWeight: "300",
    fontFamily: "Andika",
    padding: 0,
    left: 10,
    margin: 0,
  },
});
