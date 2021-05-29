import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  Image,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { useIsFocused } from "@react-navigation/native";
import { database } from "firebase";
import { Feather } from "@expo/vector-icons";
const MyPlansScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [selfPlans, setSelfPlans] = useState([]);
  const isFocused = useIsFocused();
  const [loaded, setLoaded] = useState(false);

  const getUserPlans = () => {
    setLoaded(true);
    database()
      .ref(`self-planned-tours`)
      .on("value", (data) => {
        let plans = [];
        data.forEach((c) => {
          if (c.val().userId === userInfo.userID) {
            plans.push(c.val());
          }
        });
        setSelfPlans(plans);
      });
    setLoaded(false);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUserPlans();
    }
    return () => (mounted = false);
  }, [isFocused]);
  return (
    <View
      animation="bounceIn"
      duration={3000}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <StatusBar backgroundColor="#28C9E1" />

      <View
        style={{
          backgroundColor: "#fff",
          alignItems: "center",
          paddingTop: Platform.OS === "ios" ? 80 : 40,
          paddingBottom: Platform.OS === "ios" ? 20 : 20,

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
                // paddingTop: Platform.OS === "ios" ? 25 : 0,
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
          <Text style={{ fontSize: 25, fontFamily: "NewYorkl" }}>My Plans</Text>
        </View>
      </View>
      <>
        {loaded ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <>
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
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fstats%20and%20Default%2Fmyplans.png?alt=media&token=cb00ebb1-1511-4994-ac33-cc1f36e6a399",
                  }}
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
                    fontFamily: "Andika",
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
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("MyPlanInner", { item: item })
                        }
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
                            <Text style={{ fontSize: 14, paddingBottom: 20 }}>
                              Request ID: {item.requestID}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                              {item.selectedCities.map((c, index) => {
                                if (index === item.selectedCities.length - 1) {
                                  return (
                                    <Text
                                      style={{
                                        fontSize: 18,
                                        fontFamily: "NewYorkl",
                                      }}
                                      key={index}
                                    >
                                      {c.cityName}
                                    </Text>
                                  );
                                }
                                return (
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontFamily: "NewYorkl",
                                    }}
                                    key={index}
                                  >
                                    {c.cityName},{"  "}
                                  </Text>
                                );
                              })}
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          </>
        )}
      </>
    </View>
  );
};

export default MyPlansScreen;
