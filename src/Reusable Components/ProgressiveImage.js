import React from "react";
import { View, Animated, StyleSheet, Image } from "react-native";
import DefaultImage from "../../assets/default_image.png";
const ProgressiveImage = ({ source, style, ...props }) => {
  let defaultImageAnimated = new Animated.Value(0);
  let imageAnimated = new Animated.Value(0);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const handleImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.Image
        {...props}
        source={DefaultImage}
        style={[style, { opacity: defaultImageAnimated }]}
        onLoad={handleDefaultImageLoad}
        blurRadius={1}
      ></Animated.Image>
      <Animated.Image
        {...props}
        source={source}
        style={[style, { opacity: imageAnimated }, styles.imageOverlay]}
        onLoad={handleImageLoad}
      ></Animated.Image>
    </View>
  );
};

export default ProgressiveImage;

const styles = new StyleSheet.create({
  imageOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
