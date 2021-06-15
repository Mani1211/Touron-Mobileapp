import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import SearchBar from "../../Reusable Components/SearchBar";
import { FontAwesome } from "@expo/vector-icons";
import { database } from "firebase";
import HeaderTile from "./../../Reusable Components/HeaderTile";
import CCTile from "./../CountryScreens/CCTile";
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
                    <CCTile
                      index={index}
                      navigation={navigation}
                      item={item.stories[0]}
                      navName={"CountryInner"}
                      name={item.categoryTitle}
                    />
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
    justifyContent: "center",
    marginBottom: 30,
    paddingBottom: 150,
    // marginHorizontal: 10,
  },
});
