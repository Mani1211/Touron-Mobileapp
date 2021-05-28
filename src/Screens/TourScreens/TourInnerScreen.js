import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HTMLView from "react-native-htmlview";
import {
  MaterialCommunityIcons,
  EvilIcons,
  FontAwesome,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const TourInnerScreen = ({ route, navigation }) => {
  const [step, setStep] = useState("About");

  const header = () => {
    const random = Math.floor(Math.random() * 6);
    const suggestion = [
      "Get to know more about the fascinating locations and activities which awaits you on this tour!",
      "Here are the magnificent places you will visit and things you get to do on the tour.",
      "This tour will take you to breathtaking places and give you the experience of a lifetime.Learn More",
      "Learn more about the exhilarating activities awaiting you when you embark on this journey!",
      "What are the most thrilling experiences you get to enjoy on this trip? More tour details below!",
      "This getaway is going to be everything you dreamed of and more! Read on to know the details.",
    ];
    return suggestion[random];
  };
  const head = useMemo(() => header(), []);

  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == "li") {
      return (
        <View key={index} style={{ marginTop: index === 0 ? 10 : 0 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignSelf: "flex-start",
              }}
            >
              <Text style={{ fontSize: 30, color: "#e7e7e7" }}>{"\u2022"}</Text>
            </View>
            <View
              style={{
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "#e7e7e7",
                  fontFamily: "Andika",
                  padding: 7,
                }}
              >
                {defaultRenderer(node.children, parent)}
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (node.name == "ul") {
      return <View>{defaultRenderer(node.children, parent)}</View>;
    }
  };

  const render = () => {
    switch (step) {
      case "About":
        return (
          <Text
            style={[
              styles.heading,
              { paddingVertical: 10, fontFamily: "Andika", fontSize: 13 },
            ]}
          >
            {item.aboutTour}
          </Text>
        );

      case "Elements":
        return (
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              paddingLeft: WIDTH / 15,
              paddingTop: 20,
            }}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="car"
                size={35}
                color="#fff"
                style={{ paddingHorizontal: 20 }}
              />
              <Text
                style={[
                  styles.heading,
                  { fontSize: 18, fontFamily: "Andika", paddingBottom: 0 },
                ]}
              >
                {item.tourPreferance}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="tag-heart"
                size={35}
                color="#fff"
                style={{ paddingHorizontal: 20 }}
              />
              <Text
                style={[
                  styles.heading,
                  { fontSize: 18, fontFamily: "Andika", paddingBottom: 0 },
                ]}
              >
                {item.idealType[0]}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <Entypo
                name="hour-glass"
                size={35}
                color="#fff"
                style={{
                  paddingHorizontal: 20,
                  transform: [{ rotateX: "180deg" }],
                }}
              />
              <Text
                style={[
                  styles.heading,
                  { fontSize: 18, fontFamily: "Andika", paddingBottom: 0 },
                ]}
              >
                {item.tourDuration}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={35}
                color="#fff"
                style={{ paddingHorizontal: 20 }}
              />
              <Text
                style={[
                  styles.heading,
                  { fontSize: 18, fontFamily: "Andika", paddingBottom: 0 },
                ]}
              >
                {item.pickUpPoint}
              </Text>
            </View>
          </View>
        );
      case "Itinerary":
        return (
          <ScrollView showsVerticalScrollIndicator={true}>
            {item.itinerary === "-" || item.itinerary === " " ? (
              <Text
                style={{
                  fontSize: 25,
                  color: "#e7e7e7",
                  fontFamily: "Andika",
                  textAlign: "center",
                  alignItems: "center",
                  paddingTop: 100,
                  justifyContent: "center",
                }}
              >
                Contact us to know more about this tour.
              </Text>
            ) : (
              <HTMLView
                value={item.itinerary}
                renderNode={(node, index, siblings, parent, defaultRenderer) =>
                  renderNode(node, index, siblings, parent, defaultRenderer)
                }
              />
            )}
          </ScrollView>
        );
      case "Additional":
        return (
          <ScrollView showsVerticalScrollIndicator={true}>
            {item.additionalInformation === "-" ||
            item.additionalInformation === " " ||
            item.additionalInformation === "NA" ? (
              <Text
                style={{
                  fontSize: 25,
                  color: "#e7e7e7",
                  fontFamily: "Andika",
                  textAlign: "center",
                  alignItems: "center",
                  paddingTop: 100,
                  justifyContent: "center",
                }}
              >
                Contact us to know more about this tour.
              </Text>
            ) : (
              <HTMLView
                value={item.additionalInformation}
                renderNode={(node, index, siblings, parent, defaultRenderer) =>
                  renderNode(node, index, siblings, parent, defaultRenderer)
                }
              />
            )}
          </ScrollView>
        );

      default:
        break;
    }
  };
  const item = route.params.item;

  return (
    <View>
      <View style={{ position: "relative" }}>
        <Image
          source={{
            uri: item.imageUrl,
          }}
          style={{ height: HEIGHT, width: WIDTH }}
        />
      </View>
      <TouchableOpacity
        style={{
          // height: HEIGHT * 0.8,
          alignSelf: "flex-start",
          width: "10%",
          opacity: 0.6,
          top: Platform.OS === "ios" ? 50 : 10,
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
      <View
        intensity={140}
        style={[
          {
            height: HEIGHT * 0.8,
            backgroundColor: "black",
            opacity: 0.8,
            width: WIDTH,
            bottom: 0,
            position: "absolute",
            alignItems: "center",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        ]}
      >
        <View
          style={{
            height: 8,
            width: WIDTH * 0.2,
            borderRadius: 20,
            marginTop: 10,
            backgroundColor: "#fff",
          }}
        />
        <View style={{ alignSelf: "flex-start", padding: 15 }}>
          <View
            style={{
              borderRadius: 10,
              width: WIDTH * 0.9,
              padding: 10,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <EvilIcons name="location" size={30} color="#e7e7e7" />
                <Text
                  style={{
                    fontFamily: "Andika",
                    color: "#e7e7e7",
                    paddingLeft: 6,
                  }}
                >
                  {item.cityName}
                </Text>
              </View>
              <Text
                style={{
                  paddingVertical: 10,
                  fontSize: 18,
                  fontFamily:
                    Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                  color: "#E28633",
                  paddingLeft: 8,
                }}
              >
                {item.tourName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flexGrow: 1,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Fontisto name="plane-ticket" size={20} color="#e7e7e7" />
                  <Text
                    style={{
                      fontFamily: "Andika",
                      paddingLeft: 10,
                      // fontSize: 10,
                      color: "#e7e7e7",
                    }}
                  >
                    {item.tourCategory[0]}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexGrow: 1,
                    alignItems: "center",
                  }}
                >
                  <Fontisto name="clock" size={20} color="#e7e7e7" />
                  <Text
                    style={{
                      fontFamily: "Andika",
                      paddingLeft: 10,
                      color: "#e7e7e7",
                    }}
                  >
                    {item.tourType}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: 100, maxHeight: 100 }}>
            <Text
              style={{
                fontFamily: "Andika",
                color: "#e7e7e7",
                // paddingTop: 10,
                paddingHorizontal: 19,
                paddingVertical: 10,
              }}
            >
              {head}
            </Text>
          </View>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity onPress={() => setStep("About")}>
                <Text
                  style={[
                    // { borderBottomWidth: step === "About" ? 5 : 5 },
                    {
                      color: step === "About" ? "#E28633" : "#fff",
                      // color:'E28633',
                      fontFamily:
                        Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                      paddingBottom: 5,
                      borderRadius: 5,
                    },
                  ]}
                >
                  About
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStep("Elements")}>
                <Text
                  style={[
                    {
                      color: step === "Elements" ? "#E28633" : "#fff",
                      // color:'E28633',
                      fontFamily:
                        Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                      paddingBottom: 5,
                      borderRadius: 5,
                    },
                  ]}
                >
                  Elements
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStep("Itinerary")}>
                <Text
                  style={[
                    {
                      color: step === "Itinerary" ? "#E28633" : "#fff",
                      // color:'E28633',
                      fontFamily:
                        Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                      paddingBottom: 5,
                      borderRadius: 5,
                    },
                  ]}
                >
                  Itinerary
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStep("Additional")}>
                <Text
                  style={[
                    {
                      color: step === "Additional" ? "#E28633" : "#fff",
                      // color:'E28633',
                      fontFamily:
                        Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                      paddingBottom: 5,
                      borderRadius: 5,
                    },
                  ]}
                >
                  More Info
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            style={{ paddingHorizontal: 18, marginTop: 14, marginBottom: 20 }}
          >
            {render()}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default TourInnerScreen;

const styles = StyleSheet.create({
  heading: {
    color: "#fff",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
    paddingBottom: 5,
    borderBottomColor: "#E28633",
    borderRadius: 5,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },

  container: {
    backgroundColor: "#fff",
    paddingBottom: 80,
  },
  image: {
    height: HEIGHT / 1.8,
    // borderBottomLeftRadius: 60,
    resizeMode: "cover",
    borderBottomRightRadius: 60,
    position: "relative",
    width: WIDTH,
    shadowColor: "#333",
    shadowOffset: {
      height: 20,
      width: 20,
    },
    shadowOpacity: 1,
    overlayColor: "#0000",
  },
  cityName: {
    fontSize: 20,
    fontFamily: "NewYorkl",
    margin: 5,
  },
  tourName: {
    fontSize: 25,
    marginHorizontal: 10,
    fontFamily: "NewYorkl",
    // color: "#fff",
  },
  innerDetail: {
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // marginBottom: HEIGHT / 7,
  },
  tourCategory: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 10,
    // color: "red",
    fontFamily: "NewYorkl",
    // fontFamily: "Andika",
  },
  features: {
    justifyContent: "center",
  },
  itinerary: {},
});
