import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import touron from "../../api/touron";
import { LinearGradient } from "expo-linear-gradient";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import SearchBar from "../../Reusable Components/SearchBar";
// import { AuthContext } from "../../context/AuthContext";

const SelfTourHome = ({ navigation, route }) => {
  // const { tours } = useContext(AuthContext);

  const [tour, setTour] = useState([]);
  const [error, setErrorMessage] = useState();
  const [loader, setLoader] = useState(true);
  const selectedCity = route.params.selectedCity;
  const selectedCityNames = route.params.selectedCityNames;
  const [active, setActive] = useState(0);
  const cityLength = selectedCity.length - 1;
  const [selectedTours, setSelectedTours] = useState([]);
  const [selectedTourNames, setSelectedTourNames] = useState([]);
  // console.log("selectedTours", selectedTours);
  // console.log("selectedTours", selectedTourNames);

  const getTour = async (city) => {
    try {
      const tourResponse = await touron.get(`/tour/cityname/${city}`);
      setTour(tourResponse.data);
      setLoader(false);
    } catch (err) {
      console.log(err, "err");
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    getTour(selectedCityNames[active]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={(styles.view, { shadowOpacity: 1 })}></View>

      <View style={{ marginTop: 20 }}>
        <View style={{ marginTop: 0 }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontFamily: "Avenir",
            }}
          >
            Select Your Tours for {selectedCityNames[active]}
          </Text>
        </View>
        <SearchBar />

        {loader ? (
          <ActivityIndicator
            size="large"
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ) : (
          <>
            {tour.length == 0 ? (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View>
                  <Image
                    style={{ width: WIDTH * 0.9, height: WIDTH * 0.9 }}
                    source={require("../../../assets/oops.jpg")}
                  />
                </View>
                <Text style={{ fontFamily: "Avenir", fontSize: 23 }}>
                  No Tours Found
                </Text>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(c) => c._id}
                data={tour}
                renderItem={({ item }) => {
                  return (
                    <View>
                      {!selectedTourNames.includes(item.tourName) ? null : (
                        <TouchableOpacity
                          style={styles.tickImageContainer}
                          onPress={() => {
                            let tours = selectedTourNames.filter((c) => {
                              return c !== item.tourName;
                            });
                            setSelectedTourNames(tours);

                            let updatedTours = selectedTours.filter((c) => {
                              return c.tourName !== item.tourName;
                            });
                            setSelectedTours(updatedTours);
                          }}
                        >
                          <Image
                            style={styles.tickImage}
                            source={require("../../../assets/tick.png")}
                          />
                        </TouchableOpacity>
                      )}

                      <View style={styles.imageContainer}>
                        <View style={styles.shadow}>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedTourNames([
                                ...selectedTourNames,
                                item.tourName,
                              ]);
                              setSelectedTours([...selectedTours, item]);
                            }}
                          >
                            <Image
                              style={styles.image}
                              source={{ uri: item.imageUrl }}
                            />
                          </TouchableOpacity>
                          <View style={styles.cityNameContainer}>
                            <LinearGradient
                              colors={["#FFA26E", "#E36D5D"]}
                              style={styles.gradient}
                            >
                              <View>
                                <Text style={styles.cityname}>
                                  {item.cityName}
                                </Text>
                              </View>
                            </LinearGradient>
                            <View>
                              <Feather
                                name="bookmark"
                                color="#fff"
                                style={styles.iconStyle}
                              ></Feather>
                            </View>
                          </View>
                          <View style={styles.tourDetails}>
                            <Text style={styles.tourFeatures}>
                              {item.tourCategory.join(", ")}
                            </Text>
                            <Text
                              style={{
                                fontSize: 18,
                                fontFamily: "Avenir",
                              }}
                            >
                              {item.tourName}
                            </Text>
                            <Text style={styles.tourFeatures}>
                              {item.tourType}
                            </Text>
                            <View style={styles.star}>
                              <View style={styles.costContainer}>
                                {item.tourCost.adult == 15000 &&
                                item.tourCost.adult >= 10000 ? (
                                  <Text style={styles.cost}>₹₹₹₹ - High</Text>
                                ) : item.tourCost.adult < 10000 &&
                                  item.tourCost.adult >= 5000 ? (
                                  <Text style={styles.cost}>₹₹₹ - Medium</Text>
                                ) : item.tourCost.adult > 2500 &&
                                  item.tourCost.adult < 500205 ? (
                                  <Text style={styles.cost}>₹₹ - Low</Text>
                                ) : (
                                  <Text style={styles.cost}>₹ - Very Low</Text>
                                )}
                              </View>
                              <View
                                style={[
                                  styles.costContainer,
                                  {
                                    paddingVertical: 3,
                                    paddingHorizontal: 5,
                                  },
                                ]}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    navigation.navigate("SelfTourInner", {
                                      item: item,
                                    });
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 13,
                                      fontFamily: "Andika",
                                    }}
                                  >
                                    See More
                                  </Text>
                                </TouchableOpacity>
                              </View>

                              <View style={styles.star}>
                                <Image
                                  style={{
                                    height: 25,
                                    width: 25,
                                    marginRight: 4,
                                  }}
                                  source={require("../../../assets/Star.png")}
                                />
                                <Text style={{ fontSize: 18 }}>
                                  {item.ratings}/5
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </>
        )}

        <View style={styles.buttonContainer}>
          {active == 0 ? null : (
            <TouchableOpacity
              style={{ flex: 0.5 }}
              onPress={() => {
                const cityLength = selectedCityNames.length - 1;

                //  console.log(active);
                if (active <= cityLength) {
                  getTour(selectedCityNames[active - 1]);
                  setActive(active - 1);
                }
                setLoader(true);
              }}
            >
              <View style={[styles.button, { marginRight: 1 }]}>
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </TouchableOpacity>
          )}
          {cityLength == active ? null : (
            <TouchableOpacity
              style={{ flex: 1.5 }}
              onPress={() => {
                const cityLength = selectedCityNames.length - 1;

                //   console.log(active);
                if (active <= cityLength) {
                  setActive(active + 1);
                  getTour(selectedCityNames[active + 1]);
                }
                setLoader(true);
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  Proceed to {selectedCityNames[active + 1]}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {cityLength == active ? (
            <TouchableOpacity
              style={{ flex: 1.5 }}
              onPress={() => {
                navigation.navigate("OverviewTours", {
                  selectedTours: selectedTours,
                  selectedCity: selectedCity,
                });
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {/* )} */}
    </View>
  );
};

export default SelfTourHome;

const styles = StyleSheet.create({
  star: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  imageContainer: {
    padding: 5,
    position: "relative",
  },
  image: {
    height: Dimensions.get("window").height / 4.5,
    width: WIDTH * 0.9,
    borderRadius: 20,
  },
  shadow: {
    width: WIDTH * 0.9,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 10,
  },
  gradient: {
    marginHorizontal: 5,
    marginTop: 10,
    padding: 2,
    borderRadius: 5,
    left: 10,
  },
  cityNameContainer: {
    flexDirection: "row",
    position: "absolute",
    width: WIDTH * 0.9,
    justifyContent: "space-between",
    alignItems: "center",
  },
  cityname: {
    //padding: 3,
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#fff",
    fontFamily: "Andika",
    zIndex: 1,
    left: 0,
  },

  view: {
    width: 100,
    height: 100,
    marginTop: 20,
    backgroundColor: "red",
  },
  tourDetails: {
    margin: 15,
  },
  cost: { fontSize: 13, fontFamily: "Avenir" },
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
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
    marginTop: 3,
  },
  button: {
    backgroundColor: "#626E7B",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginRight: 15,
    marginLeft: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontFamily: "Avenir",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  costContainer: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
  },
  tourFeatures: {
    color: "#8395A7",
    fontSize: 15,
    fontFamily: "Andika",
  },
  tickImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 30,
    // left: WIDTH / 2 - WIDTH / 6,
    zIndex: 1,
    left: 0,

    right: 0,
    top: 0,
    bottom: 0,
  },
  tickImage: {
    width: 140,
    height: 140,
    margin: 10,
    borderRadius: 100,
  },
});
