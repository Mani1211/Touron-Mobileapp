import { Dimensions } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./src/Screens/DrawerContent";
import { RootStackScreen } from "./src/Screens/RootStackScreen";
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

const Drawer = createDrawerNavigator();

const SubApp = () => {
  return (
    <NavigationContainer>
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
        <Drawer.Screen name="HomeDrawer" component={RootStackScreen} />
        <Drawer.Screen name="MyRequest" component={MyRequestScreen} />
        <Drawer.Screen
          name="MyVisaRequestScreen"
          component={MyVisaRequestsScreen}
        />
        <Drawer.Screen name="MyPlans" component={MyPlansScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Visa" component={VisaDetailsScreen} />
        <Drawer.Screen name="VisaInner" component={VisaInner} />
        <Drawer.Screen name="WishList" component={WishListScreen} />
        <Drawer.Screen name="RequestInner" component={RequestInner} />
        <Drawer.Screen name="MyPlanInner" component={MyPlansInner} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default SubApp;
