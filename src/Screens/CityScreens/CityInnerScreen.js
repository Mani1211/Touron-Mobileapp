import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
  Platform,
  Dimensions,
} from "react-native";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import { FontAwesome } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CityInnerScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const openWhatsApp = (name) => {
    let url = `whatsapp://send?text=Hi,I would like to go ${name} help me to plan on that &phone= +91 8667801206`;

    Linking.openURL(url).catch(() => {
      alert("Make sure WhatsApp installed on your device");
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            top: 22,
            zIndex: 10,
            left: 25,
            position: "absolute",
            top: Platform.OS === "ios" ? 60 : 30,
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
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FCity%20images%2FSnow.png?alt=media&token=936e12e6-2aa7-428c-9267-f7ae81d9259b",
              }}
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
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FCity%20images%2FAirplane.png?alt=media&token=ef57fbc2-8078-4ae4-9298-e821da444437",
              }}
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
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FCity%20images%2FCalendar.png?alt=media&token=e6b7dfb2-8e95-45ae-9c75-c224ebe4d1a8",
              }}
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
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FCity%20images%2Fairport.png?alt=media&token=1d805907-b079-439f-ae93-44231f5c0e06",
            }}
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
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Coming soon");
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
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fcountry%20Images%2Fshop.png?alt=media&token=a67aec96-88e6-4f78-a686-86a45252d511",
                }}
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
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fcountry%20Images%2Ftravelplan.png?alt=media&token=fb1e0519-63a0-465a-a463-712d284cda0a",
                }}
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
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fcountry%20Images%2Fcontact.png?alt=media&token=4e591282-e4ce-4a36-8cbc-ea306d366df7",
                }}
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
    position: "relative",
    height: HEIGHT / 1.6,
    width: WIDTH,
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
    fontSize: 15,
    marginHorizontal: 30,
    fontFamily: "Andika",
  },
});
