import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const HEIGHT = Dimensions.get("window").height;

const SelfTourInner = ({ navigation, route }) => {
  const item = route.params.item;
  return (
    <ScrollView>
      <Animatable.View
        animation="zoomInUp"
        iterationCount={1}
        direction="bounceInDown"
        style={styles.container}
      >
        <View>
          <Animatable.Image
            style={styles.image}
            animation="zoomInUp"
            iterationCount={1}
            direction="normal"
            source={{ uri: item.imageUrl }}
          />

          <LinearGradient
            colors={["#fff", "#fff"]}
            style={{
              padding: 8,
              borderRadius: 18,
              position: "absolute",
              top: 100,
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.cityName}</Text>
          </LinearGradient>
          <View
            style={{
              position: "absolute",
              top: 100,
              margin: 10,
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.tourName}>{item.tourName}</Text>
            <Text style={styles.cityName}>{item.tourCategory.join(",")}</Text>
          </View>

          <View
            style={{
              bottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              width: WIDTH * 0.9,
              marginHorizontal: 20,
              alignItems: "center",
              position: "absolute",
            }}
          >
            <View>
              <LinearGradient
                colors={["#E76847", "#FF9B60"]}
                style={{ padding: 10, borderRadius: 18 }}
              >
                <View>
                  {item.tourCost.adult == 15000 &&
                  item.tourCost.adult >= 10000 ? (
                    <Text style={{ fontSize: 18 }}>₹₹₹₹-High</Text>
                  ) : item.tourCost.adult < 10000 &&
                    item.tourCost.adult >= 5000 ? (
                    <Text style={{ fontSize: 18 }}>₹₹₹ - Medium</Text>
                  ) : item.tourCost.adult > 2500 &&
                    item.tourCost.adult < 500205 ? (
                    <Text style={{ fontSize: 18 }}>₹₹ - Low</Text>
                  ) : (
                    <Text style={{ fontSize: 18 }}>₹ - Very Low</Text>
                  )}
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <LinearGradient
                colors={["#2193b0", "#6dd5ed"]}
                style={{ padding: 10, borderRadius: 18, flexDirection: "row" }}
              >
                <Image
                  style={{ height: 25, width: 25, marginRight: 4 }}
                  source={require("../../../assets/Star.png")}
                />
                <Text style={{ fontSize: 18 }}>{item.ratings}/5</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Inner deatil */}

        <View style={[styles.innerDetail]}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>About Tour</Text>
          <View
            style={{
              borderRadius: 40,
              marginVertical: 5,
              borderColor: "#fff",
            }}
          >
            <Text style={{ lineHeight: 20, fontWeight: "700", marginLeft: 20 }}>
              {item.aboutTour}
            </Text>
          </View>

          <View style={styles.features}>
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
                  style={{ height: 40, width: 40 }}
                  source={require("../../../assets/Signs.png")}
                />
                <Text>{item.tourType}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 40, width: 40 }}
                  source={require("../../../assets/Umbrella.png")}
                />
                <Text>{item.tourDuration}</Text>
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
                  style={{ height: 40, width: 40 }}
                  source={require("../../../assets/Cocktail.png")}
                />
                <Text>{item.idealType.join(",")}</Text>
              </View>
            </View>

            {item.pickUpTime !== "-" ? (
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
                    style={{ height: 40, width: 40 }}
                    source={require("../../../assets/Flag.png")}
                  />
                  <Text>{item.pickUpTime} Pick up</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ height: 40, width: 40 }}
                    source={require("../../../assets/Scooter.png")}
                  />
                  <Text>{item.dropTime} Drop</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>

        {/* Itineary */}

        <View
          style={{
            alignItems: "center",
            width: WIDTH,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
            }}
          >
            Itinerary
          </Text>
          <View
            style={{
              margin: 20,
              borderRadius: 20,
              width: WIDTH * 0.9,
              backgroundColor: "#F1F3F6",
              padding: 10,
            }}
          >
            <Text
              style={{
                lineHeight: 20,
                fontSize: 15,
                fontFamily: "serif",
                fontWeight: "800",
              }}
            >
              {item.itinerary}
            </Text>
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
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/Scooter.png")}
            />
            <Text>{item.pickUpPoint.join(",")}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={require("../../../assets/Star.png")}
            />
            <Text>{item.tourPreferance}</Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>Additional Information</Text>
          {/* </LinearGradient> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              borderRadius: 20,
              backgroundColor: "#F1F3F6",
              padding: 15,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "serif",
                fontWeight: "800",
              }}
            >
              {item.additionalInformation}
            </Text>
          </View>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <LinearGradient
            colors={["#626E7B", "#626E7B"]}
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 20, color: "#FFF" }}>
              Select this Tour
            </Text>
          </LinearGradient>
        </View>
      </Animatable.View>
    </ScrollView>
  );
};

export default SelfTourInner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  image: {
    height: HEIGHT / 1.8,
    borderBottomLeftRadius: 40,
    resizeMode: "cover",
    borderBottomRightRadius: 40,
    position: "relative",
    width: WIDTH,
    overlayColor: "#0000",
  },
  cityName: {
    color: "#FFF",
    fontSize: 20,
    margin: 5,
    top: 40,
  },
  tourName: {
    fontSize: 25,
    color: "#FFF",
    margin: 5,
    top: 40,
  },
  innerDetail: {
    margin: 10,
  },
  features: {},
  itinerary: {},
});
