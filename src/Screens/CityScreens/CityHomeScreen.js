import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import touron from "../../api/touron";
import axios from "axios";
import SearchBar from "./../../Reusable Components/SearchBar";
import CCTile from "./../CountryScreens/CCTile";
import HeaderTile from "./../../Reusable Components/HeaderTile";
const CityHomeScreen = ({ navigation, route }) => {
  const { cities } = useContext(AuthContext);
  const [city, setCity] = useState(cities);
  const [error, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [cityName, setCityName] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const getCity = async () => {
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
    } else {
      setCity(cities);
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
        <HeaderTile name={"City"} navigation={navigation} />

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
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
              width: WIDTH,
            }}
          >
            {route.params.name !== "" && (
              <Text
                style={{ fontSize: 20, marginBottom: 10, fontFamily: "Andika" }}
              >
                Cities in {route.params.name}
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                width: WIDTH,
                flexWrap: "wrap",
                justifyContent: city.length % 2 === 0 ? "center" : "flex-start",
                alignItems: "center",
                marginBottom: 30,
                paddingHorizontal: city.length % 2 === 0 ? 0 : 10,
                paddingBottom: 150,
                alignContent: "stretch",
              }}
            >
              {search().map((item, index) => {
                if (index < pageSize)
                  return (
                    <CCTile
                      key={index}
                      navigation={navigation}
                      item={item}
                      navName={"CityInner"}
                      name={item.cityName}
                    />
                  );
              })}
              {route.params.name === "" && pageSize < 145 && cityName === "" && (
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

  // countryGrid: {
  //   flexDirection: "row",
  //   width: WIDTH,
  //   flexWrap: "wrap",
  //   justifyContent: city % 2 === 0 ? "center" : "flex-start",
  //   alignItems: "center",
  //   marginBottom: 30,
  //   paddingBottom: 150,
  //   alignContent: "stretch",
  // },
});
