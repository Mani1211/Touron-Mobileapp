import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const SingleStory = ({ story }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("StoryView", { story: story })}
    >
      <View style={styles.container}>
        <View style={styles.singleContainer}>
          {story.stories[0].imageUrl !== "" ? (
            <Image
              source={{ uri: story.stories[0].imageUrl }}
              style={styles.image}
            />
          ) : (
            <Text>{story.stories[0].storyContent}</Text>
          )}
        </View>
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
    borderWidth: 3,
    borderColor: "#E28633",
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
});
