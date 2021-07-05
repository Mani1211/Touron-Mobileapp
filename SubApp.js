import { Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./src/Screens/DrawerContent";
const WIDTH = Dimensions.get("window").width;
import MyRequestScreen from "./src/Screens/AccountScreens/MyRequestScreen";
import MyPlansScreen from "./src/Screens/AccountScreens/MyPlansScreen";
import ProfileScreen from "./src/Screens/AccountScreens/ProfileScreen";
import VisaDetailsScreen from "./src/Screens/AccountScreens/VisaDetailsScreen";
import WishListScreen from "./src/Screens/AccountScreens/WishListScreen";
import RequestInner from "./src/Screens/AccountScreens/RequestInner";
import VisaInner from "./src/Screens/AccountScreens/VisaInner";
import MyVisaRequestsScreen from "./src/Screens/AccountScreens/MyVisaRequests";
import MyPlansInner from "./src/Screens/AccountScreens/MyPlansInner";
import MainTabScreen from "./src/Screens/MainTabScreen";
import AboutUs from "./src/Screens/AccountScreens/AboutUs";
import ContactUs from "./src/Screens/AccountScreens/ContactUs";
import { AuthContext } from "./src/context/AuthContext";
import Data from "./src/Data/Data";
import { database } from "firebase";
const Drawer = createDrawerNavigator();

import * as Linking from "expo-linking";
import SignInScreen from "./src/Screens/AuthScreens/SignInScreen";
import SignUpScreen from "./src/Screens/AuthScreens/SignUpScreen";
import GettingStartedScreen from "./src/Screens/AuthScreens/GettingStartedScreen";
import FeedbackScreen from "./src/Screens/Review Component/FeedbackScreen";
import TourInnerScreen from "./src/Screens/TourScreens/TourInnerScreen";
import CityInnerScreen from "./src/Screens/CityScreens/CityInnerScreen";
import CountryInnerScreen from "./src/Screens/CountryScreens/CountryInnerScreen";
import BlogInnerScreen from "./src/Screens/BlogScreens/BlogInnerScreen";
import SelfPlanForm from "./src/Screens/SelfPlanTourScreens/SelfPlanningFormScreen";
import OverviewCitiesScreen from "./src/Screens/CheckoutScreens/OverviewCitiesScreen";
import PlannedTourScreen from "./src/Screens/CategoryScreens/PlannedTourScreen";
import SurpriseTourScreen from "./src/Screens/CategoryScreens/SupriseTourScreen";
import WildLife from "./src/Screens/CategoryScreens/WildlifeScreen";
import Luxury from "./src/Screens/CategoryScreens/Luxury";
import Honeymoon from "./src/Screens/CategoryScreens/Honeymoon";
import CountryHomeScreen from "./src/Screens/CountryScreens/CountryHomeScreen";
import CityHomeScreen from "./src/Screens/CityScreens/CityHomeScreen";
import TourHomeScreen from "./src/Screens/TourScreens/TourHomeScreen";
import SelfTourHome from "./src/Screens/SelfPlanTourScreens/SelfTourHome";
import SelfTourInner from "./src/Screens/SelfPlanTourScreens/SelfTourInner";
import OverviewToursScreen from "./src/Screens/CheckoutScreens/OverviewToursScreen";
import ProgressScreen from "./src/Screens/CheckoutScreens/ProgressScreen";
import RoadTripScreen from "./src/Screens/CategoryScreens/RoadTripScreen";
import AddStories from "./src/Screens/StoriesScreens/AddStories";
import StoriesHome from "./src/Screens/StoriesScreens/StoriesHome";
import StoryView from "./src/Screens/StoryScreens/StoryView";

// const prefix = Linking.makeUrl();
// console.log(`prefix`, prefix);

const SubApp = () => {
  const [details, setDetails] = useState();

  const linking = {
    // prefixes: [prefix],
    prefixes: ["https://www.touron.in", "https://touron.in"],
    config: {
      screens: {
        AboutUs: "about",
        HomeDrawer: {
          screens: {
            Home: {
              screens: {
                Planned: "planned-tour",
                Surprise: "surprise-tour",
                Road: "roadtrip-tour",
                Luxury: "luxury-tour",
                Honeymoon: "honeymoon-tour",
                Wildlife: "wildlife-tour",
              },
            },
          },
        },
        HomeDrawer: {
          screens: {
            Blogs: {
              screens: {
                BlogInner: "blogdetails/:title/:id/:countryname",
                BlogHome: "blogs",
              },
            },
          },
        },
      },
    },
  };
  const [
    user,
    setUser,
    userInfo,
    setUserInfo,
    isLoggedIn,
    setIsLoggedIn,
    cities,
    countries,
    tours,
    blogs,
    fleetData,
    setFleetData,
  ] = Data();

  return (
    <NavigationContainer linking={linking}>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUserInfo,
          setUser,
          userInfo,
          tours,
          cities,
          countries,
          blogs,
          details,
          setDetails,
          fleetData,
          setFleetData,
        }}
      >
        <Drawer.Navigator
          drawerType="slides"
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
          }}
          edgeWidth={0}
          drawerStyle={{
            backgroundColor: "#000000",
            width: WIDTH * 0.75,
            opacity: 0.6,
            zIndex: 2,
          }}
          overlayColor={0}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          {!isLoggedIn && (
            <Drawer.Screen name="Get" component={GettingStartedScreen} />
          )}
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="MyRequest" component={MyRequestScreen} />
          <Drawer.Screen name="WishList" component={WishListScreen} />
          <Drawer.Screen name="MyPlans" component={MyPlansScreen} />
          <Drawer.Screen name="MyPlanInner" component={MyPlansInner} />
          <Drawer.Screen
            name="MyVisaRequestScreen"
            component={MyVisaRequestsScreen}
          />
          <Drawer.Screen name="Visa" component={VisaDetailsScreen} />
          <Drawer.Screen name="VisaInner" component={VisaInner} />
          <Drawer.Screen name="RequestInner" component={RequestInner} />
          <Drawer.Screen name="SignInScreen" component={SignInScreen} />
          <Drawer.Screen name="SignUpScreen" component={SignUpScreen} />
          <Drawer.Screen
            options={{
              title: "About Us",
              headerShown: false,
              headerTransparent: false,
            }}
            name="AboutUs"
            component={AboutUs}
          />
          <Drawer.Screen
            options={{
              title: "Contact Us",
              headerShown: false,
              headerTransparent: false,
            }}
            name="ContactUs"
            component={ContactUs}
          />
          <Drawer.Screen
            options={{
              title: "",
              headerShown: false,
              headerTransparent: true,
            }}
            name="Feedback"
            component={FeedbackScreen}
          />
          <Drawer.Screen
            options={{
              title: "",
              headerShown: false,
              headerTransparent: true,
            }}
            name="CountryInner"
            component={CountryInnerScreen}
          />
          <Drawer.Screen
            options={{
              title: "",
              headerShown: false,
              headerTransparent: true,
            }}
            name="CityInner"
            component={CityInnerScreen}
          />
          <Drawer.Screen
            options={{
              title: "",
              headerShown: false,
              headerTransparent: true,
            }}
            name="TourInner"
            component={TourInnerScreen}
          />
          <Drawer.Screen
            options={{
              title: "",
              headerShown: false,
              headerTransparent: true,
            }}
            name="BlogInner"
            component={BlogInnerScreen}
          />

          {/* Self stck screen */}
          <Drawer.Screen name="SelfPlanForm" component={SelfPlanForm} />
          <Drawer.Screen
            name="OverviewCities"
            component={OverviewCitiesScreen}
          />
          <Drawer.Screen name="SelfTourHome" component={SelfTourHome} />
          <Drawer.Screen name="SelfTourInner" component={SelfTourInner} />
          <Drawer.Screen name="OverviewTours" component={OverviewToursScreen} />
          <Drawer.Screen name="Progress" component={ProgressScreen} />
          {/* Self stck screen */}

          {/* Home Stack Screen */}
          <Drawer.Screen name="Planned" component={PlannedTourScreen} />
          <Drawer.Screen name="Surprise" component={SurpriseTourScreen} />
          <Drawer.Screen name="Road" component={RoadTripScreen} />
          <Drawer.Screen name="Wildlife" component={WildLife} />
          <Drawer.Screen name="Luxury" component={Luxury} />
          <Drawer.Screen name="Honeymoon" component={Honeymoon} />
          <Drawer.Screen name="CountryHome" component={CountryHomeScreen} />
          <Drawer.Screen name="CityHome" component={CityHomeScreen} />
          <Drawer.Screen name="TourHome" component={TourHomeScreen} />
          {/* Home Stack Screen */}

          <Drawer.Screen name="StoryView" component={StoryView} />
          <Drawer.Screen name="StoriesHome" component={StoriesHome} />
          <Drawer.Screen name="AddStories" component={AddStories} />
        </Drawer.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default SubApp;
