import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { auth } from "firebase";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { FontAwesome5, Fontisto, AntDesign } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import { AuthContext } from "../context/AuthContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const DrawerContent = (props) => {
  const { isLoggedIn, setIsLoggedIn, setUser, setUserInfo, userInfo } =
    useContext(AuthContext);

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
          uri: "https://images.pexels.com/photos/2108813/pexels-photo-2108813.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
      />

      {isLoggedIn ? (
        <View
          style={{
            backgroundColor: Platform.OS === "ios" ? "transparent" : "#000000",
            width: WIDTH * 0.75,
            height: HEIGHT + 30,
            position: "absolute",
          }}
        >
          <DrawerContentScrollView {...props}>
            <View style={{ paddingTop: 50 }}>
              <>
                <DrawerItem
                  label={() => <Text style={styles.label}>Home</Text>}
                  style={{ color: "white" }}
                  icon={() => (
                    <Image
                      style={{ height: 30, width: 30 }}
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FSidebar%2Fhouses.png?alt=media&token=84e3c5ee-18d4-43d2-8304-664b103b5b89",
                      }}
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
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FSidebar%2FProfiles.png?alt=media&token=4658a078-2026-481b-b26e-512900244234",
                      }}
                    />
                  )}
                  onPress={() => {
                    props.navigation.navigate("Profile");
                  }}
                />

                {userInfo.email === "vikashmanoharan@touron.in" && (
                  <DrawerItem
                    label={() => <Text style={styles.label}>Stories</Text>}
                    icon={() => (
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                        }}
                        source={{
                          uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FSidebar%2FProfiles.png?alt=media&token=4658a078-2026-481b-b26e-512900244234",
                        }}
                      />
                    )}
                    onPress={() => {
                      props.navigation.navigate("StoriesHome");
                    }}
                  />
                )}

                <DrawerItem
                  label={() => <Text style={styles.label}>My Requests</Text>}
                  icon={() => (
                    <Image
                      style={{ height: 30, width: 30 }}
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FSidebar%2FPlanes.png?alt=media&token=5ba83211-b715-42f9-a486-3de1c75d7440",
                      }}
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
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FSidebar%2Fheart.png?alt=media&token=6649854f-0d2e-45d1-8e05-bb49f365d404",
                      }}
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
                      <Fontisto name="plane-ticket" size={24} color="#C1C5C6" />
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
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FSidebar%2Fheart.png?alt=media&token=6649854f-0d2e-45d1-8e05-bb49f365d404",
                      }}
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
                      <FontAwesome5 name="passport" size={23} color="#C1C5C6" />
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
                  label={() => <Text style={styles.label}>Feedback</Text>}
                  icon={() => (
                    <View style={{ marginHorizontal: 5 }}>
                      <AntDesign name="contacts" size={23} color="#C1C5C6" />
                    </View>
                  )}
                  onPress={() => {
                    props.navigation.navigate("Feedback");
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
                    setUser(null);
                    setUserInfo({});
                    removeToken();
                    setIsLoggedIn(false);
                    auth().signOut();
                    props.navigation.navigate("Main");
                  }}
                  icon={() => (
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        marginBottom: HEIGHT / 10,
                      }}
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FSidebar%2Flog-out.png?alt=media&token=21a48757-c78b-4768-95c1-fde359962816",
                      }}
                    />
                  )}
                />
              </>
              {/* )} */}
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
