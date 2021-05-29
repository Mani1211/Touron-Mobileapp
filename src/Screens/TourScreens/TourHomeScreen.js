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
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

import { database } from "firebase";

import touron from "../../api/touron";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { Chip, Surface } from "react-native-paper";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import {
  Feather,
  FontAwesome,
  MaterialIcons,
  Fontisto,
  EvilIcons,
} from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import axios from "axios";
import SearchBar from "./../../Reusable Components/SearchBar";
import TourpageTile from "./TourpageTile";

const TourHomeScreen = ({ navigation, route }) => {
  const { isLoggedIn, user, countries, cities, tours } =
    useContext(AuthContext);
  const [tour, setTour] = useState(tours);
  const [step, setStep] = useState(0);
  const [filterStep, setFilterStep] = useState(0);

  const getSavedTours = () => {
    let sT = [];
    let sTNames = [];
    if (user) {
      database()
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
  const [loader, setLoader] = useState(false);
  const [filterLoaded, setfilterLoaded] = useState(false);
  const [tourName, setTourName] = useState("");
  const [pageSize, setPageSize] = useState(10);

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
    let mounted = true;
    if (mounted) {
      if (isLoggedIn) {
        if (savedToursDetails.length > 0) {
          database()
            .ref(`saved-tours/${user.uid}`)
            .set(savedToursDetails)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }
      }
    }
    return () => (mounted = false);
  }, []);

  const getTour = async () => {
    console.log("object", route.params.name);
    if (route.params.name) {
      const cityname = route.params.name;
      try {
        const tourResponse = await touron.get(`/tour/cityname/${cityname}`);
        if (tourResponse.data.length === 0) {
          setTour([]);
        }
        console.log("tourResponse.data", tourResponse.data);
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
                      {tourCategory === item.queryName ? (
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
                        padding: 5,
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
                      <Text
                        style={{ fontFamily: "Andika", textAlign: "center" }}
                      >
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
    const source = axios.CancelToken.source();

    getTour();

    return () => source.cancel();
  }, []);

  const render = (step) => {
    switch (step) {
      case 0:
        return (
          <View style={[styles.container]}>
            <View
              style={{
                height: HEIGHT / 8,
                padding: 10,
                marginTop: Platform.OS === "ios" ? 40 : 20,
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
                  <FontAwesome
                    name="arrow-circle-left"
                    size={34}
                    color="black"
                  />
                </TouchableOpacity>

                <View>
                  <Text
                    style={{
                      fontSize: 23,
                      fontFamily:
                        Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                    }}
                  >
                    Discover Tours
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
              <SearchBar
                onChangeText={(value) => setTourName(value)}
                placeholder={"Search Tours...."}
              />
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

            {(tour.length === 0 && route.params.name) || tour.length === 0 ? (
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
              <ScrollView showsVerticalScrollIndicator={false}>
                {search().map((item, index) => {
                  if (index < pageSize)
                    return (
                      <TourpageTile
                        navigation={navigation}
                        item={item}
                        savedTours={savedTours}
                        onPress1={() => {
                          let filterData = savedTours.filter((c) => {
                            return c != item.tourName;
                          });

                          setSavedTours(filterData);

                          const filterDetails = savedToursDetails.filter(
                            (c) => {
                              return c.tourName !== item.tourName;
                            }
                          );

                          setSavedToursDetails(filterDetails);
                        }}
                        onPress2={() => {
                          if (isLoggedIn) {
                            setSavedTours([...savedTours, item.tourName]);
                            setSavedToursDetails([...savedToursDetails, item]);
                          } else {
                            navigation.navigate("SignUpScreen");
                          }
                        }}
                      />
                    );
                })}
                {tourName === "" && (
                  <TouchableOpacity
                    onPress={() => setPageSize(pageSize + 10)}
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 20,
                      backgroundColor: "#fff",
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
              </ScrollView>
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
    backgroundColor: "white",
    paddingTop: 40,
  },
});
