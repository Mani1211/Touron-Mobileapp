import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const SingleStory = ({ user, index }) => {
  console.log(`user`, user);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("StoryView", {
          index: index,
          storyNumber: user.storyNumber,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.singleContainer}>
          {user.stories[0].value.type === "IMAGE" ? (
            <Image
              source={{ uri: user.stories[0].value.imageUrl }}
              style={styles.image}
            />
          ) : (
            <Text>{user.stories[0].value.storyContent}</Text>
          )}
        </View>
        <Text>{user.categoryTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SingleStory;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  singleContainer: {
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: 50,
    // borderWidth: 3,
    // borderColor: "#E28633",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});
