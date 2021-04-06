import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GettingStartedScreen from "./AuthScreens/GettingStartedScreen";
import SignUpScreen from "./AuthScreens/SignUpScreen";
import SignInScreen from "./AuthScreens/SignInScreen";
import MainTabScreen from "./MainTabScreen";
import { AuthContext } from "../context/AuthContext";
import Data from "../Data/Data";
Data;
const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  // const { isLoggedIn } = useContext(AuthContext);

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
  ] = Data();
  // console.log("user,userInfo,isLoggedIn :>> ", user, userInfo, isLoggedIn);

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="GettingStarted"
    >
      {isLoggedIn ? null : (
        <RootStack.Screen
          name="GettingStarted"
          component={GettingStartedScreen}
        />
      )}
      <RootStack.Screen name="Main" component={MainTabScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
};
