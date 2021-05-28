import React, { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  Text,
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
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import HTMLView from "react-native-htmlview";
import axios from "axios";
import { AuthContext } from "./../../context/AuthContext";
import SearchBar from "./../../Reusable Components/SearchBar";

const BlogHomeScreen = ({ navigation, route }) => {
  const { blogs } = useContext(AuthContext);
  const [blog, setBlog] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [blogloaded, setBlogLoaded] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [cat, setCat] = useState("Popular");
  const getBlog = async () => {
    try {
      const blogResponse = await touron.get(`/blog/search?page=1&pageSize=200`);
      setBlog(blogResponse.data);
      // console.log(`object`, blogResponse.data);
      setBlogLoaded(false);
      setLoaded(false);
    } catch (err) {
      console.log(err, "err");
      alert(err.message);
    }
  };

  const searchs = () => {
    if (searchText === "") return blogs;
    const da = blogs.filter((c) => {
      return (
        c.countryName
          ?.trim()
          .toUpperCase()
          .includes(searchText.trim().toUpperCase()) ||
        c.blogTitle
          .trim()
          .toUpperCase()
          .includes(searchText.trim().toUpperCase())
      );
    });

    return da;
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getBlog();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <ScrollView
      style={{
        backgroundColor: "#FFF",
        // flex: 1,
        height: HEIGHT * 1,
        maxHeight: HEIGHT * 1,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: Platform.OS === "android" ? 30 : 60,
            marginLeft: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flex: 1 }}
          >
            <FontAwesome name="arrow-circle-left" size={34} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: 23,
                fontFamily:
                  Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
                paddingLeft: 20,
              }}
            >
              Blogs
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <SearchBar
            onChangeText={(t) => setSearchText(t)}
            placeholder={"Search Blogs...."}
          />
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
                paddingLeft: 20,
                minHeight: HEIGHT / 2.8,
                marginBottom: 10,
              }}
            >
              {searchs().length === 0 ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ fontFamily: "Andika", textAlign: "center" }}>
                    No results found for your search
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={searchs()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
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
                            height: HEIGHT / 2.8,
                            width: WIDTH * 0.7,
                            marginHorizontal: 10,
                            marginVertical: 5,
                            borderRadius: 20,
                            elevation: 5,
                          }}
                        >
                          <View style={{ position: "relative" }}>
                            <ProgressiveImage
                              style={{
                                height: HEIGHT / 2.8,
                                width: WIDTH * 0.7,
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
                              width: WIDTH * 0.7,
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
                                      {item.content.slice(0, 50)}...
                                    </Text>
                                  )}
                                </>
                              ) : (
                                <>
                                  {Object.keys(item).includes("content") &&
                                  item.content.charAt(0) === "<" ? (
                                    <HTMLView
                                      value={item.content.slice(0, 35)}
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
                                      {item.content.slice(0, 55)}...
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
              )}
            </View>
            <View
              style={{
                width: WIDTH * 0.5,
                paddingHorizontal: 25,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => setCat("Popular")}>
                  <Text
                    style={{
                      fontFamily: "Avenir",
                      fontSize: 16,
                      backgroundColor: "#E28633",
                      opacity: cat === "Popular" ? 1 : 0.5,
                      borderRadius: Platform.OS === "ios" ? 40 : 10,
                      padding: 10,
                      marginRight: 10,
                      color: "#fff",
                    }}
                  >
                    Popular
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCat("Recent")}>
                  <Text
                    style={{
                      fontFamily: "Avenir",
                      fontSize: 16,
                      backgroundColor: "#E28633",
                      opacity: cat === "Recent" ? 1 : 0.5,
                      borderRadius: 10,
                      padding: 10,
                      marginRight: 10,
                      color: "#fff",
                    }}
                  >
                    Recent
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                style={{
                  width: WIDTH,
                  paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
              >
                {blog.map((item, index) => {
                  if (
                    cat === "Popular"
                      ? index > 100 && index < 140
                      : index >= 0 && index < 20
                  )
                    return (
                      <View
                        key={index}
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
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("BlogInner", {
                                title: item.blogTitle,
                                id: item._id,
                              })
                            }
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <MaterialIcons
                                name="timer"
                                size={24}
                                color="black"
                              />
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
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                })}
              </ScrollView>
            </View>
          </>
        )}
      </>
    </ScrollView>
  );
};

export default BlogHomeScreen;
