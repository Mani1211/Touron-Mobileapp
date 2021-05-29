import React from "react";
import { View, TouchableOpacity, Text, Image, Dimensions } from "react-native";
import { Fontisto, EvilIcons } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const TourpageTile = ({ navigation, item, savedTours, onPress1, onPress2 }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("TourInner", {
          item: item,
        });
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 15,
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
                borderRadius: 30,
              }}
              source={{ uri: item.imageUrl }}
            />
          </View>

          <View
            style={{
              width: "12%",
              backgroundColor: "#D9D9D9",
              position: "absolute",
              blurRadius: 10,
              opacity: 0.8,
              top: 10,
              right: 10,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
            }}
          >
            <View>
              {savedTours.includes(item.tourName) ? (
                <TouchableOpacity
                  // onPress={() => {
                  //   let filterData = savedTours.filter((c) => {
                  //     return c != item.tourName;
                  //   });

                  //   setSavedTours(filterData);

                  //   const filterDetails = savedToursDetails.filter((c) => {
                  //     return c.tourName !== item.tourName;
                  //   });

                  //   setSavedToursDetails(filterDetails);
                  // }}
                  onPress={onPress1}
                >
                  <Fontisto
                    style={{ marginRight: 0 }}
                    name="bookmark-alt"
                    size={30}
                    style={{
                      zIndex: 10,
                      opacity: 1,
                    }}
                    color="#E28633"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ zIndex: 10 }}
                  onPress={onPress2}
                  // onPress={() => {
                  //   if (isLoggedIn) {
                  //     setSavedTours([...savedTours, item.tourName]);
                  //     setSavedToursDetails([...savedToursDetails, item]);
                  //   } else {
                  //     navigation.navigate("SignUpScreen");
                  //   }
                  // }}
                >
                  <Fontisto
                    style={{ marginRight: 0 }}
                    name="bookmark-alt"
                    size={30}
                    style={{
                      opacity: 1,
                      zIndex: 10,
                    }}
                    color="#fff"
                  />
                </TouchableOpacity>
              )}
            </View>
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
                <Text
                  style={{
                    fontFamily: "Andika",
                    paddingLeft: 4,
                  }}
                >
                  {item.cityName}
                </Text>
              </View>
              <Text
                style={{
                  paddingVertical: 10,
                  fontSize: 18,
                  paddingLeft: 8,

                  fontFamily:
                    Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                }}
              >
                {item.tourName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 6,
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
                      paddingLeft: 10,
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
                      paddingLeft: 10,
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

export default TourpageTile;
