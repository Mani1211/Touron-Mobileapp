import React, { useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../../context/AuthContext";
const SelfPlanningScreen = ({ navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace("SignInScreen");
    }
  });
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: HEIGHT / 12 }}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Self Planned Tour
        </Text>
      </View>

      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                "https://image.freepik.com/free-vector/visual-data-concept-illustration_114360-1713.jpg",
            }}
            style={{ height: HEIGHT / 3.2, width: 230, marginTop: 20 }}
          />
        </View>

        <View style={{ marginHorizontal: WIDTH / 9 }}>
          <Text
            style={{ fontSize: 14, fontFamily: "Andika", textAlign: "center" }}
          >
            Do you constantly find yourself getting frustrated with all the
            rigidly planned itineraries, when your soul yearns to wander on its
            own? Well, no more settling! Not if tourOn has a say about it. Even
            though the option reads "Plan it yourself", all you need to do is
            answer a few questions and leave the rest to us experts. We will
            help you curate your tour plan, just the way you picture it! So,
            what're you waiting for?
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SelfPlanForm")}>
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={["#9EB19E", "#9EB19E"]}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: WIDTH,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 10,
  },
  buttonText: {
    padding: 15,
    fontSize: 18,
  },
});
export default SelfPlanningScreen;
