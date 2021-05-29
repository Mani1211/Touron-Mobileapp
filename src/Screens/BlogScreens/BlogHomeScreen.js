import React, { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import touron from "../../api/touron";
import { FontAwesome } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import axios from "axios";
import { AuthContext } from "./../../context/AuthContext";
import SearchBar from "./../../Reusable Components/SearchBar";
import BlogTile from "./BlogTile";
import BlogList from "./BlogList";
import HeaderTile from "./../../Reusable Components/HeaderTile";

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
        <HeaderTile name={"Blogs"} navigation={navigation} />

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
                      <BlogTile
                        navigation={navigation}
                        item={item}
                        navName={"BlogInner"}
                      />
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
                      <BlogList
                        index={index}
                        navigation={navigation}
                        item={item}
                        navName={"BlogInner"}
                      />
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
