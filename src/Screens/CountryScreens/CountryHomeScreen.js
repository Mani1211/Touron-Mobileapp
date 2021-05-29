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
import axios from "axios";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import SearchBar from "../../Reusable Components/SearchBar";
import { FontAwesome } from "@expo/vector-icons";
import CCTile from "./CCTile";
import HeaderTile from "./../../Reusable Components/HeaderTile";
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
    showLoader();
    return () => source.cancel();
  }, []);

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
        <HeaderTile name={"Countries"} navigation={navigation} />

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
                    <CCTile
                      index={index}
                      navigation={navigation}
                      item={item}
                      navName={"CountryInner"}
                      name={item.countryName}
                    />
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
