import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking,
  Modal,
  FlatList,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Categories from "./components/CategoriesScreen";
import ContentList from "./components/ContentList";
import { city, country, tours } from "./components/Datas";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { Portal, Provider } from "react-native-paper";
import touron from "../../api/touron";
import { database } from "firebase";
import axios from "axios";
import Slider from "./../../Reusable Components/Slider";
import Banner from "../Review Component/Reusable/Banner";
import { AuthContext } from "./../../context/AuthContext";
import { isSubmittedFeedback } from "../CategoryScreens/utils/PushNotification";
import Header from "./components/Header";
import CountryCityTile from "./components/CountryCityTile";
import TourTile from "./components/TourTile";
import TestimonialsTile from "./components/TestimonialTile";
import Promotions from "./components/Promotions";

const HomeScreen = ({ navigation }) => {
  const [promotions, setPromotions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState(false);
  const [googleStats, setGoogleStats] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedPromotion, setSelectedPromotion] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const { isLoggedIn, userInfo, fleetData } = useContext(AuthContext);

  const navigate = (url) => {
    console.log("object", url);
    if (url) {
      const { navigate } = navigation;
      const route = url.replace(/.*?:\/\//g, "");
      const id = route.split("/")[3];
      // console.log(`url`, url);
      // console.log(`navigate`, navigate);
      console.log(`route`, route);
      console.log(`id`, id);
      if (id) {
        navigate("BlogInner", {
          title: "sd",
          id: id,
        });
      }
    }
  };

  const handleOpenURL = (event) => {
    console.log(`event`, event);
    navigate(event.url);
  };

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) navigate(url);
    });
    Linking.addEventListener("url", handleOpenURL);
    return () => {
      Linking.removeEventListener("url", handleOpenURL);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (isLoggedIn && isSubmittedFeedback(userInfo.userID) === false) {
        setTimeout(() => setReview(true), 30000);
      }
    }
    return () => (mounted = false);
  }, [userInfo]);

  const set = (s) => {
    setActiveSlide(s);
  };

  const getPromotions = () => {
    database()
      .ref("promotion")
      .on("value", (data) => {
        let req = [];
        if (data !== null) {
          data.forEach((d) => {
            req.push(d.val());
          });
        }
        setPromotions(req.reverse());
      });
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getPromotions();
    }
    return () => (mounted = false);
  }, []);

  const openWhatsApp = (promoText) => {
    let url = `whatsapp://send?text=Hey,🙂 I would like to know more about this , ${promoText}&phone= +91 8667801206`;

    Linking.openURL(url)
      .then((data) => {})
      .catch(() => {
        alert("Make sure WhatsApp installed on your device");
      });
  };

  const getTestimonial = () => {
    database()
      .ref("testimonials")
      .on("value", (data) => {
        let req = [];
        if (data !== null) {
          data.forEach((d) => {
            req.push(d.val());
          });
        }
        setTestimonials(req);
      });
  };

  const getStats = async () => {
    const tours = await touron.get("stats");
    setGoogleStats(...tours.data);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getTestimonial();
    }
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    const source = axios.CancelToken.source();
    getStats();
    return () => source.cancel();
  }, []);

  const _renderItem = ({ item, index }) => {
    return <TestimonialsTile item={item} index={index} />;
  };
  const _renderPromo = ({ item, index }) => {
    return (
      <Promotions
        item={item}
        index={index}
        setModalVisible={() => setModalVisible(true)}
        setSelectedPromotion={() => setSelectedPromotion(item)}
      />
    );
  };
  const renderCountry = ({ item }) => {
    return (
      <CountryCityTile
        item={item}
        navigation={navigation}
        navName={"CountryInner"}
        name={item.countryName}
      />
    );
  };
  const renderCity = ({ item }) => (
    <CountryCityTile
      item={item}
      navigation={navigation}
      navName={"CityInner"}
      name={item.cityName}
    />
  );
  const renderTour = ({ item }) => (
    <TourTile navigation={navigation} item={item} navName={"TourInner"} />
  );

  return (
    <Provider>
      <Portal style={{ position: "relative" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        {review && (
          <Banner
            navigation={navigation}
            close={() => setReview(false)}
            setReview={() => {
              setReview(false);
              navigation.navigate("Feedback");
            }}
          />
        )}
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
              <View style={{ paddingHorizontal: 20 }}>
                <Header navigation={navigation} />
              </View>

              {/* {userInfo.email === "vikashmanoharan@touron.in" && <Story />} */}
              {/* {Object.keys(userInfo).length !== 0 &&
                userInfo.email === "vikashmanoharan@touron.in" && (
                  <Story />
                  )} */}
              {/* <Story /> */}
              {promotions.length === 0 ? (
                <>
                  <SkeletonPlaceholder highlightColor="#F2F8FC" speed={800}>
                    <View
                      style={{
                        width: WIDTH,
                        // marginHorizontal: 5,
                        marginVertical: 20,
                        justifyContent: "center",
                        // marginBottom: 35,
                        alignItems: "center",
                        paddingHorizontal: 20,
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
                <View style={{ paddingHorizontal: 20 }}>
                  <Slider
                    data={promotions}
                    dotStyle={{
                      height: 10,
                      backgroundColor: "#E28633",
                      marginHorizontal: 10,
                      borderRadius: 5,
                    }}
                    showDots={true}
                    renderItem={_renderPromo}
                  />
                </View>
              )}
              <View style={{ paddingHorizontal: 15 }}>
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

                {country.length === 0 ? (
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
                    data={country}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(d) => d._id}
                    renderItem={renderCountry}
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
                {city.length === 0 ? (
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
                    data={city}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(d) => d._id}
                    renderItem={renderCity}
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

                {tours.length === 0 ? (
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
                    data={tours}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(d) => d._id}
                    renderItem={renderTour}
                  />
                )}
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <ContentList
                  navigation={navigation}
                  title={"Our Travellers Talks"}
                  more={""}
                  content={
                    "Read the testimonials of our happy travellers as they recollect fond memories after a fabulous tour with us !"
                  }
                />
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    padding: 30,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingRight: 15,
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FReviews%2Fgoogle.png?alt=media&token=2bad25e1-3652-432e-ae20-c36bea39dcca",
                      }}
                      style={{ marginRight: 20, height: 40, width: 40 }}
                    />
                    <Image
                      style={{ height: 40, width: 40 }}
                      source={{
                        uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FReviews%2Ffacebook.png?alt=media&token=cb984a8d-511d-47c8-966e-0cddb1ed09b3",
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", paddingTop: 20 }}>
                    {new Array(5).fill("1").map((c, i) => {
                      return (
                        <FontAwesome
                          key={i}
                          name="star"
                          size={24}
                          color="#F5BF00"
                          style={{ paddingRight: 5 }}
                        />
                      );
                    })}
                  </View>
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: "bold",
                      paddingVertical: 10,
                      fontFamily: "Avenir",
                    }}
                  >
                    {googleStats.googleReviewRating}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      paddingHorizontal: 50,
                      fontFamily: "Andika",
                    }}
                  >
                    From more than {googleStats.googleReviewCount}+ Feedbacks
                    from our travellers
                  </Text>
                </View>
              </View>
              {testimonials.length === 0 ? null : (
                <View style={{ paddingBottom: 100 }}>
                  <View style={{ width: WIDTH, position: "relative" }}>
                    <Text
                      style={{
                        backgroundColor: "#758283",
                        position: "absolute",
                        right: 40,
                        textAlign: "right",
                        padding: 5,
                        paddingHorizontal: 8,
                        borderRadius: 8,
                        color: "#fff",
                      }}
                    >
                      {activeSlide + 1} / {testimonials.length}
                    </Text>
                  </View>
                  <Slider
                    data={testimonials}
                    dotStyle={{
                      height: 10,
                      backgroundColor: "#8E8E8F",
                      marginHorizontal: 10,
                      borderRadius: 5,
                    }}
                    setActiveSlide={(s) => {
                      set(s);
                    }}
                    showDots={false}
                    renderItem={_renderItem}
                  />
                </View>
              )}
            </>
          </View>
        </ScrollView>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    // padding: 15,
    backgroundColor: "#FFF",
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
