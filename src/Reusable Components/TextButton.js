import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const TextButton = ({
  customContainerStyle,
  customLabelStyle,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...customContainerStyle }}>
        <Text
          style={{
            fontFamily: "Andika",
            color: "#fff",
            ...customLabelStyle,
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextButton;
