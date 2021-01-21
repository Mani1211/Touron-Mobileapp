import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking,
  Animated,
  Alert,
  Modal,
  FlatList,
  ScrollView,
  Platform,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";
import HTMLView from "react-native-htmlview";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Thumbnail } from "native-base";
import * as Network from "expo-network";
import Categories from "./components/CategoriesScreen";
import ContentList from "./components/ContentList";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { Portal, Provider } from "react-native-paper";

import { AuthContext } from "../../context/AuthContext";
import touron from "../../api/touron";
import { AppLoading } from "expo";
import Faq from "../AccountScreens/utilities/Faq";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import * as firebase from "firebase";
const HomeScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user, userInfo } = useContext(AuthContext);
  const [fontLoaded, setFont] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState(true);
  const [networkLoader, setNetworkLoader] = useState(false);
  const [tour, setTour] = useState([]);
  const [countries, setCountries] = useState([]);
  const [banner, setBanner] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedPromotion, setSelectedPromotion] = useState({});

  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCounries();
    getCities();
    getTours();
  }, []);

  const fetchFont = async () => {
    await Font.loadAsync({
      Andika: require("../../../assets/fonts/Andika-Regular.ttf"),
      PlaylistScript: require("../../../assets/fonts/PlaylistScript.otf"),
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
        "We really had a great time in dubai,Vikas from tour on hosted uh and done all the arrangements perfectly from his end.we will never forget our trip with tour my next trip with tour on",
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
  // const getTestimonial = () => {
  //   firebase
  //     .database()
  //     .ref("testimonials")
  //     .on("value", (data) => {
  //       if (data !== null) {
  //         let req = [];
  //         data.forEach((d) => {
  //           req.push(d.val());
  //         });

  //         console.log("req", req);
  //       }
  //     });
  // };

  useEffect(() => {
    // getTestimonial();
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
    }

    return () => (mounted = false);
  }, []);

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
  //

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const _renderItem = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            borderColor: "#00000008",
            borderWidth: 0.5,
            backgroundColor: "#6A1B4D",
            borderRadius: 10,
            paddingBottom: 20,
            elevation: 2,
            marginTop: 20,
            // marginBottom: 20,
            // height: HEIGHT / 3.5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingTop: 20,
            }}
          >
            <Image
              source={{ uri: item.testImage }}
              resizeMode="cover"
              style={{
                height: WIDTH / 5,
                width: WIDTH / 5,
                borderRadius: 50,
              }}
            />
            <View style={{ paddingHorizontal: 15 }}>
              <Text
                style={{
                  color: "#333",
                  fontSize: 20,
                  fontFamily: "NewYorkl",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Andika",
                }}
              >
                {item.tourPlace}
              </Text>
            </View>
          </View>
          <View
            style={{
              // width: WIDTH,
              padding: 10,
            }}
          >
            <Text style={{ paddingLeft: 10 }}>{item.comment}</Text>
          </View>
        </View>
      </>
    );
  };
  const htmlContent = `<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>`;

  return (
    <Provider>
      <Portal>
        {fontLoaded ? (
          <ScrollView
            style={{ backgroundColor: "#fff" }}
            showsVerticalScrollIndicator={false}
          >
            <StatusBar
              barStyle="dark-content"
              backgroundColor="#FFF"

              // animated={true}
            />
            {/* <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          > */}

            <View style={styles.container}>
              <>
                <Modal transparent visible={modalVisible}>
                  <ScrollView>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View>
                          <Image
                            source={{ uri: selectedPromotion.testImage }}
                            style={{
                              width: WIDTH * 0.91,
                              height: HEIGHT / 3,
                              borderRadius: 20,
                            }}
                          />
                        </View>
                        <Text style={{ fontFamily: "Andika", padding: 15 }}>
                          {selectedPromotion.comment}
                        </Text>
                        <HTMLView value={htmlContent} />

                        <TouchableOpacity
                          style={styles.openButton}
                          onPress={() => {
                            openWhatsApp();
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              // backgroundColor: "green",
                              padding: 10,
                              borderRadius: 20,
                              marginBottom: 20,
                              alignItems: "center",
                            }}
                          >
                            <FontAwesome
                              name="whatsapp"
                              size={34}
                              color="green"
                            />
                            <Text style={{ paddingHorizontal: 5 }}>
                              Reach us on Whatsapp
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setModalVisible(false)}
                        >
                          <View
                            style={{
                              // left: WIDTH * 0.6,
                              alignSelf: "flex-end",
                              // paddingTop: 20,
                              paddingLeft: 10,
                              // position: "absolute",
                              bottom: -10,
                              zIndex: 10,
                            }}
                          >
                            <FontAwesome name="close" size={30} color="black" />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </Modal>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.toggleDrawer()}
                    style={{
                      paddingTop: Platform.OS === "ios" ? 20 : 5,
                      flex: 0.1,
                    }}
                  >
                    <Feather
                      name="menu"
                      color="#000"
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                      }}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text
                      style={{
                        fontSize: 30,
                        fontFamily: "PlaylistScript",
                        color: "#263768",
                      }}
                    >
                      tour on
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Profile")}
                    style={{
                      paddingTop: Platform.OS === "ios" ? 20 : 5,
                      flex: 0.1,
                    }}
                  >
                    <Thumbnail
                      source={{
                        uri:
                          "https://miro.medium.com/max/2048/0*0fClPmIScV5pTLoE.jpg",
                      }}
                      style={{ height: 25, width: 25 }}
                    />
                  </TouchableOpacity>
                </View>

                <Animated.FlatList
                  data={testMonials}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                  )}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  pagingEnabled
                  keyExtractor={(d) => d.tourPlace}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: WIDTH * 0.9,
                          marginHorizontal: 5,
                          marginTop: 20,
                          justifyContent: "center",
                          marginBottom: 35,
                          alignItems: "center",
                          shadowColor: "#333sss",
                          shadowOpacity: 0.5,
                          shadowRadius: 60,
                          shadowOffset: {
                            width: 10,
                            height: 10,
                          },
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedPromotion(item);
                            setModalVisible(true);
                          }}
                        >
                          <Image
                            style={{
                              width: WIDTH * 0.8,
                              height: HEIGHT / 2,
                              borderRadius: 10,
                              // marginHorizontal: 20,
                            }}
                            source={{ uri: item.testImage }}
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
                  title={"Fascinating Countries"}
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
                            navigation.navigate("CountryInner", {
                              item: item,
                            });
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
                  route={"CityHome"}
                  navigation={navigation}
                  title={"Beautiful Cities"}
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
                <ContentList
                  navigation={navigation}
                  title={"Our Travellers"}
                  more={""}
                  content={""}
                />
                <Carousel
                  layout="tinder"
                  // layoutCardOffset={1}

                  ref={(c) => {
                    carousel = c;
                  }}
                  data={testMonials}
                  renderItem={_renderItem}
                  sliderWidth={WIDTH * 0.9}
                  onSnapToItem={(index) => setActiveSlide(index)}
                  itemWidth={WIDTH * 0.9}
                />
                <Pagination
                  dotsLength={testMonials.length}
                  activeDotIndex={activeSlide}
                  // containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                  }}
                />
              </>
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SkeletonPlaceholder
              highlightColor="#F2F8FC"
              speed={800}
              backgroundColor
            >
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
        )}
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  cityImage: {
    height: HEIGHT / 3.8 + 10,
    width: WIDTH / 2.8,
    borderRadius: 10,
    marginBottom: 15,
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
    marginVertical: 15,
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
  centeredView: {
    flex: 1,
    alignItems: "center",
    opacity: 0.8,
    backgroundColor: "#333",
    height: HEIGHT,
    paddingTop: HEIGHT / 8,
  },
  modalView: {
    zIndex: 10,
    margin: 20,
    position: "relative",
    backgroundColor: "white",
    borderRadius: 20,
    // paddingVertical: 25,
    // paddingHorizontal: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: WIDTH,
      height: HEIGHT * 2,
    },
    shadowOpacity: 100,
    shadowRadius: 840,
    elevation: 10,
  },
});

export default HomeScreen;
{
  /* <View
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
            </View> */
  /* <View style={[StyleSheet.absoluteFillObject]}>
            {testMonials.map((i, index) => {
              const inputRange = [
                (index - 1) * WIDTH,
                index * WIDTH,
                (index + 1) * WIDTH,
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });
              if (index < 3)
                return (
                  <Animated.Image
                    key={index}
                    source={{ uri: i.testImage }}
                    style={[StyleSheet.absoluteFillObject]}
                    blurRadius={10}
                  />
                );
            })}
          </View> */
}
