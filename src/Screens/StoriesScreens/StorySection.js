import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { database } from "firebase";
import HeaderTile from "./../../Reusable Components/HeaderTile";
const StorySection = ({ navigation }) => {
  const { countries } = useContext(AuthContext);
  const [country, setCountry] = useState(countries);
  const [loader, setLoader] = useState(true);
  const [error, setErrorMessage] = useState("");
  const [countryName, setCountryName] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [fleetData, setFleetData] = useState([]);
  console.log(`fleetData`, fleetData);

  const getStoriesData = () => {
    setLoader(true);
    let v = [];
    database()
      .ref("stories")
      .on("value", (data) => {
        data.forEach((d) => {
          v.push(d.val());
        });
      });
    console.log(`v`, v);
    setFleetData(v);
    setLoader(false);
  };

  useEffect(() => {
    getStoriesData();
  }, []);

  // const search = () => {
  //   const d = country.filter((c) => {
  //     return c.countryName
  //       .trim()
  //       .toUpperCase()
  //       .includes(countryName.trim().toUpperCase());
  //   });
  //   return d;
  // };

  return (
    <View style={styles.container}>
      <View>
        <HeaderTile name={"Stories"} navigation={navigation} />

        {/* <View style={{ paddingHorizontal: 10 }}>
          <SearchBar
            onChangeText={(value) => setCountryName(value)}
            placeholder={"Search Country...."}
          />
        </View> */}
        {loader ? (
          <ActivityIndicator
            size="large"
            style={{
              alignSelf: "center",
              justifyContent: "center",
              height: HEIGHT * 0.6,
            }}
          />
        ) : (
          <ScrollView>
            <View style={styles.countryGrid}>
              {fleetData.map((item, index) => {
                if (index < pageSize)
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate("StoryView", { story: item })
                      }
                    >
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.image}
                          source={{ uri: item.stories[0].imageUrl }}
                        />
                        <MaterialCommunityIcons
                          name="image-filter-none"
                          size={24}
                          style={{
                            alignSelf: "flex-end",
                            padding: 10,
                            zIndex: 10,
                          }}
                          color="#fff"
                        />
                        <Text style={styles.name}>{item.categoryTitle}</Text>
                      </View>
                    </TouchableOpacity>
                  );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default StorySection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  countryGrid: {
    flexDirection: "row",
    width: WIDTH,
    flexWrap: "wrap",
    alignItems: "center",
    // justifyContent: "center",
    marginBottom: 30,
    paddingBottom: 50,
    paddingTop: 30,
    marginHorizontal: 10,
  },
  image: {
    height: HEIGHT / 3.8,
    width: WIDTH / 2.25,
    justifyContent: "space-around",
    borderRadius: 18,
    flexDirection: "row",
  },
  imageContainer: {
    padding: 5,
    position: "relative",
    marginBottom: 10,
  },
  imageContainer1: {
    position: "absolute",
    backgroundColor: "#0009",
    opacity: 0.1,
    height: HEIGHT / 3.8,
    width: WIDTH / 2.25,
    borderRadius: 18,
    zIndex: 2,
  },
  name: {
    // position: 'absolute',
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",

    // fontFamily: "Andika",
  },
});
