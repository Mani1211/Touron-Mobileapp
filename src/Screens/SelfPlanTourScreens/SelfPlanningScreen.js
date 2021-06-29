import React, { useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
import { AuthContext } from "../../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import HeaderTile from "./../../Reusable Components/HeaderTile";
import TextButton from "./../../Reusable Components/TextButton";
const SelfPlanningScreen = ({ navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!isLoggedIn) {
        navigation.navigate("SignInScreen");
      }
    }
    return () => (mounted = false);
  }, []);
  return (
    <ScrollView style={styles.container}>
      <HeaderTile name={"Self Planned Tour"} navigation={navigation} />

      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://image.freepik.com/free-vector/visual-data-concept-illustration_114360-1713.jpg",
            }}
            style={{ height: HEIGHT / 3.4, width: 230, marginTop: 20 }}
          />
        </View>

        <View style={{ marginHorizontal: WIDTH / 9 }}>
          <Text
            style={{ fontSize: 14, fontFamily: "Andika", textAlign: "center" }}
          >
            Do you constantly find yourself getting frustrated with all the
            rigidly planned itineraries,when your soul yearns to wander on its
            own? Well,no more settling!Not if tourOn has a say about it. Even
            though the option reads "Plan it yourself",all you need to do is
            answer a few questions and leave the rest to us experts.We will help
            you curate your tour plan,just the way you picture it! So, what're
            you waiting for?
          </Text>
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate("SelfPlanForm")}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableOpacity> */}
        <TextButton
          label="Get Started"
          customContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 30,
          }}
          customLabelStyle={{
            borderRadius: 10,
            backgroundColor: "#E28633",
            padding: 15,
            fontSize: 16,
          }}
          onPress={() => navigation.navigate("SelfPlanForm")}
        />
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
});
export default SelfPlanningScreen;
