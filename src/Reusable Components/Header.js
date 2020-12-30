import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const Header = ({ navigation, name }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          top: 0,
          right: 0,
          left: 0,
          height: HEIGHT / 10,
          backgroundColor: "#83b8f9",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack("Home")}>
          <View style={{ justifyContent: "center", height: HEIGHT / 10 + 20 }}>
            <Image
              source={require("../../assets/l.png")}
              style={{
                height: 25,
                width: 25,
                marginLeft: 20,
                marginTop: 20,
                flexBasis: "20%",
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexBasis: "80%",
            justifyContent: "center",
            marginTop: HEIGHT / 10 / 2.2,
            height: HEIGHT / 10 + 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              height: 80,
              color: "white",
              width: WIDTH,
              justifyContent: "center",
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
