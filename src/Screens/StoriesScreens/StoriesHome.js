import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { database } from "firebase";
import HeaderTile from "./../../Reusable Components/HeaderTile";
import { AntDesign, Feather } from "@expo/vector-icons";
import { AuthContext } from "./../../context/AuthContext";

const StoriesHome = ({ navigation }) => {
  const { setFleetData } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const { width, height } = useWindowDimensions();
  const [storiesData, setStoriesData] = useState([]);
  const [storyLoaded, setStoryLoaded] = useState(false);
  const isFocused = useIsFocused();
  console.log(`storiesData`, storiesData);

  useEffect(() => {
    getStories();
  }, [isFocused]);

  const getStories = () => {
    setStoryLoaded(true);
    let v = [];
    database()
      .ref("stories")
      .on("value", (data) => {
        data.forEach((d) => {
          let stories = [];
          d.forEach((s) => {
            stories.push({ key: s.key, value: s.val() });
          });
          v.push({
            storyNumber: d.key,
            categoryTitle: stories[0].value.categoryTitle,
            stories: stories,
          });
        });
      });

    setStoriesData(v);
    setStoryLoaded(false);
  };

  const deleteStory = (key) => {
    // console.log(`key`, key);
    database()
      .ref(`stories/story${step}/${key}`)
      .remove()
      .then(() => getStories());
  };

  const NotFound = () => (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../../assets/Stories/NoStories.png")}
        style={{ height: height * 0.4, width: width * 0.9 }}
      />

      <Text style={{ fontSize: 20, fontFamily: "Andika", padding: 10 }}>
        No Stories Found
      </Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddStories", {
            story: step,
            key: null,
            value: null,
            categoryName: null,
          })
        }
      >
        <Text style={styles.addStory}>Add Stories</Text>
      </TouchableOpacity>
    </View>
  );

  const SingleStory = ({ id, value, index }) => (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <View style={styles.singleStory}>
        <Text style={{ fontFamily: "Andika", fontSize: 18 }}>
          {index + 1}.{value.storyTitle}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Feather
            onPress={() => console.warn("EDit")}
            name="edit-3"
            size={28}
            onPress={() => {
              navigation.navigate("AddStories", {
                key: id,
                value: value,
                story: step,
                categoryName: null,
              });
            }}
            color="black"
            style={{ color: "#E28633", paddingHorizontal: 10 }}
          />
          <AntDesign
            onPress={() => console.warn("Delete")}
            name="delete"
            size={28}
            onPress={() => deleteStory(id)}
            color="black"
            style={{ color: "red" }}
          />
        </View>
      </View>
    </View>
  );

  const render = () => {
    const sto = storiesData.find((s) =>
      s?.storyNumber.includes(step.toString())
    );
    return sto?.stories ? sto?.stories : [];
  };

  const stories = [
    {
      name: "Story 1",
      number: 1,
    },
    {
      name: "Story 2",
      number: 2,
    },
    {
      name: "Story 3",
      number: 3,
    },
    {
      name: "Story 4",
      number: 4,
    },
    {
      name: "Story 5",
      number: 5,
    },
    {
      name: "Story 6",
      number: 6,
    },
    {
      name: "Story 7",
      number: 7,
    },
    {
      name: "Story 8",
      number: 8,
    },
    {
      name: "Story 9",
      number: 9,
    },
    {
      name: "Story 10",
      number: 10,
    },
  ];
  return (
    <View style={{ flex: 1, paddingTop: 20, backgroundColor: "#fff" }}>
      {storyLoaded ? (
        <ActivityIndicator size={28} />
      ) : (
        <>
          <HeaderTile name={"Stories"} navigation={navigation} />
          <Text
            style={{
              fontSize: 30,
              paddingTop: 40,
              paddingLeft: 10,
              fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
            }}
          >
            Stories Section
          </Text>
          <View
            style={{
              flexDirection: "row",
              margin: 20,
              justifyContent: "center",
            }}
          >
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.number}
              data={stories}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity onPress={() => setStep(item.number)}>
                    <Text
                      style={[
                        styles.storyHead,
                        {
                          backgroundColor:
                            step === item.number ? "#E28633" : "#D9D9D9",
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          {render().length === 0 ? (
            <NotFound />
          ) : (
            <ScrollView
              contentContainerStyle={{
                width: width,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Andika",
                  textAlign: "center",
                  paddingVertical: 10,
                }}
              >
                Category : {render()[0].value.categoryTitle}
              </Text>
              {render().map((d, index) => {
                return (
                  <SingleStory
                    id={d.key}
                    value={d.value}
                    key={d.key}
                    index={index}
                  />
                );
              })}
              <TouchableOpacity
                style={{ width: "40%", alignSelf: "center", marginBottom: 40 }}
                onPress={() =>
                  navigation.navigate("AddStories", {
                    story: step,
                    key: null,
                    value: null,
                    categoryName: render()[0].value.categoryTitle,
                  })
                }
              >
                <Text style={styles.addStory}>Add Stories</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default StoriesHome;

const styles = StyleSheet.create({
  storyHead: {
    fontSize: 18,
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 5,
    borderRadius: 30,
  },
  singleStory: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  addStory: {
    fontSize: 18,
    color: "#fff",
    paddingVertical: 12,
    backgroundColor: "#E28633",
    paddingHorizontal: 18,
    marginRight: 5,
    borderRadius: 30,
    textAlign: "center",
    width: "100%",
  },
});
