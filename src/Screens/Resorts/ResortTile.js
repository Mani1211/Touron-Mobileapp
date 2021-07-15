import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const ResortTile = ({ item, index }) => {
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const styles = StyleSheet.create({
    stars: {
      fontSize: 16,
      fontFamily: "Andika",
      color: "black",
    },
    resortName: {
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",

      fontSize: 18,
      paddingBottom: 5,
    },
    resortLocation: {
      color: "black",
      fontFamily: "Andika",
      paddingLeft: 5,
    },
    resortCategories: {
      color: "black",
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",

      paddingTop: 5,
    },
    rupee: {
      color: "#fff",
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
      paddingLeft: 5,
      fontSize: 15,
    },
    resortImage: {
      width: width * 0.9,
      height: height / 3.5,
      borderRadius: 20,
      // margin: 10,
    },
  });
  return (
    <Surface
      key={index}
      style={{
        width: width * 0.9,
        justifyContent: "center",
        elevation: 3,
        margin: 10,
        borderRadius: 20,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("ResortInner")}>
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          style={styles.resortImage}
        />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          width: width * 0.83,
          alignItems: "center",
          backgroundColor: "#0004",
          marginHorizontal: 10,
          borderRadius: 20,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
        }}
      ></View>
      <View style={{ padding: 10 }}>
        <Text style={styles.stars}>
          {new Array(parseInt(4)).fill("1").map((c, i) => {
            return (
              <FontAwesome
                key={i}
                name="star"
                size={14}
                color="#F5BF00"
                style={{ paddingRight: 5 }}
              />
            );
          })}{" "}
        </Text>
        <Text style={styles.resortName}>Medhufushi Island Resort</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="map-pin" size={16} color="black" />
          <Text style={styles.resortLocation}>Medhufush , Maldives</Text>
        </View>
        <Text style={styles.resortCategories}>
          2N Beadh Villa {"+ "}
          3N Water Villa
        </Text>

        <Text style={{ color: "black", marginTop: 10 }}>
          98%{" "}
          <FontAwesome
            name="heart"
            size={14}
            color="red"
            style={{ paddingRight: 5 }}
          />
          {"  "}
          from travellers
        </Text>
      </View>
    </Surface>
  );
};

export default ResortTile;
