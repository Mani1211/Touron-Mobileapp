import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import touron from "../../api/touron";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";

const CityHomeScreen = ({ navigation, route }) => {
  const { cities } = useContext(AuthContext);
  const [city, setCity] = useState([]);
  const [error, setErrorMessage] = useState("");
  const [loader, setLoader] = useState();
  const [cityName, setCityName] = useState("");

  const showLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };

  const getCity = async () => {
    console.log(route.params.name, "kk");
    if (route.params.name) {
      const countryname = route.params.name;
      try {
        const cityResponse = await touron.get(
          `/city/countryname/${countryname}`
        );
        console.log(cityResponse.data, "dataata");

        setCity(cityResponse.data);
      } catch (err) {
        setErrorMessage("Something went wrong");
      }
    } else {
      // console.log("executed");
      setCity(cities);
    }
  };

  useEffect(() => {
    getCity(), showLoader();
  }, []);

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
    <ScrollView style={styles.container}>
      {loader ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.background}>
            <Feather name="search" style={styles.iconStyle}></Feather>
            <TextInput
              style={styles.inputStyle}
              placeholder="Ex. Paris,Sharjah"
              onChangeText={(value) => setCityName(value)}
              onSubmitEditing={search}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.countryGrid}>
            {search().map((item) => (
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
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CityHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 70,
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
    fontFamily: "Andika",
    zIndex: 1,
    top: 10,
    left: 20,
  },
  background: {
    backgroundColor: "#fff",
    height: HEIGHT / 15,
    borderRadius: 20,
    flexDirection: "row",
    width: WIDTH * 0.9,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  inputStyle: {
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  countryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "center",
    marginBottom: 30,
    marginHorizontal: 10,
  },
});
