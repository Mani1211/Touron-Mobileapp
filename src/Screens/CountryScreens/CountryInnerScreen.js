import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const CountryInnerScreen = ({ navigation, route }) => {
  const item = route.params.item;

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const openWhatsApp = (name) => {
    let url = `whatsapp://send?text=Hi,I would like to go ${name} help me to plan on that &phone= +91 8667801206`;

    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened successfully " + data);
      })
      .catch(() => {
        alert("Make sure WhatsApp installed on your device");
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            // height: HEIGHT * 0.8,
            alignSelf: "flex-start",
            width: "10%",
            opacity: 0.6,
            top: Platform.OS === "ios" ? 60 : 20,

            zIndex: 10,
            left: 15,
            position: "absolute",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <View>
            <FontAwesome name="arrow-circle-left" size={34} color="black" />
          </View>
        </TouchableOpacity>
        <ProgressiveImage
          style={styles.image}
          source={{ uri: item.imageUrl }}
        />
        <Text style={styles.countryName}>{item.countryName}</Text>

        <TouchableOpacity
          style={{
            zIndex: 1,
            bottom: -40,
            padding: 15,
            position: "absolute",
          }}
          onPress={() =>
            navigation.navigate("CityHome", { name: item.countryName })
          }
        >
          <View
            style={{
              padding: 15,
              alignItems: "center",
              borderRadius: 18,
              backgroundColor: "#E28633",
            }}
          >
            <Text style={styles.button}>Explore Cities</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: WIDTH * 0.9,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          marginTop: HEIGHT / 15,
        }}
      >
        <Text
          style={{
            padding: 10,
            lineHeight: 18,
            fontSize: 15,
            fontFamily: "Andika",
          }}
        >
          {item.aboutCountry}
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 30,
            justifyContent: "space-evenly",
            width: WIDTH * 0.9,
          }}
        >
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
              width: WIDTH / 2,
            }}
          >
            <Image
              style={{ height: 60, width: 60, marginTop: 25 }}
              source={require("../../../assets/visa.png")}
            />
            <Image
              style={{ height: 60, width: 60, marginTop: 25 }}
              source={require("../../../assets/weather.png")}
            />
            <Image
              style={{ height: 60, width: 60, marginTop: 25 }}
              source={require("../../../assets/time-zone.png")}
            />
            <AntDesign
              style={{ marginTop: 18 }}
              name="calendar"
              size={54}
              color="black"
            />
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
              width: WIDTH / 2,
              marginRight: 20,
            }}
          >
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                width: WIDTH / 2,
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  fontFamily: "Andika",
                }}
              >
                Eligible for Visa On Arrival
              </Text>
              <Text style={{ fontSize: 20, fontFamily: "NewYorkl" }}>
                {item.visa.onArrival}
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  textAlign: "center",
                  fontFamily: "Andika",
                }}
              >
                Weather throughout the Year
              </Text>
              <Text style={{ fontSize: 20, fontFamily: "NewYorkl" }}>
                {item.weather} ° C
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  textAlign: "center",
                  fontFamily: "Andika",
                }}
              >
                Time Difference From India
              </Text>
              <Text style={{ fontSize: 20, fontFamily: "NewYorkl" }}>
                {item.general.timeZone}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 14,
                  textAlign: "center",
                  fontFamily: "Andika",
                }}
              >
                Best Time to Visit
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "NewYorkl",
                  textAlign: "center",
                }}
              >
                {item.general.bestTimeToVisit.join("/")}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              showModal();
            }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 13,
                elevation: 200,
                backgroundColor: "#FA3B5A",
                padding: 15,
              }}
            >
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../../../assets/CountryInnericon/shop.png")}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Andika",
                fontSize: 12,
              }}
            >
              Shopp
            </Text>
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: HEIGHT / 2,
              zIndex: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                showModal();
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  borderRadius: 13,
                  elevation: 200,
                  backgroundColor: "#FA3B5A",
                  padding: 15,
                }}
              >
                <Image
                  style={{ height: 40, width: 40 }}
                  source={require("../../../assets/CountryInnericon/shop.png")}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "Andika",
                  fontSize: 12,
                }}
              >
                Shopp
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Planned", {
                countryName: item.countryName,
                type: "International",
              })
            }
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 13,
                elevation: 200,
                backgroundColor: "#9EB19E",
                padding: 15,
              }}
            >
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../../../assets/CountryInnericon/travelplan.png")}
              />
            </View>
            <Text
              style={{
                fontFamily: "Andika",
                textAlign: "center",
                fontSize: 12,
              }}
            >
              Start Planning for {item.countryName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openWhatsApp(item.countryName)}>
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#FFB400",
                borderRadius: 13,
                elevation: 200,
                padding: 15,
              }}
            >
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../../../assets/CountryInnericon/contact.png")}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Andika",
                fontSize: 12,
              }}
            >
              Talk to us
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CountryInnerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  image: {
    height: HEIGHT / 1.7,
    width: WIDTH,
    position: "relative",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  countryName: {
    position: "absolute",
    bottom: 65,
    fontSize: 40,
    fontFamily: "NewYorkl",

    color: "#FFF",
  },
  button: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFF",
    fontStyle: "normal",
  },
});
