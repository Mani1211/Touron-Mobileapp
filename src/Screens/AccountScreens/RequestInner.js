import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking,
  Modal,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
// import * as Notifications from "expo-notifications";
import { Surface } from "react-native-paper";
import * as firebase from "firebase";
import { Container, Header, Tab, Tabs, TabHeading } from "native-base";
import Carousel from "react-native-snap-carousel";
import {
  MaterialIcons,
  Feather,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";

const RequestInner = ({ navigation, route }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const item = route.params.item;
  const [activePromoSlide, setActivePromoSlide] = useState(0);
  const [plannedDetails, setPlannedDetails] = useState({});
  const planning = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <ProgressiveImage
          style={{ width: WIDTH * 0.9, height: HEIGHT * 0.5 }}
          source={require("../../../assets/Finish/4.png")}
        />
        <Text
          style={{
            fontFamily: "Andika",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          You better get packing now, 'cause our experts have already started
          working their magic into your plan!"{" "}
        </Text>
      </View>
    );
  };
  const openImage = () => {
    return (
      <Modal transparent visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ position: "relative" }}>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  position: "absolute",
                  top: 35,
                  right: 10,
                  // zIndex: 20,
                }}
                onPress={() => setModalVisible(false)}
              >
                <View>
                  <FontAwesome name="close" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
              <Image
                source={{ uri: selectedImage }}
                resizeMode="contain"
                style={{
                  width: WIDTH * 0.95,
                  height: HEIGHT / 2,
                  borderRadius: 5,
                  zIndex: -2,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // useEffect(() => {
  //   const subscription = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       const data = response.notification.request.content.data.data;
  //       handleNotification(data);
  //     }
  //   );
  //   return () => subscription.remove();
  // }, [navigation]);

  const handleNotification = (item) => {
    navigation.navigate("RequestInner", {
      planned: item.tourCategory === "Planned Tour" ? item : null,
      road: item.tourCategory === "Road Trip" ? item : null,
      surprise: item.tourCategory === "Surprise Tour" ? item : null,
    });
  };

  const _renderPromo = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(item);
          setModalVisible(true);
        }}
      >
        <Image
          source={{ uri: item }}
          resizeMode="cover"
          style={{ width: WIDTH * 0.9, height: HEIGHT / 4 }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getPlannedDetails();
    }
    return () => (mounted = false);
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
              setPlannedDetails(d.val());
            }
          });
        }
      });
  };

  const renderIcon = (name) => {
    if (name === "Flight")
      return <MaterialIcons name="flight" size={34} color="black" />;
    if (name === "Train")
      return <MaterialIcons name="train" size={24} color="black" />;

    if (name === "Bus")
      return (
        <MaterialCommunityIcons
          name="bus-double-decker"
          size={24}
          color="black"
        />
      );
  };

  return (
    <ScrollView>
      <Container>
        {openImage()}
        <Header hasTabs style={{ backgroundColor: "#FFF", height: 80 }}>
          <View
            style={{
              width: WIDTH,
              alignItems: "center",
              flexDirection: "row",
              paddingVertical: 20,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
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
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#333",
                    fontSize: 20,
                    fontFamily: "NewYorkl",
                  }}
                >
                  {item.tourCategory}
                </Text>
              </View>
            </View>
            {Object.keys(plannedDetails).length === 0 ||
            plannedDetails.paymentLink === "" ? null : (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(plannedDetails.paymentLink);
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    marginRight: 10,
                    padding: 10,
                    borderRadius: 10,
                    fontSize: 16,
                    fontFamily: "NewYorkl",
                    backgroundColor: "#333",
                  }}
                >
                  Pay Now
                </Text>
              </TouchableOpacity>
            )}
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
                {/* <Icon name="taxi" type="FontAwesome" style={{ fontSize: 23 }} /> */}
                <Text style={{ fontFamily: "NewYorkl" }}>General</Text>
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
                      marginVertical: 10,
                      padding: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Andika",
                        color: "#333",
                        paddingVertical: 10,
                        backgroundColor: "#ffeaa7",
                        borderRadius: 5,
                        borderColor: "#333",
                        marginBottom: 20,
                        textAlign: "center",
                      }}
                    >
                      Request ID : {item.requestID}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingLeft: 24,
                        marginBottom: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Andika",
                          color: "#333",
                          padding: 10,
                          backgroundColor: "#f1f2f1",
                          borderRadius: 5,
                          borderColor: "#333",
                          marginRight: 20,
                        }}
                      >
                        Adults :{" "}
                        {item.tourCategory === "Honeymoon Trip"
                          ? "2"
                          : item.adult}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Andika",
                          color: "#333",
                          padding: 10,
                          backgroundColor: "#f1f2f1",
                          borderRadius: 5,
                          borderColor: "#333",
                        }}
                      >
                        Children : {item.children}
                      </Text>
                    </View>

                    <View
                      style={{
                        // flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Andika",
                          width: WIDTH * 0.8,
                          color: "#333",
                          paddingVertical: 10,
                          paddingHorizontal: 9,
                          backgroundColor: "#f1f2f1",
                          borderRadius: 5,
                          borderColor: "#333",
                          marginRight: 20,
                          marginBottom: 10,
                          textAlign: "center",
                        }}
                      >
                        Onward Date : {item.fromDate}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          width: WIDTH * 0.8,
                          textAlign: "center",

                          fontFamily: "Andika",
                          color: "#333",
                          paddingVertical: 10,
                          paddingHorizontal: 9,
                          backgroundColor: "#f1f2f1",
                          borderRadius: 5,
                          borderColor: "#333",
                        }}
                      >
                        Return Date : {item.toDate}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Feather
                        name="phone"
                        size={24}
                        color="black"
                        style={{ paddingRight: 5, marginTop: 10 }}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Andika",
                          color: "#333",
                          paddingVertical: 10,
                          paddingHorizontal: 9,
                          textAlign: "center",
                          marginTop: 10,
                        }}
                      >
                        {item.number}
                      </Text>
                    </View>
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
                      <Text>Traveller Type</Text>
                      <MaterialCommunityIcons
                        name="map-marker-distance"
                        size={24}
                        color="black"
                      />
                      <Text>
                        {" "}
                        {item.tourCategory === "Honeymoon Trip"
                          ? "Couples"
                          : item.travellerType}
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
                      <Text>Travel Type </Text>
                      {renderIcon(item.travelMode)}
                      <Text> {item.travelMode}</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        flexBasis: "33%",
                      }}
                    >
                      <Text>Tour Cost</Text>
                      <MaterialIcons name="today" size={24} color="black" />

                      <Text> {item.tourCost}</Text>
                    </View>
                  </View>
                </Surface>
              </View>
            </ScrollView>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                <Text style={{ fontFamily: "NewYorkl" }}>Transport</Text>
              </TabHeading>
            }
          >
            {Object.keys(plannedDetails).length === 0 ? (
              <>{planning()}</>
            ) : (
              <>
                {Object.keys(plannedDetails.flightDetails.onward.from)
                  .length === 0 ? (
                  <>{planning()}</>
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
                            fontFamily: "NewYorkl",
                          }}
                        >
                          Onward{" "}
                          {
                            plannedDetails.flightDetails.onward
                              .onwardTransportMode
                          }
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
                          <Text style={{ fontFamily: "Andika" }}>
                            {plannedDetails.flightDetails.onward.from}
                          </Text>
                          <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
                            {
                              plannedDetails.flightDetails.onward
                                .onwardFromCityCode
                            }
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
                          <Text>-------</Text>
                          {renderIcon(
                            plannedDetails.flightDetails.onward
                              .onwardTransportMode
                          )}

                          <Text>-------</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                          <Text style={{ fontFamily: "Andika" }}>
                            {plannedDetails.flightDetails.onward.to}
                          </Text>
                          <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
                            {
                              plannedDetails.flightDetails.onward
                                .onwardToCityCode
                            }
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
                        height: HEIGHT / 3.2,
                        elevation: 10,
                        alignItems: "center",
                        borderRadius: 10,
                        marginTop: 20,
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
                            fontFamily: "NewYorkl",
                          }}
                        >
                          Return{" "}
                          {
                            plannedDetails.flightDetails.return
                              .returnTransportMode
                          }
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
                          <Text style={{ fontFamily: "Andika" }}>
                            {plannedDetails.flightDetails.return.from}
                          </Text>
                          <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
                            {
                              plannedDetails.flightDetails.return
                                .returnFromCityCode
                            }
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
                          <Text>-------</Text>

                          {renderIcon(
                            plannedDetails.flightDetails.return
                              .returnTransportMode
                          )}
                          <Text>-------</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                          <Text style={{ fontFamily: "Andika" }}>
                            {plannedDetails.flightDetails.return.to}
                          </Text>
                          <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
                            {
                              plannedDetails.flightDetails.return
                                .returnToCityCode
                            }
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
              </>
            )}
          </Tab>

          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                {/* <Icon name="taxi" type="FontAwesome" style={{ fontSize: 23 }} /> */}
                <Text style={{ fontFamily: "NewYorkl" }}>Hotels</Text>
              </TabHeading>
            }
          >
            {Object.keys(plannedDetails).length === 0 ? (
              <>{planning()}</>
            ) : (
              <>
                {Object.keys(plannedDetails.hotels[0].hotelName).length ===
                0 ? (
                  <>{planning()}</>
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
                                  // alignItems: "center",
                                  borderTopColor: "#f1f2f1",
                                  borderTopWidth: 1,
                                  padding: 15,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 18,
                                    fontFamily: "NewYorkl",
                                  }}
                                >
                                  {i.hotelName} , {i.cityName}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontFamily: "Andika",
                                  }}
                                >
                                  {new Array(parseInt(i.hotelRatings))
                                    .fill("1")
                                    .map((c, i) => {
                                      return (
                                        <FontAwesome
                                          key={i}
                                          name="star"
                                          size={16}
                                          color="#F5BF00"
                                          style={{ paddingRight: 5 }}
                                        />
                                      );
                                    })}{" "}
                                  Hotel
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
                                onSnapToItem={(index) =>
                                  setActivePromoSlide(index)
                                }
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

                              <Surface
                                style={{
                                  width: WIDTH * 0.9,
                                  margin: 10,
                                  // height: HEIGHT / 3.2,
                                  // elevation: 1,
                                  alignItems: "center",
                                  borderRadius: 10,
                                }}
                              >
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
                                    <Text style={{ fontFamily: "Andika" }}>
                                      Check In
                                    </Text>
                                    <Text
                                      style={{
                                        paddingVertical: 20,
                                      }}
                                    >
                                      <Entypo
                                        name="login"
                                        size={24}
                                        color="black"
                                      />
                                    </Text>
                                    <Text style={{ fontFamily: "Andika" }}>
                                      {i.checkIn}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Text>------------</Text>
                                    <FontAwesome
                                      name="calendar"
                                      size={24}
                                      color="black"
                                      style={{ paddingHorizontal: 10 }}
                                    />
                                    <Text>------------</Text>
                                  </View>
                                  <View style={{ alignItems: "center" }}>
                                    <Text style={{ fontFamily: "Andika" }}>
                                      Check Out
                                    </Text>
                                    <Text
                                      style={{
                                        paddingVertical: 20,
                                      }}
                                    >
                                      <FontAwesome
                                        name="sign-out"
                                        size={24}
                                        color="black"
                                      />
                                    </Text>
                                    <Text style={{ fontFamily: "Andika" }}>
                                      {i.checkOut}
                                    </Text>
                                  </View>
                                </View>
                              </Surface>
                              <Surface
                                style={{
                                  width: WIDTH * 0.9,
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
                                ></View>

                                <View
                                  style={{
                                    width: WIDTH * 0.9,
                                    paddingVertical: 20,
                                    // paddingHorizontal: 10,
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
                                      flexBasis: "50%",
                                      paddingRight: 5,
                                    }}
                                  >
                                    <Text>Meal Type</Text>
                                    <MaterialCommunityIcons
                                      name="food-variant"
                                      size={24}
                                      color="black"
                                    />
                                    <Text style={{ textAlign: "center" }}>
                                      {i.mealPlan}
                                    </Text>
                                  </View>

                                  <View
                                    style={{
                                      alignItems: "center",
                                      justifyContent: "space-evenly",
                                      flexBasis: "50%",
                                    }}
                                  >
                                    <Text>Room Type</Text>
                                    <FontAwesome
                                      name="hotel"
                                      size={24}
                                      color="black"
                                    />
                                    <Text style={{ textAlign: "center" }}>
                                      {" "}
                                      {i.roomType}
                                    </Text>
                                  </View>
                                </View>
                              </Surface>
                            </Surface>
                          );
                      })}
                    </View>
                  </ScrollView>
                )}
              </>
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                {/* <Icon name="taxi" type="FontAwesome" style={{ fontSize: 23 }} /> */}
                <Text style={{ fontFamily: "NewYorkl" }}>Taxi</Text>
              </TabHeading>
            }
          >
            {Object.keys(plannedDetails).length === 0 ? (
              <>{planning()}</>
            ) : (
              <>
                {Object.keys(plannedDetails.taxiDetails.taxiName).length ===
                0 ? (
                  <>{planning()}</>
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
                          loop={true}
                          ref={(c) => {
                            carousel = c;
                          }}
                          data={plannedDetails.taxiDetails.taxiPicture}
                          renderItem={_renderPromo}
                          enableSnap={true}
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
                            <MaterialIcons
                              name="today"
                              size={24}
                              color="black"
                            />
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
                            <MaterialIcons
                              name="restore"
                              size={24}
                              color="black"
                            />
                            <Text>
                              {plannedDetails.basicDetails.daysLimit} kms
                            </Text>
                          </View>
                        </View>
                      </Surface>
                      {plannedDetails.basicDetails.termsConditions !== "" && (
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
                              width: WIDTH,
                              justifyContent: "center",
                              padding: 20,
                            }}
                          >
                            <Text style={{ fontFamily: "Andika" }}>
                              {plannedDetails.basicDetails.termsConditions}
                            </Text>
                          </View>
                        </Surface>
                      )}
                    </View>
                  </ScrollView>
                )}
              </>
            )}
          </Tab>
        </Tabs>
      </Container>
    </ScrollView>
  );
};

export default RequestInner;

const styles = new StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    opacity: 0.8,
    justifyContent: "center",
    backgroundColor: "#333",
    height: HEIGHT / 1.7,
    // paddingTop: HEIGHT / 2,
  },
  modalView: {
    // zIndex: 10,
    // margin: 20,
    // position: "relative",
    // backgroundColor: "white",
    // borderRadius: 20,
    // alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: WIDTH,
    //   height: HEIGHT * 2,
    // },
    // shadowOpacity: 100,
    // shadowRadius: 840,
    // elevation: 10,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Andika",
    textAlign: "justify",
  },
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  payNow: {
    textAlign: "center",
    padding: 13,
    marginVertical: 20,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#12CBC4",
  },
  updateCost: {
    textAlign: "center",
    padding: 13,
    marginBottom: 20,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#12CBC4",
  },
  back: {
    textAlign: "center",
    padding: 13,
    marginBottom: 20,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  updateStatus: {
    textAlign: "center",
    padding: 13,
    marginBottom: 20,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  payment: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Avenir",
    marginVertical: 10,
  },
  estimatedBudget: { textAlign: "center", fontSize: 20, marginTop: 10 },
  paymentContainer: {
    height: HEIGHT / 4,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  estimatedBudgetContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  estimatedBudgetInput: {
    width: WIDTH / 3,
    backgroundColor: "white",
    fontSize: 20,
  },
});
