import React from "react";
import { StyleSheet, View, Image, Dimensions, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const GettingStartedScreen = ({ navigation }) => {
  const slides = [
    {
      key: 1,
      image: require("../../../assets/intros/1.png"),
    },
    {
      key: 2,
      image: require("../../../assets/intros/2.png"),
    },
    {
      key: 3,
      image: require("../../../assets/intros/3.png"),
    },
    {
      key: 4,
      image: require("../../../assets/intros/4.png"),
    },
  ];
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={item.image}
          resizeMode="stretch"
          style={{ height: HEIGHT + 50, width: WIDTH }}
        />
      </View>
    );
  };
  const _renderDoneButton = () => {
    return (
      <View
        style={{
          width: WIDTH * 0.9,
          marginHorizontal: 10,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#51E1ED",
        }}
      >
        <Text>Get Started</Text>
      </View>
    );
  };
  const _onDone = () => {
    navigation.navigate("HomeDrawer");
  };

  return (
    <>
      <AppIntroSlider
        renderItem={_renderItem}
        keyExtractor={(item) => item.key.toString()}
        renderDoneButton={_renderDoneButton}
        data={slides}
        onDone={_onDone}
        nextLabel="Next"
        doneLabel="Get Started"
        bottomButton
        dotStyle={{
          backgroundColor: "#a4b0be",
        }}
        activeDotStyle={{
          backgroundColor: "#ff6b81",
        }}
      />
    </>
  );
};

export default GettingStartedScreen;

const styles = new StyleSheet.create({
  loginButton: {
    marginVertical: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 55,
    paddingVertical: 15,
    borderRadius: 10,
  },
  signupButton: {
    marginVertical: 20,
    backgroundColor: "black",
    paddingHorizontal: 45,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: WIDTH,
    alignItems: "center",
  },
});
