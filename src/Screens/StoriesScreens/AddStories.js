import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  Image,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import HeaderTile from "./../../Reusable Components/HeaderTile";
import { Entypo } from "@expo/vector-icons";
import { View, Fab, Toast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { storage, database } from "firebase";
import moment from "moment";
import { ProgressBar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
const AddStories = ({ navigation, route }) => {
  const { key, value, story, categoryName } = route.params;
  console.log(`key,value`, key, value, story, categoryName);
  console.log(`story`, story);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const [categoryTitle, setCategoryTitle] = useState("");
  const { width, height } = useWindowDimensions();
  const [progress, setProgress] = useState(0);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [storyUploaded, setStoryUploaded] = useState(false);

  const isFocused = useIsFocused();

  const updateStory = () => {
    const story = {
      createdAt: moment().toString(),
      storyTitle,
      storyContent,
      imageUrl,
      type: imageUrl === null ? "TEXT" : "IMAGE",
      categoryTitle,
    };
    setStoryUploaded(true);

    database()
      .ref(`stories/story${route.params.story}/${key}`)
      .update(story)
      .then(() => {
        setStoryContent("");
        setStoryTitle("");
        setImageUrl(null);
        setStoryUploaded(false);
        Toast.show({
          text: "Posted!!",
          buttonText: "Okay",
          duration: 2000,
          textStyle: {
            marginHorizontal: 20,
            fontFamily: "Andika",
            width: width * 0.7,
          },
          buttonTextStyle: {
            fontFamily: "Andika",
          },
        });
      })
      .catch((err) => {
        Toast.show({
          text: err.message,
          buttonText: "Okay",
          duration: 2000,
          textStyle: {
            marginHorizontal: 20,
            fontFamily: "Andika",
            width: width * 0.7,
          },
          buttonTextStyle: {
            fontFamily: "Andika",
          },
        });
        setStoryUploaded(true);
      });
  };
  useEffect(() => {
    if (value !== null && key !== null) {
      setStoryTitle(value?.storyTitle);
      setStoryContent(value?.storyContent);
      setCategoryTitle(value?.categoryTitle);
      setImageUrl(value?.imageUrl ? value?.imageUrl : null);
    } else {
      setCategoryTitle(categoryName);
    }
  }, [isFocused]);

  const addStory = () => {
    const story = {
      createdAt: moment().toString(),
      storyTitle,
      storyContent,
      imageUrl,
      type: imageUrl === null ? "TEXT" : "IMAGE",
      categoryTitle,
    };
    setStoryUploaded(true);

    database()
      .ref(`stories/story${route.params.story}`)
      .push(story)
      .then(() => {
        setStoryContent("");
        setStoryTitle("");
        setImageUrl(null);
        setStoryUploaded(false);
        Toast.show({
          text: "Posted!!",
          buttonText: "Okay",
          duration: 2000,
          textStyle: {
            marginHorizontal: 20,
            fontFamily: "Andika",
            width: width * 0.7,
          },
          buttonTextStyle: {
            fontFamily: "Andika",
          },
        });
      })
      .catch((err) => {
        Toast.show({
          text: err.message,
          buttonText: "Okay",
          duration: 2000,
          textStyle: {
            marginHorizontal: 20,
            fontFamily: "Andika",
            width: width * 0.7,
          },
          buttonTextStyle: {
            fontFamily: "Andika",
          },
        });
        setStoryUploaded(true);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [6, 10],
      quality: 1,
    });
    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      const ref = storage().ref(
        `stories/${moment().format("MMM Do YY")}/${Date.now()}images.jpg`
      );
      const task = ref.put(blob);

      task.on("state_changed", (taskSnapshot) => {
        const per =
          (taskSnapshot.bytesTransferred * 100) / taskSnapshot.totalBytes;

        console.log(`object`, Math.round(per) / 100);
        setProgress(Math.round(per) / 100);
      });

      task.then(() => {
        ref.getDownloadURL().then((url) => setImageUrl(url));
      });
      try {
        setImageUploaded(true);
        await task.then(() => {
          setImageUploaded(false);
          setProgress(0);
        });
      } catch (E) {
        console.log(E);
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20 }}>
      <HeaderTile navigation={navigation} name="Add Story" />
      <ScrollView>
        <View
          style={{
            width: width,
            margin: 20,
            justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="Category Name"
            placeholderTextColor="#fff"
            onChangeText={(text) => setCategoryTitle(text)}
            value={categoryTitle}
            keyboardType="default"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Story Title"
            placeholderTextColor="#fff"
            onChangeText={(text) => setStoryTitle(text)}
            value={storyTitle}
            keyboardType="default"
            style={styles.textInput}
          />
          <TextInput
            placeholder="Story Content"
            value={storyContent}
            onChangeText={(text) => setStoryContent(text)}
            placeholderTextColor="#fff"
            keyboardType="default"
            multiline
            style={[styles.textInput, { height: 100 }]}
          />
          {imageUrl !== null && (
            <Image
              source={{ uri: imageUrl }}
              style={{ height: height * 0.7, width: "90%" }}
            />
          )}
          {imageUploaded && (
            <>
              <Text>{progress * 100} %</Text>
              <ProgressBar
                style={{ backgroundColor: "#e7e7e7", width: width * 0.8 }}
                indeterminate={false}
                progress={progress}
                color="#E28633"
              />
            </>
          )}
        </View>

        {key === null ? (
          <TouchableOpacity
            onPress={addStory}
            style={{
              backgroundColor: "#E28633",
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 10,
              marginBottom: 40,
            }}
          >
            {storyUploaded ? (
              <ActivityIndicator color="#fff" size={28} />
            ) : (
              <Text
                style={{
                  fontFamily:
                    Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Post Story
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={updateStory}
            style={{
              backgroundColor: "#E28633",
              marginHorizontal: 20,
              padding: 20,
              borderRadius: 10,
              marginBottom: 40,
            }}
          >
            {storyUploaded ? (
              <ActivityIndicator color="#fff" size={28} />
            ) : (
              <Text
                style={{
                  fontFamily:
                    Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Update Story
              </Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={{ flex: 1 }}>
        <Fab
          direction="up"
          containerStyle={{ padding: 30 }}
          style={{ backgroundColor: "#E28633" }}
          position="bottomRight"
          onPress={() => pickImage()}
        >
          <Entypo name="plus" size={24} color="#fff" />
        </Fab>
      </View>
    </View>
  );
};

export default AddStories;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    backgroundColor: "#0004",
    fontSize: 16,
    fontFamily: "Andika",
    paddingHorizontal: 20,
    width: "90%",
    color: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
});
