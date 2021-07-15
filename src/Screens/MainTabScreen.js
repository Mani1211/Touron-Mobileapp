import React, { useState, useEffect } from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import {
  FontAwesome,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import HomeScreen from "./HomeScreens/HomeScreen";
import BlogHomeScreen from "./BlogScreens/BlogHomeScreen";
import SelfPlanningScreen from "./SelfPlanTourScreens/SelfPlanningScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StorySection from "./StoriesScreens/StorySection";
import { database } from "firebase";

const Tab = createBottomTabNavigator();

const MainTabScreen = ({ navigation }) => {
  const TabbarCustomButton = (props) => {
    const [fleetData, setFleetData] = useState([]);

    const getStoriesData = () => {
      let v = [];
      database()
        .ref("stories")
        .on("value", (data) => {
          data.forEach((d) => {
            v.push(d.val());
          });
        });
      console.log(`v`, v);
      setFleetData(v);
    };

    useEffect(() => {
      getStoriesData();
    }, []);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("StoryView", { story: fleetData[0] })
        }
        style={{
          // top: -30 : 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#E28633",
          }}
        >
          {props.children}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "#fff",
          position: "absolute",
          height: Platform.OS === "ios" ? 100 : 80,
          bottom: 5,
          left: 10,
          borderRadius: 55,
          right: 10,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Ionicons
                  name="ios-home"
                  size={24}
                  style={{ marginTop: Platform.OS === "ios" ? 15 : 0 }}
                  color={focused ? "#E28633" : "#333"}
                />
                <Text
                  style={{
                    color: focused ? "#E28633" : "#333",
                    fontFamily: "Andika",
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
        name="Main"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarVisible: false,

          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <FontAwesome
                name="paint-brush"
                size={24}
                style={{ marginTop: Platform.OS === "ios" ? 15 : 0 }}
                color={focused ? "#E28633" : "#333"}
              />

              <Text
                style={{
                  color: focused ? "#E28633" : "#333",
                  fontFamily: "Andika",
                }}
              >
                PIY
              </Text>
            </View>
          ),
        }}
        name="SelfPlan"
        component={SelfPlanningScreen}
      />
      <Tab.Screen
        options={{
          tabBarVisible: false,

          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="settings-input-svideo"
              size={34}
              color="#fff"
            />
            // <FontAwesome5 name="photo-video" size={24} color="#fff" />
          ),
          tabBarButton: (props) => <TabbarCustomButton {...props} />,
        }}
        name="StorySection1"
        component={StorySection}
      />
      <Tab.Screen
        options={{
          tabBarVisible: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <FontAwesome
                name="book"
                size={24}
                style={{ marginTop: Platform.OS === "ios" ? 15 : 0 }}
                color={focused ? "#E28633" : "#333"}
              />

              <Text
                style={{
                  color: focused ? "#E28633" : "#333",

                  fontFamily: "Andika",
                }}
              >
                Blogs
              </Text>
            </View>
          ),
        }}
        name="BlogHome"
        component={BlogHomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarVisible: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <FontAwesome5
                name="book-open"
                size={24}
                style={{ marginTop: Platform.OS === "ios" ? 15 : 0 }}
                color={focused ? "#E28633" : "#333"}
              />

              <Text
                style={{
                  color: focused ? "#E28633" : "#333",

                  fontFamily: "Andika",
                }}
              >
                Stories
              </Text>
            </View>
          ),
        }}
        name="StorySection"
        component={StorySection}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
