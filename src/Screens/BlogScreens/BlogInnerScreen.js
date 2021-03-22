import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import touron from "../../api/touron";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const BlogInnerScreen = ({ navigation, route }) => {
  const item = route.params.item;
  const [click, setClick] = useState(false);

  const filteredTour = async (name) => {
    const tourResponse = await touron.get(`/tour/countryname/${name}`);
    return tourResponse.data;
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      filteredTour();
    }
    return () => (mounted = false);
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <StatusBar />
      <View
        style={{
          // height: HEIGHT / 10,
          position: "absolute",
          zIndex: 2,
          alignItems: "center",
          flexDirection: "row",
          marginTop: Platform.OS === "ios" ? 20 : 25,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("BlogHome")}>
          <View
            style={{
              paddingLeft: 16,
            }}
          >
            <AntDesign name="arrowleft" size={30} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={{ width: WIDTH, height: HEIGHT / 3 }}
          source={{ uri: item.imageSrc }}
        />
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}
      >
        <Text
          style={{
            backgroundColor: "transparent",
            borderColor: "black",
            padding: 8,
            margin: 8,
            fontSize: 12,
            fontFamily: "NewYorkl",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          {item.countryName}
        </Text>
        {item.cityName.length == 0 ? null : (
          <Text
            style={{
              backgroundColor: "transparent",
              borderColor: "black",
              padding: 8,
              margin: 8,
              fontSize: 12,
              fontFamily: "NewYorkl",
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            {item.cityName[0]}
          </Text>
        )}

        {!click ? (
          <TouchableOpacity onPress={() => setClick(true)}>
            {item.cityName.length > 2 ? (
              <Text>+ {item.cityName.length - 1}</Text>
            ) : null}
          </TouchableOpacity>
        ) : (
          <>
            {item.cityName.map((c, index) => {
              if (index > 0) {
                return (
                  <Text
                    style={{
                      backgroundColor: "transparent",
                      position: "relative",
                      borderColor: "black",
                      padding: 8,
                      margin: 5,
                      fontSize: 12,
                      fontFamily: "NewYorkl",
                      borderWidth: 1,
                      zIndex: 10,
                      borderRadius: 10,
                    }}
                  >
                    {c}
                  </Text>
                );
              }
            })}
            <TouchableOpacity onPress={() => setClick(false)}>
              <View style={{ bottom: 10, zIndex: 20 }}>
                <Text
                  style={{
                    padding: 3,
                    fontSize: 20,
                    fontFamily: "Avenir",
                  }}
                >
                  X
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text
        style={{
          fontFamily: "NewYorkl",

          fontSize: 26,
          margin: 10,
        }}
      >
        {item.blogTitle}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <Image
            style={{ width: WIDTH / 8, height: WIDTH / 8, borderRadius: 50 }}
            source={require("../../../assets/logo.jpeg")}
          />
        </View>
        <Text style={{ fontFamily: "Andika", fontSize: 16 }}>
          PUBLISHED {item.createdAt.slice(0, 10)} {"\n"}by tour On Team
        </Text>
      </View>

      <Text
        style={{
          marginVertical: 10,
          marginHorizontal: 15,
          fontFamily: "Andika",
          fontSize: 15,
          lineHeight: HEIGHT / 40,
        }}
      >
        {item.content}
      </Text>

      {item.subHeading1 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading1}
          </Text>
        </View>
      )}
      {item.imageSrc1 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc1 }}
          />
        </View>
      )}
      {item.content1 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            fontFamily: "Andika",

            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content1}
        </Text>
      )}

      {item.subHeading2 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading2}
          </Text>
        </View>
      )}
      {item.imageSrc2 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc2 }}
          />
        </View>
      )}
      {item.content2 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            fontFamily: "Andika",

            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content2}
        </Text>
      )}

      {item.subHeading3 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading3}
          </Text>
        </View>
      )}
      {item.imageSrc3 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc3 }}
          />
        </View>
      )}
      {item.content3 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            fontFamily: "Andika",

            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content3}
        </Text>
      )}

      {item.subHeading4 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading4}
          </Text>
        </View>
      )}
      {item.imageSrc4 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc4 }}
          />
        </View>
      )}
      {item.content4 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            fontFamily: "Andika",

            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content4}
        </Text>
      )}

      {item.subHeading4 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading4}
          </Text>
        </View>
      )}
      {item.imageSrc5 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc5 }}
          />
        </View>
      )}
      {item.content5 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            fontFamily: "Andika",

            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content5}
        </Text>
      )}

      {item.subHeading6 == "" && item.content6 == "" ? null : (
        <View style={{ margin: 10 }}>
          <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
            {item.subHeading6}
          </Text>
        </View>
      )}
      {item.imageSrc6 == "" ? null : (
        <View>
          <Image
            style={{ width: WIDTH, height: HEIGHT / 3 }}
            source={{ uri: item.imageSrc6 }}
          />
        </View>
      )}
      {item.content6 == "" ? null : (
        <Text
          style={{
            marginVertical: 10,
            marginHorizontal: 15,
            fontSize: 15,
            lineHeight: HEIGHT / 40,
          }}
        >
          {item.content6}
        </Text>
      )}

      <View
        style={{
          padding: 5,
          paddingLeft: 10,
          backgroundColor: "#EBE5E5",
          borderRadius: 15,
          marginTop: HEIGHT / 10,
          alignItems: "center",
          paddingVertical: HEIGHT / 17,
        }}
      >
        <Text
          style={{
            fontFamily: "Avenir",
            fontSize: 20,
            paddingBottom: 20,
          }}
        >
          Explore Tours in {item.countryName}
        </Text>
        <FlatList
          data={filteredTour(item.countryName)}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("TourInner", { item: item })}
              >
                <Surface
                  style={{
                    width: WIDTH / 2.3,
                    marginHorizontal: 5,
                    marginVertical: 10,
                    height: HEIGHT / 4,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                >
                  <View>
                    <Image
                      style={{
                        height: WIDTH / 2.3,
                        height: HEIGHT / 6,
                        borderRadius: 10,
                      }}
                      source={{ uri: item.imageUrl }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Andika",
                        paddingHorizontal: 5,
                        paddingLeft: 10,
                      }}
                    >
                      {item.tourName}
                    </Text>
                  </View>
                </Surface>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default BlogInnerScreen;
