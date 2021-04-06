import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking,
  Animated,
  Modal,
  FlatList,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
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
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { Portal, Provider } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import touron from "../../api/touron";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import * as firebase from "firebase";
const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { userInfo, setUserInfo, isLoggedIn } = useContext(AuthContext);
  const [status, setStatus] = useState(true);
  const [networkLoader, setNetworkLoader] = useState(false);
  const [tour, setTour] = useState([]);
  const [countries, setCountries] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activePromoSlide, setActivePromoSlide] = useState(0);
  const [selectedPromotion, setSelectedPromotion] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [cities, setCities] = useState([]);
  const cityPage = Math.round(Math.random() * 15);
  const countryPage = Math.round(Math.random() * 7);
  const tourPage = Math.round(Math.random() * 100);
  const getUserData = () => {
    if (!isLoggedIn) {
      setUserInfo({});
    }
  };

  useEffect(() => {
    getCounries();
    // getUserData();
  }, []);

  const openWhatsApp = (promoText) => {
    let url = `whatsapp://send?text=Hey,🙂 I would like to know more about this , ${promoText}&phone= +91 8667801206`;

    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened successfully " + data);
      })
      .catch(() => {
        alert("Make sure WhatsApp installed on your device");
      });
  };

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
          setTestimonials(req);
        }
      });
  };
  const getPromotions = () => {
    firebase
      .database()
      .ref("promotion")
      .on("value", (data) => {
        if (data !== null) {
          let req = [];
          data.forEach((d) => {
            req.push(d.val());
          });
          setPromotions(req);
        }
      });
  };

  useEffect(() => {
    getPromotions();
    getCities();
  }, []);

  useEffect(() => {
    getTestimonial();
    getTours();
  }, []);

  const getTours = async () => {
    const tours = await touron.get(`/tour?page=${tourPage}&pageSize=10`);
    setTour(tours.data);
  };
  const getCounries = async () => {
    const country = await touron.get(`/country?page=${countryPage}&pageSize=6`);
    setCountries(country.data);
  };
  const getCities = async () => {
    const city = await touron.get(`/city?page=${cityPage}&pageSize=5`);
    setCities(city.data);
  };
  const getNetwork = async () => {
    setNetworkLoader(true);
    const status = (await Network.getNetworkStateAsync()).isConnected;
    setStatus(status);
    setNetworkLoader(false);
  };

  useEffect(() => {
    getNetwork();
  }, []);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const _renderItem = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            borderColor: "#333",
            borderWidth: Platform.OS === "ios" ? 2 : 2,
            borderRadius: 10,
            paddingBottom: 20,
            marginTop: 20,
            height: HEIGHT > 850 ? HEIGHT / 2.2 : HEIGHT / 1.7,
            marginBottom: 30,
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
                  // color: "#FFF",
                  fontSize: 20,
                  fontFamily: "NewYorkl",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  // color: "#FFF",

                  fontFamily: "Andika",
                }}
              >
                Travelled to {item.tourPlace}
              </Text>
            </View>
          </View>
          <View
            style={{
              // width: WIDTH,
              padding: 10,
              height: HEIGHT / 3,
              overflow: "scroll",
            }}
          >
            <HTMLView
              value={item.comment}
              stylesheet={{
                p: {
                  paddingLeft: 10,
                  fontFamily: "Andika",
                  fontSize: 13,
                  textAlign: "center",
                },
              }}
            />
          </View>
        </View>
      </>
    );
  };

  const _renderPromo = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          width: WIDTH * 0.9,
          marginHorizontal: 5,
          marginTop: 20,
          justifyContent: "center",
          // marginBottom: 35,
          alignItems: "center",
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
              height: HEIGHT / 1.9,
              borderRadius: 10,
            }}
            source={{ uri: item.image }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Provider>
      <Portal>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

        <ScrollView
          style={{ backgroundColor: "#fff" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <>
              <Modal visible={modalVisible}>
                <ScrollView>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View style={{ position: "relative" }}>
                        <TouchableOpacity
                          style={{
                            alignSelf: "flex-end",
                            position: "absolute",
                            top: 10,
                            right: 10,
                          }}
                          onPress={() => setModalVisible(false)}
                        >
                          <View>
                            <FontAwesome name="close" size={30} color="black" />
                          </View>
                        </TouchableOpacity>
                        <Image
                          source={{ uri: selectedPromotion.image }}
                          style={{
                            width: WIDTH * 0.91,
                            height: HEIGHT / 1.6,
                            borderRadius: 20,
                            zIndex: -2,
                          }}
                        />
                      </View>

                      <View style={{ padding: 20 }}>
                        <HTMLView value={selectedPromotion.content} />
                      </View>

                      <TouchableOpacity
                        style={styles.openButton}
                        onPress={() => {
                          openWhatsApp(selectedPromotion.promoCode);
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
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
                            Click to reach us on Whatsapp
                          </Text>
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
                  paddingTop: Platform.OS === "ios" ? 35 : 0,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.toggleDrawer()}
                  style={{
                    flex: 0.1,
                  }}
                >
                  <Feather
                    name="menu"
                    color="#000"
                    style={{
                      fontSize: 30,
                      paddingTop: Platform.OS === "ios" ? 10 : 10,

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
                    tour On
                  </Text>
                </View>

                {Object.keys(userInfo).length === 0 &&
                userInfo.constructor === Object ? (
                  <TouchableOpacity
                    style={{
                      paddingTop: Platform.OS === "ios" ? 10 : 10,
                      paddingRight: 10,

                      flex: 0.1,
                    }}
                    onPress={() => {
                      if (!isLoggedIn) {
                        navigation.replace("SignInScreen");
                      } else {
                        navigation.navigate("Profile");
                      }
                    }}
                  >
                    <Thumbnail
                      source={{
                        uri:
                          "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
                      }}
                      style={{ height: 25, width: 25 }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Profile")}
                    style={{
                      paddingRight: 10,

                      // paddingTop: Platform.OS === "ios" ? 20 : 5,
                      paddingTop: Platform.OS === "ios" ? 10 : 10,

                      flex: 0.1,
                    }}
                  >
                    {userInfo.photoURL === "" ? (
                      <Thumbnail
                        source={{
                          uri:
                            "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
                        }}
                        style={{ height: 35, width: 35 }}
                      />
                    ) : (
                      <Thumbnail
                        source={{
                          uri: userInfo.photoURL,
                        }}
                        style={{ height: 35, width: 35 }}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>

              {promotions.length === 0 ? (
                <>
                  <SkeletonPlaceholder highlightColor="#F2F8FC" speed={800}>
                    <View
                      style={{
                        width: WIDTH * 0.9,
                        marginHorizontal: 5,
                        marginVertical: 20,
                        justifyContent: "center",
                        // marginBottom: 35,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: WIDTH * 0.8,
                          height: HEIGHT / 1.9,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </SkeletonPlaceholder>
                </>
              ) : (
                <>
                  <Carousel
                    layout="default"
                    lockScrollWhileSnapping={true}
                    enableMomentum={false}
                    autoplayInterval={500}
                    autoplayDelay={1000}
                    loop={true}
                    ref={(c) => {
                      carousel = c;
                    }}
                    data={promotions}
                    renderItem={_renderPromo}
                    sliderWidth={WIDTH * 0.9}
                    onSnapToItem={(index) => setActivePromoSlide(index)}
                    itemWidth={WIDTH * 0.9}
                  />
                  <Pagination
                    dotsLength={promotions.length}
                    activeDotIndex={activePromoSlide}
                    dotStyle={{
                      width: 30,
                      marginTop: 0,
                      paddingTop: 0,
                      height: 7,
                      // borderRadius: 5,
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                    }}
                  />
                </>
              )}

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

              {countries.length === 0 ? (
                <>
                  <SkeletonPlaceholder highlightColor="#F2F8FC" speed={800}>
                    <View style={{ flexDirection: "row" }}>
                      {new Array(6).fill("0").map((c, index) => (
                        <View style={styles.cityImage} key={index} />
                      ))}
                    </View>
                  </SkeletonPlaceholder>
                </>
              ) : (
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
              )}
              <ContentList
                route={"CityHome"}
                navigation={navigation}
                title={"Beautiful Cities"}
                more={"Show More"}
                content={
                  "Are you a wanderlust soul getting lost in breathtaking cities? Here are our suggestions!"
                }
              />
              {cities.length === 0 ? (
                <>
                  <SkeletonPlaceholder highlightColor="#F2F8FC" speed={800}>
                    <View style={{ flexDirection: "row" }}>
                      {new Array(6).fill("0").map((c, index) => (
                        <View style={styles.cityImage} key={index} />
                      ))}
                    </View>
                  </SkeletonPlaceholder>
                </>
              ) : (
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
              )}
              <ContentList
                route={"TourHome"}
                navigation={navigation}
                title={"Curated Tours"}
                more={"Show More"}
                content={
                  "Are you a kindred spirit looking for the perfect holiday? Look no further!"
                }
              />
              {tour.length === 0 ? (
                <>
                  <SkeletonPlaceholder highlightColor="#F2F8FC" speed={800}>
                    <View style={{ flexDirection: "row" }}>
                      {new Array(6).fill("0").map((c, index) => (
                        <View
                          style={{
                            height: HEIGHT / 3.8,
                            width: WIDTH / 1.2,
                            borderRadius: 10,
                            marginVertical: 10,
                            marginRight: 10,
                          }}
                          key={index}
                        />
                      ))}
                    </View>
                  </SkeletonPlaceholder>
                </>
              ) : (
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
              )}
              <>
                <ContentList
                  navigation={navigation}
                  title={"Our Travellers Talks"}
                  more={""}
                  content={
                    "Read the testimonials of our happy travellers as they recollect fond memories after a fabulous tour with us !"
                  }
                />

                {testimonials.length === 0 ? (
                  <>
                    <SkeletonPlaceholder highlightColor="#F2F8FC" speed={800}>
                      <View
                        style={{
                          borderColor: "#333",
                          borderWidth: Platform.OS === "ios" ? 2 : 2,
                          borderRadius: 10,
                          paddingBottom: 20,
                          marginTop: 20,
                          height: HEIGHT > 850 ? HEIGHT / 2.2 : HEIGHT / 1.7,
                          marginBottom: 30,
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
                          <View
                            style={{
                              paddingHorizontal: 10,
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                              }}
                            ></View>
                          </View>
                          <View>
                            <View
                              style={{
                                width: 200,
                                height: 20,
                                marginBottom: 10,
                              }}
                            ></View>
                            <View style={{ width: 100, height: 20 }}></View>
                          </View>
                        </View>
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <View
                            style={{
                              width: WIDTH * 0.85,
                              marginVertical: 10,
                              height: 10,
                              overflow: "scroll",
                            }}
                          />
                          <View
                            style={{
                              width: WIDTH * 0.85,
                              marginVertical: 10,
                              height: 10,
                              overflow: "scroll",
                            }}
                          />
                          <View
                            style={{
                              width: WIDTH * 0.85,
                              marginVertical: 10,
                              height: 10,
                              overflow: "scroll",
                            }}
                          />
                          <View
                            style={{
                              width: WIDTH * 0.85,
                              marginVertical: 10,
                              height: 10,
                              overflow: "scroll",
                            }}
                          />
                          <View
                            style={{
                              width: WIDTH * 0.85,
                              marginVertical: 10,
                              height: 10,
                              overflow: "scroll",
                            }}
                          />
                          <View
                            style={{
                              width: WIDTH * 0.85,
                              marginVertical: 10,
                              height: 10,
                              overflow: "scroll",
                            }}
                          />
                          <View
                            style={{
                              width: WIDTH * 0.85,
                              marginVertical: 10,
                              height: 10,
                              overflow: "scroll",
                            }}
                          />
                          <View
                            style={{
                              width: WIDTH * 0.85,
                              marginVertical: 10,
                              height: 10,
                              overflow: "scroll",
                            }}
                          />
                          <View
                            style={{
                              width: WIDTH * 0.85,
                              marginVertical: 10,
                              height: 10,
                              overflow: "scroll",
                            }}
                          />
                        </View>
                      </View>
                    </SkeletonPlaceholder>
                  </>
                ) : (
                  <Carousel
                    layout="default"
                    autoplay={true}
                    autoplayDelay={1000}
                    autoplayInterval={8000}
                    lockScrollWhileSnapping={true}
                    loop={true}
                    enableMomentum={false}
                    ref={(c) => {
                      carousel = c;
                    }}
                    data={testimonials}
                    renderItem={_renderItem}
                    sliderWidth={WIDTH * 0.9}
                    onSnapToItem={(index) => setActiveSlide(index)}
                    itemWidth={WIDTH * 0.9}
                  />
                )}
              </>
            </>
          </View>
        </ScrollView>
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
    marginTop: 15,
    marginBottom: 40,
  },
  name: {
    fontSize: 17,
    zIndex: 1,
    bottom: 23,
    position: "absolute",
    color: "white",
    fontWeight: "300",
    fontFamily: "Andika",
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
    paddingTop: 20,
  },
  modalView: {
    zIndex: 10,
    margin: 20,
    position: "relative",
    backgroundColor: "white",
    borderRadius: 20,
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
