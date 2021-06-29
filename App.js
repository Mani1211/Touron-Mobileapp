import { Dimensions } from "react-native";

import React, { useState, useEffect } from "react";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import SubApp from "./SubApp";
import * as Font from "expo-font";
import { Root } from "native-base";

var firebaseConfig = {
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
  const [appLoading, setAppLoading] = useState(true);
  const fetchFont = async () => {
    try {
      await Font.loadAsync({
        Andika: require("./assets/fonts/Andika-Regular.ttf"),
        PlaylistScript: require("./assets/fonts/PlaylistScript.otf"),
        Avenir: require("./assets/fonts/AvenirLTStd-Black.otf"),
        NewYorkl: require("./assets/fonts/NewYorkLargeBlack.otf"),
      }).then(() => {
        setAppLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchFont();
    }
    return () => (mounted = false);
  });

  // return (
  //   <>
  //     {/* {!appLoading && ( */}
  //     <View
  //       style={{
  //         backgroundColor: "#fff",
  //         elevation: 20,
  //       }}
  //     >
  //       <LottieView
  //         style={{
  //           width: 400,
  //           height: 400,
  //           backgroundColor: "#eee",
  //         }}
  //         autoPlay
  //         loop
  //         source={require("./assets/intros/Lottie.json")}
  //       />
  //     </View>
  //     {/* )} */}
  //   </>
  // );

  // return <GettingStartedScreen />;
  // return <>{!appLoading && <TourInnerScreen />}</>;
  return <Root>{!appLoading && <SubApp />}</Root>;
};

export default App;
