import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "./../../context/AuthContext";
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

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const GettingStartedScreen = ({ navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slidesRef = useRef(null);
  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  useEffect(() => {
    console.log("objelknnlct");
    if (!isLoggedIn) {
      console.log("object");
      // navigation.jumpTo("HomeDrawer");
    }
  }, []);

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

  const _onDone = () => {
    navigation.navigate("HomeDrawer");
  };

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <FlatList
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
                borderRadius: 5,
                paddingHorizontal: 20,
                paddingVertical: 6,
                backgroundColor: "#ff6b81",
              }}
            >
              <Text
                style={{ color: "#fff", fontFamily: "Andika", fontSize: 18 }}
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
