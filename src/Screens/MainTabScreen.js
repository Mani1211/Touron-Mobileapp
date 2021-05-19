import React, { useState } from "react";
import { Button, View, Text, Platform, Dimensions } from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreens/HomeScreen";
import PlannedTourScreen from "./CategoryScreens/PlannedTourScreen";
import SurpriseTourScreen from "./CategoryScreens/SupriseTourScreen";
import RoadTripScreen from "./CategoryScreens/RoadTripScreen";
import CountryHomeScreen from "./CountryScreens/CountryHomeScreen";
import CountryInnerScreen from "./CountryScreens/CountryInnerScreen";
import CityHomeScreen from "./CityScreens/CityHomeScreen";
import CityInnerScreen from "./CityScreens/CityInnerScreen";
import BlogHomeScreen from "./BlogScreens/BlogHomeScreen";
import BlogInnerScreen from "./BlogScreens/BlogInnerScreen";
import TourHomeScreen from "./TourScreens/TourHomeScreen";
import TourInnerScreen from "./TourScreens/TourInnerScreen";
import SelfPlanningScreen from "./SelfPlanTourScreens/SelfPlanningScreen";
import SelfPlanForm from "./SelfPlanTourScreens/SelfPlanningFormScreen";
import SelfTourHome from "./SelfPlanTourScreens/SelfTourHome";
import SelfTourInner from "./SelfPlanTourScreens/SelfTourInner";
import ProgressScreen from "./CheckoutScreens/ProgressScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OverviewToursScreen from "./CheckoutScreens/OverviewToursScreen";
import OverviewCitiesScreen from "./CheckoutScreens/OverviewCitiesScreen";
import { SelfTourContext } from "../context/ SelfTourContext";
import MyPlansInner from "./AccountScreens/MyPlansInner";
import WildLife from "./CategoryScreens/WildlifeScreen";
import Luxury from "./CategoryScreens/Luxury";
import Honeymoon from "./CategoryScreens/Honeymoon";
import { Surface } from "react-native-paper";
const HomeStack = createStackNavigator();
const BlogStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const WIDTH = Dimensions.get("window").width;
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="GettingStarted">
      {/* <HomeStack.Screen
        options={{ headerShown: false }}
        name="GettingStarted"
        component={GettingStartedScreen}
      /> */}
      <HomeStack.Screen
        options={{
          headerShown: false,
          headerRight: () => <Button title="klk" />,
          headerLeft: () => (
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Feather
                name="menu"
                size={180}
                color="black"
                style={{ paddingHorizontal: 10 }}
              />
            </Button>
          ),
        }}
        name="Main"
        component={HomeScreen}
      />

      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Planned"
        component={PlannedTourScreen}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Surprise"
        component={SurpriseTourScreen}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Road"
        component={RoadTripScreen}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Wildlife"
        component={WildLife}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Luxury"
        component={Luxury}
      />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Honeymoon"
        component={Honeymoon}
      />
      <HomeStack.Screen
        options={{
          title: "Country",
          headerShown: true,
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="CountryHome"
        component={CountryHomeScreen}
      />
      <HomeStack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
        name="CountryInner"
        component={CountryInnerScreen}
      />
      <HomeStack.Screen
        options={{
          title: "",
          headerTransparent: true,
        }}
        name="CityHome"
        component={CityHomeScreen}
      />
      <HomeStack.Screen
        name="CityInner"
        options={{
          headerTitle: "",
          headerShown: true,
          headerTransparent: true,
        }}
        component={CityInnerScreen}
      />

      <HomeStack.Screen
        options={{
          title: "Tours",
          headerShown: false,
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="TourHome"
        component={TourHomeScreen}
      />
      <HomeStack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
        name="TourInner"
        component={TourInnerScreen}
      />

      {/* <HomeStack.Screen
        options={{
          title: "About Us",
          headerShown: false,
          headerTransparent: false,
        }}
        name="AboutUs"
        component={AboutUs}
      />
      <HomeStack.Screen
        options={{
          title: "Contact Us",
          headerShown: false,
          headerTransparent: false,
        }}
        name="ContactUs"
        component={ContactUs}
      /> */}
    </HomeStack.Navigator>
  );
};

const SelfTourStack = createStackNavigator();

const SelfTourStackScreen = () => {
  const [details, setDetails] = useState();
  return (
    <SelfTourContext.Provider value={{ details, setDetails }}>
      <SelfTourStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <SelfTourStack.Screen name="SelfPlan" component={SelfPlanningScreen} />
        <SelfTourStack.Screen name="SelfPlanForm" component={SelfPlanForm} />
        <SelfTourStack.Screen
          name="OverviewCities"
          component={OverviewCitiesScreen}
        />
        <SelfTourStack.Screen name="SelfTourHome" component={SelfTourHome} />
        <SelfTourStack.Screen name="SelfTourInner" component={SelfTourInner} />
        <SelfTourStack.Screen
          name="OverviewTours"
          component={OverviewToursScreen}
        />
        <SelfTourStack.Screen
          name="Progress"
          options={{
            title: "",
            headerShown: false,
            headerTransparent: true,
          }}
          component={ProgressScreen}
        />
        <SelfTourStack.Screen
          options={{
            title: "",
            headerShown: false,
            headerTransparent: false,
          }}
          name="MyPlanInner"
          component={MyPlansInner}
        />
      </SelfTourStack.Navigator>
    </SelfTourContext.Provider>
  );
};

const BlogStackScreen = () => {
  return (
    <BlogStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BlogStack.Screen
        options={{
          headerShown: false,
        }}
        name="BlogHome"
        component={BlogHomeScreen}
      />
      <BlogStack.Screen
        options={{ headerShown: false, title: "", headerTransparent: true }}
        name="BlogInner"
        component={BlogInnerScreen}
      />
    </BlogStack.Navigator>
  );
};

const MainTabScreen = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,

      style: {
        backgroundColor: "#fff",
        position: "absolute",
        height: 80,
        bottom: 10,
        left: 10,
        borderRadius: 25,
        right: 10,
      },
      keyboardHidesTabBar: true,
    }}
    //   labelStyle: {
    //     fontFamily: "Andika",
    //     fontSize: 14,
    //   },
    //   style: {
    //     backgroundColor: "#fff",
    //     padding: Platform.OS === "ios" ? 0 : 10,
    //     paddingBottom: Platform.OS === "ios" ? 10 : 0,
    //     marginBottom: Platform.OS === "ios" ? 20 : 0,
    //     height: 65,
    //   },
    //   keyboardHidesTabBar: true,
    // }}
  >
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, focused }) => {
          return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Ionicons name="ios-home" size={24} color={color} />
              <Text
                style={{
                  color: color,
                  fontFamily: "Andika",
                }}
              >
                Home
              </Text>
            </View>
          );
        },
      }}
      name="Home"
      component={HomeStackScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* <Surface
              style={{
                elevation: 5,
                backgroundColor: "#fff",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5,
                height: WIDTH / 7,
                width: WIDTH / 7,
                position: "absolute",
                bottom: 10,
                marginBottom: Platform.OS === "ios" ? 35 : 10,
              }}
            > */}
            <View
              style={{
                backgroundColor: "#fff",
                elevation: 10,
                padding: 10,
                bottom: 30,
                borderRadius: 30,
                height: 60,
                width: 60,
                // marginBottom: 30,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              <FontAwesome name="paint-brush" size={24} color={color} />
            </View>
            {/* </Surface> */}
            {/* <FontAwesome name="paint-brush" size={24} color={color} /> */}

            <Text
              style={{
                color: color,
                fontFamily: "Andika",
                marginTop: 20,
              }}
            >
              PIY
            </Text>
          </View>
          // <>
          //   <Surface
          //     style={{
          //       elevation: 5,
          //       backgroundColor: "#fff",
          //       borderRadius: 50,
          //       justifyContent: "center",
          //       alignItems: "center",
          //       zIndex: 5,
          //       height: WIDTH / 7,
          //       width: WIDTH / 7,
          //       // position: "absolute",
          //       // bottom: 40,
          //       marginBottom: Platform.OS === "ios" ? 35 : 30,
          //     }}
          //   >
          //     <FontAwesome name="paint-brush" size={24} color={color} />
          //   </Surface>
          //   <Text
          //     style={{
          //       color: color,
          //       fontFamily: "Andika",
          //     }}
          //   >
          //     Blogs
          //   </Text>
          // </>
        ),
      }}
      name="PIY"
      component={SelfTourStackScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FontAwesome name="book" size={24} color={color} />

            <Text
              style={{
                color: color,
                fontFamily: "Andika",
              }}
            >
              Blogs
            </Text>
          </View>
        ),
      }}
      name="Blogs"
      component={BlogStackScreen}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
