import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as Notifications from "expo-notifications";
import { Surface } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import * as firebase from "firebase";
// import DropDownPicker from "react-native-dropdown-picker";
import { Container, Header, Tab, Tabs, Icon, TabHeading } from "native-base";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
// import {
//   getExpoToken,
//   sendPushNotification,
// } from "./../CategoryScreens/utils/PushNotification";

const RequestInner = ({ navigation, route }) => {
  const [visible, setVisible] = React.useState(false);
  const item = route.params.item;
  const [activePromoSlide, setActivePromoSlide] = useState(0);

  const [plannedDetails, setPlannedDetails] = useState({});
  // const onToggleSnackBar = () => setVisible(!visible);
  // const onDismissSnackBar = () => setVisible(false);
  const { user } = useContext(AuthContext);

  const higher = route.params.higher;
  const key = route.params.key;
  const [loaded, setLoaded] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState("");
  const [cost, setCost] = useState(0);
  const [progress, setProgress] = useState(0);

  const getUserData = () => {
    if (user !== null) {
      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          if (data.val() !== null) {
            let val = data.val();
            setIsAdmin(val.admin);
          }
        });
    }
  };

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data.data;
        handleNotification(data);
      }
    );
    return () => subscription.remove();
  }, [navigation]);

  const handleNotification = (item) => {
    navigation.navigate("RequestInner", {
      planned: item.tourCategory === "Planned Tour" ? item : null,
      road: item.tourCategory === "Road Trip" ? item : null,
      surprise: item.tourCategory === "Surprise Tour" ? item : null,
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

  useEffect(() => {
    getUserData();
    setTimeout(() => {
      setLoaded(false);
    }, 1500);
  }, []);

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

  // const updateStatus = (plan) => {
  //   firebase.database().ref(`requests`).child(key).child("status").set(status);

  //   const token = getExpoToken(plan.userID);

  //   const message = {
  //     to: token,
  //     sound: "default",
  //     title: `Request Status Changed`,
  //     body: `Request Status Changed for your ${plan.tourCategory} of id ${plan.requestID} has been changed to  ${status}`,
  //     data: plan,
  //   };
  //   sendPushNotification(message);

  //   navigation.navigate("MyRequest");
  // };

  // const deleteRequest = () => {
  //   console.log("key", key);
  //   firebase
  //     .database()
  //     .ref(`requests`)
  //     .child(key)
  //     .set(null)
  //     .then(() => {
  //       console.log("success :>> ");
  //       navigation.navigate("MyRequest");
  //     })
  //     .catch((err) => console.log("err :>> ", err));
  // };

  // const updateCost = (plan) => {
  //   const ref = firebase
  //     .database()
  //     .ref(`requests`)
  //     .child(key)
  //     .child("tourCost")
  //     .set(cost);
  //   console.log(ref, "ref");

  //   const token = getExpoToken(plan.userID);

  //   const message = {
  //     to: token,
  //     sound: "default",
  //     title: `Payment Updated`,
  //     body: `Final payment for your  ${plan.tourCategory} of id ${plan.requestID} has been updated ,go and check your payment in My Request Section ${cost}`,
  //     data: plan,
  //   };
  //   sendPushNotification(message);

  //   navigation.navigate("MyRequest");
  // };

  const queryStatus = [
    {
      label: "Query Received",
      value: "Query Received",
    },
    {
      label: "Plan Shared",
      value: "Plan Shared",
    },
    {
      label: "On Progress",
      value: "On Progress",
    },
    {
      label: "Cancelled",
      value: "Cancelled",
    },
    {
      label: "On Hold",
      value: "On Hold",
    },
    {
      label: "Duplicate Query",
      value: "Duplicate Query",
    },
    {
      label: "Tour Booked",
      value: "Tour Booked",
    },
    {
      label: "Awaiting Payment",
      value: "Awaiting Payment",
    },
    {
      label: "Cancellation Requested",
      value: "Cancellation Requested",
    },
    {
      label: "Estimated",
      value: "Estimated",
    },
    {
      label: "Completed",
      value: "Completed",
    },
  ];

  return (
    <ScrollView>
      <Container>
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
                    color: "#333",
                    marginRight: 10,
                    padding: 10,
                    borderRadius: 10,
                    fontSize: 16,
                    fontFamily: "NewYorkl",
                    backgroundColor: "#ffeaa7",
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
                        Adults : {item.adult}
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
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Andika",
                          color: "#333",
                          paddingVertical: 10,
                          paddingHorizontal: 9,
                          backgroundColor: "#f1f2f1",
                          borderRadius: 5,
                          borderColor: "#333",
                          marginRight: 20,
                        }}
                      >
                        Onward : {item.fromData}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Andika",
                          color: "#333",
                          paddingVertical: 10,
                          paddingHorizontal: 9,
                          backgroundColor: "#f1f2f1",
                          borderRadius: 5,
                          borderColor: "#333",
                        }}
                      >
                        Return : {item.toData}
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
                        {item.phoneNumber}
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
                      <Text> {item.travellerType}</Text>
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

                {/* <Surface
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
                </Surface> */}
                {/* {item.tourType === "Domestic" ? (
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
                )} */}
              </View>
            </ScrollView>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                {/* <Icon name="taxi" type="FontAwesome" style={{ fontSize: 23 }} /> */}
                <Text style={{ fontFamily: "NewYorkl" }}>Transport</Text>
              </TabHeading>
            }
          >
            {Object.keys(plannedDetails).length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 30,
                  // height: HEIGHT / 1.2,
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
                  You better get packing now, 'cause our experts have already
                  started working their magic into your plan!"{" "}
                </Text>
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
                        fontFamily: "NewYorkl",
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
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.onward.from}
                      </Text>
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
                      {renderIcon(
                        plannedDetails.flightDetails.onward.onwardTransportMode
                      )}

                      <Text>------------</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.onward.to}
                      </Text>
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
                        fontFamily: "NewYorkl",
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
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.return.from}
                      </Text>
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
                      {renderIcon(
                        plannedDetails.flightDetails.return.returnTransportMode
                      )}
                      <Text>------------</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontFamily: "Andika" }}>
                        {plannedDetails.flightDetails.return.to}
                      </Text>
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
                {/* <Icon name="taxi" type="FontAwesome" style={{ fontSize: 23 }} /> */}
                <Text style={{ fontFamily: "NewYorkl" }}>Hotels</Text>
              </TabHeading>
            }
          >
            {Object.keys(plannedDetails).length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 30,
                  // height: HEIGHT / 1.2,
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
                  You better get packing now, 'cause our experts have already
                  started working their magic into your plan!"{" "}
                </Text>
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
                <Text style={{ fontFamily: "NewYorkl" }}>Taxi</Text>
              </TabHeading>
            }
          >
            {Object.keys(plannedDetails).length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 30,
                  // height: HEIGHT / 1.2,
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
                  You better get packing now, 'cause our experts have already
                  started working their magic into your plan!"{" "}
                </Text>
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
      {/* <View
        style={{
          backgroundColor: "#28C9E1",
          height: HEIGHT / 8,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ flex: 0.2 }}>
            <Feather
              name="arrow-left"
              size={28}
              color="black"
              style={{
                paddingHorizontal: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 0.8,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 15,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>My Requests</Text>
        </View>
      </View>
   

      {higher ? (
        <View>
          <Surface style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Andika", fontSize: 30 }}>
                {higher.tourCategory}
              </Text>
            </View>

            <View style={{ marginHorizontal: WIDTH / 10 }}>
              <Text style={styles.text}>Request Id :{higher.requestID}</Text>
              {isAdmin ? (
                <View style={styles.statusContainer}>
                  <Text style={styles.text}>Status: </Text>
                  <DropDownPicker
                    items={queryStatus}
                    defaultValue={higher.status}
                    containerStyle={{ height: 40, width: WIDTH / 1.7 }}
                    itemStyle={{
                      justifyContent: "flex-start",
                    }}
                    dropDownStyle={{
                      backgroundColor: "#fafafa",
                    }}
                    dropDownMaxHeight={400}
                    onChangeItem={(item) => {
                      setStatus(item.value);
                    }}
                  />
                </View>
              ) : (
                <Text style={styles.text}>Status: {higher.status}</Text>
              )}
              <Text style={styles.text}>Name: {higher.name}</Text>
              <Text style={styles.text}>Number: {higher.number}</Text>
              <Text style={styles.text}>Budget: {higher.budget}</Text>
              <Text style={styles.text}>Adult: {higher.adult}</Text>
              <Text style={styles.text}>Children : {higher.children}</Text>
              <Text style={styles.text}>From Date: {higher.fromDate}</Text>
              <Text style={styles.text}>To Date: {higher.toDate}</Text>
              <Text style={styles.text}>Start Point: {higher.startPoint}</Text>
              <Text style={styles.text}>Destination: {higher.destination}</Text>
              <Text style={styles.text}>Tour Type: {higher.tourType}</Text>
              <Text style={styles.text}>Travel Mode: {higher.travelMode}</Text>
              <Text style={styles.text}>
                Traveller Type: {higher.travellerType}
              </Text>
              <Text style={styles.text}>
                National Park: {higher.nationalPark}
              </Text>
            </View>
            {isAdmin ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    updateStatus(higher);
                  }}
                >
                  <View style={{ alignItems: "center", margin: 10 }}>
                    <Text style={styles.updateStatus}>Update Status</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteRequest();
                    console.log("pressed");
                  }}
                >
                  <View style={{ alignItems: "center", margin: 10 }}>
                    <Text style={styles.updateStatus}>Delete Status</Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("MyRequest")}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text style={styles.back}>Back</Text>
                </View>
              </TouchableOpacity>
            )}
          </Surface>
          {higher.tourCost === 0 && !isAdmin ? null : (
            <Surface style={styles.paymentContainer}>
              <View>
                <Text style={styles.payment}>Payment</Text>
              </View>

              {isAdmin ? (
                <View>
                  <View style={styles.estimatedBudgetContainer}>
                    <Text style={styles.estimatedBudget}>
                      Estimated Budget:
                    </Text>
                    <TextInput
                      style={styles.estimatedBudgetInput}
                      value={cost}
                      onChangeText={(value) => setCost(value)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      updateCost(higher);
                    }}
                  >
                    <View style={{ alignItems: "center", margin: 10 }}>
                      <Text style={styles.updateCost}>Update Cost</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={styles.estimatedBudget}>
                    Estimated Budget: {higher.tourCost}
                  </Text>
                  <TouchableOpacity>
                    <View style={{ alignItems: "center", margin: 10 }}>
                      <Text style={styles.payNow}>Pay Now</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Surface>
          )}
        </View>
      ) : null} */}
    </ScrollView>
  );
};

export default RequestInner;

const styles = new StyleSheet.create({
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
