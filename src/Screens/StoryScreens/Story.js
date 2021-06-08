import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";
import SingleFleet from "./SingleStory";
import { database } from "firebase";

const Story = () => {
  const [fleetData, setFleetData] = useState([]);

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
  }, []);

  return (
    <View>
      <FlatList
        data={fleetData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <SingleFleet user={item} />}
      />
    </View>
  );
};

export default Story;
