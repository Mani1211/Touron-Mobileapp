import React from "react";
import { View, Text, Platform } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreens/HomeScreen";
import BlogHomeScreen from "./BlogScreens/BlogHomeScreen";
import SelfPlanningScreen from "./SelfPlanTourScreens/SelfPlanningScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Surface } from "react-native-paper";

const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: {
        backgroundColor: "#fff",
        position: "absolute",
        height: 80,
        bottom: 10,
        left: 15,
        borderRadius: 25,
        right: 15,
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
        tabBarIcon: ({ focused }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Surface
              style={{
                backgroundColor: "#fff",
                elevation: 10,

                // borderColor: "#fff",
                padding: 10,
                bottom: Platform.OS === "ios" ? 30 : 30,
                borderRadius: 30,
                height: 60,
                width: 60,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              <FontAwesome
                name="paint-brush"
                size={24}
                color={focused ? "#E28633" : "#333"}
              />
            </Surface>

            <Text
              style={{
                color: focused ? "#E28633" : "#333",
                fontFamily: "Andika",
                marginTop: Platform.OS === "ios" ? 30 : 20,
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
  </Tab.Navigator>
);

export default MainTabScreen;
