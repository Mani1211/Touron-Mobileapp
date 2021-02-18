import React, { useEffect, useState } from "react";
import { Text, View, Dimensions, StatusBar, ScrollView } from "react-native";
import {
  Container,
  Header,
  Tab,
  Tabs,
  Icon,
  TabHeading,
  ScrollableTab,
} from "native-base";

import { Surface } from "react-native-paper";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const MyPlansInner = ({ navigation, route }) => {
  const item = route.params.item;
  const [plannedDetails, setPlannedDetails] = useState({});
  const [activePromoSlide, setActivePromoSlide] = useState(0);
  const ln = item.selectedCities.length;

  useEffect(() => {
    getPlannedDetails();
  }, [item]);
  const getPlannedDetails = () => {
    setPlannedDetails({});
    firebase
      .database()
      .ref(`plannedDetails`)
      .on("value", (data) => {
        if (data.val() !== null) {
          data.forEach((d) => {
            if (d.val().requestID === item.requestID) {
              // console.log("object", d.val().requestID, item.requestID);
              setPlannedDetails(d.val());
            }
          });
        }
      });
  };

  const _renderPromo = ({ item, index }) => {
    return (
      <ProgressiveImage
        source={{ uri: item }}
        resizeMode="cover"
        style={{ width: WIDTH * 0.9, height: HEIGHT / 4 }}
      />
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Container style={{ paddingHorizontal: 10 }}>
        <Header hasTabs style={{ backgroundColor: "#FFF" }}>
          <View
            style={{
              width: WIDTH,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View>
                <Feather
                  name="arrow-left"
                  size={28}
                  color="#333"
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: -20,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flex: 0.8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#333", fontSize: 20 }}>Plan</Text>
            </View>
          </View>
        </Header>
        <Tabs
          tabBarUnderlineStyle={{
            backgroundColor: "#333",
          }}
        >
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                {/* <Icon
                  name="id-badge"
                  type="FontAwesome"
                  style={{ fontSize: 23 }}
                /> */}
                <Text>General</Text>
              </TabHeading>
            }
          >
            <StatusBar backgroundColor="black" />
            <ScrollView>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Surface
                  style={{
                    width: WIDTH * 0.9,
                    margin: 10,
                    elevation: 10,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      width: WIDTH * 0.9,
                      alignItems: "center",
                      borderBottomColor: "#f1f2f1",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                      }}
                    >
                      Basic Details
                    </Text>
                  </View>
                  <View
                    style={{
                      marginVertical: 10,
                      padding: 20,
                    }}
                  >
                    {/* <Text style={{ fontSize: 20, fontFamily: "Avenir" }}>
                      {item.name}
                    </Text> */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Andika",
                          paddingBottom: 15,
                        }}
                      >
                        Adults : {item.adult}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Andika",
                        }}
                      >
                        Children : {item.children}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Andika",
                        paddingBottom: 15,
                      }}
                    >
                      Phone Number : {item.phoneNumber}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Andika",
                        paddingBottom: 15,
                      }}
                    >
                      Onward : {item.fromData}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Andika",
                        paddingBottom: 15,
                      }}
                    >
                      Return :{item.toData}
                    </Text>
                    <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                      Request Id :{item.requestID}
                    </Text>
                  </View>
                </Surface>

                <Surface
                  style={{
                    width: WIDTH * 0.9,
                    margin: 10,
                    elevation: 10,
                    alignItems: "center",
                    // height: 400,
                    flexWrap: "wrap",
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      width: WIDTH * 0.9,
                      alignItems: "center",
                      borderBottomColor: "#f1f2f1",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                      }}
                    >
                      Selected Cities
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      width: WIDTH * 0.9,
                      paddingVertical: 10,
                    }}
                  >
                    {item.selectedCities.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            width: ln == 1 ? WIDTH * 0.9 : WIDTH / 2.2,
                            flexBasis: ln == 1 ? "100%" : "50%",
                            backgroundColor: "#fff",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                          }}
                        >
                          <ProgressiveImage
                            source={{ uri: item.imageUrl }}
                            style={{
                              height: WIDTH / 7,
                              width: WIDTH / 7,
                              borderRadius: 100,
                              margin: 10,
                            }}
                          />
                          <View style={{ padding: 5, alignItems: "center" }}>
                            <Text
                              style={{
                                color: "black",
                                fontFamily: "NewYorkl",
                                fontSize: 16,
                              }}
                            >
                              {item.cityName}
                            </Text>
                            <Text
                              style={{ color: "black", fontFamily: "Andika" }}
                            >
                              {item.days} Days
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </Surface>
                {item.tourType === "Domestic" ? (
                  <Surface
                    style={{
                      width: WIDTH * 0.9,
                      margin: 10,
                      height: HEIGHT / 3.2,
                      elevation: 10,
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        alignItems: "center",
                        borderBottomColor: "#f1f2f1",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          paddingVertical: 10,
                        }}
                      >
                        Travel Preferance
                      </Text>
                    </View>

                    <View
                      style={{
                        width: WIDTH * 0.9,
                        padding: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          borderRightWidth: 2,
                          borderRightColor: "#f1f2f1",
                          height: HEIGHT / 4.8,
                          flexBasis: "33%",
                        }}
                      >
                        <Text>Hotel Type</Text>
                        <MaterialCommunityIcons
                          name="map-marker-distance"
                          size={24}
                          color="black"
                        />
                        <Text> {item.hotelType}</Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          borderRightWidth: 2,
                          borderRightColor: "#f1f2f1",
                          height: HEIGHT / 4.8,
                          flexBasis: "33%",
                        }}
                      >
                        <Text>Travel Type </Text>
                        {item.travelmode === "Train" ? (
                          <MaterialIcons name="train" size={24} color="black" />
                        ) : (
                          <MaterialIcons
                            name="flight"
                            size={24}
                            color="black"
                          />
                        )}
                        <Text> {item.travelmode}</Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          flexBasis: "33%",
                        }}
                      >
                        <Text>Total Days</Text>
                        <MaterialIcons name="today" size={24} color="black" />

                        <Text> {item.totalDays}</Text>
                      </View>
                    </View>
                  </Surface>
                ) : (
                  <Surface
                    style={{
                      width: WIDTH * 0.9,
                      margin: 10,
                      elevation: 10,
                      alignItems: "center",
                      flexWrap: "wrap",
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        alignItems: "center",
                        borderBottomColor: "#f1f2f1",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          paddingVertical: 10,
                        }}
                      >
                        Selected Tours
                      </Text>
                    </View>
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        borderRadius: 20,
                        marginHorizontal: 20,
                        marginVertical: 10,
                      }}
                    >
                      {item.tourDetails.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              flexBasis: "100%",
                              flexWrap: "wrap",
                              height: HEIGHT / 10,
                              paddingVertical: 10,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                // flexWrap: "wrap",
                                flexBasis: "100%",
                              }}
                            >
                              <ProgressiveImage
                                source={{ uri: item.imageUrl }}
                                style={{
                                  height: WIDTH / 8,
                                  width: WIDTH / 8,
                                  borderRadius: 5,
                                  marginRight: 10,
                                }}
                              />
                              <View>
                                <Text
                                  style={{
                                    fontSize: 15,
                                    textAlign: "left",
                                  }}
                                >
                                  {item.tourName}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </Surface>
                )}
              </View>
            </ScrollView>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                {/* <Icon
                  name="plane-departure"
                  type="FontAwesome5"
                  style={{ fontSize: 23 }}
                  color="#333"
                /> */}
                <Text>Travel</Text>
              </TabHeading>
            }
          >
            {Object.keys(plannedDetails).length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: HEIGHT / 1.2,
                }}
              >
                <ProgressiveImage
                  style={{ width: WIDTH * 0.9, height: HEIGHT * 0.7 }}
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg",
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: HEIGHT * 0.85,
                }}
              >
                <Surface
                  style={{
                    width: WIDTH * 0.9,
                    margin: 10,
                    height: HEIGHT / 3.2,
                    elevation: 10,
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      width: WIDTH * 0.9,
                      alignItems: "center",
                      borderBottomColor: "#f1f2f1",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                      }}
                    >
                      Onward Flight
                    </Text>
                  </View>

                  <View
                    style={{
                      width: WIDTH * 0.9,
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      padding: 20,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontFamily: "Andika" }}>Chennai</Text>
                      <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
                        Kiv
                      </Text>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.onward.depatureTime}
                      </Text>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.onward.depatureDate}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>------------</Text>
                      <MaterialIcons
                        name="flight-takeoff"
                        size={34}
                        color="#23C4ED"
                      />
                      <Text>------------</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontFamily: "Andika" }}>Chennai</Text>
                      <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
                        Kiv
                      </Text>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.onward.arrivalTime}
                      </Text>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.onward.arrivalDate}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: WIDTH * 0.9,
                      alignItems: "center",
                      borderTopColor: "#f1f2f1",
                      borderTopWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                      }}
                    >
                      {plannedDetails.flightDetails.onward.flightName}
                    </Text>
                  </View>
                </Surface>
                <Surface
                  style={{
                    width: WIDTH * 0.9,
                    margin: 10,
                    height: HEIGHT / 3.2,
                    elevation: 10,
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      width: WIDTH * 0.9,
                      alignItems: "center",
                      borderBottomColor: "#f1f2f1",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                      }}
                    >
                      Return Flight
                    </Text>
                  </View>

                  <View
                    style={{
                      width: WIDTH * 0.9,
                      flexDirection: "row",
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      padding: 20,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontFamily: "Andika" }}>Chennai</Text>
                      <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
                        Kiv
                      </Text>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.return.depatureTime}
                      </Text>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.return.depatureDate}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>------------</Text>
                      <MaterialIcons
                        name="flight-takeoff"
                        size={34}
                        color="#23C4ED"
                      />
                      <Text>------------</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontFamily: "Andika" }}>Chennai</Text>
                      <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
                        Kiv
                      </Text>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.return.arrivalTime}
                      </Text>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.return.arrivalDate}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: WIDTH * 0.9,
                      alignItems: "center",
                      borderTopColor: "#f1f2f1",
                      borderTopWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: 10,
                      }}
                    >
                      {plannedDetails.flightDetails.return.flightName}
                    </Text>
                  </View>
                </Surface>
              </View>
            )}
          </Tab>

          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                {/* <Icon
                  name="restaurant"
                  type="MaterialIcons"
                  style={{ fontSize: 23 }}
                /> */}
                <Text>Hotels</Text>
              </TabHeading>
            }
          >
            {Object.keys(plannedDetails).length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: HEIGHT / 1.2,
                }}
              >
                <ProgressiveImage
                  style={{ width: WIDTH * 0.9, height: HEIGHT * 0.7 }}
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg",
                  }}
                />
              </View>
            ) : (
              <ScrollView>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {plannedDetails.hotels.map((i, index) => {
                    if (i.cityName !== "")
                      return (
                        <Surface
                          key={index}
                          style={{
                            width: WIDTH * 0.9,
                            margin: 10,
                            elevation: 10,
                            alignItems: "center",
                            borderRadius: 10,
                          }}
                        >
                          <View
                            style={{
                              width: WIDTH * 0.9,
                              alignItems: "center",
                              borderTopColor: "#f1f2f1",
                              borderTopWidth: 1,
                            }}
                          >
                            <Text
                              style={{
                                paddingVertical: 5,
                                fontSize: 20,
                                fontFamily: "Andika",
                              }}
                            >
                              {i.cityName}
                            </Text>
                          </View>
                          <Carousel
                            layout="default"
                            autoplay={true}
                            lockScrollWhileSnapping={true}
                            enableMomentum={false}
                            loop={true}
                            ref={(c) => {
                              carousel = c;
                            }}
                            data={i.hotelPicture}
                            renderItem={_renderPromo}
                            sliderWidth={WIDTH * 0.9}
                            onSnapToItem={(index) => setActivePromoSlide(index)}
                            itemWidth={WIDTH * 0.9}
                          />
                          {/* <Pagination
                  dotsLength={taxi.length}
                  activeDotIndex={activePromoSlide}
                  dotStyle={{
                    width: 30,
                    height: 7,
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                  }}
                /> */}
                          <View
                            style={{
                              width: WIDTH * 0.9,
                              alignItems: "center",
                              borderTopColor: "#f1f2f1",
                              borderTopWidth: 1,
                            }}
                          >
                            <Text
                              style={{
                                paddingVertical: 5,
                                fontSize: 20,
                                fontFamily: "Andika",
                              }}
                            >
                              {i.hotelName}
                            </Text>
                          </View>
                        </Surface>
                      );
                  })}
                </View>
              </ScrollView>
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                {/* <Icon name="taxi" type="FontAwesome" style={{ fontSize: 23 }} /> */}
                <Text>Taxi</Text>
              </TabHeading>
            }
          >
            {Object.keys(plannedDetails).length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: HEIGHT / 1.2,
                }}
              >
                <ProgressiveImage
                  style={{ width: WIDTH * 0.9, height: HEIGHT * 0.7 }}
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg",
                  }}
                />
              </View>
            ) : (
              <ScrollView>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Surface
                    style={{
                      width: WIDTH * 0.9,
                      margin: 10,
                      elevation: 10,
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Carousel
                      layout="default"
                      autoplay={true}
                      lockScrollWhileSnapping={true}
                      enableMomentum={false}
                      // autoplayInterval={5000}
                      // autoplayDelay={9000}
                      loop={true}
                      ref={(c) => {
                        carousel = c;
                      }}
                      data={plannedDetails.taxiDetails.taxiPicture}
                      renderItem={_renderPromo}
                      sliderWidth={WIDTH * 0.9}
                      onSnapToItem={(index) => setActivePromoSlide(index)}
                      itemWidth={WIDTH * 0.9}
                    />
                    {/* <Pagination
                    dotsLength={taxi.length}
                    activeDotIndex={activePromoSlide}
                    dotStyle={{
                      width: 30,
                      height: 7,
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                    }}
                  /> */}
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        alignItems: "center",
                        borderTopColor: "#f1f2f1",
                        borderTopWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          paddingVertical: 5,
                          fontSize: 20,
                          fontFamily: "Andika",
                        }}
                      >
                        {plannedDetails.taxiDetails.taxiName}
                      </Text>
                    </View>
                  </Surface>
                  <Surface
                    style={{
                      width: WIDTH * 0.9,
                      margin: 10,
                      height: HEIGHT / 3.2,
                      elevation: 10,
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        alignItems: "center",
                        borderBottomColor: "#f1f2f1",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          paddingVertical: 10,
                        }}
                      >
                        Taxi Informations
                      </Text>
                    </View>

                    <View
                      style={{
                        width: WIDTH * 0.9,
                        padding: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          borderRightWidth: 2,
                          borderRightColor: "#f1f2f1",
                          height: HEIGHT / 4.8,
                          flexBasis: "33%",
                        }}
                      >
                        <Text>Distance</Text>
                        <MaterialCommunityIcons
                          name="map-marker-distance"
                          size={24}
                          color="black"
                        />
                        <Text>
                          {plannedDetails.basicDetails.kilometers} kms
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          borderRightWidth: 2,
                          borderRightColor: "#f1f2f1",
                          height: HEIGHT / 4.8,
                          flexBasis: "33%",
                        }}
                      >
                        <Text> Days </Text>
                        <MaterialIcons name="today" size={24} color="black" />
                        <Text>{plannedDetails.basicDetails.days} Days</Text>
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          flexBasis: "33%",
                        }}
                      >
                        <Text>Days Limit </Text>
                        <MaterialIcons name="restore" size={24} color="black" />
                        <Text>{plannedDetails.basicDetails.daysLimit} kms</Text>
                      </View>
                    </View>
                  </Surface>
                  <Surface
                    style={{
                      width: WIDTH * 0.9,
                      margin: 10,
                      elevation: 10,
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        alignItems: "center",
                        borderBottomColor: "#f1f2f1",
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text
                        style={{
                          paddingVertical: 10,
                        }}
                      >
                        Terms & Conditions
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 20,
                      }}
                    >
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.basicDetails.termsConditions}
                      </Text>
                    </View>
                  </Surface>
                </View>
              </ScrollView>
            )}
          </Tab>
        </Tabs>
      </Container>
    </ScrollView>
  );
};

export default MyPlansInner;
