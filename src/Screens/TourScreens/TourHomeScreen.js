import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Platform,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import firebase from "firebase";
import touron from "../../api/touron";
import _ from "lodash";
import { LinearGradient } from "expo-linear-gradient";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { Chip, Surface } from "react-native-paper";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";

const TourHomeScreen = ({ navigation, route }) => {
  const { isLoggedIn, user, tours, countries, cities } = useContext(
    AuthContext
  );
  const [tour, setTour] = useState(tours);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTourType, setSelectedTourType] = useState([]);
  const [selectedIdealFor, setSelectedIdealFor] = useState([]);
  const [step, setStep] = useState(0);
  const [filterStep, setFilterStep] = useState(0);

  const getSavedTours = () => {
    let sT = [];
    let sTNames = [];
    if (user) {
      firebase
        .database()
        .ref(`saved-tours/${user.uid}`)
        .on("value", (data) => {
          if (data) {
            data.forEach((c) => {
              sT.push(c.val());
              sTNames.push(c.val().tourName);
            });
          }
        });

      return [sT, sTNames];
    } else {
      return [sT, sTNames];
    }
  };

  const [sT, sTNames] = getSavedTours();
  const [savedTours, setSavedTours] = useState(sTNames);
  const [savedToursDetails, setSavedToursDetails] = useState(sT);
  const [error, setErrorMessage] = useState();
  const [loader, setLoader] = useState(true);
  const [filterLoaded, setfilterLoaded] = useState(false);
  const [tourName, setTourName] = useState("");

  const [tourCategory, setTourCategory] = useState("");
  const [idealType, setIdealType] = useState("");
  const [tourType, setTourType] = useState("");
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");

  const search = () => {
    if (tour.length > 0) {
      const d = tour.filter((c) => {
        return c.tourName
          .trim()
          .toUpperCase()
          .includes(tourName.trim().toUpperCase());
      });
      return d;
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (savedToursDetails.length > 0) {
        firebase
          .database()
          .ref(`saved-tours/${user.uid}`)
          .set(savedToursDetails)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      }
    }
  }, []);

  const getTour = async () => {
    if (route.params.name) {
      const cityname = route.params.name;
      try {
        const tourResponse = await touron.get(`/tour/cityname/${cityname}`);
        if (tourResponse.data.length === 0) {
          setTour([]);
        }
        setTour(tourResponse.data);
      } catch (err) {
        setErrorMessage("Something went wrong");
      }
    }
  };

  var filteredTours = [];

  const searchTour = async () => {
    setfilterLoaded(true);
    if (countryName !== "") {
      const tourResponse = await touron.get(`/tour/countryname/${countryName}`);
      filteredTours.push(...tourResponse.data);
    }
    if (cityName !== "") {
      const tourResponse = await touron.get(`/tour/cityname/${cityName}`);
      filteredTours.push(...tourResponse.data);
    }
    const tourResponse = await touron.get(
      `/filtertour?tourCategory=${tourCategory}&idealType=${idealType}&tourType=${tourType}`
    );
    filteredTours.push(...tourResponse.data);

    setfilterLoaded(false);
    setTour(filteredTours);
    setStep(step - 1);
  };

  const renderFilterItem = () => {
    const idealTypes = [
      {
        name: "Family",
        queryName: "Family",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
      {
        name: "Family and kids",
        queryName: "Family and kids",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
      {
        name: "Solo",
        queryName: "Solo",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
      {
        name: "Long-time Married Couple",
        queryName: "Mature Couple",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
      {
        name: "Honeymoon Phase Couple",
        queryName: "Young Couple",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
      {
        name: "Friends",
        queryName: "Friends",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
    ];

    const tourTypes = [
      {
        name: "Full Day Tour",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
      {
        name: "Half Day Tour",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
      {
        name: "Night Tour",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
    ];
    const tourCategorys = [
      {
        name: "Adventure Trip",
        queryName: "Activities",
        imageUrl:
          "https://image.freepik.com/free-vector/local-tourism-concept_23-2148606915.jpg",
      },
      {
        name: "Quick Escapade",
        queryName: "Hop On and Off",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
      {
        name: "Sight Seeing",
        queryName: "Attraction",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
      {
        name: "Educational",
        queryName: "Learning",
        imageUrl:
          "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
      },
    ];
    switch (filterStep) {
      case 0: {
        return (
          <View
            style={{
              alignItems: "center",
              marginVertical: 20,
              height: HEIGHT / 1.7,
              width: WIDTH,
            }}
          >
            <FlatList
              numColumns={2}
              keyExtractor={(item) => item.name}
              data={idealTypes}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (idealType == item.queryName) {
                        setIdealType("");
                      } else {
                        setIdealType(item.queryName);
                      }
                    }}
                  >
                    <Surface
                      style={{
                        margin: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        elevation: 5,
                        height: WIDTH / 2.6,
                        borderRadius: 20,
                        width: WIDTH / 2.6,
                      }}
                    >
                      {idealType === item.queryName ? (
                        <View
                          style={{
                            top: 0,
                            right: 0,
                            borderBottomLeftRadius: 20,
                            position: "absolute",
                            backgroundColor: "#00d8d6",
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                          }}
                        >
                          <Text>✔️</Text>
                        </View>
                      ) : null}

                      <Text
                        style={{ fontFamily: "Andika", textAlign: "center" }}
                      >
                        {item.name}
                      </Text>
                    </Surface>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
        );
      }
      case 1: {
        return (
          <View
            style={{
              alignItems: "center",
              marginVertical: 20,
              height: HEIGHT / 1.7,
              width: WIDTH,
            }}
          >
            <FlatList
              numColumns={2}
              keyExtractor={(item) => item.name}
              data={tourCategorys}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (tourCategory == item.queryName) {
                        setTourCategory("");
                      } else {
                        setTourCategory(item.queryName);
                      }
                    }}
                  >
                    <Surface
                      style={{
                        margin: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        elevation: 10,
                        height: WIDTH / 2.6,
                        borderRadius: 20,
                        width: WIDTH / 2.6,
                      }}
                    >
                      {tourCategory === item.name ? (
                        <View
                          style={{
                            top: 0,
                            right: 0,
                            borderBottomLeftRadius: 20,
                            position: "absolute",
                            backgroundColor: "#00d8d6",
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                          }}
                        >
                          <Text>✔️</Text>
                        </View>
                      ) : null}

                      <Text style={{ fontFamily: "Andika" }}>{item.name}</Text>
                    </Surface>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
        );
      }
      case 2: {
        return (
          <View
            style={{
              alignItems: "center",
              marginVertical: 20,
              height: HEIGHT / 1.7,
              width: WIDTH,
            }}
          >
            <FlatList
              keyExtractor={(item) => item.name}
              numColumns={2}
              data={tourTypes}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (tourType == item.name) {
                        setTourType("");
                      } else {
                        setTourType(item.name);
                      }
                    }}
                  >
                    <Surface
                      style={{
                        margin: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        height: WIDTH / 2.6,
                        borderRadius: 20,
                        width: WIDTH / 2.6,
                        elevation: 10,
                      }}
                    >
                      {tourType === item.name ? (
                        <View
                          style={{
                            top: 0,
                            right: 0,
                            borderBottomLeftRadius: 20,
                            position: "absolute",
                            backgroundColor: "#00d8d6",
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                          }}
                        >
                          <Text>✔️</Text>
                        </View>
                      ) : null}

                      <Text style={{ fontFamily: "Andika" }}>{item.name}</Text>
                    </Surface>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
        );
      }
      case 3: {
        return (
          <View
            style={{
              alignItems: "center",
              marginVertical: 20,
              height: HEIGHT / 1.7,
              width: WIDTH,
            }}
          >
            <FlatList
              numColumns={2}
              data={countries}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (countryName == item.countryName) {
                        setCountryName("");
                      } else {
                        setCountryName(item.countryName);
                      }
                    }}
                  >
                    <Surface
                      style={{
                        margin: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        elevation: 10,
                        height: WIDTH / 2.6,
                        borderRadius: 20,
                        width: WIDTH / 2.6,
                      }}
                    >
                      {countryName == item.countryName ? (
                        <View
                          style={{
                            top: 0,
                            right: 0,
                            borderBottomLeftRadius: 20,
                            position: "absolute",
                            backgroundColor: "#00d8d6",
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                          }}
                        >
                          <Text>✔️</Text>
                        </View>
                      ) : null}
                      <Image
                        style={{
                          height: WIDTH / 5,
                          width: WIDTH / 5,
                          marginBottom: 10,
                          borderRadius: 50,
                        }}
                        source={{ uri: item.imageUrl }}
                      />
                      <Text style={{ fontFamily: "Andika" }}>
                        {item.countryName}
                      </Text>
                    </Surface>
                  </TouchableWithoutFeedback>
                );
              }}
            />
          </View>
        );
      }
      case 4: {
        return (
          <View
            style={{
              alignItems: "center",
              marginVertical: 20,
              height: HEIGHT / 1.7,
              width: WIDTH,
            }}
          >
            <FlatList
              numColumns={2}
              data={cities}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => {
                if (item.countryName === countryName) {
                  return (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        if (cityName == item.cityName) {
                          setCityName("");
                        } else {
                          setCityName(item.cityName);
                        }
                      }}
                    >
                      <Surface
                        style={{
                          margin: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            cityName == item.cityName ? "#00d8d6" : "#fff",
                          elevation: 5,
                          height: WIDTH / 10,
                          borderRadius: 20,
                          width: WIDTH / 2.6,
                        }}
                      >
                        <Text style={{ fontFamily: "Andika" }}>
                          {item.cityName}
                        </Text>
                      </Surface>
                    </TouchableWithoutFeedback>
                  );
                }
              }}
            />
          </View>
        );
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLoader(false);
      getTour();
    }
    return () => (mounted = false);
  }, []);

  const render = (step) => {
    switch (step) {
      case 0:
        return (
          <View
            style={
              ([styles.container],
              {
                backgroundColor: tour.length === 0 ? "white" : "transparent",
                flex: 1,
              })
            }
          >
            {loader ? (
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SkeletonPlaceholder>
                  <View
                    style={{
                      margin: 10,
                    }}
                  >
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        height: 50,
                        borderRadius: 50,
                        marginVertical: 30,
                      }}
                    />
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        height: HEIGHT / 3.2,
                        borderRadius: 10,
                      }}
                    />
                    <View
                      style={{
                        width: 120,
                        height: 20,
                        borderRadius: 4,
                        marginTop: 10,
                      }}
                    />
                    <View
                      style={{
                        width: WIDTH * 0.7,
                        height: 20,
                        marginTop: 10,
                        borderRadius: 4,
                      }}
                    />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      margin: 10,
                    }}
                  >
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        height: HEIGHT / 3.2,
                        borderRadius: 10,
                      }}
                    />
                    <View
                      style={{
                        width: 120,
                        height: 20,
                        borderRadius: 4,
                        marginTop: 10,
                      }}
                    />
                    <View
                      style={{
                        width: WIDTH * 0.7,
                        height: 20,
                        marginTop: 10,
                        borderRadius: 4,
                      }}
                    />
                    <View
                      style={{
                        marginTop: 6,
                        width: 80,
                        height: 20,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                </SkeletonPlaceholder>
              </ScrollView>
            ) : (
              <View>
                <View
                  style={{
                    height: HEIGHT / 8,
                    padding: 10,
                    marginTop: Platform.OS === "ios" ? HEIGHT / 12 : 40,
                    width: WIDTH,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingLeft: 20,
                    }}
                  >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Feather name="arrow-left" style={{ fontSize: 30 }} />
                    </TouchableOpacity>

                    <View>
                      <Text style={{ fontSize: 23, fontFamily: "Avenir" }}>
                        Tours
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => setStep(step + 1)}>
                      <MaterialIcons
                        name="sort"
                        size={24}
                        color="black"
                        style={{ paddingRight: 10 }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.background}>
                    <Feather name="search" style={styles.iconStyle}></Feather>
                    <TextInput
                      style={styles.inputStyle}
                      placeholder="Ex.Universal studious singapore"
                      onChangeText={(value) => setTourName(value)}
                      onSubmitEditing={search}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                    />
                  </View>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginHorizontal: 10 }}
                >
                  {tourCategory == "" ? null : (
                    <Chip
                      style={{
                        backgroundColor: "#34ace0",
                        alignItems: "center",
                        marginRight: 10,
                        color: "#fff",
                      }}
                      disabled={true}
                      textStyle={{
                        color: "#fff",
                        fontFamily: "Avenir",
                        marginBottom: 10,
                      }}
                      mode="outlined"
                    >
                      {tourCategory}
                    </Chip>
                  )}
                  {countryName == "" ? null : (
                    <Chip
                      style={{
                        backgroundColor: "#34ace0",
                        alignItems: "center",
                        marginRight: 10,
                        color: "#fff",
                      }}
                      disabled={true}
                      textStyle={{
                        color: "#fff",
                        fontFamily: "Avenir",
                        marginBottom: 10,
                      }}
                      mode="outlined"
                    >
                      {countryName}
                    </Chip>
                  )}
                  {cityName == "" ? null : (
                    <Chip
                      style={{
                        backgroundColor: "#34ace0",
                        alignItems: "center",
                        marginRight: 10,
                        color: "#fff",
                      }}
                      disabled={true}
                      textStyle={{
                        color: "#fff",
                        fontFamily: "Avenir",
                        marginBottom: 10,
                      }}
                      mode="outlined"
                    >
                      {cityName}
                    </Chip>
                  )}
                  {idealType == "" ? null : (
                    <Chip
                      style={{
                        backgroundColor: "#34ace0",
                        alignItems: "center",
                        marginRight: 10,
                        color: "#fff",
                      }}
                      disabled={true}
                      textStyle={{
                        color: "#fff",
                        fontFamily: "Avenir",
                        marginBottom: 10,
                      }}
                      mode="outlined"
                    >
                      {idealType}
                    </Chip>
                  )}
                  {tourType == "" ? null : (
                    <Chip
                      style={{
                        backgroundColor: "#34ace0",
                        alignItems: "center",
                        marginRight: 10,
                        color: "#fff",
                      }}
                      disabled={true}
                      textStyle={{
                        color: "#fff",
                        fontFamily: "Avenir",
                        marginBottom: 10,
                      }}
                      mode="outlined"
                    >
                      {tourType}
                    </Chip>
                  )}
                </ScrollView>

                {(tour.length === 0 && route.params.name) ||
                tour.length === 0 ? (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
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
                  <>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(c) => c._id}
                      data={search()}
                      renderItem={({ item, index }) => {
                        return (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate("TourInner", {
                                  item: item,
                                });
                              }}
                            >
                              <View style={styles.imageContainer}>
                                <View style={styles.shadow}>
                                  <ProgressiveImage
                                    style={styles.image}
                                    source={{ uri: item.imageUrl }}
                                  />
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      position: "absolute",
                                      width: WIDTH * 0.9,
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <LinearGradient
                                      colors={["#FFA26E", "#E36D5D"]}
                                      style={{
                                        marginHorizontals: 15,
                                        marginTop: 10,
                                        padding: 2,
                                        borderRadius: 5,
                                        left: 10,
                                      }}
                                    >
                                      <View>
                                        <Text style={styles.cityname}>
                                          {item.cityName}
                                        </Text>
                                      </View>
                                    </LinearGradient>
                                  </View>
                                  <View style={styles.tourDetails}>
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: "#8395A7",
                                          fontSize: 15,
                                          fontFamily: "Andika",
                                        }}
                                      >
                                        {item.tourCategory.join(",")}
                                      </Text>
                                      <View>
                                        {savedTours.includes(item.tourName) ? (
                                          <TouchableOpacity
                                            onPress={() => {
                                              let filterData = savedTours.filter(
                                                (c) => {
                                                  return c != item.tourName;
                                                }
                                              );

                                              setSavedTours(filterData);

                                              const filterDetails = savedToursDetails.filter(
                                                (c) => {
                                                  return (
                                                    c.tourName !== item.tourName
                                                  );
                                                }
                                              );

                                              setSavedToursDetails(
                                                filterDetails
                                              );
                                            }}
                                          >
                                            <AntDesign
                                              style={{ marginRight: 0 }}
                                              name="heart"
                                              size={24}
                                              color="#FF4500"
                                            />
                                          </TouchableOpacity>
                                        ) : (
                                          <TouchableOpacity
                                            onPress={() => {
                                              if (isLoggedIn) {
                                                setSavedTours([
                                                  ...savedTours,
                                                  item.tourName,
                                                ]);
                                                setSavedToursDetails([
                                                  ...savedToursDetails,
                                                  item,
                                                ]);
                                              } else {
                                                navigation.navigate(
                                                  "SignUpScreen"
                                                );
                                              }
                                            }}
                                          >
                                            <Image
                                              style={{
                                                height: 35,

                                                width: 35,
                                              }}
                                              source={require("../../../assets/heart.png")}
                                            />
                                          </TouchableOpacity>
                                        )}
                                      </View>
                                    </View>

                                    <Text
                                      style={{
                                        fontSize: 18,
                                        // fontWeight: "bold",
                                        fontFamily: "NewYorkl",
                                        marginTop: 2,
                                      }}
                                    >
                                      {item.tourName}
                                    </Text>
                                    <Text
                                      style={{
                                        color: "#8395A7",
                                        fontSize: 15,
                                        marginVertical: 5,
                                        fontFamily: "Andika",
                                      }}
                                    >
                                      {item.tourType}
                                    </Text>
                                    <View
                                      style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      {/* <View
                                        style={{
                                          padding: 8,
                                          marginTop: 4,
                                          borderWidth: 1,
                                          borderColor: "#333",
                                          borderRadius: 14,
                                        }}
                                      >
                                        {item.tourCost.adult == 15000 &&
                                        item.tourCost.adult >= 10000 ? (
                                          <Text
                                            style={{
                                              fontSize: 13,
                                              fontFamily: "Andika",
                                            }}
                                          >
                                            ₹₹₹₹ - High
                                          </Text>
                                        ) : item.tourCost.adult < 10000 &&
                                          item.tourCost.adult >= 5000 ? (
                                          <Text
                                            style={{
                                              fontSize: 13,
                                              fontFamily: "NewYorkl",
                                            }}
                                          >
                                            ₹₹₹ - Medium
                                          </Text>
                                        ) : item.tourCost.adult > 2500 &&
                                          item.tourCost.adult < 500205 ? (
                                          <Text
                                            style={{
                                              fontSize: 13,
                                              fontFamily: "NewYorkl",
                                            }}
                                          >
                                            ₹₹ - Low
                                          </Text>
                                        ) : (
                                          <Text
                                            style={{
                                              fontSize: 13,
                                              fontFamily: "NewYorkl",
                                            }}
                                          >
                                            ₹ - Very Low
                                          </Text>
                                        )}
                                      </View> */}

                                      {/* <View
                                        style={{
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Image
                                          style={{
                                            height: 25,
                                            width: 25,
                                            marginRight: 4,
                                          }}
                                          source={require("../../../assets/Star.png")}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontFamily: "NewYorkl",
                                          }}
                                        >
                                          {item.ratings}/5
                                        </Text>
                                      </View> */}
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </>
                        );
                      }}
                    />
                  </>
                )}
              </View>
            )}
          </View>
        );
      case 1:
        return (
          <ScrollView
            style={{
              backgroundColor: "#fff",
              flex: 1,
            }}
          >
            <View>
              <View style={{ margin: 10 }}>
                <View
                  style={{
                    marginTop: Platform.OS === "ios" ? 50 : 10,
                    marginBottom: Platform.OS === "ios" ? 10 : 10,

                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => setStep(0)}>
                    <Feather
                      name="arrow-left"
                      size={28}
                      // color="#fff"
                      style={{
                        paddingRight: 20,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "NewYorkl",
                      fontSize: 20,
                      // color: "#fff",
                    }}
                  >
                    Filter By Category
                  </Text>
                </View>
              </View>
              <View
                style={{
                  padding: 10,
                  borderRadius: 20,
                  alignItems: "center",
                }}
              >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      height: HEIGHT / 12,
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: 15,
                      marginHorizontal: 20,
                    }}
                  >
                    <TouchableOpacity onPress={() => setFilterStep(0)}>
                      <View
                        style={{
                          height: HEIGHT / 12.6,
                          alignItems: "center",
                          borderTopLefttRadius: 0,
                          borderBottomLeftRadius: 25,
                          justifyContent: "center",
                          paddingHorizontal: 15,
                          backgroundColor:
                            filterStep == 0 ? "#ffeaa7" : "#f7f1e3",
                        }}
                      >
                        <Text
                          style={{ textAlign: "center", fontFamily: "Avenir" }}
                        >
                          Ideal For
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilterStep(1)}>
                      <View
                        style={{
                          height: HEIGHT / 12.6,
                          alignItems: "center",

                          justifyContent: "center",
                          paddingHorizontal: 15,
                          backgroundColor:
                            filterStep == 1 ? "#ffeaa7" : "#f7f1e3",
                        }}
                      >
                        <Text
                          style={{ textAlign: "center", fontFamily: "Avenir" }}
                        >
                          Tour Category
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilterStep(2)}>
                      <View
                        style={{
                          height: HEIGHT / 12.6,
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: 15,
                          backgroundColor:
                            filterStep == 2 ? "#ffeaa7" : "#f7f1e3",
                        }}
                      >
                        <Text
                          style={{ textAlign: "center", fontFamily: "Avenir" }}
                        >
                          Tour Type
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilterStep(3)}>
                      <View
                        style={{
                          height: HEIGHT / 12.6,
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: 15,
                          backgroundColor:
                            filterStep == 3 ? "#ffeaa7" : "#f7f1e3",
                        }}
                      >
                        <Text
                          style={{ textAlign: "center", fontFamily: "Avenir" }}
                        >
                          Countries
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilterStep(4)}>
                      <View
                        style={{
                          height: HEIGHT / 12.6,
                          alignItems: "center",
                          borderTopRightRadius: 25,
                          borderBottomRighRadius: 15,
                          justifyContent: "center",
                          paddingHorizontal: 15,
                          backgroundColor:
                            filterStep == 4 ? "#ffeaa7" : "#f7f1e3",
                        }}
                      >
                        <Text
                          style={{ textAlign: "center", fontFamily: "Avenir" }}
                        >
                          Cities
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
              {renderFilterItem()}
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setSelectedIdealFor([]);
                  setSelectedTourType([]);
                  setSelectedCategory([]);
                  setIdealType("");
                  setTourType("");
                  setCountryName("");
                  setCityName("");
                  setTourCategory("");
                }}
              >
                <View>
                  <Text
                    style={{
                      borderRadius: 10,
                      // borderWidth: 1,
                      padding: 20,
                      fontSize: 16,
                      color: "#333",
                      backgroundColor: "#dff9fb",
                      fontFamily: "Avenir",
                    }}
                  >
                    Clear Filters
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => searchTour()}>
                <View
                  style={{
                    borderRadius: 10,
                    color: "#fff",
                    backgroundColor: "#ff7979",
                    fontFamily: "Avenir",
                  }}
                >
                  {filterLoaded ? (
                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: "#ff7979",
                        paddingHorizontal: 40,
                        paddingVertical: 15,
                      }}
                    >
                      <ActivityIndicator size="large" color="black" />
                    </View>
                  ) : (
                    <Text
                      style={{
                        borderRadius: 10,
                        padding: 20,
                        fontSize: 16,
                        color: "#fff",
                        backgroundColor: "#ff7979",
                        fontFamily: "Avenir",
                      }}
                    >
                      Apply Filters
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
    }
  };
  return <>{render(step)}</>;
};

export default TourHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // paddingTop: 20,
  },
  imageContainer: {
    padding: 5,
    position: "relative",
    paddingTop: 20,
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
  cityname: {
    padding: 5,
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    fontStyle: "normal",

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
  background: {
    // backgroundColor: "#fff",
    height: HEIGHT / 15,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  inputStyle: {
    fontSize: 16,
    flex: 1,
  },
  iconStyle: {
    fontSize: 28,
    alignSelf: "center",
    marginHorizontal: 15,
    // backgroundColor: "red",
    // padding: 10,
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10,
  },
});
