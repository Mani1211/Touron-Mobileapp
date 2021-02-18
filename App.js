import {
  YellowBox,
  Dimensions,
  View,
  ActivityIndicator,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
YellowBox.ignoreWarnings(["Remote debugger"]);
YellowBox.ignoreWarnings(["Setting a timer"]);
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
// Install this package with `expo install expo-linking`
import * as Linking from "expo-linking";

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

// const firebaseConfig = {
//   apiKey: "AIzaSyBw6zKmzlCTb3_IsSgf8SwrKhcfajFcQas",
//   authDomain: "touron-mobileapp.firebaseapp.com",
//   databaseURL: "https://touron-mobileapp.firebaseio.com",
//   projectId: "touron-mobileapp",
//   storageBucket: "touron-mobileapp.appspot.com",
//   messagingSenderId: "1009345966954",
//   appId: "1:1009345966954:web:bcabf8d980187f03e1eb13",
//   measurementId: "G-8J2032B9M6",
// };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Drawer = createDrawerNavigator();

const App = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tours, setTour] = useState([]);
  const [countries, setCountries] = useState([]);
  const [appLoading, setAppLoading] = useState(true);
  const [status, setStatus] = useState(true);
  const [networkLoader, setNetworkLoader] = useState(false);
  const [cities, setCities] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getNetwork();
    getUserData();
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getTours();
      getCities();
      // firebase.auth().onAuthStateChanged((user) => {
      //   setUser(user);
      //   setIsLoggedIn(true);
      // });
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
    const tourResponse = await touron.get(`/tour`);
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
      if (userToken !== null) {
        // console.log(userToken, "lo");
        setUser(userToken);
        setIsLoggedIn(true);
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

  const getUserData = () => {
    if (user !== null) {
      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          let val = data.val();
        });
    }
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
            isAdmin,
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
