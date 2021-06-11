import React from "react";
import {
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";

const StoryViewTile = ({
  user,
  fleet,
  goToPrevFleet,
  goToNextFleet,
  fleetIndex,
}) => {
  const { width, height } = useWindowDimensions();
  const fleetCount = user.stories.length;
  const customWidth = (width * 0.9) / fleetCount;
  const singleWidth = width * 0.95;

  const animationTypes = [
    "flipInY",
    "fadeInUp",
    "slideInDown",
    "zoomInDown",
    "zoomInRight",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.barContainer,
          {
            width: width,
          },
        ]}
      >
        {user.stories.map((i, index) => (
          <View
            key={index}
            style={{
              height: 3,
              width: fleetCount > 1 ? customWidth : singleWidth,
              marginBottom: 10,
              marginRight: fleetCount - 1 === index ? 0 : 3,
              backgroundColor: fleetIndex < index ? "#e7e7e739" : "#fff",
              borderRadius: 50,
            }}
          ></View>
        ))}
      </View>

      {fleet.type === "IMAGE" && (
        <View style={{ paddingTop: 20 }}>
          <Image
            style={{
              height: height * 0.94,
              width: width * 0.95,
              position: "relative",
              borderRadius: 6,
            }}
            resizeMode="contain"
            source={{
              uri: fleet.imageUrl,
            }}
          />
          <View
            style={{ position: "absolute", bottom: 20, backgroundColor: "red" }}
          >
            <Animatable.Text
              animation={animationTypes[Math.round(Math.random() * 4)]}
              easing="ease-out"
              style={{ fontSize: 23, color: "#fff" }}
            >
              {fleet.storyTitle}
            </Animatable.Text>
            <Animatable.Text
              animation={animationTypes[Math.round(Math.random() * 4)]}
              style={{ fontSize: 23, color: "#fff" }}
              direction="alternate"
              easing="ease-in"
            >
              {fleet.storyContent}
            </Animatable.Text>
          </View>
        </View>
      )}
      {fleet.type === "TEXT" && (
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            margin: 20,
            color: "#fff",
          }}
        >
          {fleet.storyContent}
        </Text>
      )}

      <View style={styles.prevNextContainer}>
        <TouchableOpacity
          onPress={() => goToPrevFleet()}
          style={{
            width: "50%",
            height: "100%",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => goToNextFleet()}
          style={{
            width: "50%",
            height: "100%",
          }}
        ></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StoryViewTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0f2027",
    position: "relative",
    paddingTop: Platform.OS === "ios" ? 40 : 0,
  },
  prevNextContainer: {
    position: "absolute",
    flex: 1,
    zIndex: 10,
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  barContainer: {
    height: 5,
    marginBottom: 10,
    flexDirection: "row",
    marginHorizontal: 15,
    top: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
