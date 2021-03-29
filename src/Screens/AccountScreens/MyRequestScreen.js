import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";

// import { AuthContext } from "../../context/AuthContext";
// import { DataTable } from "react-native-paper";
// import { Avatar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
// const WIDTH = Dimensions.get("window").width;
// const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";

import { useIsFocused } from "@react-navigation/native";
const MyRequestScreen = ({ navigation }) => {
  const [loaded, setLoaded] = useState(false);

  const isFocused = useIsFocused();
  // const [isAdmin, setIsAdmin] = useState(false);
  // const { user } = useContext(AuthContext);
  // console.log(`user`, user);
  // const [allRequest, setAllRequest] = useState([]);
  // const [status, setStatus] = useState("");
  // const [category, setCategory] = useState("");
  // const itemsPerPage = 5;
  // const [page, setPage] = useState(0);
  // const [userRequest, setUserRequest] = useState([]);
  // const from = page * itemsPerPage;
  // const to = (page + 1) * itemsPerPage;
  const [planned, setPlanned] = useState([]);
  const [surprise, setSurprise] = useState([]);
  const [road, setRoad] = useState([]);
  const [luxury, setLuxury] = useState([]);
  const [honeymoon, setHoneymoon] = useState([]);
  const [wildlife, setWildlife] = useState([]);
  const [requests, setRequests] = useState([]);
  const [step, setStep] = useState(1);

  // const getUserData = () => {
  //   if (user !== null) {
  //     firebase
  //       .database()
  //       .ref(`userGeneralInfo/${user.uid}`)
  //       .on("value", (data) => {
  //         if (data.val() !== null) {
  //           let val = data.val();
  //           setIsAdmin(val.admin);
  //         }
  //       });
  //   }
  // };

  // const getAllRequest = () => {
  //   firebase
  //     .database()
  //     .ref(`requests`)
  //     .on("value", (data) => {
  //       let newReq = {};
  //       if (data !== null && data !== undefined) {
  //         let revReq = Object.keys(data.val()).reverse();
  //         revReq.forEach((i) => {
  //           newReq[i] = data.val()[i];
  //         });
  //         setAllRequest({
  //           ...newReq,
  //         });
  //       }
  //       setLoaded(false);
  //     });
  // };

  const tourCategories = [
    {
      name: "Planned Tour",
      data: planned,
      image: require("../../../assets/Categories/Plannedtour.jpg"),
    },
    {
      name: "Surprise Tour",
      data: surprise,
      image: require("../../../assets/Categories/Surprise.jpg"),
    },
    {
      name: "Road Trip",
      data: road,
      image: require("../../../assets/Categories/Roadtrip.jpg"),
    },
    {
      name: "Luxury Tour",
      data: luxury,
      image: require("../../../assets/Categories/luxury.jpg"),
    },
    {
      name: "Honeymoon Trip",
      data: honeymoon,
      image: require("../../../assets/Categories/Honeymoon.jpg"),
    },
    {
      name: "Wildlife",
      data: wildlife,
      image: require("../../../assets/Categories/Surprise.jpg"),
    },
  ];

  // const filterDataByType = () => {
  //   if (status !== "") {
  //     let rs = {};
  //     const tour = Object.keys(allRequest).map((r) => {
  //       if (allRequest[r].status === status) {
  //         rs[r] = allRequest[r];
  //       }
  //     });
  //     return rs;
  //   } else if (category !== "") {
  //     let rs = {};
  //     const tour = Object.keys(allRequest).map((r) => {
  //       if (allRequest[r].tourCategory === category) {
  //         rs[r] = allRequest[r];
  //       }
  //     });
  //     return rs;
  //   } else {
  //     return allRequest;
  //   }
  // };
  // useEffect(() => {
  //   getUserData();
  //   setCategory("");
  //   setStatus("");
  // }, []);

  useEffect(() => {
    console.log("called");
    const getUserRequests = () => {
      const uid = firebase.auth().currentUser.uid;
      console.log(`uhhhhhid`, uid);

      setLoaded(true);
      firebase
        .database()
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
      firebase
        .database()
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
      firebase
        .database()
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
      firebase
        .database()
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
      firebase
        .database()
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
      firebase
        .database()
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
  }, [isFocused]);

  // useEffect(() => getAllRequest(), []);

  // const colors = [
  //   {
  //     name: "Query Received",
  //     color: "#f39c12",
  //   },
  //   {
  //     name: "Plan Shared",
  //     color: "#7f8c8d",
  //   },
  //   {
  //     name: "On Progress",
  //     color: "#8e44ad",
  //   },
  //   {
  //     name: "Cancelled",
  //     color: "red",
  //   },
  //   {
  //     name: "On Hold",
  //     color: "#3498db",
  //   },
  //   {
  //     name: "Duplicate Query",
  //     color: "#fbc531",
  //   },
  //   {
  //     name: "Tour Booked",
  //     color: "#2d3436",
  //   },
  //   {
  //     name: "Awaiting Payment",
  //     color: "#00cec9",
  //   },
  //   {
  //     name: "Cancellation Requested",
  //     color: "#d63031",
  //   },
  //   {
  //     name: "Estimated",
  //     color: "#2d3436",
  //   },
  //   {
  //     name: "Completed",
  //     color: "#55efc4",
  //   },
  // ];

  // const queryStatus = [
  //   {
  //     label: "All",
  //     value: "",
  //   },
  //   {
  //     label: "Query Received",
  //     value: "Query Received",
  //   },
  //   {
  //     label: "Plan Shared",
  //     value: "Plan Shared",
  //   },
  //   {
  //     label: "On Progress",
  //     value: "On Progress",
  //   },
  //   {
  //     label: "Cancelled",
  //     value: "Cancelled",
  //   },
  //   {
  //     label: "On Hold",
  //     value: "On Hold",
  //   },
  //   {
  //     label: "Duplicate Query",
  //     value: "Duplicate Query",
  //   },
  //   {
  //     label: "Tour Booked",
  //     value: "Tour Booked",
  //   },
  //   {
  //     label: "Awaiting Payment",
  //     value: "Awaiting Payment",
  //   },
  //   {
  //     label: "Cancellation Requested",
  //     value: "Cancellation Requested",
  //   },
  //   {
  //     label: "Estimated",
  //     value: "Estimated",
  //   },
  //   {
  //     label: "Completed",
  //     value: "Completed",
  //   },
  // ];

  // const getColor = (status) => {
  //   let color = "";
  //   colors.filter((c) => {
  //     if (c.name === status) color = c.color;
  //   });
  //   return color;
  // };

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
                  paddingVertical: 40,
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
                          source={item.image}
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
                      // borderWidth: 5,
                      // borderColor:
                      //   "rgb(" +
                      //   Math.floor(Math.random() * 256) +
                      //   "," +
                      //   Math.floor(Math.random() * 256) +
                      //   "," +
                      //   Math.floor(Math.random() * 256) +
                      //   ")",
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
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      {loaded ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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

{
  /* {userRequest.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Image
                  style={{
                    height: HEIGHT / 2,
                    width: WIDTH * 0.7,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  source={require("../../../assets/myrequest.png")}
                />
                <Text
                  style={{
                    fontFamily: "Avenir",
                    fontSize: 20,
                    marginTop: -WIDTH / 10,
                  }}
                >
                  No Requests Yet
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontFamily: "WSansl",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  Go to Home and start planning
                </Text>
              </View>
            ) : (
              <View>
                <View>
                  {userRequest.map((item, index) => {
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("RequestInner", {
                              planned:
                                item.tourCategory === "Planned Tour"
                                  ? item
                                  : null,
                              road:
                                item.tourCategory === "Road Trip" ? item : null,
                              surprise:
                                item.tourCategory === "Surprise Tour"
                                  ? item
                                  : null,
                              higher:
                                item.tourCategory === "Honeymoon Trip" ||
                                "Luxury Tour"
                                  ? item
                                  : null,
                            })
                          }
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 20,
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ flex: 0.3 }}>
                              <Avatar.Text
                                label="P"
                                style={{
                                  backgroundColor: "#DBE8EB",
                                  marginLeft: 20,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                flex: 0.7,
                                justifyContent: "center",
                              }}
                            >
                              <Text style={{ fontSize: 20 }}>
                                {item.tourCategory}
                              </Text>
                              <Text style={{ fontSize: 14 }}>
                                Status: {item.status}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
            )} */
}
{
  /* {isAdmin ? (
    <View>
    <StatusBar
    barStyle="dark-content"
    backgroundColor="#FFF"
    
    />
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View>
                <Feather
                name="arrow-left"
                size={28}
                color="black"
                style={{
                  paddingHorizontal: 20,
                  paddingTop: Platform.OS === "ios" ? HEIGHT / 12 : 20,
                }}
                  />
                  </View>
                  </TouchableOpacity>
                  <View
                  style={{
                    alignItems: "center",
                    marginHorizontal: 30,
                    marginVertical: 30,
                  }}
                  >
                  <Image
                  style={{
                    height: HEIGHT / 5,
                    width: HEIGHT / 5,
                    marginTop: 10,
                  }}
                  source={require("../../../assets/playstore.png")}
                  />
                  <Text
                  style={{ marginTop: 20, fontSize: 16, fontFamily: "Avenir" }}
                  >
                  Admin : {user.email}
                  </Text>
                  <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                  >
                  <Text
                  style={{
                      fontSize: 16,
                      fontFamily: "Avenir",
                    }}
                    >
                    Status :
                    </Text>
                    <FontAwesome
                    name="circle"
                    size={20}
                    color="#7bed9f"
                    style={{
                      marginLeft: WIDTH / 10,
                    }}
                    />
                    <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Avenir",
                      marginHorizontal: 10,
                    }}
                    >
                    Online
                    </Text>
                    </View>
                    </View>
              <View
              style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 20,
                }}
                >
                <Text style={{ fontSize: 20, marginHorizontal: 20 }}>
                Filter :
                </Text>
                <DropDownPicker
                items={[
                  { label: "All", value: "" },
                  { label: "Planned Tour", value: "Planned Tour" },
                  { label: "Road Trip", value: "Road Trip" },
                  { label: "Surprise Tour", value: "Surprise Tour" },
                ]}
                defaultValue={category}
                containerStyle={{
                  height: 40,
                  width: WIDTH / 3,
                  marginRight: 10,
                }}
                // style={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                // dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => {
                  setCategory(item.value);
                  setStatus("");
                  filterDataByType();
                }}
                />
                <DropDownPicker
                items={queryStatus}
                defaultValue={status}
                containerStyle={{ height: 40, width: WIDTH / 3 }}
                // style={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                // dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) => {
                  setStatus(item.value);
                  setCategory("");
                  filterDataByType();
                }}
                />
                </View>
                <DataTable>
                <DataTable.Header>
                <DataTable.Title>Request Id</DataTable.Title>
                <DataTable.Title numeric>Tour Category</DataTable.Title>
                <DataTable.Title numeric>Request Status</DataTable.Title>
                </DataTable.Header>
                
                {Object.keys(filterDataByType()).map((item, index) => {
                  return (
                    <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("RequestInner", {
                        higher: allRequest[item],
                        // planned:
                        //   allRequest[item].tourCategory === "Planned Tour"
                        //     ? allRequest[item]
                        //     : null,
                        // road:
                        //   allRequest[item].tourCategory === "Road Trip"
                        //     ? allRequest[item]
                        //     : null,
                        // surprise:
                        //   allRequest[item].tourCategory === "Surprise Tour"
                        //     ? allRequest[item]
                        //     : null,
                        // higher:
                        //   allRequest[item].tourCategory ===
                        //     "Honeymoon Trip" ||
                        //   "Luxury Tour" ||
                        //   'Wildlife"'
                        //     ? allRequest[item]
                        //     : null,
                        key: item,
                      });
                      }}
                      >
                      <DataTable.Row>
                      <DataTable.Cell>
                      {allRequest[item].requestID}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                      {allRequest[item].tourCategory}
                      </DataTable.Cell>
                      <DataTable.Cell numeric style={{ padding: 10 }}>
                      <Text
                      style={{
                        color: `${getColor(allRequest[item].status)}`,
                        margin: 5,
                        borderRadius: 50,
                        fontSize: 15,
                              fontFamily: "Andika",
                              padding: 10,
                            }}
                            >
                            {allRequest[item].status}
                            </Text>
                            </DataTable.Cell>
                      </DataTable.Row>
                      </TouchableOpacity>
                      );
                })}

                <DataTable.Pagination
                page={page}
                numberOfPages={Math.floor(allRequest.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                // label={`${from + 1}-${to} of ${allRequest.length}`}
                />
              </DataTable>
              </View> */
  {
    /* )} */
  }
}
// ) : (
