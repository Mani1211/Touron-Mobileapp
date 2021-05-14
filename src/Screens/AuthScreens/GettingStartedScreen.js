import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const GettingStartedScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(2);
  console.log(`currentIndex`, currentIndex);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slidesRef = useRef(null);
  const viewableItemChanged = useRef(({ viewableItems }) => {
    console.log(`item`, viewableItems);
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const { width, height } = useWindowDimensions();
  const slides = [
    {
      key: "1",
      image: require("../../../assets/intros/1.png"),
    },
    {
      key: "2",
      image: require("../../../assets/intros/2.png"),
    },
    {
      key: "3",
      image: require("../../../assets/intros/3.png"),
    },
    {
      key: "4",
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
    // navigation.navigate("HomeDrawer");
    console.log(`clicked`);
  };

  return (
    <>
      {/* <AppIntroSlider
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
      /> */}
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <FlatList
          // onViewableItemsChanged={(d) => console.log(`d`, d)}
          data={slides}
          key={(item, index) => item.key}
          renderItem={({ item }) => (
            <View>
              <Image
                source={item.image}
                resizeMode="cover"
                style={{ height: height * 0.8, width: width }}
              />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={32}
          onScroll={
            new Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )
          }
          bounces={true}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        {currentIndex === slides.length - 1 && (
          <TouchableOpacity onPress={_onDone}>
            <View
              style={{
                marginTop: 20,
                borderRadius: 5,
                paddingHorizontal: 25,
                paddingVertical: 10,
                backgroundColor: "#ff6b81",
              }}
            >
              <Text
                style={{ color: "#fff", fontFamily: "Andika", fontSize: 20 }}
              >
                Get Started
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={{ marginTop: 20, flexDirection: "row", height: 64 }}>
          {slides.map((s, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: "clamp",
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                style={[styles.dot, { width: dotWidth, opacity }]}
                key={i.toString()}
              ></Animated.View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default GettingStartedScreen;

const styles = new StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff6b81",
    marginHorizontal: 8,
  },
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
