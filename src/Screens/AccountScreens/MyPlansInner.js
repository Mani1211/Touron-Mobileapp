import React from "react";
import {
  Text,
  Image,
  View,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Feather } from "@expo/vector-icons";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";

const MyPlansInner = ({ navigation, route }) => {
  const item = route.params.item;
  const ln = item.cityDetails.length;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="black" />
      <View
        style={{
          backgroundColor: "black",
          height: Platform.OS === "ios" ? HEIGHT / 2.12 : HEIGHT / 1.93,
        }}
      >
        <View
          style={{
            marginTop: Platform.OS === "ios" ? 50 : 10,
            marginBottom: Platform.OS === "ios" ? 10 : 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("MyPlans")}>
            <Feather
              name="arrow-left"
              size={28}
              style={{
                paddingHorizontal: 20,
                color: "#FFF",
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Avenir",
              fontSize: 20,
              color: "#FFF",
            }}
          >
            Self Planned Tours
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 10,
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Avenir" }}>
            {item.name}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
              Adults : {item.adult}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Andika",
                paddingRight: WIDTH / 7,
              }}
            >
              Children : {item.children}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
            Phone Number : {item.phoneNumber}
          </Text>
          <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
            Onward : {item.fromData}
          </Text>
          <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
            Return :{item.toData}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 10,
            borderRadius: 20,
          }}
        >
          <FlatList
            data={item.cityDetails}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: ln == 1 ? WIDTH * 0.9 : WIDTH / 2.2,
                    height: 100,
                    backgroundColor: "#fff",
                    marginRight: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <ProgressiveImage
                    source={{ uri: item.imageUrl }}
                    style={{
                      height: WIDTH / 7,
                      width: WIDTH / 7,
                      borderRadius: 100,
                      margin: 10,
                    }}
                  />
                  <View style={{ padding: 10 }}>
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "NewYorkl",
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text style={{ color: "black", fontFamily: "Andika" }}>
                      {item.days} Days
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <Pagination
            dotsLength={item.cityDetails.length}
            activeDotIndex={1}
            dotStyle={{
              width: 30,
              marginTop: 0,
              paddingTop: 0,
              height: 7,
              // borderRadius: 5,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            }}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#FFF",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          top: -30,
        }}
      >
        <View style={{ marginHorizontal: 30, marginTop: 20 }}>
          <Text style={{ fontFamily: "Avenir", fontSize: 20 }}>
            Selected Tours
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            elevation: 5,
            borderRadius: 20,
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        >
          {item.tourDetails.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  marginHorizontal: 15,
                  height: HEIGHT / 10,
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("MyPlanInner")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ProgressiveImage
                      source={{ uri: item.imageUrl }}
                      style={{
                        height: WIDTH / 8,
                        width: WIDTH / 8,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                    <View
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 15 }}>{item.tourName}</Text>
                      {/* <Text style={{ fontSize: 14 }}>{item.cityName}</Text> */}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default MyPlansInner;
