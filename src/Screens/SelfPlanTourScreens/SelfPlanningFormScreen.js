import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import { Surface } from "react-native-paper";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthContext";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import touron from "../../api/touron";
import Tourtype from "./../CategoryScreens/Reusable components/Tourtype";
import SubmittedQuery from "./../CategoryScreens/Reusable components/SubmittedQuery";
import SelfTourHome from "./SelfTourHome";
import OverviewToursScreen from "../CheckoutScreens/OverviewToursScreen";
import ProgressScreen from "../CheckoutScreens/ProgressScreen";
import OverviewCitiesScreen from "../CheckoutScreens/OverviewCitiesScreen";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const SelfPlanForm = ({ navigation }) => {
  const { cities, userInfo } = useContext(AuthContext);
  const [destination, setDestination] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedCityNames, setSelectedCityNames] = useState([]);
  const [loader, setLoader] = useState(true);
  const [tourType, setTourType] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState("");
  const [dcities, setDCities] = useState([]);
  const [states, setStates] = useState([]);
  const [hotelType, setHoteltype] = useState("");
  const [travelmode, setTravelmode] = useState("");
  const [flightType, setFlightType] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  let random;
  let formatedMonth;

  useEffect(() => {
    random = Math.floor((Math.random() + 4) * 345334);
    const requestDate = new Date();
    let currentYear = requestDate.getFullYear();
    setDate(requestDate.getDate());
    setMonth(requestDate.getMonth() + 1);
    setYear(currentYear.toString().slice(2, 5));
    formatedMonth = month < 10 ? "0" + month : month;
  });

  const getCity = () => {
    if (destination === "") return cities;
    const c = cities.filter((c) => {
      return c.cityName
        .trim()
        .toUpperCase()
        .includes(destination.toUpperCase().trim());
    });

    const countries = cities.filter((c) => {
      return c.countryName
        .trim()
        .toUpperCase()
        .includes(destination.toUpperCase().trim());
    });

    const result = [...c, ...countries];
    return result;
  };

  const getStates = async () => {
    try {
      setLoaded(true);

      const stateResponse = await touron.get(`/state`);
      setStates(stateResponse.data);
      // console.log("object", stateResponse.data);
      setLoaded(false);
    } catch (err) {
      console.log(err, "err");
    }
  };

  const getDomesticCities = async (name) => {
    try {
      setLoaded(true);
      const domesticResponse = await touron.get(`/statecity/statename/${name}`);

      setDCities(domesticResponse.data);
      setLoaded(false);
    } catch (err) {
      console.log(err, "err");
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getStates();
    }
    return () => (mounted = false);
  }, []);

  const calculateTotalDays = () => {
    let count = 0;
    selectedCity.forEach((c) => {
      return (count = count + c.days * 1);
    });
    // console.log("count", count);
    return count;
  };
  const submitD = () => {
    firebase
      .database()
      .ref(`self-planned-tours`)
      .push({
        requestID: `TO-${date}${formatedMonth}${year}-${random}`,
        tourType: tourType,
        userId: userInfo.userID,
        adult: adult,
        children: children,
        fromData: fromDate,
        toData: toDate,
        selectedCities: selectedCity,
        name: userInfo.name,
        phoneNumber: userInfo.phoneNumber,
        totalDays: totalDays,
        hotelType: hotelType,
        travelmode: travelmode,
        flightType: flightType,
        selectedState: selectedState,
        tourDetails: [],
        tourCategory: "Self Plan Tour",
        status: "Query Received",
        tourCost: 0,
      })
      .then((data) => {
        setStep(5);
      })
      .catch((err) => console.log(err));
  };
  const renderDomesticForm = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.container}>
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
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                size="large"
              />
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    width: WIDTH,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {states.map((item, index) => {
                    return (
                      <View style={{ alignItems: "center" }} key={index}>
                        {selectedState === item.stateName ? (
                          <Feather
                            name="check-circle"
                            size={24}
                            color="green"
                            style={{
                              bottom: 20,
                              right: 0,
                              zIndex: 10,
                              position: "absolute",
                            }}
                          />
                        ) : null}
                        <View>
                          <TouchableOpacity
                            onPress={() => setSelectedState(item.stateName)}
                          >
                            <ProgressiveImage
                              style={styles.cityImage}
                              source={{ uri: item.imageUrl }}
                            />
                          </TouchableOpacity>
                          <Text
                            style={{ textAlign: "center", marginBottom: 5 }}
                          >
                            {item.stateName}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            )}

            <TouchableOpacity
              onPress={() => {
                getDomesticCities(selectedState);
                setStep(step + 1);
              }}
            >
              <View style={styles.proceedButton}>
                <Text
                  style={{ fontSize: 20, color: "white", fontFamily: "Andika" }}
                >
                  Select State and Proceed
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.container}>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontFamily: "Andika",
                }}
              >
                Select Citiess
              </Text>
            </View>

            {loaded ? (
              <ActivityIndicator
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                size="large"
              />
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    width: WIDTH,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {dcities.map((t, index) => {
                    return (
                      <View style={{ alignItems: "center" }} key={index}>
                        {selectedCityNames.includes(t.cityName) ? (
                          <Feather
                            name="check-circle"
                            size={24}
                            color="green"
                            style={{
                              bottom: 20,
                              right: 10,
                              zIndex: 10,
                              position: "absolute",
                            }}
                          />
                        ) : null}
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              if (selectedCityNames.includes(t.cityName)) {
                                const filter = selectedCity.filter((sa) => {
                                  return sa.cityName !== t.cityName;
                                });
                                setSelectedCity(filter);
                                const filters = selectedCityNames.filter(
                                  (sa) => {
                                    return sa !== t.cityName;
                                  }
                                );
                                setSelectedCityNames(filters);
                              } else {
                                setSelectedCity([
                                  ...selectedCity,
                                  {
                                    cityName: t.cityName,
                                    days: 0,
                                    stateName: t.stateName,
                                    idealDays: t.idealDays,
                                    suggestedCombinations:
                                      t.suggestedCombinations,
                                    imageUrl: t.imageUrl,
                                  },
                                ]);
                                setSelectedCityNames([
                                  ...selectedCityNames,
                                  t.cityName,
                                ]);
                              }
                            }}
                          >
                            <ProgressiveImage
                              style={styles.cityImage}
                              source={{ uri: t.imageUrl }}
                            />
                          </TouchableOpacity>
                          <Text
                            style={{ textAlign: "center", marginBottom: 5 }}
                          >
                            {t.cityName}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            )}

            {selectedCity.length === 0 ? null : (
              <TouchableOpacity onPress={() => setStep(3)}>
                <View style={styles.proceedButton}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                      fontFamily: "Andika",
                    }}
                  >
                    Select State and Proceed
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        );
      case 3:
        return (
          <ScrollView>
            <View style={{ flex: 1, backgroundColor: "#F1F3F6" }}>
              <View style={{ marginVertical: 20 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontFamily: "Andika",
                  }}
                >
                  Overview of the seletecd cities
                </Text>
              </View>

              {selectedCity.map((item, index) => (
                <Surface style={styles.surfaces} key={index}>
                  <View>
                    <Surface style={styles.surface}>
                      <Image
                        style={styles.cityimage}
                        source={{ uri: item.imageUrl }}
                      />
                    </Surface>

                    <Text style={styles.cityName}>{item.cityName}</Text>
                  </View>

                  <View>
                    <Image
                      style={{ height: 40, width: 40 }}
                      source={require("../../../assets/Calendar.png")}
                    />
                  </View>
                  <View
                    style={{
                      marginHorizontal: 20,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      Enter No Of Days
                    </Text>

                    <View style={styles.inputContainer}>
                      <TextInput
                        keyboardType="number-pad"
                        // value={item.days.toString()}
                        onChangeText={(value) => {
                          const index = selectedCity.findIndex((a) => {
                            return a.cityName === item.cityName;
                          });
                          const ne = [...selectedCity];
                          ne[index].days = value * 1;
                          setSelectedCity(ne);
                          setTotalDays(calculateTotalDays());
                        }}
                        style={{
                          fontSize: 25,
                          marginTop: 5,
                        }}
                        editable={true}
                      />
                    </View>
                  </View>
                </Surface>
              ))}

              <View style={{ width: WIDTH, marginLeft: -20 }}>
                <Image
                  style={styles.calendarImage}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Boardingcard.png?alt=media&token=3ca29134-6c34-4e32-b8c9-7c54d6ecce3e",
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    left: 20,
                  }}
                >
                  <View style={styles.embark}>
                    <Text
                      style={{
                        fontSize: WIDTH / 22,
                        color: "#F1F3F6",
                        fontFamily: "Andika",
                        textAlign: "center",
                      }}
                    >
                      When do you embark your journey
                    </Text>
                  </View>
                  <View style={styles.dateContainer}>
                    <View>
                      <View style={styles.from}>
                        <Text style={{ fontSize: 20, color: "#fff" }}>
                          Onward
                        </Text>
                      </View>
                      <View style={styles.picker}>
                        <DatePicker
                          style={{ width: 200 }}
                          date={fromDate}
                          mode="date"
                          placeholder=""
                          format="YYYY-MM-DD"
                          minDate={moment()
                            .add(14, "days")
                            .format("YYYY-MM-DD")}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          onDateChange={(date) => {
                            const dates = moment(date)
                              .add(totalDays - 1, "days")
                              .format("YYYY-MM-DD");
                            setFromDate(date);
                            setToDate(dates);
                          }}
                          showIcon={false}
                          customStyles={{
                            dateInput: {
                              borderWidth: 0,
                            },
                          }}
                        />
                      </View>
                    </View>
                    <View>
                      <View style={styles.from}>
                        <Text style={{ fontSize: 20, color: "#fff" }}>
                          Return
                        </Text>
                      </View>
                      <View style={styles.picker}>
                        {toDate === "" ? (
                          <Text style={{ fontSize: 15, color: "#333" }}>
                            Select Date
                          </Text>
                        ) : (
                          <Text style={{ fontSize: 15, color: "#333" }}>
                            {toDate}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={styles.numbers}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        fontFamily: "Avenir",
                      }}
                    >
                      No of Persons
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginVertical: 1,
                      }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.personText}>Adults</Text>
                        <Image
                          style={styles.image}
                          source={{
                            uri:
                              "https://image.freepik.com/free-vector/illustration-with-young-people-concept_23-2148467324.jpg",
                          }}
                        />
                        <View style={styles.personContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              if (adult > 0) setAdult(adult - 1);
                            }}
                          >
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                              -
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.inputContainer}>
                            <TextInput
                              keyboardType="number-pad"
                              style={{
                                fontSize: 20,
                                marginTop: 10,
                              }}
                              value={adult.toString()}
                              editable={true}
                              onChangeText={(value) => setAdult(+value)}
                            />
                          </View>
                          <TouchableOpacity onPress={() => setAdult(adult + 1)}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                              +
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.personText}>Childrens</Text>
                        <Image
                          style={styles.image}
                          source={{
                            uri:
                              "https://image.freepik.com/free-vector/smiling-boy-girl-kids-holding-hands-childhood-friendship-concept-love-romance-children-cartoon-characters-flat-vector-illustration-isolated-white-background_71593-450.jpg",
                          }}
                        />
                        <View style={styles.personContainer}>
                          <TouchableOpacity
                            onPress={() => {
                              if (children > 0) setChildren(children - 1);
                            }}
                          >
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                              -
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.inputContainer}>
                            <TextInput
                              style={{
                                marginTop: 10,
                                fontSize: 20,
                              }}
                              editable={true}
                              value={children.toString()}
                              onChangeText={(value) => setChildren(+value)}
                              keyboardType="number-pad"
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() => setChildren(children + 1)}
                          >
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                              +
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop:
                        HEIGHT < 550 ? -WIDTH / 10 - 20 : -WIDTH / 10 - 20,
                    }}
                    onPress={() => {
                      setStep(step + 1);
                    }}
                  >
                    <View style={styles.buttonContainer}>
                      <Text style={styles.exploreButton}>Proceed</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        );
      case 4:
        const hotels = ["3 Star Hotel", "4 Star Hotel", "5 Star Hotel"];
        const tourtype = ["Train", "Flight"];

        const flighttype = ["Non Stop", "Low Fare"];
        return (
          <View
            style={{
              // justifyContent: "center",
              width: WIDTH,
              alignItems: "center",
              flex: 1,
              marginTop: 30,
            }}
          >
            <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
              <Text
                style={{ fontFamily: "Andika", fontSize: 20, paddingLeft: 20 }}
              >
                Select the type of hotel ?
              </Text>
              <View style={styles.ftypecontainer}>
                {hotels.map((t, index) => (
                  <TouchableWithoutFeedback
                    onPress={() => setHoteltype(t)}
                    key={index}
                  >
                    <Surface
                      style={{
                        margin: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        elevation: 5,
                        height: WIDTH / 4,
                        borderRadius: 20,
                        width: WIDTH / 4,
                      }}
                    >
                      {hotelType === t ? (
                        <View style={styles.tick}>
                          <Text>✔️</Text>
                        </View>
                      ) : null}

                      <Text
                        style={{ fontFamily: "Andika", textAlign: "center" }}
                      >
                        {t}
                      </Text>
                    </Surface>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
            <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
              <Text
                style={{ fontFamily: "Andika", fontSize: 20, paddingLeft: 20 }}
              >
                How do you want to travel ?
              </Text>
              <View style={styles.ftypecontainer}>
                {tourtype.map((t, index) => (
                  <TouchableWithoutFeedback
                    onPress={() => setTravelmode(t)}
                    key={index}
                  >
                    <Surface style={styles.ftype}>
                      {travelmode === t ? (
                        <View style={styles.tick}>
                          <Text>✔️</Text>
                        </View>
                      ) : null}

                      <Text
                        style={{ fontFamily: "Andika", textAlign: "center" }}
                      >
                        {t}
                      </Text>
                    </Surface>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
            {travelmode === "Flight" ? (
              <View style={{ alignItems: "flex-start", marginBottom: 15 }}>
                <Text
                  style={{
                    fontFamily: "Andika",
                    fontSize: 20,
                    paddingLeft: 20,
                  }}
                >
                  Flight Type
                </Text>
                <View style={styles.ftypecontainer}>
                  {flighttype.map((t, index) => (
                    <TouchableWithoutFeedback
                      onPress={() => setFlightType(t)}
                      key={index}
                    >
                      <Surface style={styles.ftype}>
                        {flightType === t ? (
                          <View style={styles.tick}>
                            <Text>✔️</Text>
                          </View>
                        ) : null}

                        <Text
                          style={{ fontFamily: "Andika", textAlign: "center" }}
                        >
                          {t}
                        </Text>
                      </Surface>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={submitD}
              style={{
                // marginTop: 0,
                bottom: 10,
                position: "absolute",
              }}
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.exploreButton}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      case 5:
        return <SubmittedQuery navigation={navigation} type={"Self Plan"} />;
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderInternational = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.container}>
            <View
              style={{
                width: WIDTH * 0.9,
                alignItems: "flex-end",
                justifyContent: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 30,
                paddingBottom: 10,
                position: "relative",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setTourType("");
                }}
              >
                <View>
                  <AntDesign name="arrowleft" size={28} />
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "NewYorkl",
                  marginTop: Platform.OS == "android" ? HEIGHT / 14 : 80,
                  flex: 0.7,
                }}
              >
                Select your cities
              </Text>

              <TouchableOpacity>
                <View>{/* <AntDesign name="arrowright" size={28} /> */}</View>
              </TouchableOpacity>
            </View>
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
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                size="large"
              />
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    width: WIDTH,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getCity().map((item, index) => {
                    return (
                      <View style={{ alignItems: "center" }} key={index}>
                        <View>
                          {selectedCityNames.includes(item.cityName) ? (
                            <Feather
                              name="check-circle"
                              size={24}
                              color="green"
                              style={{
                                bottom: 20,
                                right: 0,
                                zIndex: 10,
                                position: "absolute",
                              }}
                            />
                          ) : null}
                          <TouchableWithoutFeedback
                            onPress={() => {
                              if (selectedCityNames.includes(item.cityName)) {
                                const filter = selectedCity.filter((sa) => {
                                  return sa.cityName !== item.cityName;
                                });
                                setSelectedCity(filter);
                                const filters = selectedCityNames.filter(
                                  (sa) => {
                                    return sa !== item.cityName;
                                  }
                                );
                                setSelectedCityNames(filters);
                              } else {
                                setSelectedCityNames([
                                  ...selectedCityNames,
                                  item.cityName,
                                ]);
                                setSelectedCity([
                                  ...selectedCity,
                                  {
                                    cityName: item.cityName,
                                    imageUrl: item.imageUrl,
                                    days: 0,
                                    countryName: item.countryName,
                                  },
                                ]);
                              }
                            }}
                          >
                            <ProgressiveImage
                              style={styles.cityImage}
                              source={{ uri: item.imageUrl }}
                            />
                          </TouchableWithoutFeedback>
                          <Text
                            style={{ textAlign: "center", marginBottom: 5 }}
                          >
                            {item.cityName}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            )}
            {selectedCity.length === 0 ? null : (
              <TouchableOpacity
                onPress={() => {
                  setStep(2);
                }}
              >
                <View style={styles.proceedButton}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                      fontFamily: "Andika",
                    }}
                  >
                    Proceed
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        );
      case 2:
        return (
          <OverviewCitiesScreen
            selectedCitys={selectedCity}
            selectedCityNamess={selectedCityNames}
            setStep={() => setStep(3)}
            prevStep={() => prevStep()}
          />
        );
      case 3:
        return (
          <SelfTourHome
            selectedCitys={selectedCity}
            selectedCityNamess={selectedCityNames}
            setStep={() => setStep(4)}
            prevStep={() => prevStep()}
          />
        );
      case 4:
        return (
          <OverviewToursScreen
            selectedCitys={selectedCity}
            prevStep={() => prevStep()}
            setStep={() => setStep(5)}
          />
        );
      case 5:
        return (
          <ProgressScreen
            prevStep={() => prevStep()}
            selectedCitys={selectedCity}
            setStep={() => setStep(6)}
          />
        );
      case 6:
        return <SubmittedQuery navigation={navigation} type={"Self Plan"} />;
    }
  };
  return (
    <>
      {tourType === "" ? (
        <View style={{ marginTop: Platform.OS === "ios" ? 30 : 0 }}>
          <Tourtype
            imgSrc1={require("../../../assets/planned-tour/india.png")}
            imgScr2={require("../../../assets/planned-tour/International.png")}
            nextStep={() => setStep(1)}
            tourType={tourType}
            tourName={"Self Tour"}
            setDomestic={() => setTourType("Domestic")}
            setInternational={() => setTourType("International")}
          />
        </View>
      ) : (
        <>
          {tourType === "Domestic" ? (
            <>
              {step === 5 ? null : (
                <View
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: WIDTH / 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (step > 1) setStep(step - 1);
                    }}
                  >
                    {step === 1 ? null : (
                      <View>
                        <AntDesign name="arrowleft" size={28} />
                      </View>
                    )}
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "NewYorkl",
                      marginTop: Platform.OS == "android" ? 30 : 40,
                    }}
                  >
                    Domestic
                  </Text>

                  <TouchableOpacity onPress={() => setStep(step + 1)}>
                    <View>
                      <AntDesign name="arrowright" size={28} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              {renderDomesticForm()}
            </>
          ) : (
            <>{renderInternational()}</>
          )}
        </>
      )}
    </>
  );
};

export default SelfPlanForm;

const styles = StyleSheet.create({
  picker: {
    width: WIDTH / 3,
    height: WIDTH / 8,
    borderRadius: 15,
    backgroundColor: "#f1f2f6",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  from: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  dateContainer: {
    width: WIDTH,
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-around",
    position: "absolute",
    flexDirection: "row",
    bottom: HEIGHT * 0.5,
  },
  embark: {
    position: "absolute",
    bottom: HEIGHT / 1.45,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  calendarImage: {
    marginTop: 0,
    height: HEIGHT / 1.3,
    width: WIDTH * 1.1,
    position: "relative",
  },
  cityimage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 20,
  },
  surfaces: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    height: 160,
    borderRadius: 20,
    width: WIDTH * 0.9,
    elevation: 8,
    justifyContent: "space-between",
  },
  numbers: {
    position: "absolute",
    height: HEIGHT / 3.7,
    width: WIDTH * 0.9,
    marginHorizontal: 20,
    zIndex: 1,
    bottom: HEIGHT * 0.11,
    borderRadius: 20,
  },
  personText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Andika",
  },
  personContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: WIDTH / 3,
    alignItems: "center",
  },
  image: {
    height: HEIGHT / 10,
    width: WIDTH / 4,
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: "#f1f2f6",
    marginTop: 5,
    height: HEIGHT / 25,
    width: WIDTH / 9,
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor: "#626E7B",
    borderRadius: 10,
    alignItems: "center",
    width: WIDTH * 0.9,
    marginRight: 15,
    marginLeft: 10,
    marginBottom: 1,
  },
  exploreButton: {
    fontSize: 15,
    color: "white",
    fontFamily: "Avenir",
    padding: WIDTH / 25,
  },
  cityName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginHorizontal: 5,
    alignItems: "center",
    width: WIDTH / 6,
    height: WIDTH / 8,
    backgroundColor: "#F1F3F6",
    borderRadius: 15,
    marginVertical: 10,
  },
  surface: {
    padding: 8,
    height: 100,
    borderRadius: 20,
    width: 100,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
  },
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

  ftype: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    height: WIDTH / 3,
    borderRadius: 20,
    width: WIDTH / 3,
  },
  ftypecontainer: {
    alignItems: "center",
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "center",
  },
  tick: {
    top: 0,
    right: 0,
    borderBottomLeftRadius: 20,
    position: "absolute",
    backgroundColor: "#00d8d6",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
});
