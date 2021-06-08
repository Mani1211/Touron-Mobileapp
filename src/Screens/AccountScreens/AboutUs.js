import React from "react";
import {
  Text,
  Image,
  View,
  Dimensions,
  Linking,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import {
  Feather,
  MaterialIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { Surface } from "react-native-paper";

const AboutUs = ({ navigation }) => {
  const openWhatsApp = () => {
    let url = `whatsapp://send?text=&phone= +91 8667801206`;
    Linking.openURL(url)
      .then((data) => {
        // console.log("WhatsApp Opened successfully " + data);
      })

      .catch(() => {
        alert("Make sure WhatsApp installed on your device");
      });
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#fff",
          alignItems: "center",

          paddingTop: Platform.OS === "ios" ? 60 : 40,
          paddingBottom: Platform.OS === "ios" ? 20 : 20,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View>
            <Feather
              name="arrow-left"
              size={28}
              color="black"
              style={{
                paddingHorizontal: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
            }}
          >
            About US
          </Text>
        </View>
      </View>
      <View
        style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
      >
        <Image
          style={{ height: HEIGHT / 3, width: HEIGHT / 3 }}
          source={require("../../../assets/playstore.png")}
        />
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
          }}
        >
          Travel your dreams today!
        </Text>
        <Text style={{ fontFamily: "Andika", fontSize: 12 }}>
          Once a year, go somewhere you have never been before!
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontFamily: "Andika", fontSize: 15, margin: 5 }}>
          Tour On is the one-stop-shop for all your travel plans and needs. We
          work with you to manage all elements of your travel in an efficient
          and cost-effective manner. In a world filled with options, why should
          you settle for less when we give you more! TourOn’s fully customizable
          travel packages give you a tour that is tailored exactly the way you
          like it. Leave all the hard work to us! We will make your dreams
          vacation a reality. Based on a survey of your tastes and destination
          preferences, TourOn’s algorithm provides a wide range of choices with
          the best prices. All you need to do is pick!
        </Text>
      </View>
      <View>
        <Image
          style={{ height: HEIGHT / 2, width: WIDTH, marginBottom: 10 }}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fstats%20and%20Default%2Fstats.jpg?alt=media&token=cedcf91e-d051-4b9f-bc54-aa74afcb1b19",
          }}
        />
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <Text
          style={{
            fontSize: 12,
            fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
          }}
        >
          WORDS FROM
        </Text>
        <Text
          style={{
            fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
            fontSize: 16,
            color: "black",
          }}
        >
          MR.VIKASH MANOHARAN CEO, FOUNDER
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontFamily: "Andika", fontSize: 15, margin: 5 }}>
          Founded in August of 2018, TourOn has since planned and lead more than
          200 dream tours. Vikash Manoharan, Founder of TourOn, is a travel
          enthusiast and found TourOn to help others realize their wanderlust
          goals. Vikash used to work in the IT industry until one day he
          realized, a life confined to a desk is not one for him. TourOn took
          wings out of his passion for travel and has grown through his ideas as
          an experienced traveler.
        </Text>
      </View>
      <View style={{ marginHorizontal: 5 }}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
            marginVertical: 10,
          }}
        >
          Follow Us
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginHorizontal: 10,
            marginVertical: 25,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("mailto:hello@touron.in");
            }}
          >
            <Surface
              style={{
                shadowColor: "#333",
                elevation: 10,
                borderRadius: 50,
              }}
            >
              <MaterialIcons
                name="email"
                size={30}
                color="grey"
                style={{ padding: 15 }}
              />
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.facebook.com/touronholidays");
            }}
          >
            <Surface
              style={{
                shadowColor: "#333",
                elevation: 10,
                borderColor: "red",
                borderRadius: 50,
              }}
            >
              <Feather
                name="facebook"
                size={30}
                color="grey"
                style={{ padding: 15 }}
              />
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://instagram.com/touronholidays?igshid=e9jrgf69s0fi"
              );
            }}
          >
            <Surface
              style={{
                shadowColor: "#333",
                elevation: 10,

                borderColor: "red",
                borderRadius: 50,
              }}
            >
              <AntDesign
                name="instagram"
                size={30}
                color="grey"
                style={{ padding: 15 }}
              />
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://www.youtube.com/channel/UC4Q9P3-_soryPpubpbGZ5xg"
              );
            }}
          >
            <Surface
              style={{
                shadowColor: "#333",
                elevation: 10,
                borderColor: "red",
                borderRadius: 50,
              }}
            >
              <AntDesign
                name="youtube"
                size={30}
                color="grey"
                style={{ padding: 15 }}
              />
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openWhatsApp()}>
            <Surface
              style={{
                shadowColor: "#333",
                elevation: 10,
                borderColor: "red",
                borderRadius: 50,
              }}
            >
              <Ionicons
                name="logo-whatsapp"
                size={30}
                color="grey"
                style={{ padding: 15 }}
              />
            </Surface>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
