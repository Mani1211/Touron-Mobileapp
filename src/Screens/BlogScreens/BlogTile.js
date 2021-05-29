import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import HTMLView from "react-native-htmlview";
import { Surface } from "react-native-paper";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const BlogTile = ({ navigation, navName, item }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(navName, {
          title: item.blogTitle,
          id: item._id,
        })
      }
    >
      <Surface
        style={{
          height: HEIGHT / 2.8,
          width: WIDTH * 0.7,
          marginHorizontal: 10,
          marginVertical: 5,
          borderRadius: 20,
          elevation: 5,
        }}
      >
        <View style={{ position: "relative" }}>
          <ProgressiveImage
            style={{
              height: HEIGHT / 2.8,
              width: WIDTH * 0.7,
              borderRadius: 15,
            }}
            resizeMode="cover"
            source={{ uri: item.imageSrc }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "#0006",
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            width: WIDTH * 0.7,
            height: HEIGHT / 9,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "NewYorkl",
              marginHorizontal: 10,
              color: "#fff",
              marginTop: 4,
            }}
          >
            {item.blogTitle}
          </Text>
          <View style={{ marginHorizontal: 10 }}>
            {Platform.OS === "ios" ? (
              <>
                {Object.keys(item).includes("content") &&
                item.content.charAt(0) === "<" ? (
                  <HTMLView
                    value={item.content.slice(0, 45)}
                    stylesheet={{
                      p: {
                        fontSize: 14,
                        padding: 0,
                        fontFamily: "Andika",
                        color: "#fff",
                      },
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Andika",
                      color: "#fff",
                      padding: 0,
                    }}
                  >
                    {item.content.slice(0, 50)}...
                  </Text>
                )}
              </>
            ) : (
              <>
                {Object.keys(item).includes("content") &&
                item.content.charAt(0) === "<" ? (
                  <HTMLView
                    value={item.content.slice(0, 35)}
                    stylesheet={{
                      p: {
                        fontSize: 14,
                        padding: 0,
                        fontFamily: "Andika",
                        color: "#fff",
                      },
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Andika",
                      color: "#fff",
                      padding: 0,
                    }}
                  >
                    {item.content.slice(0, 55)}...
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

export default BlogTile;
