import React from "react";
import { View, TouchableOpacity, Image, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Promotions = ({ setSelectedPromotion, setModalVisible, item, index }) => {
  return (
    <View
      key={index}
      style={{
        width: WIDTH * 0.9,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setSelectedPromotion();
          setModalVisible();
        }}
      >
        <Image
          style={{
            width: WIDTH * 0.8,
            height: HEIGHT / 1.9,
            borderRadius: 10,
          }}
          source={{ uri: item.image }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Promotions;
