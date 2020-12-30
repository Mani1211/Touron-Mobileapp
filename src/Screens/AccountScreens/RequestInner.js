import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Platform,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as Notifications from "expo-notifications";
import PDFReader from "rn-pdf-reader-js";

import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import { Surface, TextInput } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthContext";
import * as firebase from "firebase";
import * as DocumentPicker from "expo-document-picker";

const RequestInner = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const [plans, setPlans] = useState([]);
  const plan = route.params.planned;
  const road = route.params.road;
  const surprise = route.params.surprise;
  const key = route.params.key;
  const [loaded, setLoaded] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState("");
  const [cost, setCost] = useState(0);
  const [progress, setProgress] = useState(0);
  console.log("key", key);

  // const [uri, setUri] = useState("");
  // const [name, setName] = useState("");
  // const [show, setShow] = useState(false);
  // console.log(uri, "uri");
  // console.log(name, "name");
  // console.log(plans, "plans");

  // const getPlans = () => {
  //   console.log(plan, road, surprise, "data");
  //   if (plan) {
  //     setPlans(plan.plans);
  //   }
  //   if (road) {
  //     setPlans(road.plans);
  //   }
  //   if (surprise) {
  //     setPlans(surprise.plans);
  //   }
  // };

  const getKey = (Id) => {
    let key = "";
    firebase
      .database()
      .ref(`requests`)
      .on("value", (data) => {
        // console.log(data.val(), "data");
        data.forEach((c) => {
          // console.log(c.val(), "p");
          if (c.val().requestID === Id) {
            key = c.key;
          }
        });
      });

    // console.log(key, Id, "use");

    return key;
  };

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

  // const deletePlan = (filename, uid, requestId) => {
  //   console.log(filename, uid, requestId, "delete");
  //   const key = getKey(requestId);
  //   console.log(key, "key");
  //   var deleteFile = firebase
  //     .storage()
  //     .ref(`users/${uid}/docs/plans/${filename}`);
  //   deleteFile
  //     .delete()
  //     .then(function () {
  //       // File deleted successfully
  //       console.log("deletd Succcessfullt");
  //     })
  //     .catch(function (error) {
  //       // Uh-oh, an error occurred!
  //     });

  //   console.log(plans);

  //   const filteredplans = plans.filter((plan) => {
  //     console.log(plan, "plan");
  //     return plan.fileName !== filename;
  //   });

  //   setPlans([...filteredplans]);
  //   firebase
  //     .database()
  //     .ref(`requests`)
  //     .child(key)
  //     .child("plans")
  //     .set(filteredplans);

  //   console.log(filteredplans, "filteref");
  //   console.log(plans, "d");
  // };
  // const _pickImage = async (uid, requestID) => {
  //   console.log(uid, requestID, "uid");
  //   setShow(false);
  //   try {
  //     let result = await DocumentPicker.getDocumentAsync({
  //       copyToCacheDirectory: true,
  //     });

  //     if (!result.cancelled) {
  //       setName(result.name);
  //       const response = await fetch(result.uri);
  //       const blob = await response.blob();
  //       // console.log(blob, "blob");
  //       var uploadTask = firebase
  //         .storage()
  //         .ref(`users/${uid}/docs/plans/${result.name}`)
  //         .put(blob);

  //       uploadTask.on(
  //         "state_changed",
  //         function (snapshot) {
  //           var progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log(
  //             "Upload is " + progress + "% done",
  //             snapshot.bytesTransferred
  //           );
  //           setProgress(progress);
  //           switch (snapshot.state) {
  //             case firebase.storage.TaskState.PAUSED: // or 'paused'
  //               console.log("Upload is paused");
  //               break;
  //             case firebase.storage.TaskState.RUNNING: // or 'running'
  //               console.log("Upload is running");
  //               break;
  //           }
  //         },
  //         function (error) {
  //           console.log(error, "error");
  //         },
  //         function () {
  //           uploadTask.snapshot.ref
  //             .getDownloadURL()
  //             .then(function (downloadURL) {
  //               console.log("File available at", downloadURL);
  //               setUri(downloadURL);
  //               let plan = {
  //                 fileName: result.name,
  //                 uri: downloadURL,
  //               };

  //               // const allplan = [...plans, plan];
  //               // console.log(plans, "p");
  //               // setPlans(plan, ...plans);
  //               // console.log(allplan, "allplan");
  //               // setPlans([allplan]);
  //               // console.log(allplan, "all");

  //               // const key = getKey(requestID);
  //               // console.log(key, "key");
  //               // firebase
  //               //   .database()
  //               //   .ref(`requests`)
  //               //   .child(key)
  //               //   .child("plans")
  //               //   .set(allplan);
  //               // setPlans(allplan);
  //             });
  //         }
  //       );
  //     }
  //   } catch (E) {
  //     console.log(E);
  //   }
  // };

  const getExpoToken = (userId) => {
    let token = "";
    firebase
      .database()
      .ref(`userGeneralInfo/${userId}`)
      .on("value", (data) => {
        if (data.val() !== null) {
          let val = data.val();
          token = val.pushNotificationToken;
        }
      });
    return token;
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

  const sendPushNotification = async (message) => {
    // console.log(message.data, "messag");

    const messages = {
      to: message.to,
      sound: message.sound,
      title: message.title,
      body: message.body,
      data: { data: message.data },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });
  };

  useEffect(() => {
    // getPlans();
    getUserData();
    setTimeout(() => {
      setLoaded(false);
    }, 1500);
  }, []);

  return (
    <ScrollView>
      <View
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
                paddingTop: Platform.OS === "ios" ? 0 : 20,
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
      {plan ? (
        <View>
          <Surface style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Andika", fontSize: 30 }}>
                {plan.tourCategory}
              </Text>
            </View>
            <View style={{ marginHorizontal: WIDTH / 10 }}>
              <Text style={styles.text}>Request Id :{plan.requestID}</Text>
              {isAdmin ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>Status: </Text>
                  <Picker
                    selectedValue={status}
                    style={{ height: 50, width: 200, marginTop: 10 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setStatus(itemValue);
                    }}
                  >
                    <Picker.Item
                      label="Query Received"
                      value="Query Received"
                    />
                    <Picker.Item
                      label="Duplicate Query"
                      value="Duplicate Query"
                    />
                    <Picker.Item label="Estimated" value="Estimated" />
                    <Picker.Item label="On Hold" value="On Hold" />
                    <Picker.Item label="On Progress" value="On Progress" />
                    <Picker.Item label="Plan Shared" value="Plan Shared" />
                    <Picker.Item
                      label="Awaiting Payment"
                      value="Awaiting Payment"
                    />
                    <Picker.Item label="Tour Booked" value="Tour Booked" />
                    <Picker.Item label="Completed" value="Completed" />
                    <Picker.Item label="Cancelled" value="Cancelled" />
                    <Picker.Item
                      label="Cancellation Requested"
                      value="Cancellation Requested"
                    />
                  </Picker>
                </View>
              ) : (
                <Text style={styles.text}>Status: {plan.status}</Text>
              )}
              <Text style={styles.text}>Name: {plan.name}</Text>
              <Text style={styles.text}>Number: {plan.number}</Text>
              <Text style={styles.text}>Budget: {plan.budget}</Text>
              <Text style={styles.text}>Adult: {plan.adult}</Text>
              <Text style={styles.text}>Children : {plan.children}</Text>
              <Text style={styles.text}>From Date: {plan.fromDate}</Text>
              <Text style={styles.text}>To Date: {plan.toDate}</Text>
              <Text style={styles.text}>Destination: {plan.destination}</Text>
              <Text style={styles.text}>Preferance: {plan.preferanece}</Text>
              <Text style={styles.text}>Start Point: {plan.startPoint}</Text>
              <Text style={styles.text}>Tour Type: {plan.tourType}</Text>
              <Text style={styles.text}>Travel Mode: {plan.travelMode}</Text>
              <Text style={styles.text}>
                Traveller Type: {plan.travellerType}
              </Text>
            </View>

            {isAdmin ? (
              <TouchableOpacity
                onPress={() => {
                  console.log("keddy", key);
                  const ref = firebase
                    .database()
                    .ref(`requests`)
                    .child(key)
                    .child("status")
                    .set(status);
                  console.log(ref, "ref");

                  const token = getExpoToken(plan.userID);

                  const message = {
                    to: token,
                    sound: "default",
                    title: `Request Status Changed`,
                    body: `Request Status Changed for your ${plan.tourCategory} of id ${plan.requestID} has been changed to  ${status}`,
                    data: plan,
                  };
                  sendPushNotification(message);

                  navigation.navigate("MyRequest");
                }}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text
                    style={{
                      // backgroundColor: "red",
                      textAlign: "center",
                      padding: 13,
                      marginBottom: 20,
                      fontSize: 20,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 10,
                    }}
                  >
                    Update Status
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("MyRequest")}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text
                    style={{
                      // backgroundColor: "red",
                      textAlign: "center",
                      padding: 13,
                      marginBottom: 20,
                      fontSize: 20,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 10,
                    }}
                  >
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </Surface>

          {plan.tourCost === 0 && !isAdmin ? null : (
            <Surface
              style={{
                height: HEIGHT / 4,
                marginHorizontal: 20,
                marginVertical: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 25,
                    fontFamily: "Avenir",
                    marginVertical: 10,
                  }}
                >
                  Payment
                </Text>
              </View>

              {isAdmin ? (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        marginTop: 10,
                      }}
                    >
                      Estimated Budget:
                    </Text>
                    <TextInput
                      style={{
                        width: WIDTH / 3,
                        backgroundColor: "white",
                        fontSize: 20,
                      }}
                      value={cost.toString()}
                      onChangeText={(value) => setCost(value)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      const ref = firebase
                        .database()
                        .ref(`requests`)
                        .child(key)
                        .child("tourCost")
                        .set(cost);
                      console.log(ref, "ref");

                      const token = getExpoToken(plan.userID);

                      const message = {
                        to: token,
                        sound: "default",
                        title: `Payment Updated`,
                        body: `Final payment for your  ${plan.tourCategory} of id ${plan.requestID} has been updated ,go and check your payment in My Request Section ${cost}`,
                        data: plan,
                      };
                      sendPushNotification(message);

                      navigation.navigate("MyRequest");
                    }}
                  >
                    <View style={{ alignItems: "center", margin: 10 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 13,
                          marginBottom: 20,
                          fontSize: 20,
                          borderWidth: 1,
                          borderColor: "black",
                          borderRadius: 10,
                          backgroundColor: "#12CBC4",
                        }}
                      >
                        Update Cost
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text
                    style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}
                  >
                    Estimated Budget: {plan.tourCost}
                  </Text>
                  <TouchableOpacity>
                    <View style={{ alignItems: "center", margin: 10 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 13,
                          marginVertical: 20,
                          fontSize: 20,
                          borderWidth: 1,
                          borderColor: "black",
                          borderRadius: 10,
                          backgroundColor: "#12CBC4",
                        }}
                      >
                        Pay Now
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Surface>
          )}

          {/* <Surface
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              marginBottom: 50,
            }}
          >
            {isAdmin ? (
              <View>
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      marginVertical: 10,
                      textAlign: "center",
                      fontFamily: "Avenir",
                    }}
                  >
                    Share Plan
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log(plan.plans, "lp");

                      _pickImage(plan.userID, plan.requestID);
                      console.log(plans, "afterPlan");
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        margin: 10,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Andika",
                          paddingHorizontal: 10,
                        }}
                      >
                        Upload Plan
                      </Text>
                      <Entypo name="upload" size={24} color="black" />
                    </View>
                  </TouchableOpacity>
                  {progress == 0 ? null : <Text>{progress} % done</Text>}
                </View>
              </View>
            ) : null}

            <View>
              <Text
                style={{
                  fontSize: 25,
                  marginVertical: 10,
                  textAlign: "center",
                  fontFamily: "Avenir",
                }}
              >
                Shared Plans
              </Text>
            </View>

            <FlatList
              keyExtractor={(item) => item.fileName}
              data={plans}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      // flexDirection: "row",
                      margin: 10,
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        margin: 10,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Andika",
                          paddingHorizontal: 10,
                        }}
                      >
                        {index + 1}.{item.fileName}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setShow(true);
                          setUri(item.uri);
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            margin: 10,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ paddingHorizontal: 20 }}>
                            View Plan
                          </Text>
                          <Entypo name="eye" size={24} color="black" />

                          <AntDesign
                            onPress={() =>
                              deletePlan(
                                item.fileName,
                                plan.userID,
                                plan.requestID
                              )
                            }
                            name="delete"
                            size={24}
                            color="black"
                            style={{ paddingHorizontal: 10 }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
            {show ? (
              <View>
                <PDFReader
                  withPinchZoom={true}
                  onError={(err) => console.log(err, "err")}
                  style={{ height: 500, width: WIDTH - 50 }}
                  // withScroll={true}
                  source={{
                    uri: uri,
                  }}
                />
                <Button title="close" onPress={() => setShow(false)} />
              </View>
            ) : null}
          </Surface> */}
        </View>
      ) : null}
      {road ? (
        <View>
          <Surface style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Andika", fontSize: 30 }}>
                {road.tourCategory}
              </Text>
            </View>
            <View style={{ marginHorizontal: WIDTH / 10 }}>
              <Text style={styles.text}>Request Id :{road.requestID}</Text>
              {isAdmin ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>Status: </Text>
                  <Picker
                    selectedValue={status}
                    style={{ height: 50, width: 200, marginTop: 10 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setStatus(itemValue);
                    }}
                  >
                    <Picker.Item
                      label="Query Received"
                      value="Query Received"
                    />
                    <Picker.Item
                      label="Duplicate Query"
                      value="Duplicate Query"
                    />
                    <Picker.Item label="Estimated" value="Estimated" />
                    <Picker.Item label="On Hold" value="On Hold" />
                    <Picker.Item label="On Progress" value="On Progress" />
                    <Picker.Item label="Plan Shared" value="Plan Shared" />
                    <Picker.Item
                      label="Awaiting Payment"
                      value="Awaiting Payment"
                    />
                    <Picker.Item label="Tour Booked" value="Tour Booked" />
                    <Picker.Item label="Completed" value="Completed" />
                    <Picker.Item label="Cancelled" value="Cancelled" />
                    <Picker.Item
                      label="Cancellation Requested"
                      value="Cancellation Requested"
                    />
                  </Picker>
                </View>
              ) : (
                <Text style={styles.text}>Status: {road.status}</Text>
              )}
              <Text style={styles.text}>Name: {road.name}</Text>
              <Text style={styles.text}>Number: {road.number}</Text>
              <Text style={styles.text}>Budget: {road.budget}</Text>
              <Text style={styles.text}>Adult: {road.adult}</Text>
              <Text style={styles.text}>Children : {road.children}</Text>
              <Text style={styles.text}>From Date: {road.fromDate}</Text>
              <Text style={styles.text}>To Date: {road.toDate}</Text>
              <Text style={styles.text}>Start Point: {road.startPoint}</Text>

              <Text style={styles.text}>Travel Mode: {road.travelMode}</Text>
              <Text style={styles.text}>
                Car Rent: {road.carRent ? "Needed" : "No Need"}
              </Text>
              <Text style={styles.text}>
                Additional Beds: {road.additionalInfo ? "Needed" : "No Need"}
              </Text>
              <Text style={styles.text}>
                Drive Duration: {road.driveDuration}
              </Text>
              <Text style={styles.text}>
                Drive Restriction: {road.driveRestriction}
              </Text>
              <Text style={styles.text}>Drive Type: {road.driveType}</Text>
              <Text style={styles.text}>Driver Type: {road.driverType}</Text>
              <Text style={styles.text}>Stops: {road.stops}</Text>
              <Text style={styles.text}>Travel Mode: {road.travelMode}</Text>
              <Text style={styles.text}>
                Traveller Type: {road.travellerType}
              </Text>
            </View>
            {isAdmin ? (
              <TouchableOpacity
                onPress={() => {
                  const ref = firebase
                    .database()
                    .ref(`requests`)
                    .child(key)
                    .child("status")
                    .set(status);
                  console.log(ref, "ref");
                  const token = getExpoToken(road.userID);

                  const message = {
                    to: token,
                    sound: "default",
                    title: `Request Status Changed`,
                    body: `Request Status Changed for your ${road.tourCategory} of id ${road.requestID} has been changed to  ${status}`,
                    // data: { data: "goes here" },
                    data: road,
                  };
                  sendPushNotification(message);
                  navigation.navigate("MyRequest");
                }}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text
                    style={{
                      // backgroundColor: "red",
                      textAlign: "center",
                      padding: 13,
                      marginBottom: 20,
                      fontSize: 20,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 10,
                    }}
                  >
                    Update Status
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("MyRequest")}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text
                    style={{
                      // backgroundColor: "red",
                      textAlign: "center",
                      padding: 13,
                      marginBottom: 20,
                      fontSize: 20,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 10,
                    }}
                  >
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </Surface>
          {road.tourCost === 0 && !isAdmin ? null : (
            <Surface
              style={{
                height: HEIGHT / 4,
                marginHorizontal: 20,
                marginVertical: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 25,
                    fontFamily: "Avenir",
                    marginVertical: 10,
                  }}
                >
                  Payment
                </Text>
              </View>

              {isAdmin ? (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        marginTop: 10,
                      }}
                    >
                      Estimated Budget:
                    </Text>
                    <TextInput
                      style={{
                        width: WIDTH / 3,
                        backgroundColor: "white",
                        fontSize: 20,
                      }}
                      value={cost}
                      onChangeText={(value) => setCost(value)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      const ref = firebase
                        .database()
                        .ref(`requests`)
                        .child(key)
                        .child("tourCost")
                        .set(cost);
                      console.log(ref, "ref");
                      const token = getExpoToken(road.userID);

                      const message = {
                        to: token,
                        sound: "default",
                        title: `Payment Updated`,
                        body: `Final payment for your  ${road.tourCategory} of id ${road.requestID} has been updated ,go and check your payment in My Request Section ${cost}`,
                        // data: { data: "goes here" },
                        data: road,
                      };
                      sendPushNotification(message);

                      navigation.navigate("MyRequest");
                    }}
                  >
                    <View style={{ alignItems: "center", margin: 10 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 13,
                          marginBottom: 20,
                          fontSize: 20,
                          borderWidth: 1,
                          borderColor: "black",
                          borderRadius: 10,
                          backgroundColor: "#12CBC4",
                        }}
                      >
                        Update Cost
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text
                    style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}
                  >
                    Estimated Budget: {road.tourCost}
                  </Text>
                  <TouchableOpacity>
                    <View style={{ alignItems: "center", margin: 10 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 13,
                          marginVertical: 20,

                          fontSize: 20,
                          borderWidth: 1,
                          borderColor: "black",
                          borderRadius: 10,
                          backgroundColor: "#12CBC4",
                        }}
                      >
                        Pay Now
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Surface>
          )}
        </View>
      ) : null}
      {surprise ? (
        <View>
          <Surface style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontFamily: "Andika", fontSize: 30 }}>
                {surprise.tourCategory}
              </Text>
            </View>

            <View style={{ marginHorizontal: WIDTH / 10 }}>
              <Text style={styles.text}>Request Id :{surprise.requestID}</Text>
              {isAdmin ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.text}>Status: </Text>
                  <Picker
                    selectedValue={surprise.status}
                    style={{ height: 50, width: 200, marginTop: 10 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setStatus(itemValue);
                    }}
                  >
                    <Picker.Item
                      label="Query Received"
                      value="Query Received"
                    />
                    <Picker.Item
                      label="Duplicate Query"
                      value="Duplicate Query"
                    />
                    <Picker.Item label="Estimated" value="Estimated" />
                    <Picker.Item label="On Hold" value="On Hold" />
                    <Picker.Item label="On Progress" value="On Progress" />
                    <Picker.Item label="Plan Shared" value="Plan Shared" />
                    <Picker.Item
                      label="Awaiting Payment"
                      value="Awaiting Payment"
                    />
                    <Picker.Item label="Tour Booked" value="Tour Booked" />
                    <Picker.Item label="Completed" value="Completed" />
                    <Picker.Item label="Cancelled" value="Cancelled" />
                    <Picker.Item
                      label="Cancellation Requested"
                      value="Cancellation Requested"
                    />
                  </Picker>
                </View>
              ) : (
                <Text style={styles.text}>Status: {surprise.status}</Text>
              )}
              <Text style={styles.text}>Name: {surprise.name}</Text>
              <Text style={styles.text}>Number: {surprise.number}</Text>
              <Text style={styles.text}>Budget: {surprise.budget}</Text>
              <Text style={styles.text}>Adult: {surprise.adult}</Text>
              <Text style={styles.text}>Children : {surprise.children}</Text>
              <Text style={styles.text}>From Date: {surprise.fromDate}</Text>
              <Text style={styles.text}>To Date: {surprise.toDate}</Text>
              <Text style={styles.text}>
                Expediture1: {surprise.expediture1}
              </Text>
              <Text style={styles.text}>
                Expediture1: {surprise.expediture2}
              </Text>
              <Text style={styles.text}>
                Expediture1: {surprise.expediture3}
              </Text>
              <Text style={styles.text}>
                Start Point: {surprise.startPoint}
              </Text>
              <Text style={styles.text}>
                Preferance: {surprise.tourPreferance}
              </Text>
              <Text style={styles.text}>Tour Type: {surprise.tourType}</Text>
              <Text style={styles.text}>
                Travel Mode: {surprise.travelMode}
              </Text>
              <Text style={styles.text}>
                Traveller Type: {surprise.travellerType}
              </Text>
            </View>
            {isAdmin ? (
              <TouchableOpacity
                onPress={() => {
                  const ref = firebase
                    .database()
                    .ref(`requests`)
                    .child(key)
                    .child("status")
                    .set(status);
                  console.log(ref, "ref");

                  const token = getExpoToken(surprise.userID);

                  const message = {
                    to: token,
                    sound: "default",
                    title: `Request Status Changed`,
                    body: `Request Status Changed for your ${surprise.tourCategory} of id ${surprise.requestID} has been changed to  ${status}`,
                    // data: { data: "goes here" },
                    data: surprise,
                  };
                  sendPushNotification(message);
                  navigation.navigate("MyRequest");
                }}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text
                    style={{
                      // backgroundColor: "red",
                      textAlign: "center",
                      padding: 13,
                      marginBottom: 20,
                      fontSize: 20,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 10,
                    }}
                  >
                    Update Status
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate("MyRequest")}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text
                    style={{
                      // backgroundColor: "red",
                      textAlign: "center",
                      padding: 13,
                      marginBottom: 20,
                      fontSize: 20,
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 10,
                    }}
                  >
                    Back
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </Surface>
          {surprise.tourCost === 0 && !isAdmin ? null : (
            <Surface
              style={{
                height: HEIGHT / 4,
                marginHorizontal: 20,
                marginVertical: 10,
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 25,
                    fontFamily: "Avenir",
                    marginVertical: 10,
                  }}
                >
                  Payment
                </Text>
              </View>

              {isAdmin ? (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        marginTop: 10,
                      }}
                    >
                      Estimated Budget:
                    </Text>
                    <TextInput
                      style={{
                        width: WIDTH / 3,
                        backgroundColor: "white",
                        fontSize: 20,
                      }}
                      value={cost}
                      onChangeText={(value) => setCost(value)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      const ref = firebase
                        .database()
                        .ref(`requests`)
                        .child(key)
                        .child("tourCost")
                        .set(cost);
                      console.log(ref, "ref");

                      const token = getExpoToken(surprise.userID);

                      const message = {
                        to: token,
                        sound: "default",
                        title: `Payment Updated`,
                        body: `Final payment for your  ${surprise.tourCategory} of id ${surprise.requestID} has been updated ,go and check your payment in My Request Section ${cost}`,
                        // data: { data: "goes here" },
                        data: surprise,
                      };
                      sendPushNotification(message);

                      navigation.navigate("MyRequest");
                    }}
                  >
                    <View style={{ alignItems: "center", margin: 10 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 13,
                          marginBottom: 20,
                          fontSize: 20,
                          borderWidth: 1,
                          borderColor: "black",
                          borderRadius: 10,
                          backgroundColor: "#12CBC4",
                        }}
                      >
                        Update Cost
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text
                    style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}
                  >
                    Estimated Budget: {surprise.tourCost}
                  </Text>
                  <TouchableOpacity>
                    <View style={{ alignItems: "center", margin: 10 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          padding: 13,
                          marginVertical: 20,

                          fontSize: 20,
                          borderWidth: 1,
                          borderColor: "black",
                          borderRadius: 10,
                          backgroundColor: "#12CBC4",
                        }}
                      >
                        Pay Now
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Surface>
          )}
        </View>
      ) : null}
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
});
