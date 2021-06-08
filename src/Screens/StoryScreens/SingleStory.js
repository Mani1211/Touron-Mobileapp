import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const SingleStory = ({ user }) => {
  console.log(`user`, user);
  console.log(`us`, user.stories[0].value.imageUrl);

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("StoryView", { userId: user.storyNumber })
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
    padding: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#1B98F5",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});
