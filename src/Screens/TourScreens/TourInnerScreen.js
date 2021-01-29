import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const HEIGHT = Dimensions.get("window").height;

const TourInnerScreen = ({ route }) => {
  const header = () => {
    const random = Math.floor(Math.random() * 6);
    console.log("random", random);
    const suggestion = [
      "Get to know more about the fascinating locations and activities which awaits you on this tour!",
      "Here are the magnificent places you will visit and things you get to do on the tour.",
      "This tour will take you to breathtaking places and give you the experience of a lifetime. Learn more about the tour below.",
      "Learn more about the exhilarating activities awaiting you when you embark on this journey!",
      "What are the most thrilling experiences you get to enjoy on this trip? More tour details below!",
      "This getaway is going to be everything you dreamed of and more! Read on to know the details.",
    ];
    return suggestion[random];
  };

  const item = route.params.item;
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={{ uri: item.imageUrl }}
            backfaceVisibility="hidden"
          />
          <View
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-end",
              position: "absolute",
              top: WIDTH - 30,
            }}
          >
            <LinearGradient
              colors={["#d5e1d9ff", "#d5e1d9ff"]}
              style={{
                padding: 8,
                borderRadius: 10,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                margin: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "NewYorkl" }}>
                {item.cityName}
              </Text>
            </LinearGradient>
          </View>
          <View
            style={{
              // position: "absolute",
              // top: 100,
              marginHorizontal: 10,
              marginTop: 5,
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.tourName}>{item.tourName}</Text>
            <Text style={styles.tourCategory}>
              Tour Type : {item.tourCategory.join(",")}
            </Text>
            <Text
              style={{
                lineHeight: 25,
                marginLeft: 8,
                marginTop: 0,
                fontFamily: "Andika",
              }}
            >
              {header()}
            </Text>
          </View>
        </View>

        {/* Inner deatil */}

        <View style={[styles.innerDetail]}>
          <Text
            style={{
              fontSize: 20,
              backgroundColor: "#d5e1d9ff",
              fontFamily: "NewYorkl",
              padding: 5,
              borderRadius: 10,
            }}
          >
            About Tour
          </Text>
          <View
            style={{
              borderRadius: 40,
              borderColor: "#fff",
            }}
          >
            <Text
              style={{
                lineHeight: 25,
                marginLeft: 20,
                marginTop: 15,
                fontFamily: "Andika",
              }}
            >
              {item.aboutTour}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: 5,
            justifyContent: "space-evenly",
          }}
        >
          {item.pickUpTime === "N.A" || item.pickUpTime === "NA" ? null : (
            <>
              <View
                style={{
                  height: WIDTH / 4,
                  width: WIDTH / 5,
                  backgroundColor: "#d5e1d9ff",

                  borderRadius: 10,
                  marginVertical: 10,
                  marginLeft: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <Text style={{ fontSize: 10 }}>Pick up</Text>
                <MaterialCommunityIcons
                  name="car-convertible"
                  size={40}
                  color="black"
                />
                <Text style={{ fontSize: 12, textAlign: "center" }}>
                  {item.pickUpTime}
                </Text>
              </View>

              <View
                style={{
                  // height: WIDTH / 4,
                  height: WIDTH / 4,
                  width: WIDTH / 2.8,
                  backgroundColor: "#d5e1d9ff",
                  borderRadius: 10,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="bus-clock"
                  size={35}
                  color="black"
                  style={{ marginBottom: 10 }}
                />

                <Text style={{ fontSize: 12, textAlign: "center" }}>
                  {item.pickUpPoint[0]}
                </Text>
                {item.pickUpPoint[1] == null ? null : (
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    {item.pickUpPoint[1]}
                  </Text>
                )}
              </View>
              <View
                style={{
                  height: WIDTH / 4,
                  width: WIDTH / 4.6,
                  backgroundColor: "#d5e1d9ff",
                  borderRadius: 10,
                  marginVertical: 10,
                  marginRight: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Text style={{ fontSize: 10 }}>Drop</Text>
                <MaterialCommunityIcons
                  name="car-convertible"
                  size={40}
                  color="black"
                />
                <Text style={{ fontSize: 12, textAlign: "center" }}>
                  {item.dropTime}
                </Text>
              </View>
            </>
          )}
          <View
            style={{
              height: WIDTH / 4,
              width: WIDTH / 5,
              backgroundColor: "#d5e1d9ff",

              borderRadius: 10,
              marginVertical: 10,
              marginLeft: 15,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontSize: 11 }}>Tour</Text>
            <AntDesign
              name="star"
              size={28}
              color="black"
              style={{ marginVertical: 5 }}
            />
            <Text style={{ fontSize: 12 }}>{item.tourPreferance}</Text>
          </View>
          <View
            style={{
              height: WIDTH / 4,
              width: WIDTH / 2.8,
              backgroundColor: "#d5e1d9ff",
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 5,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <MaterialIcons
              name="loyalty"
              size={35}
              color="black"
              style={{ marginBottom: 10 }}
            />
            <Text style={{ fontSize: 12 }}>{item.idealType[0]}</Text>
            {item.idealType[1] == null ? null : (
              <Text style={{ fontSize: 10 }}>{item.idealType[1]}</Text>
            )}
          </View>

          <View
            style={{
              height: WIDTH / 4,
              width: WIDTH / 4.6,
              backgroundColor: "#d5e1d9ff",
              borderRadius: 10,
              marginVertical: 10,
              marginRight: 15,
              justifyContent: "center",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Text style={{ fontSize: 10 }}>{item.tourType}</Text>
            <Ionicons
              name="md-time"
              size={30}
              color="black"
              style={{ marginVertical: 5 }}
            />
            <Text style={{ fontSize: 12 }}>{item.tourDuration}</Text>
          </View>
        </View>

        {item.itinerary === "-" ? null : (
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                backgroundColor: "#d5e1d9ff",
                padding: 5,
                fontFamily: "NewYorkl",
                borderRadius: 10,
              }}
            >
              Itinerary
            </Text>

            <View
              style={{
                borderRadius: 40,
                marginVertical: 5,
                borderColor: "#fff",
              }}
            >
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 15,
                  fontFamily: "Andika",
                }}
              >
                {item.itinerary}
              </Text>
            </View>
          </View>
        )}

        {item.additionalInformation == "-" ||
        item.additionalInformation == "NA" ? null : (
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                backgroundColor: "#d5e1d9ff",
                fontFamily: "NewYorkl",

                padding: 5,
                borderRadius: 10,
              }}
            >
              Additional Information
            </Text>

            <View
              style={{
                borderRadius: 40,
                marginVertical: 5,
                borderColor: "#fff",
              }}
            >
              <Text
                style={{
                  lineHeight: 20,
                  marginLeft: 20,
                  marginTop: 15,
                  fontFamily: "Andika",
                }}
              >
                {item.additionalInformation}
              </Text>
            </View>
          </View>
        )}

        {/* Button */}
        {/* <View style={{ marginHorizontal: 20 }}>
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
        </View> */}
      </View>
    </ScrollView>
  );
};

export default TourInnerScreen;

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
    fontSize: 28,
    marginHorizontal: 10,
    fontFamily: "NewYorkl",
    // color: "#fff",
  },
  innerDetail: {
    margin: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  tourCategory: {
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 5,

    // fontFamily: "NewYorkl",
    fontFamily: "WSansl",
  },
  features: {
    justifyContent: "center",
  },
  itinerary: {},
});

// {/* <View style={styles.features}>
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "center",

//         alignItems: "center",
//       }}
//     >
//       <Image
//         style={{ height: 40, width: 40 }}
//         source={require("../../../assets/Scooter.png")}
//       />
//       <Text>{item.pickUpPoint.join(",")}</Text>
//     </View>
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "center",

//         alignItems: "center",
//       }}
//     >
//       {/* <Image
//         style={{ height: 40, width: 40 }}
//         source={require("../../../assets/Star.png")}
//       />
//       <Text>{item.tourPreferance}</Text> */}
//       </View>

//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Image
//           style={{ height: 40, width: 40 }}
//           source={require("../../../assets/Signs.png")}
//         />
//         <Text>{item.tourType}</Text>
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Image
//           style={{ height: 40, width: 40 }}
//           source={require("../../../assets/Umbrella.png")}
//         />
//         <Text>{item.tourDuration}</Text>
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",

//           alignItems: "center",
//         }}
//       >
//         <Image
//           style={{ height: 40, width: 40 }}
//           source={require("../../../assets/Cocktail.png")}
//         />
//         <Text>{item.idealType.join(",")}</Text>
//       </View>

//       {item.pickUpTime !== "-" ? (
//         <View
//           style={{
//             marginVertical: 10,
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Image
//               style={{ height: 40, width: 40 }}
//               source={require("../../../assets/Flag.png")}
//             />
//             <Text>{item.pickUpTime} Pick up</Text>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Image
//               style={{ height: 40, width: 40 }}
//               source={require("../../../assets/Scooter.png")}
//             />
//             <Text>{item.dropTime} Drop</Text>
//           </View>
//         </View>
//       ) : null}
//     </View>
