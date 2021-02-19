import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { FontAwesome5, Fontisto, Feather, AntDesign } from "@expo/vector-icons";
import { Thumbnail } from "native-base";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const DrawerContent = (props) => {
  const {
    user,
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    userInfo,
    setUserInfo,
  } = useContext(AuthContext);
  useEffect(() => {
    // getUserData();
  }, []);

  const [isAdmin, setIsAdmin] = useState(userInfo.admin);

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (e) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          width: WIDTH * 0.75,
          height: HEIGHT + 30,
          zIndex: -1,
          opacity: Platform.OS === "ios" ? 0.4 : 1,
        }}
        source={{
          uri:
            "https://images.pexels.com/photos/2108813/pexels-photo-2108813.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
      />

      {isLoggedIn ? (
        <View
          style={{
            backgroundColor: Platform.OS === "ios" ? "transparent" : "#000000",
            width: WIDTH * 0.75,
            height: HEIGHT + 30,
            position: "absolute",
            paddingTop: Platform.OS === "ios " ? 200 : 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: Platform.OS === "ios " ? 180 : 20,
            }}
          >
            {userInfo.photoURL === "" ? (
              <Thumbnail
                source={{
                  uri:
                    "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
                }}
                style={{ height: 50, width: 50 }}
              />
            ) : (
              <Thumbnail
                source={{ uri: userInfo.photoURL }}
                style={{ height: 55, width: 55 }}
              />
            )}
            <View>
              <Text
                style={{ paddingHorizontal: 20, color: "#FFF", fontSize: 20 }}
              >
                {userInfo.name}
              </Text>
              <Text
                style={{ paddingHorizontal: 20, color: "#FFF", fontSize: 20 }}
              >
                {userInfo.phoneNumber}
              </Text>
            </View>
          </View>

          <DrawerContentScrollView {...props}>
            <View style={{ marginBottom: 40 }}>
              {isAdmin ? (
                <>
                  <DrawerItem
                    label={() => <Text style={styles.label}>Home</Text>}
                    style={{ color: "white" }}
                    icon={() => (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/houses.png")}
                      />
                    )}
                    onPress={() => props.navigation.navigate("Home")}
                  />
                  <DrawerItem
                    label={() => <Text style={styles.label}>All Requests</Text>}
                    icon={() => (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/Planes.png")}
                      />
                    )}
                    onPress={() => props.navigation.navigate("MyRequest")}
                  />

                  <DrawerItem
                    label={() => (
                      <Text style={styles.label}>Self Tour Plans</Text>
                    )}
                    //   icon={({ color, size }) => <Feather name="menu" />}
                    icon={() => (
                      <View style={{ marginHorizontal: 5 }}>
                        <Fontisto
                          name="plane-ticket"
                          size={24}
                          color="#C1C5C6"
                        />
                      </View>
                    )}
                    onPress={() => {
                      props.navigation.navigate("MyPlans");
                    }}
                  />
                  <DrawerItem
                    label={() => (
                      <Text style={styles.label}>Promotion page</Text>
                    )}
                    icon={() => (
                      <View style={{ marginHorizontal: 5 }}>
                        <Fontisto name="lightning" size={23} color="#C1C5C6" />
                      </View>
                    )}
                    onPress={() => {
                      props.navigation.navigate("Promotion");
                    }}
                  />
                  <DrawerItem
                    label={() => <Text style={styles.label}>Profile</Text>}
                    icon={() => (
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                        }}
                        source={require("../../assets/Profiles.png")}
                      />
                    )}
                    onPress={() => {
                      props.navigation.navigate("Profile");
                    }}
                  />
                  <DrawerItem
                    label={() => <Text style={styles.label}>Support</Text>}
                    icon={() => (
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                        }}
                        source={require("../../assets/setting.png")}
                      />
                    )}
                    onPress={() => {}}
                  />
                  <DrawerItem
                    label={() => (
                      <Text style={styles.label}>Visa Requested Queries</Text>
                    )}
                    icon={() => (
                      <View style={{ marginHorizontal: 5 }}>
                        <FontAwesome5
                          name="passport"
                          size={23}
                          color="#C1C5C6"
                        />
                      </View>
                    )}
                    onPress={() => {
                      props.navigation.navigate("Visa");
                    }}
                  />
                  <DrawerItem
                    label={() => (
                      <Text
                        style={{
                          marginBottom: HEIGHT / 10,
                          color: "#FFF",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Log Out
                      </Text>
                    )}
                    onPress={() => {
                      firebase.auth().signOut();
                      setUser(null);
                      removeToken();
                      setUserInfo({});
                      setIsLoggedIn(false);
                      props.navigation.navigate("Home");
                    }}
                    icon={() => (
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                          marginBottom: HEIGHT / 10,
                        }}
                        source={require("../../assets/log-out.png")}
                      />
                    )}
                  />
                </>
              ) : (
                <>
                  <DrawerItem
                    label={() => <Text style={styles.label}>Home</Text>}
                    style={{ color: "white" }}
                    icon={() => (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/houses.png")}
                      />
                    )}
                    onPress={() => props.navigation.navigate("Main")}
                  />
                  <DrawerItem
                    label={() => <Text style={styles.label}>Profile</Text>}
                    icon={() => (
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                        }}
                        source={require("../../assets/Profiles.png")}
                      />
                    )}
                    onPress={() => {
                      props.navigation.navigate("Profile");
                    }}
                  />

                  <DrawerItem
                    label={() => <Text style={styles.label}>My Requests</Text>}
                    icon={() => (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/Planes.png")}
                      />
                    )}
                    onPress={() => props.navigation.navigate("MyRequest")}
                  />
                  {/* <DrawerItem
                    label={() => <Text style={styles.label}>My Bookings</Text>}
                    icon={() => (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/Planes.png")}
                      />
                    )}
                    onPress={() => props.navigation.navigate("Bookings")}
                  /> */}
                  <DrawerItem
                    label={() => <Text style={styles.label}>Saved Tours</Text>}
                    icon={() => (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/heart.png")}
                      />
                    )}
                    onPress={() => {
                      props.navigation.navigate("WishList");
                    }}
                  />
                  <DrawerItem
                    label={() => <Text style={styles.label}>My Plans</Text>}
                    //   icon={({ color, size }) => <Feather name="menu" />}
                    icon={() => (
                      <View style={{ marginHorizontal: 5 }}>
                        <Fontisto
                          name="plane-ticket"
                          size={24}
                          color="#C1C5C6"
                        />
                      </View>
                    )}
                    onPress={() => {
                      props.navigation.navigate("MyPlans");
                    }}
                  />

                  <DrawerItem
                    label={() => (
                      <Text style={styles.label}>My Visa Requests</Text>
                    )}
                    icon={() => (
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={require("../../assets/heart.png")}
                      />
                    )}
                    onPress={() => {
                      props.navigation.navigate("MyVisaRequestScreen");
                    }}
                  />

                  <DrawerItem
                    label={() => (
                      <Text style={styles.label}>Visa Assistance</Text>
                    )}
                    //   icon={({ color, size }) => <Feather name="menu" />}
                    icon={() => (
                      <View style={{ marginHorizontal: 5 }}>
                        <FontAwesome5
                          name="passport"
                          size={23}
                          color="#C1C5C6"
                        />
                      </View>
                    )}
                    onPress={() => {
                      props.navigation.navigate("Visa");
                    }}
                  />
                  {/* <DrawerItem
                    label={() => <Text style={styles.label}>Support</Text>}
                    icon={() => (
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                        }}
                        source={require("../../assets/setting.png")}
                      />
                    )}
                    onPress={() => {}}
                  /> */}

                  <DrawerItem
                    label={() => <Text style={styles.label}>About Us</Text>}
                    //   icon={({ color, size }) => <Feather name="menu" />}
                    icon={() => (
                      <View style={{ marginHorizontal: 5 }}>
                        <AntDesign name="team" size={23} color="#C1C5C6" />
                      </View>
                    )}
                    onPress={() => {
                      props.navigation.navigate("AboutUs");
                    }}
                  />
                  <DrawerItem
                    label={() => <Text style={styles.label}>Contact Us</Text>}
                    icon={() => (
                      <View style={{ marginHorizontal: 5 }}>
                        <AntDesign name="contacts" size={23} color="#C1C5C6" />
                      </View>
                    )}
                    onPress={() => {
                      props.navigation.navigate("ContactUs");
                    }}
                  />
                  <DrawerItem
                    label={() => (
                      <Text
                        style={{
                          marginBottom: HEIGHT / 10,
                          color: "#FFF",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Log Out
                      </Text>
                    )}
                    onPress={() => {
                      firebase.auth().signOut();
                      setUser(null);
                      removeToken();
                      setIsLoggedIn(false);
                      props.navigation.navigate("Home");
                    }}
                    icon={() => (
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                          marginBottom: HEIGHT / 10,
                        }}
                        source={require("../../assets/log-out.png")}
                      />
                    )}
                  />
                </>
              )}
            </View>
          </DrawerContentScrollView>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "#000000",
            width: WIDTH * 0.75,
            justifyContent: "center",
            alignItems: "center",
            height: HEIGHT + 30,
            position: "absolute",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#FFF",
              fontWeight: "300",
              marginTop: 30,
            }}
          >
            Log into your Account
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignInScreen")}
            >
              <Text style={styles.label1}>Login</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 30,
                color: "#FFF",
                fontWeight: "300",
                marginTop: 20,
              }}
            >
              {""}/{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUpScreen")}
            >
              <Text style={styles.label1}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
export default DrawerContent;

const styles = new StyleSheet.create({
  label: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  label1: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
    marginTop: 20,
    backgroundColor: "transparent",
  },
});
