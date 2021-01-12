import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking,
  FlatList,
  ScrollView,
  Platform,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import * as Buffer from "buffer";
import * as Network from "expo-network";
import Categories from "./components/CategoriesScreen";
import ContentList from "./components/ContentList";
import { Feather } from "@expo/vector-icons";
import * as Font from "expo-font";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import { AuthContext } from "../../context/AuthContext";
import touron from "../../api/touron";
import { AppLoading } from "expo";
import Faq from "../AccountScreens/utilities/Faq";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import * as firebase from "firebase";

const HomeScreen = ({ navigation, route }) => {
  const { user, userInfo } = useContext(AuthContext);
  const [fontLoaded, setFont] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const [status, setStatus] = useState(true);
  const [networkLoader, setNetworkLoader] = useState(false);
  const [tour, setTour] = useState([]);
  const [countries, setCountries] = useState([]);
  const [banner, setBanner] = useState([]);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCounries();
    getCities();
    getTours();
  }, []);

  const fetchFont = async () => {
    await Font.loadAsync({
      Andika: require("../../../assets/fonts/Andika-Regular.ttf"),
      Avenir: require("../../../assets/fonts/AvenirLTStd-Black.otf"),
      NewYorkl: require("../../../assets/fonts/NewYorkLargeBlack.otf"),
      WSans: require("../../../assets/fonts/WorkSans-Black.ttf"),
      WSansl: require("../../../assets/fonts/WorkSans-Light.ttf"),
      SFProDisplayRegular: require("../../../assets/fonts/SF-Pro-Display-Regular.otf"),
      SFProTextRegular: require("../../../assets/fonts/SF-Pro-Text-Regular.otf"),
    });

    setFont(true);
  };

  const openWhatsApp = () => {
    let url = `whatsapp://send?text=Hi,I would like to go know more details about this offer &phone= +91 8667801206`;

    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened successfully " + data);
      })
      .catch(() => {
        alert("Make sure WhatsApp installed on your device");
      });
  };

  const testMonials = [
    {
      name: "Vikash",
      comment:
        "We really had a great time in dubai,Vikas from tour on hosted uh and done all the arrangements perfectly from his end.we will never forget our trip with tour on.It was overall a nice experience in dubai and I can't wait for my next trip with tour on",
      testImage:
        "https://images.pexels.com/photos/3556116/pexels-photo-3556116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      tourPlace: "Dubai",
    },
    {
      name: "Vikash",
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, at.dolor sit, amet consectetur adipisicing elit. Similique, at.",
      testImage:
        "https://images.pexels.com/photos/3215476/pexels-photo-3215476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      tourPlace: "Maldives",
    },
    {
      name: "Vikash",
      comment:
        "Lorem ipsum dolor sit, amet conseor sit, amet consectetur adipisicing elit. Similique, at..",
      testImage:
        "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      tourPlace: "Singapore",
    },
    {
      name: "Vikash",
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique dolor sit, amet consectetur adipisicing elit. Similique, at., at.",
      testImage:
        "https://www.seekpng.com/png/detail/60-604032_face-businessman-png-dummy-images-for-testimonials.png",
      tourPlace: "Bali",
    },
  ];
  const getTestimonial = () => {
    firebase
      .database()
      .ref("testimonials")
      .on("value", (data) => {
        if (data !== null) {
          let req = [];
          data.forEach((d) => {
            req.push(d.val());
          });

          console.log("req", req);
        }
      });
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  const getTours = async () => {
    const tours = await touron.get("/tour?page=32&pageSize=10");
    setTour(tours.data);
  };
  const getCounries = async () => {
    const country = await touron.get("/country?page=2&pageSize=10");
    setCountries(country.data);
  };
  const getCities = async () => {
    const city = await touron.get("/city?page=2&pageSize=10");
    setCities(city.data);
  };
  const getNetwork = async () => {
    setNetworkLoader(true);
    const status = (await Network.getNetworkStateAsync()).isConnected;
    setStatus(status);
    setNetworkLoader(false);
  };

  const getImage = async () => {
    const photo = await touron.get("/banner");
    setBanner(photo.data);
  };
  useEffect(() => {
    getImage();
    getNetwork();
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // getNetwork();
      fetchFont();
      setTimeout(() => {
        setLoaded(false);
      }, 5000);
    }

    return () => (mounted = false);
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // const filteredCountry = () => {
  //   const date = new Date();
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   console.log(months[date.getMonth()], "date");

  //   const currentMonth = months[date.getMonth() + 1];
  //   if (countries.length > 0)
  //     return countries.filter((c) => {
  //       return c.general.bestTimeToVisit.includes(currentMonth);
  //     });
  // };
  // const filteredCity = () => {
  //   if (cities.length > 0)
  //     return cities.filter((c) => {
  //       return c.travelDuration == "8-10 hours";
  //     });
  // };
  // const filteredTour = () => {
  //   if (tours.length > 0)
  //     return tours.filter((c) => {
  //       return c.idealType.includes("Young Couple");
  //     });
  // };

  // if (!fontLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <ScrollView
      style={{ backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        animated={true}
      />
      {fontLoaded ? (
        <View style={styles.container}>
          <View
            style={{
              height: HEIGHT / 10,
              // width: HEIGHT / 10,
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{ paddingTop: Platform.OS === "ios" ? 20 : 0 }}
            >
              <Image
                style={{
                  height: 70,
                  width: 70,
                }}
                source={require("../../../assets/logo.jpeg")}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontFamily: "Andika" }}>
              Hey, Vikash
            </Text>
          </View>

          {/* <View
            style={{
              width: window.width,
              flexDirection: "row",
              marginRight: WIDTH / 20,
            }}
          >
            {user == null ? (
              <Text style={styles.title}>Hey, Start Planning your...</Text>
            ) : (
              <Text style={styles.title}>Hey, Start Planning your...</Text>
            )}
          </View> */}
          <FlatList
            data={testMonials}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            keyExtractor={(d) => d.tourPlace}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={{
                    // width: WIDTH * 0.9,
                    // marginHorizontal: 10,
                    justifyContent: "center",
                    marginBottom: 35,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => openWhatsApp()}>
                    <Image
                      style={{
                        width: WIDTH * 0.8,
                        height: HEIGHT / 2,
                        borderRadius: 10,
                        marginHorizontal: 20,
                      }}
                      source={{
                        uri: item.testImage,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <ContentList
            route={"CountryHome"}
            navigation={navigation}
            title={"Tour Categories"}
            more={""}
            content={
              "Are you the adventurous type? Do you love a long ride? Are you an organizing freak? Whichever you are, find the ultimate vacation for you!"
            }
          />
          <Categories navigation={navigation} />
          <ContentList
            route={"CountryHome"}
            navigation={navigation}
            title={"Popular Countries"}
            more={"Show More"}
            content={
              "Explore enchanting new lands that will steal your heart. Find out more about the countries you want to visit"
            }
          />
          <FlatList
            data={countries}
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={(d) => d._id}
            renderItem={({ item, index }) => {
              if (index < 5)
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CountryInner", { item: item });
                    }}
                  >
                    <View style={styles.tileStyle}>
                      <Text style={styles.name}>{item.countryName}</Text>

                      <ProgressiveImage
                        fadeDuration={1000}
                        style={styles.cityImage}
                        source={{ uri: item.imageUrl }}
                      />
                    </View>
                  </TouchableOpacity>
                );
            }}
          />
          <ContentList
            // route={"CountryHome"}
            navigation={navigation}
            title={"Our Travellers"}
            more={""}
            content={""}
          />
          <FlatList
            data={testMonials}
            showsHorizontalScrollIndicator={false}
            horizontal
            // pagingEnabled
            keyExtractor={(d) => d.tourPlace}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: WIDTH * 0.9,
                    // backgroundColor: "#02B290",
                    marginHorizontal: 20,
                    // flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                    // height: WIDTH / 2,
                  }}
                >
                  <Image
                    source={require("../../../assets/1.jpeg")}
                    resizeMode="cover"
                    style={{
                      width: WIDTH * 0.9,
                      height: WIDTH * 0.55,
                      // borderRadius: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 20,
                    }}
                  />
                  <View
                    style={{
                      width: WIDTH * 0.9,
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        // paddingTop: 20,
                        paddingLeft: 10,
                        color: "#FF6263",
                        fontWeight: "bold",
                        fontFamily: "Avenir",
                      }}
                    >
                      {item.name},{""} {item.tourPlace}
                    </Text>
                    <Text style={{ paddingLeft: 10 }}>{item.comment}</Text>
                  </View>
                </View>
              );
            }}
          />

          <ContentList
            route={"CityHome"}
            navigation={navigation}
            title={"Marvelous Cities"}
            more={"Show More"}
            content={
              "Are you a wanderlust soul getting lost in breathtaking cities? Here are our suggestions!"
            }
          />
          <FlatList
            data={cities}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(d) => d._id}
            renderItem={({ item, index }) => {
              if (index < 5)
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CityInner", { item: item });
                    }}
                  >
                    <View style={styles.tileStyle}>
                      <Text style={styles.name}>{item.cityName}</Text>
                      <ProgressiveImage
                        fadeDuration={1000}
                        style={styles.cityImage}
                        source={{ uri: item.imageUrl }}
                      />
                    </View>
                  </TouchableOpacity>
                );
            }}
          />
          {/* <ContentList
            route={"Promotion"}
            navigation={navigation}
            title={"Hot Deals"}
            more={""}
            content={"Content Goes Here"}
          />
          <FlatList
            data={banner}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(d) => d._id}
            renderItem={({ item, index }) => {
              console.log(item._id, "datataatt");
              return (
                <TouchableOpacity onPress={() => openWhatsApp()}>
                  <View style={styles.tileStyle}>
                    <Image
                      fadeDuration={1000}
                      style={styles.bannerImage}
                      source={{
                        uri:
                          "data:image/jpeg;base64," +
                          arrayBufferToBase64(item.photo.data.data), //data.data in your case
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          /> */}
          <ContentList
            route={"TourHome"}
            navigation={navigation}
            title={"Curated Tours"}
            more={"Show More"}
            content={
              "Are you a kindred spirit looking for the perfect holiday? Look no further!"
            }
          />
          <FlatList
            data={tour}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(d) => d._id}
            renderItem={({ item, index }) => {
              if (index < 4)
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("TourInner", { item: item });
                    }}
                  >
                    <View style={styles.tileStyle}>
                      <Text style={styles.name}>{item.tourName}</Text>

                      <ProgressiveImage
                        fadeDuration={1000}
                        style={{
                          height: HEIGHT / 3.8,
                          width: WIDTH / 1.2,
                          borderRadius: 10,
                          marginVertical: 10,
                          marginRight: 10,
                        }}
                        source={{ uri: item.imageUrl }}
                      />
                    </View>
                  </TouchableOpacity>
                );
            }}
          />
        </View>
      ) : (
        <>
          <ScrollView
            style={{ flex: 1, padding: 20 }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SkeletonPlaceholder>
              <View
                style={{
                  padding: 20,
                }}
              >
                <View
                  style={{
                    width: WIDTH * 0.9,
                    height: 25,
                    borderRadius: 50,
                    marginTop: 60,
                    marginBottom: 20,
                  }}
                />
                <View
                  style={{
                    width: 100,
                    height: 30,
                    borderRadius: 50,
                    marginBottom: 40,
                  }}
                />
                <View
                  style={{
                    width: WIDTH / 2,
                    height: 20,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    width: 120,
                    height: 16,
                    borderRadius: 4,
                    marginTop: 10,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginVertical: 20,
                  }}
                >
                  <View
                    style={{ height: 100, width: 100, borderRadius: 50 }}
                  ></View>
                  <View style={{ height: 100, width: 100, borderRadius: 50 }} />
                  <View style={{ height: 100, width: 100, borderRadius: 50 }} />
                </View>
                <View
                  style={{
                    width: WIDTH * 0.7,
                    height: 20,
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "space-evenly",
                    marginVertical: 20,
                  }}
                >
                  <View style={styles.cityImage} />
                  <View style={styles.cityImage} />
                  <View style={styles.cityImage} />
                </View>
                <View
                  style={{
                    width: WIDTH * 0.7,
                    height: 20,
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "space-evenly",
                    marginVertical: 20,
                  }}
                >
                  <View style={styles.cityImage} />
                  <View style={styles.cityImage} />
                  <View style={styles.cityImage} />
                </View>
                <View
                  style={{
                    width: WIDTH * 0.7,
                    height: 20,
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 20,
                    borderRadius: 4,
                  }}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "space-evenly",
                    marginVertical: 20,
                  }}
                >
                  <View style={styles.cityImage} />
                  <View style={styles.cityImage} />
                  <View style={styles.cityImage} />
                </View>
              </View>
            </SkeletonPlaceholder>
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cityImage: {
    height: HEIGHT / 3.8 + 10,
    width: WIDTH / 2.8,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 10,
  },
  tourImage: {
    height: HEIGHT / 3.8,
    width: WIDTH / 1.2,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 10,
  },
  bannerImage: {
    height: HEIGHT / 3.8,
    width: WIDTH * 0.9,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 10,
  },
  container: {
    paddingTop: 30,
    flex: 1,
    padding: 15,
    backgroundColor: "#FFF",
  },
  tileStyle: {
    flexDirection: "column",
    position: "relative",
    marginVertical: 30,
  },
  name: {
    fontSize: 17,
    zIndex: 1,
    bottom: 15,
    position: "absolute",
    color: "white",
    fontWeight: "300",
    padding: 0,
    left: 10,
    margin: 0,
  },
  title: {
    fontSize: 30,
    color: "#626E7B",
    fontFamily: Platform.OS == "android" ? "NewYorkl" : "NewYorkl",
    marginLeft: 10,
  },
});

export default HomeScreen;
