import React from "react";
import {
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f2027",
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          flex: 1,
          zIndex: 10,
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
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
      {fleet.type === "IMAGE" && (
        <View>
          <Image
            style={{ height: height, width: width, position: "relative" }}
            source={{
              uri: fleet.imageUrl,
            }}
          />
          <View style={{ position: "absolute", bottom: 20 }}>
            <Text style={{ fontSize: 23, color: "#fff" }}>
              {fleet.storyTitle}
            </Text>
            <Text style={{ fontSize: 23, color: "#fff" }}>
              {fleet.storyContent}
            </Text>
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

      <View
        style={{
          height: 5,
          width: width,
          position: "absolute",
          top: 45,
          marginBottom: 10,
          flexDirection: "row",
          marginHorizontal: 15,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        {user.stories.map((i, index) => (
          <View
            key={index}
            style={{
              height: 3,
              width: fleetCount > 1 ? customWidth : singleWidth,
              marginBottom: 10,
              marginRight: fleetCount - 1 === index ? 0 : 5,
              backgroundColor: fleetIndex < index ? "#e7e7e739" : "#e1e1e1",
              borderRadius: 50,
            }}
          ></View>
        ))}
      </View>
      <View
        style={{
          position: "absolute",
          top: 45,
          left: 5,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              padding: 5,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#fff",
              marginRight: 20,
            }}
          >
            <Image
              style={{ height: 50, width: 50, borderRadius: 30 }}
              source={{
                uri: fleet.imageUrl,
              }}
            />
          </View>
          <View>
            {/* <Text style={{ fontSize: 23, color: "#fff" }}>{user.username}</Text> */}
            <Text style={{ fontSize: 23, color: "#fff" }}>
              {fleet.categoryTitle}
            </Text>
            <Text style={{ fontSize: 15, color: "#fff" }}>12 hours ago</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StoryViewTile;
