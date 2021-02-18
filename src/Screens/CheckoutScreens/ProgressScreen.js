import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import * as firebase from "firebase";

import { ScrollView, FlatList } from "react-native-gesture-handler";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { PieChart } from "react-native-svg-charts";
import { Surface } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import { SelfTourContext } from "../../context/ SelfTourContext";
const ProgressScreen = ({ navigation, route }) => {
  const { details } = useContext(SelfTourContext);
  const { user } = useContext(AuthContext);
  const finalTour = route.params.selectedTours;
  console.log("details", details);
  const selectedCity = route.params.selectedCity;

  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [userInfo, setUserInfo] = useState({});
  let random;
  let formatedMonth;
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    if (user !== null) {
      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          let val = data.val();
          console.log(val, "val");
          setUserInfo(val);
        });
    }
  };

  const cityTourNames = [];
  finalTour.forEach((tour) => {
    cityTourNames.push(tour);
  });
  // console.log("ctn", cityTourNames);
  useEffect(() => {
    random = Math.floor((Math.random() + 4) * 345334 * Math.random());
    const requestDate = new Date();
    let currentYear = requestDate.getFullYear();
    setDate(requestDate.getDate());
    setMonth(requestDate.getMonth() + 1);
    setYear(currentYear.toString().slice(2, 5));
    formatedMonth = month < 10 ? "0" + month : month;
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

  // console.log(selectedCityNames, "names");
  // console.log("specificCityTours ", specificCityTours);

  // calculating specific city tours duratiom

  let cityTourDurations = [];
  specificCityTours.forEach((c) => {
    let tourduration = 0;
    const durations = c.tours.forEach((t) => {
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

  // console.log(cityTourDetails, "KKKKKvhjgvgvgv");
  return (
    <ScrollView>
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
            width: WIDTH,
            height: HEIGHT / 4,
            backgroundColor: "#28C9E1",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "#FFF" }}>Progress Page</Text>
        </View>
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
                            fontFamily: "Avenir",
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
            firebase
              .database()
              .ref(`self-planned-tours`)
              .push({
                requestID: `T0-${date}${formatedMonth}${year}-${random}`,
                userId: user.uid,
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
              })
              .then((data) => console.log(data))
              .catch((err) => console.log(err));

            alert("Query Submitted");

            navigation.navigate("Home");
          }}
        >
          <View
            style={{
              backgroundColor: "#28C9E1",
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
