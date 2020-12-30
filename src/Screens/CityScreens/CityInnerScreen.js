import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  Image,
  Linking,
  View,
  Dimensions,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CityInnerScreen = ({ navigation, route }) => {
  const item = route.params.item;
  console.log(item, "TEM");
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
        <View>
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
        </View>
        <View style={styles.innerDetail}>
          <Text style={styles.cityName}>{item.cityName}</Text>
          <Text style={styles.about}>{item.aboutCity}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 50, width: 50, marginRight: 10 }}
              source={require("../../../assets/Snow.png")}
            />
            <Text style={{ fontSize: 15 }}>{item.weather}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 42, width: 42, marginRight: 10 }}
              source={require("../../../assets/Airplane.png")}
            />
            <Text style={{ fontSize: 15 }}>{item.travelDuration}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 32, width: 32, marginRight: 10 }}
              source={require("../../../assets/Calendar.png")}
            />
            <Text style={{ fontSize: 15 }}>{item.idealDays} Required</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
            marginHorizontal: 10,
          }}
        >
          <Image
            style={{ height: 45, width: 45, marginRight: 10 }}
            source={require("../../../assets/airport.png")}
          />
          <Text style={{ fontSize: 15, marginTop: 15 }}>
            {item.airportName}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 15,
            marginHorizontal: 15,
          }}
        >
          <Text
            style={{
              marginVertical: 20,
              fontSize: 36,
              textAlign: "left",
              width: WIDTH,
              marginLeft: WIDTH / 10,
              fontFamily: "NewYorkl",
            }}
          >
            Famous Places
          </Text>

          <Text style={{ fontFamily: "Andika", fontSize: 16 }}>
            {item.famousPlacesToVisit}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity>
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TourHome", { name: item.cityName })
            }
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 13,
                elevation: 200,
                backgroundColor: "#9EB19E",
                padding: 15,
                paddingHorizontal: WIDTH / 8,
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
              Explore {item.cityName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openWhatsApp(item.cityName)}>
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

export default CityInnerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F3F6",
  },
  image: {
    height: HEIGHT / 1.6,
    width: WIDTH,
    position: "relative",
  },
  cityName: {
    marginTop: 60,
    fontSize: 40,
    fontFamily: "NewYorkl",
    textAlign: "center",
  },
  innerDetail: {
    top: -30,
    flex: 1,
    backgroundColor: "#F1F3F6",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  about: {
    marginTop: 10,
    fontSize: 17,
    marginHorizontal: 30,
    fontFamily: "Andika",
  },
});
