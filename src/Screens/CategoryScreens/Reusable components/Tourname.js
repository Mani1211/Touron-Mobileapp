import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import HeaderTile from "./../../../Reusable Components/HeaderTile";
import TextButton from "./../../../Reusable Components/TextButton";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Tourname = ({ imgSrc, step, description, tourName, navigation }) => {
  return (
    <View>
      <HeaderTile name={tourName} navigation={navigation} />
      <View
        style={{
          width: WIDTH,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: imgSrc }}
          style={{ height: HEIGHT / 3.5, width: 230, marginTop: 20 }}
        />
      </View>

      <View style={{ marginHorizontal: WIDTH / 9, paddingTop: 15 }}>
        <Text
          style={{
            fontSize: Platform.OS === "ios" ? 14 : 13,
            fontFamily: "Andika",
          }}
        >
          {description}
        </Text>
      </View>

      {/* <TouchableOpacity onPress={step}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Get Started</Text>
        </View>
      </TouchableOpacity> */}
      <TextButton
        label="Get Started"
        customContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          // marginBottom: 65,
          marginVertical: 30,
        }}
        customLabelStyle={{
          borderRadius: 10,
          backgroundColor: "#E28633",
          padding: 15,
          fontSize: 16,
        }}
        onPress={() => step()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 65,
    marginVertical: 30,
  },
  buttonText: {
    borderRadius: 10,
    backgroundColor: "#E28633",
    padding: 15,
    fontSize: 16,
    fontFamily: "Andika",
    color: "#fff",
  },
});

export default Tourname;
