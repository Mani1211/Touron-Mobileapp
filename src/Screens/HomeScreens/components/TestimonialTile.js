import React from "react";
import HTMLView from "react-native-htmlview";
import { Text, View, Dimensions, Image } from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const TestimonialTile = ({ index, item }) => {
  return (
    <View
      key={index}
      style={{
        width: WIDTH * 0.9,
        marginHorizontal: 5,
        marginTop: 20,
        justifyContent: "center",
        // marginBottom: 35,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          paddingVertical: 10,
          fontSize: 30,
          fontFamily: "PlaylistScript",
        }}
      >
        {item.tourPlace}
      </Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.testImage }}
          style={{
            height: HEIGHT / 2.8,
            width: WIDTH / 1.4,
            borderRadius: 40,
          }}
        />
        <View
          style={{
            paddingTop: 30,
          }}
        >
          <HTMLView
            value={item.comment}
            stylesheet={{
              p: {
                paddingLeft: 10,
                fontFamily: "Andika",
                fontSize: 13,
                textAlign: "center",
              },
            }}
          />
        </View>
        <Text style={{ textAlign: "center", paddingTop: 20 }}>{item.name}</Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Andika",
          }}
        >
          🚀 <Text style={{ fontWeight: "bold" }}>Mission</Text> to{" "}
          {item.tourPlace}
        </Text>
      </View>
    </View>
  );
};

export default TestimonialTile;
