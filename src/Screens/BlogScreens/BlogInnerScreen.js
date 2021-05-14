import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import touron from "../../api/touron";
import HTMLView from "react-native-htmlview";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import axios from "axios";

const BlogInnerScreen = ({ navigation, route }) => {
  const { title, id } = route.params;
  const [blogid, setBlogid] = useState(id);
  console.log(`deep Item`, title, id, blogid);
  const [blogDetails, setBlogDetails] = useState({});
  const [loaded, setLoaded] = useState(false);

  const filteredTour = async (name) => {
    const tourResponse = await touron.get(`/tour/countryname/${name}`);
    return tourResponse.data;
  };

  const getBlogDetails = async () => {
    try {
      setLoaded(true);
      const blogResponse = await touron.get(`/blog/edit/${blogid}`);
      setBlogDetails(blogResponse.data);
      setLoaded(false);
    } catch (err) {
      console.log(err, "ergggr");
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getBlogDetails();

    return () => source.cancel();
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      filteredTour();
    }
    return () => (mounted = false);
  }, []);

  return (
    <>
      {loaded ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: 2,
              alignItems: "center",
              flexDirection: "row",
              top: 0,
              left: 0,
              marginTop: Platform.OS === "ios" ? 20 : 25,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setBlogid("");
                navigation.navigate("BlogHome");
              }}
            >
              <View
                style={{
                  paddingLeft: 16,
                }}
              >
                <AntDesign name="arrowleft" size={30} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
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
            <TouchableOpacity
              onPress={() => {
                setBlogid("");
                navigation.navigate("BlogHome");
              }}
            >
              <View
                style={{
                  paddingLeft: 16,
                }}
              >
                <AntDesign name="arrowleft" size={30} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 25 }}>
            <View>
              <Image
                style={{
                  width: WIDTH,
                  height: HEIGHT / 2,
                  borderBottomRightRadius: 30,
                  borderBottomLeftRadius: 30,
                }}
                source={{ uri: blogDetails.imageSrc }}
              />
            </View>
            {Object.keys(blogDetails).includes("countryName") && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
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
                  {blogDetails.countryName}
                </Text>
              </View>
            )}

            <Text
              style={{
                fontFamily: "NewYorkl",

                fontSize: 26,
                margin: 10,
              }}
            >
              {blogDetails.blogTitle}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  marginHorizontal: 10,
                }}
              >
                <Image
                  style={{
                    width: WIDTH / 7,
                    height: WIDTH / 7,
                    borderRadius: 50,
                  }}
                  source={require("../../../assets/logo.jpeg")}
                />
              </View>
              <Text style={{ fontFamily: "Andika", fontSize: 16 }}>
                PUBLISHED {moment(blogDetails.createdAt).format("MMMM Do YYYY")}
                {"\n"}
                by tour On Team
              </Text>
            </View>
            {Object.keys(blogDetails).includes("content") &&
            blogDetails.content.charAt(0) === "<" ? (
              <HTMLView
                value={blogDetails.content}
                stylesheet={{
                  p: {
                    marginVertical: 10,
                    marginHorizontal: 15,
                    fontSize: 15,
                    fontFamily: "Andika",
                    lineHeight: HEIGHT / 40,
                  },
                  h1: {
                    fontFamily: "Andika",
                    color: "#fff",
                  },
                }}
              />
            ) : (
              <Text
                style={{
                  marginVertical: 10,
                  marginHorizontal: 15,
                  fontFamily: "Andika",
                  fontSize: 15,
                  lineHeight: HEIGHT / 40,
                }}
              >
                {blogDetails.content}
              </Text>
            )}

            {blogDetails.subHeading1 == "" ? null : (
              <View style={{ margin: 10 }}>
                <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
                  {blogDetails.subHeading1}
                </Text>
              </View>
            )}
            {Object.keys(blogDetails).includes("imageSrc1") &&
            blogDetails.imageSrc1.length < 10 ? null : (
              <View>
                <Image
                  style={{ width: WIDTH, height: HEIGHT / 3 }}
                  source={{ uri: blogDetails.imageSrc1 }}
                />
              </View>
            )}
            {blogDetails.content1 == "" ? null : (
              <>
                {Object.keys(blogDetails).includes("content1") &&
                blogDetails.content1.charAt(0) === "<" ? (
                  <HTMLView
                    value={blogDetails.content1}
                    stylesheet={{
                      p: {
                        marginVertical: 10,
                        marginHorizontal: 15,
                        fontSize: 15,
                        fontFamily: "Andika",
                        lineHeight: HEIGHT / 40,
                      },
                      h1: {
                        fontFamily: "Andika",
                        color: "#fff",
                      },
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      marginVertical: 10,
                      marginHorizontal: 15,
                      fontFamily: "Andika",
                      fontSize: 15,
                      lineHeight: HEIGHT / 40,
                    }}
                  >
                    {blogDetails.content1}
                  </Text>
                )}
              </>
            )}

            {blogDetails.subHeading2 == "" ? null : (
              <View style={{ margin: 10 }}>
                <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
                  {blogDetails.subHeading2}
                </Text>
              </View>
            )}
            {Object.keys(blogDetails).includes("imageSrc2") &&
            blogDetails.imageSrc2.length < 10 ? null : (
              <View>
                <Image
                  style={{ width: WIDTH, height: HEIGHT / 3 }}
                  source={{ uri: blogDetails.imageSrc2 }}
                />
              </View>
            )}
            {blogDetails.content2 == "" ? null : (
              <>
                {Object.keys(blogDetails).includes("content2") &&
                blogDetails.content2.charAt(0) === "<" ? (
                  <HTMLView
                    value={blogDetails.content2}
                    stylesheet={{
                      p: {
                        marginVertical: 10,
                        marginHorizontal: 15,
                        fontSize: 15,
                        fontFamily: "Andika",
                        lineHeight: HEIGHT / 40,
                      },
                      h1: {
                        fontFamily: "Andika",
                        color: "#fff",
                      },
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      marginVertical: 10,
                      marginHorizontal: 15,
                      fontFamily: "Andika",
                      fontSize: 15,
                      lineHeight: HEIGHT / 40,
                    }}
                  >
                    {blogDetails.content2}
                  </Text>
                )}
              </>
            )}

            {blogDetails.subHeading3 == "" ? null : (
              <View style={{ margin: 10 }}>
                <Text style={{ fontFamily: "NewYorkl", fontSize: 18 }}>
                  {blogDetails.subHeading3}
                </Text>
              </View>
            )}
            {Object.keys(blogDetails).includes("imageSrc3") &&
            blogDetails.imageSrc3.length < 10 ? null : (
              <View>
                <Image
                  style={{ width: WIDTH, height: HEIGHT / 3 }}
                  source={{ uri: blogDetails.imageSrc3 }}
                />
              </View>
            )}
            {blogDetails.content3 == "" ? null : (
              <>
                {Object.keys(blogDetails).includes("content3") &&
                blogDetails.content3.charAt(0) === "<" ? (
                  <HTMLView
                    value={blogDetails.content3}
                    stylesheet={{
                      p: {
                        marginVertical: 10,
                        marginHorizontal: 15,
                        fontSize: 15,
                        fontFamily: "Andika",
                        lineHeight: HEIGHT / 40,
                      },
                      h1: {
                        fontFamily: "Andika",
                        color: "#fff",
                      },
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      marginVertical: 10,
                      marginHorizontal: 15,
                      fontFamily: "Andika",
                      fontSize: 15,
                      lineHeight: HEIGHT / 40,
                    }}
                  >
                    {blogDetails.content3}
                  </Text>
                )}
              </>
            )}
          </View>

          {/* <View
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
          Explore Tours in {blogDetails.countryName}
        </Text>
        <FlatList
          data={filteredTour(blogDetails.countryName)}
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
      </View> */}
        </ScrollView>
      )}
    </>
  );
};

export default BlogInnerScreen;
