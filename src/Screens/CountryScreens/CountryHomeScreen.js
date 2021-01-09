import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import touron from "../../api/touron";
import { AuthContext } from "../../context/AuthContext";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CountryHomeScreen = ({ navigation }) => {
  const { countries } = useContext(AuthContext);
  const [country, setCountry] = useState(countries);
  const [loader, setLoader] = useState(false);
  const [error, setErrorMessage] = useState("");
  const [countryName, setCountryName] = useState("");

  const showLoader = () => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };
  useEffect(() => {
    getCountry();
    showLoader();
  }, []);

  const getCountry = async () => {
    try {
      const countryResponse = await touron.get("/country");
      setCountry(countryResponse.data);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };
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
    <ScrollView style={styles.container}>
      {loader ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.background}>
            <Feather name="search" style={styles.iconStyle}></Feather>
            <TextInput
              style={styles.inputStyle}
              placeholder="Ex. Dubai,Australia"
              onChangeText={(value) => setCountryName(value)}
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
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default CountryHomeScreen;

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
    fontWeight: "bold",
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
    marginHorizontal: 10,
  },
  inputStyle: {
    fontSize: 18,
    flex: 1,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  countryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
});
