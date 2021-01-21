import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ContentList = ({ title, more, navigation, route, data, content }) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
        {more === "" ? null : (
          <TouchableOpacity
            onPress={() => navigation.navigate(route, { name: "" })}
          >
            <Text style={styles.more}>{more}</Text>
          </TouchableOpacity>
        )}
      </View>
      {content === "" ? null : (
        <Text
          style={{
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "900",
            marginTop: 5,
          }}
        >
          {content}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: 15,
  },
  titleStyle: {
    fontSize: 18,
    marginLeft: 0,
    marginBottom: 1,
    fontFamily: "Avenir",
    fontStyle: "normal",
  },
  more: {
    fontSize: 10,
    // marginTop: -6,
    marginRight: 10,
    backgroundColor: "#626E7B",
    color: "white",
    padding: 8,
    borderRadius: 5,
  },
});
export default ContentList;
