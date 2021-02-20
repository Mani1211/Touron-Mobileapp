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
import moment from "moment";
import touron from "../../api/touron";
import { Surface } from "react-native-paper";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import { Feather, MaterialIcons } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const BlogHomeScreen = ({ navigation }) => {
  const [blog, setBlog] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [blogloaded, setBlogLoaded] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(40);
  const getBlog = async () => {
    setBlogLoaded(true);
    try {
      const blogResponse = await touron.get(
        `/blog?page=1&pageSize=${pageSize}`
      );
      setBlog(blogResponse.data.reverse());
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
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
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
            paddingLeft: 20,
          }}
        >
          <FlatList
            data={blog}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => {
              if (index < 11)
                return (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("BlogInner", { item: item })
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
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "Andika",
                                color: "#fff",
                              }}
                            >
                              {item.content.slice(0, 100)}...
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "Andika",
                                color: "#fff",
                              }}
                            >
                              {item.content.slice(0, 45)}...
                            </Text>
                          )}
                        </View>
                      </View>
                    </Surface>
                  </TouchableWithoutFeedback>
                );
            }}
          />
        </View>
      )}
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{ fontFamily: "Avenir", fontSize: 25, paddingVertical: 10 }}
        >
          Popular
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {blog.map((item, index) => {
            if (index > 11)
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("BlogInner", { item: item })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      // justifyContent: "space-between",
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
                      <Text style={{ fontSize: 18 }}>{item.blogTitle}</Text>
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
        </ScrollView>
      </View>

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
    </View>
  );
};

export default BlogHomeScreen;
