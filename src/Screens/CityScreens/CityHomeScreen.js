import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import touron from "../../api/touron";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import axios from "axios";
import SearchBar from "./../../Reusable Components/SearchBar";
import { FontAwesome } from "@expo/vector-icons";
const CityHomeScreen = ({ navigation, route }) => {
  const { cities } = useContext(AuthContext);
  const [city, setCity] = useState(cities);
  const [error, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [cityName, setCityName] = useState("");
  console.log(`city.length`, city.length);
  const [pageSize, setPageSize] = useState(10);

  const getCity = async () => {
    console.log(route.params.name, "kk");
    if (route.params.name) {
      const countryname = route.params.name;
      try {
        setLoader(true);
        const cityResponse = await touron.get(
          `/city/countryname/${countryname}`
        );
        // console.log(cityResponse.data, "dataata");

        setCity(cityResponse.data);
        setLoader(false);
      } catch (err) {
        setErrorMessage("Something went wrong");
      }
    }
  };

  useEffect(() => {
    let source = axios.CancelToken.source();
    getCity();

    return () => source.cancel();
  }, [route.params.name]);

  const search = () => {
    const d = city.filter((c) => {
      return c.cityName
        .trim()
        .toUpperCase()
        .includes(cityName.trim().toUpperCase());
    });
    return d;
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 0 }}>
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
              left: 8,
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
              flex: 1.6,
              paddingTop: Platform.OS === "ios" ? 30 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontFamily: Platform.OS == "ios" ? "AvenirNext-Bold" : "Avenir",
              }}
            >
              Cities
            </Text>
          </View>
          <View></View>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <SearchBar
            onChangeText={(value) => setCityName(value)}
            placeholder={"Search City...."}
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
                        navigation.navigate("CityInner", { item: item });
                      }}
                    >
                      <View style={styles.imageContainer}>
                        <View>
                          <Text style={styles.name}>{item.cityName}</Text>
                          <ProgressiveImage
                            style={styles.image}
                            source={{ uri: item.imageUrl }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
              })}
              {pageSize < 145 && cityName === "" && (
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

export default CityHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  imageContainer: {
    padding: 5,
    position: "relative",
  },
  image: {
    height: HEIGHT / 3.3,
    width: WIDTH / 2.28,
    justifyContent: "space-around",
    borderRadius: 18,
    flexDirection: "row",
  },
  name: {
    position: "absolute",
    fontSize: 20,
    color: "#fff",
    fontFamily: "Andika",
    zIndex: 1,
    top: 10,
    left: 20,
  },

  countryGrid: {
    flexDirection: "row",
    width: WIDTH,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 150,
  },
});
