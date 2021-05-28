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
import touron from "../../api/touron";
import { AuthContext } from "../../context/AuthContext";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import axios from "axios";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import SearchBar from "../../Reusable Components/SearchBar";
import { FontAwesome } from "@expo/vector-icons";

const CountryHomeScreen = ({ navigation }) => {
  console.log(`navigation`, navigation);
  const { countries } = useContext(AuthContext);
  const [country, setCountry] = useState(countries);
  const [loader, setLoader] = useState(true);
  const [error, setErrorMessage] = useState("");
  const [countryName, setCountryName] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const showLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };
  useEffect(() => {
    let source = axios.CancelToken.source();
    // getCountry();
    showLoader();

    return () => source.cancel();
  }, []);

  // const getCountry = async () => {
  //   try {
  //     setLoader(true);
  //     const countryResponse = await touron.get("/country");
  //     setCountry(countryResponse.data);
  //     setLoader(false);
  //   } catch (err) {
  //     setErrorMessage("Something went wrong");
  //   }
  // };

  const search = () => {
    console.log(countryName, "NAME");
    const d = country.filter((c) => {
      return c.countryName
        .trim()
        .toUpperCase()
        .includes(countryName.trim().toUpperCase());
    });
    return d;
  };

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-start",
              width: "10%",
              left: 10,
              paddingTop: Platform.OS === "ios" ? 30 : 0,
              flex: 1,
            }}
            onPress={() => navigation.goBack()}
          >
            <View>
              <FontAwesome name="arrow-circle-left" size={34} color="black" />
            </View>
          </TouchableOpacity>

          <View
            style={{
              flex: 1.8,
              paddingTop: Platform.OS === "ios" ? 30 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontFamily: Platform.OS == "ios" ? "AvenirNext-Bold" : "Avenir",
              }}
            >
              Countries
            </Text>
          </View>
          <View></View>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <SearchBar
            onChangeText={(value) => setCountryName(value)}
            placeholder={"Search Country...."}
          />
        </View>
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
              {search().map((item, index) => {
                if (index < pageSize)
                  return (
                    <TouchableOpacity
                      key={item._id}
                      onPress={() => {
                        navigation.navigate("CountryInner", { item: item });
                      }}
                    >
                      <View style={styles.imageContainer}>
                        <View>
                          <Text style={styles.name}>{item.countryName}</Text>
                          <ProgressiveImage
                            style={styles.image}
                            source={{ uri: item.imageUrl }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
              })}

              {pageSize < 45 && countryName === "" && (
                <TouchableOpacity
                  onPress={() => setPageSize(pageSize + 10)}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      backgroundColor: "#E28633",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    Load More ...
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default CountryHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  imageContainer: {
    padding: 5,
    position: "relative",
  },
  image: {
    height: HEIGHT / 3.25,
    width: WIDTH / 2.25,
    justifyContent: "space-around",
    borderRadius: 18,
    flexDirection: "row",
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
