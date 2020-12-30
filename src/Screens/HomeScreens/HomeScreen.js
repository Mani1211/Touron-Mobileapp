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

  // const openWhatsApp = (name) => {
  //   let url = `whatsapp://send?text=Hi,I would like to go know more details about this offer &phone= +91 8667801206`;

  //   Linking.openURL(url)
  //     .then((data) => {
  //       console.log("WhatsApp Opened successfully " + data);
  //     })
  //     .catch(() => {
  //       alert("Make sure WhatsApp installed on your device");
  //     });
  // };

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
    // console.log(status, "STATUS");
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
      }, 2000);
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

  if (!fontLoaded) {
    return (
      <>
        <AppLoading />
      </>
    );
  }

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
      {status ? (
        <View style={styles.container}>
          <View>
            <TouchableOpacity>
              <View style={{ height: HEIGHT / 10, width: HEIGHT / 10 }}>
                {/* <Feather
                  name="menu"
                  size={28}
                  color="black"
                  style={{ paddingHorizontal: 10, paddingTop: 20 }}
                  onPress={() => navigation.toggleDrawer()}
                /> */}
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
              </View>
            </TouchableOpacity>
          </View>

          <View
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
          </View>
          <ContentList
            route={"CountryHome"}
            navigation={navigation}
            title={"Tour Categories"}
            more={""}
            content={"Content Goes Here"}
          />
          <Categories navigation={navigation} />
          <ContentList
            route={"CountryHome"}
            navigation={navigation}
            title={"Popular Countries"}
            more={"Show More"}
            content={"Content Goes Here"}
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

                      {loaded ? (
                        <Image
                          fadeDuration={1000}
                          style={styles.cityImage}
                          source={{
                            uri:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAADWCAMAAAAHMIWUAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB3A8VIAAFqm4S1AAAAAElFTkSuQmCC",
                          }}
                        />
                      ) : (
                        <Image
                          fadeDuration={1000}
                          style={styles.cityImage}
                          source={{ uri: item.imageUrl }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
            }}
          />
          <ContentList
            route={"CityHome"}
            navigation={navigation}
            title={"Marvelous Cities"}
            more={"Show More"}
            content={"Content Goes Here"}
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
                      <Image
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
            content={"Content Goes Here"}
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

                      <Image
                        fadeDuration={1000}
                        style={styles.tourImage}
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              display: "flex",
              marginTop: HEIGHT / 4,
            }}
          >
            {/* <Image
              style={{ height: WIDTH * 0.8, width: WIDTH * 0.8 }}
              source={require("../../../assets/oops.jpg")}
            />

            <TouchableOpacity
              onPress={() => {
                getNetwork();
              }}
            >
              <MaterialCommunityIcons name="reload" size={30} color="black" />
              {networkLoader ? <ActivityIndicator size="small" /> : null}
            </TouchableOpacity> */}
          </View>
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
