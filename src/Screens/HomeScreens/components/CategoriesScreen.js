import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";

import { AppLoading } from "expo";
import * as Font from "expo-font";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Categories = ({ navigation }) => {
  const [fontLoaded, setFont] = useState(false);

  const fetchFont = async () => {
    await Font.loadAsync({
      Andika: require("../../../../assets/fonts/Andika-Regular.ttf"),
    });
    setFont(true);
  };
  useEffect(() => {
    fetchFont();
  }, []);

  if (!fontLoaded) {
    console.log("not");
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Planned")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <View style={{ padding: 10 }}>
              <Image
                style={styles.categoryImage}
                source={require("../../../../assets/Categories/Plannedtour.jpg")}
              />
            </View>
            <Text style={styles.text}>Planned </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Road")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ borderRadius: 50, padding: 10 }}>
              <Image
                style={styles.categoryImage}
                source={require("../../../../assets/Categories/Roadtrip.jpg")}
              />
            </View>
            <Text style={styles.text}>Road </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Surprise")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                borderColor: "#cfeeec",
                borderRadius: 50,
                padding: 10,
              }}
            >
              <Image
                style={styles.categoryImage}
                source={require("../../../../assets/Categories/Surprise.jpg")}
              />
            </View>
            <Text style={styles.text}>Surprise </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Surprise")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                borderColor: "#cfeeec",
                borderRadius: 50,
                padding: 10,
              }}
            >
              <Image
                style={styles.categoryImage}
                source={require("../../../../assets/Categories/Honeymoon.jpg")}
              />
            </View>
            <Text style={styles.text}>Honeymoon</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Surprise")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                borderColor: "#cfeeec",
                borderRadius: 50,
                padding: 10,
              }}
            >
              <Image
                style={styles.categoryImage}
                source={require("../../../../assets/Categories/luxury.jpg")}
              />
            </View>
            <Text style={styles.text}>Luxury</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Wildlife")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                borderColor: "#cfeeec",
                borderRadius: 50,
                padding: 10,
              }}
            >
              <Image
                style={styles.categoryImage}
                source={{
                  uri:
                    "https://www.udaipurblog.com/wp-content/uploads/2018/04/travel-triangle.jpg",
                }}
              />
            </View>
            <Text style={styles.text}>WildLife</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    // height: HEIGHT / 5.8,
    justifyContent: "center",
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    // alignItems: "center",
  },

  text: {
    fontSize: 15,
    fontWeight: "900",
    justifyContent: "space-evenly",
    marginBottom: 20,
    marginHorizontal: 5,
    fontFamily: "WSansl",
  },
  categoryImage: {
    height: WIDTH / 4.3,
    borderRadius: Platform.OS === "ios" ? 40 : 50,
    width: WIDTH / 4.3,
    marginTop: 5,
  },
});
