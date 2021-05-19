import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  Platform,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import touron from "../../api/touron";
import { Surface } from "react-native-paper";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import { Feather, MaterialIcons } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import HTMLView from "react-native-htmlview";
import axios from "axios";

const BlogHomeScreen = ({ navigation, route }) => {
  const [blog, setBlog] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [blogloaded, setBlogLoaded] = useState(true);
  const [pageSize, setpageSize] = useState(12);
  const [page, setPage] = useState(1);
  const getBlog = async () => {
    try {
      const blogResponse = await touron.get(
        `/blog/search?page=${page}&pageSize=${pageSize}`
      );
      setBlog([...blog, ...blogResponse.data]);
      // console.log(`object`, blogResponse.data);
      setBlogLoaded(false);
      setLoaded(false);
    } catch (err) {
      console.log(err, "err");
      alert(err.message);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getBlog();
    return () => {
      setpageSize(15);
      setPage(1);
      source.cancel();
    };
  }, [page]);

  return (
    <ScrollView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
        marginTop: Platform.OS === "ios" ? 20 : 0,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: Platform.OS === "android" ? 30 : 60,
          marginLeft: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Feather name="arrow-left" style={{ fontSize: 30 }} />
        </TouchableOpacity>

        <View>
          <Text style={{ fontSize: 23, fontFamily: "Avenir", paddingLeft: 20 }}>
            Blogs
          </Text>
        </View>
      </View>
      {loaded ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: HEIGHT,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginVertical: 30,
              paddingLeft: 20,
            }}
          >
            <FlatList
              data={blog}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                if (index < 5)
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("BlogInner", {
                          title: item.blogTitle,
                          id: item._id,
                        })
                      }
                    >
                      <Surface
                        style={{
                          width: WIDTH * 0.8,
                          marginHorizontal: 10,
                          marginVertical: 5,
                          borderRadius: 20,
                          elevation: 5,
                          height: HEIGHT / 2.5,
                        }}
                      >
                        <View style={{ position: "relative" }}>
                          <ProgressiveImage
                            style={{
                              height: HEIGHT / 2.5,
                              width: WIDTH * 0.8,
                              borderRadius: 15,
                            }}
                            resizeMode="cover"
                            source={{ uri: item.imageSrc }}
                          />
                        </View>
                        <View
                          style={{
                            position: "absolute",
                            bottom: 0,
                            backgroundColor: "#0006",
                            borderBottomRightRadius: 15,
                            borderBottomLeftRadius: 15,
                            width: WIDTH * 0.8,
                            height: HEIGHT / 9,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              fontFamily: "NewYorkl",
                              marginHorizontal: 10,
                              color: "#fff",
                              marginTop: 4,
                            }}
                          >
                            {item.blogTitle}
                          </Text>
                          <View style={{ marginHorizontal: 10 }}>
                            {Platform.OS === "ios" ? (
                              <>
                                {Object.keys(item).includes("content") &&
                                item.content.charAt(0) === "<" ? (
                                  <HTMLView
                                    value={item.content.slice(0, 45)}
                                    stylesheet={{
                                      p: {
                                        fontSize: 14,
                                        padding: 0,
                                        fontFamily: "Andika",
                                        color: "#fff",
                                      },
                                    }}
                                  />
                                ) : (
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      fontFamily: "Andika",
                                      color: "#fff",
                                      padding: 0,
                                    }}
                                  >
                                    {item.content.slice(0, 105)}...
                                  </Text>
                                )}
                              </>
                            ) : (
                              <>
                                {Object.keys(item).includes("content") &&
                                item.content.charAt(0) === "<" ? (
                                  <HTMLView
                                    value={item.content.slice(0, 45)}
                                    stylesheet={{
                                      p: {
                                        fontSize: 14,
                                        padding: 0,
                                        fontFamily: "Andika",
                                        color: "#fff",
                                      },
                                    }}
                                  />
                                ) : (
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      fontFamily: "Andika",
                                      color: "#fff",
                                      padding: 0,
                                    }}
                                  >
                                    {item.content.slice(0, 75)}...
                                  </Text>
                                )}
                              </>
                            )}
                          </View>
                        </View>
                      </Surface>
                    </TouchableOpacity>
                  );
              }}
            />
          </View>
          <View
            style={{
              width: WIDTH * 0.5,
              paddingHorizontal: 25,
              paddingBottom: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "Avenir",
                fontSize: 25,
                paddingVertical: 10,
              }}
            >
              Popular
            </Text>

            {blog.map((item, index) => {
              if (index > 5)
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("BlogInner", {
                        title: item.blogTitle,
                        id: item._id,
                      })
                    }
                  >
                    <View
                      style={{
                        width: WIDTH * 0.8,
                        // flexWrap: "wrap",
                        flexDirection: "row",
                        marginTop: 20,
                        alignItems: "center",
                        borderBottomColor: "#f2f2f2",
                        borderBottomWidth: 2,
                        paddingBottom: 20,
                      }}
                    >
                      <View>
                        <Image
                          style={{
                            width: 75,
                            height: 75,
                            borderRadius: 10,
                            marginRight: 20,
                          }}
                          source={{ uri: item.imageSrc }}
                        />
                      </View>
                      <View>
                        <Text style={{ fontSize: 15 }}>{item.blogTitle}</Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <MaterialIcons name="timer" size={24} color="black" />
                          <Text
                            style={{
                              fontFamily: "Andika",
                              fontSize: 16,
                              paddingHorizontal: 5,
                            }}
                          >
                            Read More
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
            })}
          </View>

          {loaded ? null : (
            <TouchableOpacity
              onPress={() => {
                setBlogLoaded(true);
                setPage(page + 1);
              }}
            >
              <View
                style={{
                  margin: 10,
                  marginBottom: 30,
                  width: WIDTH,
                  alignItems: "center",
                }}
              >
                {blogloaded ? (
                  <View
                    style={{
                      backgroundColor: "#95a5a6",
                      paddingHorizontal: 40,
                      paddingVertical: 10,
                      borderRadius: 20,
                      marginBottom: 100,
                    }}
                  >
                    <ActivityIndicator color="white" />
                  </View>
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      backgroundColor: "#95a5a6",
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 20,
                      marginBottom: 100,
                    }}
                  >
                    Load More ...
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default BlogHomeScreen;
