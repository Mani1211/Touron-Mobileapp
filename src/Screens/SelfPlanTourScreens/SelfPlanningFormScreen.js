import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthContext";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const SelfPlanForm = ({ navigation }) => {
  const { cities } = useContext(AuthContext);
  const [city, setCity] = useState(cities);
  const [destination, setDestination] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [cityDates, setCityDates] = useState([]);
  const [loader, setLoader] = useState(true);

  console.log(city);

  const getCity = () => {
    const cities = city.filter((c) => {
      return c.cityName
        .trim()
        .toUpperCase()
        .includes(destination.toUpperCase().trim());
    });

    const countries = city.filter((c) => {
      return c.countryName
        .trim()
        .toUpperCase()
        .includes(destination.toUpperCase().trim());
    });

    const result = [...cities, ...countries];
    return result;
  };

  const showLoader = () => {
    setTimeout(() => {
      setLoader(true);
    }, 300);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // showLoader();
    }
    return () => (mounted = false);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Select your cities</Text>
      <View style={styles.background}>
        <Feather name="search" style={styles.iconStyle}></Feather>
        <TextInput
          style={styles.inputStyle}
          placeholder="Search"
          onChangeText={(value) => setDestination(value)}
          onSubmitEditing={getCity}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {!loader ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size="large"
        />
      ) : (
        <FlatList
          data={getCity()}
          keyExtractor={(item) => item.cityName}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: "center" }}>
                <View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setSelectedCity([...selectedCity, item.cityName]);
                      setCityDates([
                        ...cityDates,
                        {
                          name: item.cityName,
                          imageUrl: item.imageUrl,
                        },
                      ]);
                    }}
                  >
                    <ProgressiveImage
                      style={styles.cityImage}
                      source={{ uri: item.imageUrl }}
                    />
                  </TouchableWithoutFeedback>
                  <Text style={{ textAlign: "center", marginBottom: 5 }}>
                    {item.cityName}
                  </Text>
                </View>

                {selectedCity.includes(item.cityName) ? (
                  <View style={{ position: "absolute" }}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        let city = selectedCity.filter((c) => {
                          return c !== item.cityName;
                        });
                        setSelectedCity(city);

                        let dates = cityDates.filter((c) => {
                          return c.name !== item.cityName;
                        });
                        setCityDates(dates);
                      }}
                    >
                      <Image
                        style={styles.cityImage}
                        source={require("../../../assets/ticks.png")}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                ) : null}
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OverviewCities", {
            cities: cityDates,
            selectedCity: selectedCity,
          })
        }
      >
        <View style={styles.proceedButton}>
          <Text style={{ fontSize: 20, color: "white", fontFamily: "Andika" }}>
            Select Cities and Proceed
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelfPlanForm;

const styles = StyleSheet.create({
  cityImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 100,
  },
  proceedButton: {
    width: WIDTH * 0.9,
    backgroundColor: "#626E7B",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: HEIGHT / 12,
  },
  dateContainer: {
    width: WIDTH,
    marginHorizontal: 20,
  },
  background: {
    backgroundColor: "#fff",
    height: HEIGHT / 15,
    borderRadius: 20,
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: WIDTH / 18,
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
});
