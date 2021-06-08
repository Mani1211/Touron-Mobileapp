import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const CCTile = ({ navigation, navName, item, name }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navName, { item: item });
      }}
    >
      <View style={styles.imageContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CCTile;

const styles = StyleSheet.create({
  image: {
    height: HEIGHT / 3.25,
    width: WIDTH / 2.25,
    justifyContent: "space-around",
    borderRadius: 18,
    flexDirection: "row",
  },
  imageContainer: {
    padding: 5,
    position: "relative",
  },
  name: {
    position: "absolute",
    fontSize: 20,
    color: "#fff",
    zIndex: 1,
    fontFamily: "Andika",
    top: 10,
    left: 20,
  },
});
