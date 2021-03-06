import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { database, auth } from "firebase";
const HEIGHT = Dimensions.get("window").height;

import { useIsFocused } from "@react-navigation/native";
const MyRequestScreen = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);
  const isFocused = useIsFocused();
  const [planned, setPlanned] = useState([]);
  const [surprise, setSurprise] = useState([]);
  const [road, setRoad] = useState([]);
  const [luxury, setLuxury] = useState([]);
  const [honeymoon, setHoneymoon] = useState([]);
  const [wildlife, setWildlife] = useState([]);
  const [requests, setRequests] = useState([]);
  const [step, setStep] = useState(1);

  const tourCategories = [
    {
      name: "Planned Tour",
      data: planned,
      image:
        "https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Surprise Tour",
      data: surprise,
      image:
        "https://images.pexels.com/photos/4254562/pexels-photo-4254562.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Road Trip",
      data: road,
      image:
        "https://images.pexels.com/photos/3593923/pexels-photo-3593923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Luxury Tour",
      data: luxury,
      image:
        "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Honeymoon Trip",
      data: honeymoon,
      image:
        "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Wildlife",
      data: wildlife,
      image:
        "https://www.udaipurblog.com/wp-content/uploads/2018/04/travel-triangle.jpg",
    },
  ];

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getUserRequests = () => {
        const uid = auth().currentUser.uid;
        setLoaded(true);
        database()
          .ref(`requests`)
          .on("value", (data) => {
            if (data) {
              let sT = [];
              data.forEach((c) => {
                if (c.val().userID == uid) {
                  if (c.val().tourCategory === "Planned Tour") {
                    sT.push(c.val());
                  }
                }
              });
              setPlanned(sT.reverse());
            }
            setLoaded(false);
          });
        database()
          .ref(`requests`)
          .on("value", (data) => {
            if (data) {
              let sT = [];
              data.forEach((c) => {
                if (c.val().userID == uid) {
                  if (c.val().tourCategory === "Surprise Tour") {
                    sT.push(c.val());
                  }
                }
              });
              setSurprise(sT.reverse());
            }
          });
        database()
          .ref(`requests`)
          .on("value", (data) => {
            if (data) {
              let sT = [];
              data.forEach((c) => {
                if (c.val().userID == uid) {
                  if (c.val().tourCategory === "Road Trip") {
                    sT.push(c.val());
                  }
                }
              });
              setRoad(sT.reverse());
            }
          });
        database()
          .ref(`requests`)
          .on("value", (data) => {
            if (data) {
              let sT = [];
              data.forEach((c) => {
                if (c.val().userID == uid) {
                  if (c.val().tourCategory === "Luxury Tour") {
                    sT.push(c.val());
                  }
                }
              });
              setLuxury(sT.reverse());
            }
          });
        database()
          .ref(`requests`)
          .on("value", (data) => {
            if (data) {
              let sT = [];
              data.forEach((c) => {
                if (c.val().userID == uid) {
                  if (c.val().tourCategory === "Honeymoon Trip") {
                    sT.push(c.val());
                  }
                }
              });
              setHoneymoon(sT.reverse());
            }
          });
        database()
          .ref(`requests`)
          .on("value", (data) => {
            if (data) {
              let sT = [];
              data.forEach((c) => {
                if (c.val().userID == uid) {
                  if (c.val().tourCategory === "Wildlife") {
                    sT.push(c.val());
                  }
                }
              });
              setWildlife(sT.reverse());
            }
          });
      };
      getUserRequests();
      return () => (mounted = false);
    }
  }, [isFocused]);

  const renderData = () => {
    switch (step) {
      case 1: {
        return (
          <View>
            <View>
              <StatusBar backgroundColor="#fff" />
              <View
                style={{
                  backgroundColor: "#fff",
                  paddingTop: Platform.OS === "ios" ? 80 : 40,
                  paddingBottom: Platform.OS === "ios" ? 20 : 20,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                  <View style={{ flex: 0.2, height: 30 }}>
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
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 25,
                      fontFamily: "NewYorkl",
                    }}
                  >
                    My Requests
                  </Text>
                </View>
              </View>
              {tourCategories.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (item.data.length > 0) {
                        setStep(2);
                        setRequests(item.data);
                      }
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 20,
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        alignItems: "center",
                        borderBottomColor: "#f2f2f2",
                        borderBottomWidth: 4,
                        paddingBottom: 20,
                      }}
                    >
                      <View style={{ flex: 0.3 }}>
                        <Image
                          style={{ width: 60, height: 60, borderRadius: 30 }}
                          source={{ uri: item.image }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 0.6,
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          paddingRight: 40,
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontFamily: "Andika", fontSize: 20 }}>
                          {item.data.length}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      }

      case 2: {
        return (
          <View>
            <StatusBar backgroundColor="#fff" />
            <View
              style={{
                backgroundColor: "#fff",
                alignItems: "center",
                flexDirection: "row",
                paddingVertical: 40,
              }}
            >
              <TouchableOpacity onPress={() => setStep(1)}>
                <View style={{ flex: 0.2, height: 30 }}>
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
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: "NewYorkl",
                  }}
                >
                  {requests[0].tourCategory}
                </Text>
              </View>
            </View>
            {requests.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("RequestInner", {
                      item: item,
                    });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      borderBottomColor: "#fff",
                      borderTopColor: "#fff",
                      borderBottomWidth: 4,
                      paddingVertical: 10,
                      backgroundColor: "#f1f2f1",
                      marginHorizontal: 25,
                      paddingHorizontal: 10,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        paddingHorizontal: 20,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18, fontFamily: "NewYorkl" }}>
                        {item.destination}
                      </Text>
                      <Text style={{ fontSize: 15, fontFamily: "Andika" }}>
                        Status : {item.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "#FFF", flex: 1 }}>
      {loaded ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: HEIGHT,
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>{renderData()}</>
      )}
    </ScrollView>
  );
};

export default MyRequestScreen;
