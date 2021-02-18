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
import * as firebase from "firebase";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "../../context/AuthContext";
const SelfPlanningScreen = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    // console.log(user, "LO");
    if (user === null) {
      navigation.replace("SignUpScreen");
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
          <Text style={{ fontSize: 14, fontStyle: "italic" }}>
            Do you constantly find yourself frustrated by the rigid itineraries
            offered while planning your travels? Well, no more settling! Not if
            tour On has a say about it! The option says “Plan Myself” but all
            you have to do is answer a few questions and leave the rest to us.
            We will contact you with a tour plan made especially for you. So,
            what are you waiting for?
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
