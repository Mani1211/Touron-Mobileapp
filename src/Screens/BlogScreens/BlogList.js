import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const BlogList = ({ navigation, item, navName, index }) => {
  return (
    <View
      key={index}
      style={{
        width: WIDTH * 0.8,
        // flexWrap: "wrap",
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: 2,
        paddingBottom: 20,
      }}
    >
      <View>
        <Image
          style={{
            width: 75,
            height: 75,
            borderRadius: 10,
            marginRight: 20,
          }}
          source={{ uri: item.imageSrc }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 15 }}>{item.blogTitle}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navName, {
              title: item.blogTitle,
              id: item._id,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="timer" size={24} color="black" />
            <Text
              style={{
                fontFamily: "Andika",
                fontSize: 16,
                paddingHorizontal: 5,
              }}
            >
              Read More
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogList;
