import React from "react";
import { View, useWindowDimensions, FlatList } from "react-native";
import ResortTile from "./ResortTile";
const Resort = () => {
  const resorts = [
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://images.pexels.com/photos/6044984/pexels-photo-6044984.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://images.pexels.com/photos/5579729/pexels-photo-5579729.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://images.pexels.com/photos/7663387/pexels-photo-7663387.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/33653522.jpg?k=82b437d4406dbe1612164362995e071555857d70e979359be9e77551bb2f5c1c&o=&hp=1",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/100074455.jpg?k=5f0e4746cbfe7802f2de2956dfaff049dbd0da775fa58716d6c25b61cce7239d&o=&hp=1",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/33655729.jpg?k=fb9174823149e3164d1b512bfa197972f072c52c7d20aa4f64ec802a265b63ed&o=&hp=1",
    },
  ];

  const renderCity = ({ item, index }) => {
    console.log(`item`, item);
    return <ResortTile key={index} item={item} />;
  };

  return (
    <View style={{ paddingTop: 20, paddingBottom: 60 }}>
      <FlatList
        data={resorts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(d) => d._id}
        renderItem={renderCity}
      />
    </View>
  );
};

export default Resort;
