import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import SingleFleet from "./SingleStory";
import { database } from "firebase";
import { useIsFocused } from "@react-navigation/native";
const Story = () => {
  // console.log(`fleetbjhvData`, fleetData);
  const [fleetData, setFleetData] = useState([]);
  const isFocused = useIsFocused();

  const getStoriesData = () => {
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
    setFleetData(v);
  };

  useEffect(() => {
    getStoriesData();
  }, [isFocused]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={fleetData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SingleFleet user={item} index={index} />
        )}
      />
    </View>
  );
};

export default Story;
