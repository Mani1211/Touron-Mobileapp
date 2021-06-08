import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GettingStartedScreen from "./AuthScreens/GettingStartedScreen";
import SignUpScreen from "./AuthScreens/SignUpScreen";
import SignInScreen from "./AuthScreens/SignInScreen";
import MainTabScreen from "./MainTabScreen";
import { AuthContext } from "../context/AuthContext";
const RootStack = createStackNavigator();

export const RootStackScreen = ({ navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [initialRouteName, setInitialRouteName] = useState("GettingStarted");
  useEffect(() => {
    if (isLoggedIn) {
      setInitialRouteName("Main");
    }
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <RootStack.Screen name="Main" component={MainTabScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
};
