import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { database } from "firebase";
import { Feather, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
const WishListScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [savedTours, setSavedTours] = useState([]);

  const getSavedTours = () => {
    setLoaded(true);
    database()
      .ref(`saved-tours/${userInfo.userID}`)
      .on("value", (data) => {
        if (data) {
          let sT = [];
          data.forEach((c) => {
            sT.push(c.val());
          });
          setSavedTours(sT);
        }
      });
    setLoaded(false);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getSavedTours();
    }
    return () => (mounted = false);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {loaded ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View
            style={{
              backgroundColor: "#fff",
              alignItems: "center",
              paddingTop: Platform.OS === "ios" ? 60 : 40,
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
              <Text style={{ fontSize: 25, fontFamily: "NewYorkl" }}>
                Saved Tours
              </Text>
            </View>
          </View>

          {savedTours.length == 0 ? (
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
                  uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fstats%20and%20Default%2Fsavedtours.png?alt=media&token=724a5517-ab6a-4318-93ff-f719de443a74",
                }}
              />
              <Text
                style={{
                  fontFamily: "Avenir",
                  fontSize: 20,
                  marginTop: WIDTH / 10,
                }}
              >
                Nothings Saved Yet
              </Text>
              <Text
                style={{
                  fontFamily: "Andika",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Content goes here
              </Text>
            </View>
          ) : (
            <View>
              <FlatList
                data={savedTours}
                keyExtractor={(item) => item.tourName}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 20,
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            flex: 0.2,
                            alignItems: "center",
                          }}
                        >
                          <Image
                            style={{
                              height: WIDTH / 6,
                              width: WIDTH / 6,
                              borderRadius: 100,
                            }}
                            source={{ uri: item.imageUrl }}
                          />
                        </View>
                        <View
                          style={{
                            flex: 0.75,
                            justifyContent: "center",
                            marginLeft: 10,
                            marginRight: 10,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("TourInner", { item: item });
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontFamily: "Avenir",
                                fontWeight: "bold",
                              }}
                            >
                              {item.cityName}
                            </Text>
                            <Text style={{ fontSize: 16 }}>
                              {item.tourName}
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            flex: 0.1,
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: 8,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              const filterTour = savedTours.filter((c) => {
                                return c.tourName != item.tourName;
                              });

                              database()
                                .ref(`saved-tours/${userInfo.userID}`)
                                .set(filterTour)
                                .catch((err) => console.log(err));
                              setTimeout(() => {
                                setSavedTours(filterTour);
                              }, 1000);
                            }}
                          >
                            <AntDesign
                              style={{ marginRight: 0 }}
                              name="heart"
                              size={24}
                              color="#FF4500"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default WishListScreen;
