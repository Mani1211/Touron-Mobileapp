import { Dimensions } from "react-native";
import React from "react";
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
import { RootStackScreen } from "./src/Screens/RootStackScreen";
import { AuthContext } from "./src/context/AuthContext";
import Data from "./src/Data/Data";
const Drawer = createDrawerNavigator();

import * as Linking from "expo-linking";
import SignInScreen from "./src/Screens/AuthScreens/SignInScreen";
import SignUpScreen from "./src/Screens/AuthScreens/SignUpScreen";
import GettingStartedScreen from "./src/Screens/AuthScreens/GettingStartedScreen";

const prefix = Linking.makeUrl("/");

const SubApp = () => {
  const linking = {
    prefixes: [prefix],
    // prefixes: [
    //   "https://www.touron.in",
    //   "https://touron.in",
    //   "http://touron.in",
    //   "http://www.touron.in",
    // ],
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
                BlogInner: "blogdetails/:title/:id",
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
    promotions,
  ] = Data();
  console.log(`isLoggedIn`, isLoggedIn);
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
          promotions,
        }}
      >
        <Drawer.Navigator
          drawerType="slides"
          screenOptions={{
            gestureEnabled: true,
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
          {/* <Drawer.Screen name="Get" component={RootStackScreen} /> */}
          {!isLoggedIn && (
            <Drawer.Screen name="Get" component={GettingStartedScreen} />
          )}
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="MyRequest" component={MyRequestScreen} />
          <Drawer.Screen name="WishList" component={WishListScreen} />
          <Drawer.Screen name="MyPlans" component={MyPlansScreen} />
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
        </Drawer.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default SubApp;
