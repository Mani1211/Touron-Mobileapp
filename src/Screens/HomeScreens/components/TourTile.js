import React from "react";
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { EvilIcons, Fontisto } from "@expo/vector-icons";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const TourTile = ({ navigation, item, navName }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navName, {
          item: item,
        });
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
          marginTop: 10,
          marginBottom: 40,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ position: "relative" }}>
            <Image
              style={{
                height: HEIGHT / 3,
                width: WIDTH * 0.9,
                borderRadius: 10,
              }}
              source={{ uri: item.imageUrl }}
            />
          </View>

          <View
            style={{
              width: "90%",
              backgroundColor: "#D9D9D9",
              position: "absolute",
              opacity: 0.8,
              bottom: 20,
              borderRadius: 10,
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
                <EvilIcons name="location" size={30} />
                <Text style={{ fontFamily: "Andika", paddingLeft: 4 }}>
                  {item.cityName}
                </Text>
              </View>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingLeft: 8,
                  fontSize: 18,
                  fontFamily:
                    Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                }}
              >
                {item.tourName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 6,

                  justifyContent: "space-between",
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
                  <Fontisto name="plane-ticket" size={20} color="black" />
                  <Text
                    style={{
                      fontFamily: "Andika",
                      paddingLeft: 6,
                      // fontSize: 10,
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
                  <Fontisto name="clock" size={20} color="black" />
                  <Text
                    style={{
                      fontFamily: "Andika",
                      paddingLeft: 6,
                    }}
                  >
                    {item.tourType}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TourTile;
