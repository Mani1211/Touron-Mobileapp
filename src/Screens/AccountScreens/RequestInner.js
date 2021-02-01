import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as Notifications from "expo-notifications";
import { Feather } from "@expo/vector-icons";
import { Surface } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import * as firebase from "firebase";
import DropDownPicker from "react-native-dropdown-picker";
import { Snackbar } from "react-native-paper";

import {
  getExpoToken,
  sendPushNotification,
} from "./../CategoryScreens/utils/PushNotification";

const RequestInner = ({ navigation, route }) => {
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  const { user } = useContext(AuthContext);
  // const plan = route.params.planned;
  // const road = route.params.road;
  // const surprise = route.params.surprise;
  const higher = route.params.higher;
  const key = route.params.key;
  const [loaded, setLoaded] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState("");
  const [cost, setCost] = useState(0);
  const [progress, setProgress] = useState(0);
  console.log("key", key);
  console.log("higher", higher);

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

  useEffect(() => {
    getUserData();
    setTimeout(() => {
      setLoaded(false);
    }, 1500);
  }, []);

  const updateStatus = (plan) => {
    firebase.database().ref(`requests`).child(key).child("status").set(status);

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
  };

  const deleteRequest = () => {
    console.log("key", key);
    firebase
      .database()
      .ref(`requests`)
      .child(key)
      .set(null)
      .then(() => {
        // setVisible(true);
        console.log("success :>> ");
        navigation.navigate("MyRequest");
      })
      .catch((err) => console.log("err :>> ", err));
  };

  const updateCost = (plan) => {
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
  };

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
      {/* {plan ? (
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
                <View style={styles.statusContainer}>
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
                  updateStatus(plan);
                }}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text style={styles.updateStatus}>Update Status</Text>
                </View>
              </TouchableOpacity>
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

          {plan.tourCost === 0 && !isAdmin ? null : (
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
                      value={cost.toString()}
                      onChangeText={(value) => setCost(value)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      updateCost(plan);
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
                    Estimated Budget: {plan.tourCost}
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
                <View style={styles.statusContainer}>
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
                  updateStatus(road);
                }}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text style={styles.updateStatus}>Update Status</Text>
                </View>
              </TouchableOpacity>
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
          {road.tourCost === 0 && !isAdmin ? null : (
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
                      updateCost(road);
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
                    Estimated Budget: {road.tourCost}
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
                <View style={styles.statusContainer}>
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
                  updateStatus(surprise);
                }}
              >
                <View style={{ alignItems: "center", margin: 10 }}>
                  <Text style={styles.updateStatus}>Update Status</Text>
                </View>
              </TouchableOpacity>
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
          {surprise.tourCost === 0 && !isAdmin ? null : (
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
                      updateCost(surprise);
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
                    Estimated Budget: {surprise.tourCost}
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

      {/* Honeymoon luxury */}

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
                    // style={{ backgroundColor: "#fafafa" }}
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
