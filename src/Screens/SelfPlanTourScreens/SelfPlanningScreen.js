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

import { AuthContext } from "../../context/AuthContext";
const SelfPlanningScreen = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // console.log(isLoggedIn, "k");

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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SelfPlanForm")}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Get Started</Text>
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
  },
  buttonText: {
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
  },
});
export default SelfPlanningScreen;
