import { Dimensions, Image, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { AuthContext } from "./src/context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import * as Network from "expo-network";
import SubApp from "./SubApp";
import Data from "./src/Data/Data";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Surface } from "react-native-paper";

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

const App = () => {
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

  const fetchFont = async () => {
    try {
      await Font.loadAsync({
        Andika: require("./assets/fonts/Andika-Regular.ttf"),
        PlaylistScript: require("./assets/fonts/PlaylistScript.otf"),
        Avenir: require("./assets/fonts/AvenirLTStd-Black.otf"),
        NewYorkl: require("./assets/fonts/NewYorkLargeBlack.otf"),
      }).then(() => setAppLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFont();
  });

  const [appLoading, setAppLoading] = useState(true);
  const [networkLoader, setNetworkLoader] = useState(false);
  const [status, setStatus] = useState(true);
  useEffect(() => {
    firebase.default.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    getNetwork();
  }, []);

  console.log("appLoading :>> ", appLoading);

  const showImage = () => {
    setTimeout(() => {
      setAppLoading(false);
    }, 1500);
  };

  const getNetwork = async () => {
    setNetworkLoader(true);
    const status = (await Network.getNetworkStateAsync()).isConnected;
    setStatus(status);
    setNetworkLoader(false);
  };

  useEffect(() => {
    showImage();
  });

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

  // if (!appLoading) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFont}
  //       onFinish={() => setAppLoading(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  return (
    <>
      <StatusBar />
      {/* {!status ? (
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
      ) : ( */}
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
        <SubApp />
      </AuthContext.Provider>
      {/* )} */}
    </>
  );
};

export default App;
