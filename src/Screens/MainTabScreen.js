import React, { useState } from "react";
import { Image, Text, StyleSheet, Button } from "react-native";

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
import PaymentScreen from "./CheckoutScreens/PaymentScreen";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OverviewToursScreen from "./CheckoutScreens/OverviewToursScreen";
import OverviewCitiesScreen from "./CheckoutScreens/OverviewCitiesScreen";

import PromotionPage from "./AccountScreens/PromotionPage";
import { SelfTourContext } from "../context/ SelfTourContext";
import AboutUs from "./AccountScreens/AboutUs";
import ContactUs from "./AccountScreens/ContactUs";
import BookingDetails from "./AccountScreens/BookingDetails";
import MyPlansInner from "./AccountScreens/MyPlansInner";
import WildLife from "./CategoryScreens/WildlifeScreen";
import Luxury from "./CategoryScreens/Luxury";
import Honeymoon from "./CategoryScreens/Honeymoon";
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{}}>
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
          headerShown: false,
        }}
        name="BlogHome"
        component={BlogHomeScreen}
      />
      <HomeStack.Screen
        options={{ headerShown: false, title: "", headerTransparent: true }}
        name="BlogInner"
        component={BlogInnerScreen}
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
      <HomeStack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
        }}
        name="Promotion"
        component={PromotionPage}
      />
      <HomeStack.Screen
        options={{
          title: "About Us",
          headerShown: true,
          headerTransparent: false,
        }}
        name="AboutUs"
        component={AboutUs}
      />
      <HomeStack.Screen
        options={{
          title: "Contact Us",
          headerShown: true,
          headerTransparent: false,
        }}
        name="ContactUs"
        component={ContactUs}
      />
      <HomeStack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: false,
        }}
        name="Bookings"
        component={BookingDetails}
      />
      {/* <HomeStack.Screen
        options={{
          title: "",
          headerShown: false,
          headerTransparent: false,
        }}
        name="MyPlanInner"
        component={MyPlansInner}
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
            headerShown: true,
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
        <SelfTourStack.Screen name="Payment" component={PaymentScreen} />
      </SelfTourStack.Navigator>
    </SelfTourContext.Provider>
  );
};

const MainTabScreen = () => (
  <Tab.Navigator
    tabBarOptions={{
      keyboardHidesTabBar: true,
    }}
  >
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
      name="Home"
      component={HomeStackScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="flight-takeoff" size={24} color={color} />
        ),
      }}
      name="Plan Myself"
      component={SelfTourStackScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="shopping" size={24} color={color} />
        ),
      }}
      name="Blogs"
      component={BlogHomeScreen}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
