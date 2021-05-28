import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const SearchBar = ({ onChangeText, placeholder }) => {
  return (
    <View style={styles.background}>
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        onChangeText={(value) => onChangeText(value)}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <Feather name="search" style={styles.iconStyle}></Feather>
    </View>
  );
};

const styles = new StyleSheet.create({
  background: {
    height: HEIGHT / 15,
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingLeft: 10,
  },
  inputStyle: {
    fontSize: 16,
    height: HEIGHT / 15,
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  iconStyle: {
    fontSize: 23,
    alignSelf: "center",
    color: "#fff",
    marginHorizontal: 15,
    backgroundColor: "#E28633",
    padding: 8,
    opacity: 0.6,
    borderRadius: 25,
  },
});

export default SearchBar;
