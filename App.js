import { Dimensions, Image } from "react-native";
import React, { useState, useEffect } from "react";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import SubApp from "./SubApp";
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
  const [appLoading, setAppLoading] = useState(true);
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

  if (appLoading) {
    return (
      <Surface
        style={{
          backgroundColor: "#fff",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          elevation: 20,
        }}
      >
        <Image
          source={require("./assets/playstore.png")}
          style={{ width: WIDTH, height: HEIGHT / 2 }}
        />
      </Surface>
    );
  }

  return <SubApp />;
};

export default App;
