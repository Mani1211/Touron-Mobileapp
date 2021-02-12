import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  Image,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import { Avatar } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import { Feather } from "@expo/vector-icons";
const MyPlansScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [selfPlans, setSelfPlans] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

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

  const getUserPlans = () => {
    firebase
      .database()
      .ref(`self-planned-tours-international`)
      .on("value", (data) => {
        let plans = [];
        data.forEach((c) => {
          if (isAdmin) {
            plans.push(c.val());
          } else {
            if (c.val().userId === user.uid) {
              plans.push(c.val());
            }
          }
        });
        setSelfPlans(plans);
      });
  };

  useEffect(() => {
    getUserPlans();
    getUserData();
  }, []);
  return (
    <View
      animation="bounceIn"
      duration={3000}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <StatusBar backgroundColor="#28C9E1" />

      <View
        style={{
          backgroundColor: "#28C9E1",
          height: HEIGHT / 8,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View>
            <Feather
              name="arrow-left"
              size={28}
              color="black"
              style={{
                paddingHorizontal: 20,
                paddingTop: Platform.OS === "ios" ? 25 : 0,
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 0.8,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 25,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>My Plans</Text>
        </View>
      </View>
      {selfPlans.length == 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: HEIGHT / 2,
              width: WIDTH * 0.7,
              marginTop: WIDTH / 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            source={require("../../../assets/myplans.png")}
          />
          <Text
            style={{
              fontFamily: "Avenir",
              fontSize: 20,
              marginTop: WIDTH / 10,
            }}
          >
            No Tour Plans Yet
          </Text>
          <Text
            style={{
              fontFamily: "WSansl",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Go to Home and start planning
          </Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={selfPlans}
            keyExtractor={(item) => item.requestID}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("MyPlanInner", { item: item })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 20,
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 0.2 }}>
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
                        <View
                          style={{
                            flex: 0.7,
                            // justifyContent: "center",
                            flexDirection: "row",
                          }}
                        >
                          {/* <Text style={{ fontSize: 18 }}> */}
                          {item.selectedCities.map((c, index) => (
                            <Text style={{ fontSize: 18 }} key={index}>
                              {c.cityName},
                            </Text>
                          ))}
                        </View>
                        {/* </Text> */}
                        <Text style={{ fontSize: 14 }}>
                          Request Id: {item.requestID}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MyPlansScreen;
