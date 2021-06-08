import React, { useState, useEffect, useContext } from "react";

import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { Feather, AntDesign, EvilIcons, Fontisto } from "@expo/vector-icons";
import touron from "../../api/touron";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

// import { SelfTourContex } from "../../context/ SelfTourContext";
import axios from "axios";
import { AuthContext } from "./../../context/AuthContext";

const SelfTourHome = ({
  navigation,
  prevStep,
  selectedCitys,
  setStep,
  selectedCityNamess,
}) => {
  const { setDetails, details } = useContext(AuthContext);
  const [tour, setTour] = useState([]);
  const [error, setErrorMessage] = useState();
  const [loader, setLoader] = useState(true);
  const selectedCity = selectedCitys;
  const selectedCityNames = selectedCityNamess;
  const [active, setActive] = useState(0);
  const cityLength = selectedCity.length - 1;
  const [selectedTours, setSelectedTours] = useState([]);
  const [selectedTourNames, setSelectedTourNames] = useState([]);

  const getTour = async (city) => {
    try {
      const tourResponse = await touron.get(`/tour/cityname/${city}`);
      setTour(tourResponse.data);
      setLoader(false);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getTour(selectedCityNames[active]);
    return () => source.cancel();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View
        style={{
          width: WIDTH * 0.9,
          alignItems: "flex-end",
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 30,
          position: "relative",
          paddingVertical: 30,
          marginTop: Platform.OS === "ios" ? 20 : 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            prevStep();
          }}
        >
          <View>
            <AntDesign name="arrowleft" size={28} />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
            marginBottom: Platform.OS === "ios" ? 15 : 0,

            // marginBottom: Platform.OS === "ios" ? 20 : 0,
          }}
        >
          Select Tours for {selectedCityNames[active]}
        </Text>

        <TouchableOpacity>
          <View>{/* <AntDesign name="arrowright" size={28} /> */}</View>
        </TouchableOpacity>
      </View>
      <View style={(styles.view, { shadowOpacity: 1 })}></View>

      <View>
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
          <View style={{ paddingBottom: 0, marginBottom: 40 }}>
            {tour.length == 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Image
                    style={{ width: WIDTH * 0.9, height: WIDTH * 0.9 }}
                    source={{
                      uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fstats%20and%20Default%2Foops.jpg?alt=media&token=64e05841-6420-4dda-8214-bc2c31254e0f",
                    }}
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
                style={{ paddingBottom: 20, flex: 1, height: HEIGHT * 0.8 }}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 15,
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <View style={{ position: "relative" }}>
                            <Image
                              style={{
                                height: HEIGHT / 3,
                                width: WIDTH * 0.9,
                                borderRadius: 30,
                              }}
                              source={{ uri: item.imageUrl }}
                            />
                          </View>
                          <View
                            style={{
                              width: "90%",
                              backgroundColor: "#D9D9D9",
                              position: "absolute",
                              opacity: 0.8,
                              bottom: 20,
                              borderRadius: 10,
                              padding: 10,
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                if (selectedTourNames.includes(item.tourName)) {
                                  let tours = selectedTourNames.filter((c) => {
                                    return c !== item.tourName;
                                  });
                                  setSelectedTourNames(tours);

                                  let updatedTours = selectedTours.filter(
                                    (c) => {
                                      return c.tourName !== item.tourName;
                                    }
                                  );
                                  setSelectedTours(updatedTours);
                                } else {
                                  setSelectedTourNames([
                                    ...selectedTourNames,
                                    item.tourName,
                                  ]);
                                  setSelectedTours([...selectedTours, item]);
                                }

                                // navigation.navigate("SelfTourInner", {
                                //   item: item,
                                // });
                              }}
                            >
                              <View>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <EvilIcons name="location" size={30} />
                                    <Text
                                      style={{
                                        fontFamily: "Andika",
                                        paddingLeft: 4,
                                      }}
                                    >
                                      {item.cityName}
                                    </Text>
                                  </View>
                                  {!selectedTourNames.includes(
                                    item.tourName
                                  ) ? null : (
                                    <TouchableOpacity>
                                      <Feather
                                        name="check-circle"
                                        size={24}
                                        color="green"
                                      />
                                    </TouchableOpacity>
                                  )}
                                </View>
                                <Text
                                  style={{
                                    paddingVertical: 10,
                                    fontSize: 18,
                                    paddingLeft: 8,

                                    fontFamily:
                                      Platform.OS === "ios"
                                        ? "AvenirNext-Bold"
                                        : "Avenir",
                                  }}
                                >
                                  {item.tourName}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingLeft: 6,
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      flexGrow: 1,
                                      alignItems: "center",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <Fontisto
                                      name="plane-ticket"
                                      size={20}
                                      color="black"
                                    />
                                    <Text
                                      style={{
                                        fontFamily: "Andika",
                                        paddingLeft: 10,
                                        // fontSize: 10,
                                      }}
                                    >
                                      {item.tourCategory[0]}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      flexGrow: 1,

                                      alignItems: "center",
                                    }}
                                  >
                                    <Fontisto
                                      name="clock"
                                      size={20}
                                      color="black"
                                    />
                                    <Text
                                      style={{
                                        fontFamily: "Andika",
                                        paddingLeft: 10,
                                      }}
                                    >
                                      {item.tourType}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>
        )}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: WIDTH * 0.95,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
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
              setDetails({
                ...details,
                selectedTours: selectedTours,
              });
              setStep();
            }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          </TouchableOpacity>
        ) : null}
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
    // marginBottom: 100,
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
    backgroundColor: "#E28633",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginRight: 15,
    marginLeft: 10,
    marginVertical: 10,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
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

  tickImage: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 100,
  },
});
