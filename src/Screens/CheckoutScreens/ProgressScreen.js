import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import { database } from "firebase";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { PieChart } from "react-native-svg-charts";
import { Surface } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "./../../context/AuthContext";
import moment from "moment";
const ProgressScreen = ({ selectedCitys, setStep, prevStep }) => {
  const { details } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const finalTour = details.selectedTours;
  const selectedCity = selectedCitys;

  const cityTourNames = [];
  finalTour.forEach((tour) => {
    cityTourNames.push(tour);
  });

  let selectedCityNames = [];
  let specificCityTours = [];
  selectedCity.forEach((city) => {
    selectedCityNames.push(city.cityName);
    const CITYNAME = city.cityName;
    const arr3 = finalTour.filter((tour) => {
      return CITYNAME.includes(tour.cityName);
    });
    specificCityTours.push({
      cityName: city.cityName,
      tours: arr3,
    });
  });

  let cityTourDurations = [];
  specificCityTours.forEach((c) => {
    let tourduration = 0;
    c.tours.forEach((t) => {
      let length = t.tourDuration.length;
      tourduration +=
        length < 11
          ? t.tourDuration.slice(2, 4) * 1
          : t.tourDuration.slice(3, 5) * 1;
      return tourduration;
    });

    cityTourDurations.push({
      cityName: c.cityName,
      tourDurations: tourduration,
    });
  });

  // combining city days and that city durations

  let cityTourDetails = [];
  cityTourDurations.forEach((c) => {
    let city = {};
    selectedCity.forEach((t) => {
      // console.log(t.name, c.cityName);
      if (t.cityName == c.cityName) {
        city = {
          cityName: t.cityName,
          tourDurations: c.tourDurations,
          cityDays: t.days,
        };
      }
    });
    //  console.log(city);
    cityTourDetails.push(city);
  });

  return (
    <ScrollView style={{ marginBottom: 10 }}>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 30,
          paddingBottom: 50,
          position: "relative",
          backgroundColor: "#E28633",
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
            fontSize: 20,
            fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
            marginTop: Platform.OS == "android" ? HEIGHT / 14 : 80,
            flex: 0.6,
            color: "#fff",
          }}
        >
          Progress Page
        </Text>

        <TouchableOpacity>
          <View>{/* <AntDesign name="arrowright" size={28} /> */}</View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFF",
        }}
      >
        <View
          style={{
            borderTopLeftRadius: 40,
            width: WIDTH,
            alignItems: "center",
            top: -25,
            borderWidth: 2,
            borderColor: "#FFF",
            borderTopRightRadius: 30,
            backgroundColor: "#FFF",
          }}
        >
          <FlatList
            data={cityTourDetails}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            keyExtractor={(item) => item.cityName}
            renderItem={({ item }) => {
              const data = [
                (item.cityDays - 1) * 8,
                20,
                item.cityDays * 2,
                item.cityDays * 3,
                item.tourDurations,
              ];

              const colors = [
                "#47B39C",
                "#58508d",
                "#bc5090",
                "#ff6361",
                "#ffa600",
              ];
              // console.log(data);

              const pieData = data
                .filter((value) => value > 0)
                .map((value, index) => ({
                  value,
                  svg: {
                    fill: colors[index],
                    onPress: () => (
                      <View>
                        <Text>Airport</Text>
                      </View>
                    ),
                  },
                  key: `pie-${index}`,
                }));

              return (
                <View
                  style={{
                    flex: 1,
                    width: WIDTH,
                    justifyContent: "center",
                    borderColor: "#FFF",
                  }}
                >
                  <View
                    style={{
                      position: "relative",
                      zIndex: 0,
                      marginTop: 40,
                      alignItems: "center",
                    }}
                  >
                    <Surface
                      style={{
                        elevation: 15,
                        height: HEIGHT * 0.5,
                        width: WIDTH * 0.8,
                        borderRadius: 25,
                        backgroundColor: "#FFF",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#B6BCC4",
                          fontFamily: "Avenir",
                        }}
                      >
                        Destination
                      </Text>
                      <Text
                        style={{
                          fontSize: 30,
                          color: "#626E7B",
                          paddingBottom: 30,
                          fontFamily: "Avenir",
                        }}
                      >
                        {item.cityName}
                      </Text>
                      <PieChart
                        innerRadius={1}
                        style={{ height: 200, width: 200 }}
                        data={pieData}
                      />
                      <View
                        style={{
                          backgroundColor: "#F1F3F6",
                          borderRadius: 20,
                          marginTop: 20,
                          paddingHorizontal: 20,
                          paddingVertical: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#626E7B",
                            fontFamily:
                              Platform.OS === "ios"
                                ? "AvenirNext-Bold"
                                : "Avenir",
                          }}
                        >
                          {item.cityDays} Days
                        </Text>
                      </View>
                    </Surface>
                  </View>
                  <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                    <Text style={{ fontSize: 30, color: "#626E7B" }}>
                      Legends
                    </Text>
                  </View>
                  <View style={{}}>
                    <Surface
                      style={{
                        elevation: 10,
                        marginHorizontal: 20,
                        height: 90,
                        borderRadius: 20,
                        marginBottom: 18,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: WIDTH / 10,
                            width: WIDTH / 10,
                            borderRadius: 10,
                            marginHorizontal: 20,
                            backgroundColor: "#ffa600",
                          }}
                        ></View>
                        {/* <Image
                          style={{ height: 50, width: 50 }}
                          source={require("../../../assets/LIGHT/ICONS/24/Signs.png")}
                        /> */}
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              marginHorizontal: 5,
                            }}
                          >
                            {item.tourDurations} Hours
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginHorizontal: 5,
                            }}
                          >
                            Total Tour Hours based on your selection
                          </Text>
                        </View>
                      </View>
                    </Surface>
                    <Surface
                      style={{
                        elevation: 10,
                        marginHorizontal: 20,
                        height: 90,
                        borderRadius: 20,
                        marginBottom: 25,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: WIDTH / 10,
                            width: WIDTH / 10,
                            borderRadius: 10,
                            marginHorizontal: 20,
                            backgroundColor: "#47B39C",
                          }}
                        ></View>
                        {/* <Image
                          style={{ height: 50, width: 50 }}
                          source={require("../../../assets/LIGHT/ICONS/24/Bed.png")}
                        /> */}
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              marginHorizontal: 5,
                            }}
                          >
                            {(item.cityDays - 1) * 8} Hours
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginHorizontal: 5,
                            }}
                          >
                            Average hours spent on Sleeping
                          </Text>
                        </View>
                      </View>
                    </Surface>
                    <Surface
                      style={{
                        elevation: 10,
                        marginHorizontal: 20,
                        height: 90,
                        borderRadius: 20,
                        marginBottom: 18,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: WIDTH / 10,
                            width: WIDTH / 10,
                            borderRadius: 10,
                            marginHorizontal: 20,
                            backgroundColor: "#58508d",
                          }}
                        ></View>
                        {/* <Image
                          style={{ height: 50, width: 50 }}
                          source={require("../../../assets/LIGHT/ICONS/24/Airplane.png")}
                        /> */}
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              marginHorizontal: 5,
                            }}
                          >
                            20 Hours
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginHorizontal: 5,
                            }}
                          >
                            Average hours spent on Transit to Airport
                          </Text>
                        </View>
                      </View>
                    </Surface>
                    <Surface
                      style={{
                        elevation: 10,
                        marginHorizontal: 20,
                        height: 90,
                        borderRadius: 20,
                        marginBottom: 18,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: WIDTH / 10,
                            width: WIDTH / 10,
                            borderRadius: 10,
                            marginHorizontal: 20,
                            backgroundColor: "#bc5090",
                          }}
                        ></View>
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              marginHorizontal: 5,
                            }}
                          >
                            {item.cityDays * 2} Hours
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginHorizontal: 5,
                            }}
                          >
                            Average hours spent on Leisure
                          </Text>
                        </View>
                      </View>
                    </Surface>
                    <Surface
                      style={{
                        elevation: 5,
                        marginHorizontal: 20,
                        height: 90,
                        borderRadius: 20,
                        marginBottom: 4,
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: WIDTH / 10,
                            width: WIDTH / 10,
                            borderRadius: 10,
                            marginHorizontal: 20,
                            backgroundColor: "#ff6361",
                          }}
                        ></View>
                        {/* <Image
                          style={{ height: 50, width: 50 }}
                          source={require("../../../assets/LIGHT/ICONS/24/Restaurant.png")}
                        /> */}
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                              marginHorizontal: 5,
                            }}
                          >
                            {item.cityDays * 3} Hours
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              marginHorizontal: 5,
                            }}
                          >
                            Average hours spent on Breakfast,Lunch,Dinner
                          </Text>
                        </View>
                      </View>
                    </Surface>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={{ bottom: 0, width: WIDTH, backgroundColor: "#fff" }}>
        <TouchableOpacity
          style={{ flex: 1.5 }}
          onPress={() => {
            const v = moment().format("L");
            const r = Math.floor((Math.random() + 4) * 345334);

            database()
              .ref(`self-planned-tours`)
              .push({
                requestID: `TO-${v.slice(3, 5)}${v.slice(0, 2)}${v.slice(
                  8
                )}-${r}`,

                userId: userInfo.userID,
                adult: details.adult,
                children: details.children,
                fromData: details.fromDate,
                toData: details.toDate,
                tourDetails: cityTourNames,
                selectedCities: selectedCity,
                name: userInfo.name,
                phoneNumber: userInfo.phoneNumber,
                hotelType: "",
                travelmode: "",
                flightType: "",
                selectedState: "",
                tourCategory: "Self Plan Tour",
                status: "Query Received",
                tourCost: 0,
                tourType: "International",
                receivedFrom: "App",
              })
              .then(() => setStep())
              .catch((err) => console.log(err));
          }}
        >
          <View
            style={{
              backgroundColor: "#E28633",
              borderRadius: 10,
              padding: 15,
              alignItems: "center",
              marginRight: 15,
              marginLeft: 15,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontFamily: "Avenir",
              }}
            >
              Submit Query
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProgressScreen;
