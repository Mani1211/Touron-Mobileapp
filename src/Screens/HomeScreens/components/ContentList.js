import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ContentList = ({ title, more, navigation, route, data, content }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text
          style={{
            marginTop: 5,
            marginBottom: 10,
            fontFamily: "WSansl",
            fontStyle: "normal",
            fontWeight: "900",
          }}
        >
          {content}
        </Text>
      </View>
      {more === "" ? null : (
        <TouchableOpacity
          onPress={() => navigation.navigate(route, { name: "" })}
        >
          <Text style={styles.more}>{more}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 18,
    marginLeft: 0,
    marginTop: 30,
    fontFamily: "NewYorkl",
    fontStyle: "normal",
  },
  more: {
    fontSize: 10,
    marginTop: -6,
    marginRight: 10,
    backgroundColor: "#626E7B",
    color: "white",
    padding: 8,
    borderRadius: 5,
  },
});
export default ContentList;
