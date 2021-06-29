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
          v.push(d.val());
        });
      });
    console.log(`v`, v);
    setFleetData(v);
  };

  useEffect(() => {
    getStoriesData();
  }, []);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={fleetData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          if (index === 0) return <SingleFleet story={item} index={index} />;
        }}
      />
    </View>
  );
};

export default Story;
