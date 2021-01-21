import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StatusBar,
  Platform,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import touron from "../../api/touron";
import { Surface } from "react-native-paper";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import { Feather } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const BlogHomeScreen = ({ navigation }) => {
  const [blog, setBlog] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [blogloaded, setBlogLoaded] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const getBlog = async () => {
    setBlogLoaded(true);
    try {
      const blogResponse = await touron.get(
        `/blog?page=1&pageSize=${pageSize}`
      );
      setBlog(blogResponse.data);
      setBlogLoaded(false);
      setLoaded(false);
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          marginLeft: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            marginVertical: 30,
          }}
        >
          {blog.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("BlogInner", { item: item })}
            >
              <Surface
                style={{
                  width: WIDTH / 2.2,
                  marginHorizontal: 3,
                  marginVertical: 5,
                  borderRadius: 20,
                  elevation: 5,
                  height: HEIGHT / 2.5,
                }}
              >
                <View>
                  <ProgressiveImage
                    style={{
                      height: HEIGHT / 4.8,
                      width: WIDTH / 2.2,
                      borderRadius: 15,
                    }}
                    resizeMode="cover"
                    source={{ uri: item.imageSrc }}
                  />
                  {/* <Image



                    style={{
                      height: HEIGHT / 4.8,
                      width: WIDTH / 2.2,
                      borderRadius: 15,
                    }}
                    source={{ uri: item.imageSrc }}
                  /> */}
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "NewYorkl",
                      marginHorizontal: 10,
                      marginTop: 4,
                    }}
                  >
                    {item.blogTitle}
                  </Text>
                </View>
                <View style={{ marginHorizontal: 10 }}>
                  {Platform.OS === "ios" ? (
                    <Text style={{ fontSize: 14, fontFamily: "Andika" }}>
                      {item.content.slice(0, 100)}...
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 14, fontFamily: "Andika" }}>
                      {item.content.slice(0, 45)}...
                    </Text>
                  )}
                </View>
              </Surface>
            </TouchableWithoutFeedback>
          ))}
        </View>
      )}

      {loaded ? null : (
        <TouchableOpacity
          onPress={() => {
            setpageSize(pageSize + 10);
            getBlog();
          }}
        >
          <View style={{ margin: 10, width: WIDTH, alignItems: "center" }}>
            {blogloaded ? (
              <View
                style={{
                  backgroundColor: "#95a5a6",
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                  borderRadius: 20,
                }}
              >
                <ActivityIndicator color="white"></ActivityIndicator>
              </View>
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  backgroundColor: "#95a5a6",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                }}
              >
                Load More ...
              </Text>
            )}
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default BlogHomeScreen;
