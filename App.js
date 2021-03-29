import {
  Dimensions,
  View,
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./src/Screens/DrawerContent";
import { RootStackScreen } from "./src/Screens/RootStackScreen";
import { AuthContext } from "./src/context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import AsyncStorage from "@react-native-community/async-storage";
import * as firebase from "firebase";
import MyRequestScreen from "./src/Screens/AccountScreens/MyRequestScreen";
import MyPlansScreen from "./src/Screens/AccountScreens/MyPlansScreen";
import ProfileScreen from "./src/Screens/AccountScreens/ProfileScreen";
import VisaDetailsScreen from "./src/Screens/AccountScreens/VisaDetailsScreen";
import WishListScreen from "./src/Screens/AccountScreens/WishListScreen";
import RequestInner from "./src/Screens/AccountScreens/RequestInner";
import VisaInner from "./src/Screens/AccountScreens/VisaInner";
import touron from "./src/api/touron";
import MyVisaRequestsScreen from "./src/Screens/AccountScreens/MyVisaRequests";
import * as Network from "expo-network";
import { Surface } from "react-native-paper";
import MyPlansInner from "./src/Screens/AccountScreens/MyPlansInner";

const firebaseConfig = {
  apiKey: "AIzaSyCCZ2bo_iPbtvarsADQe84qX2s9cWPMq3U",
  authDomain: "touronapp-248e4.firebaseapp.com",
  databaseURL: "https://touronapp-248e4.firebaseio.com",
  projectId: "touronapp-248e4",
  storageBucket: "touronapp-248e4.appspot.com",
  messagingSenderId: "813320271971",
  appId: "1:813320271971:web:5a10483e3c11bc953aa056",
  measurementId: "G-KCPSW6WFC9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Drawer = createDrawerNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tours, setTour] = useState([]);
  const [countries, setCountries] = useState([]);
  const [appLoading, setAppLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [networkLoader, setNetworkLoader] = useState(false);
  const [cities, setCities] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    firebase.default.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    getNetwork();
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getCities();
    }
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getTours();
    }
    return () => (mounted = false);
  }, []);

  const getNetwork = async () => {
    setNetworkLoader(true);
    const status = (await Network.getNetworkStateAsync()).isConnected;
    setStatus(status);
    setNetworkLoader(false);
  };

  const getTours = async () => {
    const tourResponse = await touron.get(`/tour?page=1&pageSize=90`);
    setTour(tourResponse.data);
  };

  const getCountries = async () => {
    const countryResponse = await touron.get(`/country`);
    setCountries(countryResponse.data);
  };
  const getCities = async () => {
    const cityResponse = await touron.get(`/city`);
    setCities(cityResponse.data);
  };

  const getToken = async () => {
    try {
      const data = await AsyncStorage.getItem("userToken");
      const userToken = JSON.parse(data);
      if (userToken) {
        setIsLoggedIn(true);
        setUser(userToken);
        // console.log(`uoken`, userToken.uid);
        getUserData(userToken.uid);
      } else {
        setUser(null);
        setUserInfo({});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const showImage = () => {
    setTimeout(() => {
      setAppLoading(false);
    }, 2300);
  };

  const getUserData = (uid) => {
    // console.log(`user.uid`, uid);
    firebase
      .database()
      .ref(`userGeneralInfo/${uid}`)
      .on("value", (data) => {
        // console.log(`d`, data);
        if (data === null) {
          setUserInfo({});
        } else {
          let val = data.val();
          setUserInfo(val);
        }
      });
  };

  useEffect(() => {
    showImage();
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getToken();
      getCountries();
    }
    return () => (mounted = false);
  }, []);

  if (appLoading) {
    return (
      <Surface
        style={{
          backgroundColor: "white",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          elevation: 20,
        }}
      >
        <Image
          source={require("./assets/logo.jpeg")}
          style={{ width: WIDTH, height: HEIGHT / 2 }}
        />
      </Surface>
    );
  }

  return (
    <>
      <StatusBar />
      {!status ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: WIDTH * 0.8,
              width: WIDTH * 0.8,
              marginTop: HEIGHT / 6,
            }}
            source={require("./assets/oops.jpg")}
          />

          {networkLoader ? (
            <TouchableOpacity
              onPress={() => {
                getNetwork();
              }}
            >
              <ActivityIndicator size="large" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                getNetwork();
              }}
            >
              <MaterialCommunityIcons name="reload" size={40} color="black" />
            </TouchableOpacity>
          )}
        </View>
      ) : (
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
          }}
        >
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
        </AuthContext.Provider>
      )}
    </>
  );
};

export default App;
