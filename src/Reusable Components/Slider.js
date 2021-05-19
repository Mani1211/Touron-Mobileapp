import React, { useState, useRef, useEffect } from "react";
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

const Slider = ({
  data,
  renderItem,
  key,
  dotStyle,
  showDots,
  setActiveSlide,
}) => {
  console.log(`objecat`, typeof setActiveSlide);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slidesRef = useRef(null);
  const viewableItemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
    if (typeof setActiveSlide == "function") {
      console.log(`calling`);
      setActiveSlide(viewableItems[0].index);
    }
  }).current;
  const { width, height } = useWindowDimensions();

  return (
    <>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(item, i) => i.toString()}
          renderItem={renderItem}
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
        {showDots && (
          <View style={{ marginTop: 20, flexDirection: "row", height: 64 }}>
            {data.map((s, i) => {
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
                  style={[dotStyle, { width: dotWidth, opacity }]}
                  key={i.toString()}
                ></Animated.View>
              );
            })}
          </View>
        )}
      </View>
    </>
  );
};

export default Slider;

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
