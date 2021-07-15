import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import {
  MaterialIcons,
  Feather,
  Ionicons,
  Entypo,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import PDFReader from "rn-pdf-reader-js";
import HTMLView from "react-native-htmlview";

import { Portal, Provider } from "react-native-paper";

import Slider from "./../../Reusable Components/Slider";

const ResortsInner = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [logo, setLogo] = useState(true);
  const [pdfView, setPdfView] = useState(false);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setTimeout(() => {
      setLogo(false);
    }, 3000);
  }, []);
  const [step, setStep] = useState("Inclusion");
  const resorts = [
    {
      countryName: "Maldives",
      cityName: "Male",
      resortName: "Hurawalli",
      resortCategories: [
        {
          name: "Beach Villa",
          days: 2,
          image:
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/100074378.jpg?k=19330ef28bfef6d549c4c3ddd53c49a828c1425331ae9b21dbaeccea52bd6b63&o=&hp=1",
          mealPlan: "All Inclusive",
          transferType: "Speadboat",
        },

        {
          name: "Water villa",
          days: 3,
          image:
            "https://cf.bstatic.com/xdata/images/hotel/max1280x900/33656431.jpg?k=bdb9d42ea6b6df0b9b97c75f7890c820f69e5fa7cca80cd36f93a8d7a08986a3&o=&hp=1",
          mealPlan: "Half Board",
          transferType: "Seaplane",
        },
      ],
      ratings: "5",
      resortImage: [
        "https://images.pexels.com/photos/6044984/pexels-photo-6044984.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        "https://images.pexels.com/photos/5579729/pexels-photo-5579729.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        "https://images.pexels.com/photos/7663387/pexels-photo-7663387.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/33653522.jpg?k=82b437d4406dbe1612164362995e071555857d70e979359be9e77551bb2f5c1c&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/100074455.jpg?k=5f0e4746cbfe7802f2de2956dfaff049dbd0da775fa58716d6c25b61cce7239d&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/33655729.jpg?k=fb9174823149e3164d1b512bfa197972f072c52c7d20aa4f64ec802a265b63ed&o=&hp=1",
      ],
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium deserunt reiciendis omnis vero est libero soluta odit sit id!",
      inclusion:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium deserunt reiciendis omnis vero est libero soluta odit sit id!",
      resortFeatures: ["Wifi", "Cotton Bed", "Pool"],

      cost: 3000,
      loveMeter: "20",
      resortAwards: ["imageLink1", "imageLink2", "imageLink3"],
      restaurents: [
        {
          name: "Saravan Bhavan",
          cuisine: "Chinese",
          openFor: "Breakfast and Lunch",
          menu: "Buffet",
        },
        {
          name: "KFC Restaurent",
          cuisine: "Chinese",
          openFor: "Breakfast and Lunch",
          menu: "Buffet",
        },
        {
          name: "Mc Donalds",
          cuisine: "Chinese",
          openFor: "Breakfast and Lunch",
          menu: "Buffet",
        },
        {
          name: "Mc Donalds",
          cuisine: "Chinese",
          openFor: "Breakfast and Lunch",
          menu: "Buffet",
        },
      ],
      resortRules: {
        checkIn: "2.00 pm",
        checkOut: "10.00 Am",
        cancellationPolicy: "Policy text",
        honeymoonBenefits: "",
      },
      finePrint:
        "orem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laudantium deserunt ",
    },
  ];

  const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == "li") {
      return (
        <View
          key={index}
          style={{
            marginTop: index === 0 ? 10 : 0,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="sticker-check-outline"
              size={14}
              color="#33A6AA"
            />
            <Text
              style={{
                color: "black",
                fontFamily: "Andika",
                fontSize: 12,
                paddingLeft: 5,
                lineHeight: 13,
              }}
            >
              {defaultRenderer(node.children, parent)}
            </Text>
          </View>
        </View>
      );
    } else if (node.name == "ul") {
      return <View>{defaultRenderer(node.children, parent)}</View>;
    }
  };

  const render = () => {
    switch (step) {
      case "About":
        return (
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                {resorts[0].resortImage.map((i, index) => {
                  return (
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <Image
                        key={index}
                        source={{ uri: i }}
                        style={styles.resortImages}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <Text style={styles.inclusion}>
              Medhufushi Island Resort offers rustic villas that open out to
              sweeping lagoon views. It features 2 dining options and a spa.
            </Text>
            <Text style={styles.inclusion}>
              Maldivian-style open concept villas feature private sun decks and
              open air rain showers. It includes a flat-screen cable TV and DVD
              player.
            </Text>
            <Text style={styles.inclusion}>
              Numerous water sports are available at Resort Medhufushi,
              including snorkelling, canoeing and windsurfing. Diving classes
              are provided
            </Text>
          </View>
        );
      case "Inclusion":
        return (
          <View style={{ paddingBottom: 100 }}>
            {resorts[0].resortCategories.map((r, index) => {
              return (
                <View style={styles.inclusionContainer} key={index}>
                  <View style={styles.inclusionC}>
                    <View style={styles.inclusionTileC}>
                      <View style={styles.outerDot}>
                        <View style={styles.innerDot}></View>
                      </View>
                      {new Array(5).fill("1").map((i, index) => (
                        <Ionicons
                          key={index}
                          name="ellipsis-vertical-outline"
                          size={20}
                          color="#598290"
                        />
                      ))}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={{
                          uri: r.image,
                        }}
                        style={styles.inclusionImage}
                      />
                      <View style={{ paddingHorizontal: 15 }}>
                        <Text style={styles.resortTypeName}>{r.name}</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            name="food-fork-drink"
                            size={24}
                            color="black"
                          />
                          <Text style={styles.typeAns}>
                            Breakfast, Lunch & Dinner
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Ionicons
                            name="md-airplane-outline"
                            size={24}
                            color="black"
                          />
                          <Text style={styles.typeAns}>Seaplane Transfer</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
            <View style={{ marginTop: 20 }}>
              <HTMLView
                value={
                  "<ol><li>Private Resort&nbsp;Accommodation (5 Star Resort)&nbsp;</li><li>Beach Villa (2N) + Water Villa (2N)</li><li>Meals Plan - Breakfast, Lunch &amp; Dinner</li><li>Sea Transfers - Speedboat Flight (Both ways)</li><li>VISA on Arrival Forms&nbsp;</li><li>Health Declaration Forms&nbsp;</li><li>Respective Indian State Govt ePass&nbsp;</li><li>24/7 Support during your Tour</li></ol>"
                }
                stylesheet={{
                  li: {
                    fontFamily: "Andika",
                  },
                }}
                renderNode={(node, index, siblings, parent, defaultRenderer) =>
                  renderNode(node, index, siblings, parent, defaultRenderer)
                }
              />
            </View>
          </View>
        );
      case "Amenities":
        return (
          <View style={styles.amenitiesC}>
            {amenities.map((i, index) => {
              return (
                <View key={index} style={styles.iconC}>
                  <View style={{ width: 20 }}>{i.icon}</View>
                  <Text style={styles.iconStyle}>{i.name}</Text>
                </View>
              );
            })}
          </View>
        );
      case "Highlights":
        return (
          <View style={{ paddingBottom: 80 }}>
            <Text style={styles.headerText}>Key Notes</Text>
            <View>
              <HTMLView
                value={
                  "<ol><li>Private Resort&nbsp;Accommodation (5 Star Resort)&nbsp;</li><li>Beach Villa (2N) + Water Villa (2N)</li><li>Meals Plan - Breakfast, Lunch &amp; Dinner</li><li>Sea Transfers - Speedboat Flight (Both ways)</li><li>VISA on Arrival Forms&nbsp;</li><li>Health Declaration Forms&nbsp;</li><li>Respective Indian State Govt ePass&nbsp;</li><li>24/7 Support during your Tour</li></ol>"
                }
                stylesheet={{
                  li: {
                    fontFamily: "Andika",
                  },
                }}
                renderNode={(node, index, siblings, parent, defaultRenderer) =>
                  renderNode(node, index, siblings, parent, defaultRenderer)
                }
              />
            </View>
            <Text style={styles.headerText}>Restaurents</Text>
            <View style={styles.doubleRow}>
              {resorts[0].restaurents.map((i, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      padding: 10,
                      flexBasis: "40%",
                    }}
                  >
                    <Text style={styles.headName}>{i.name}</Text>
                    <Text style={styles.names}>Cuisine : {i.cuisine}</Text>
                    <Text style={styles.names}>Menu : {i.menu}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.headerText}>Rules</Text>
            <View style={styles.rules}>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "Avenir", fontSize: 13 }}>
                  4.00 Pm
                </Text>
                <Text>Check in</Text>
              </View>
              <Entypo name="line-graph" size={24} color="black" />
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "Avenir", fontSize: 13 }}>
                  4.00 Pm
                </Text>
                <Text>Check in</Text>
              </View>
            </View>
            <Text style={styles.headerText}>Cancellation Policy</Text>
            <View>
              <HTMLView
                value={
                  "<ol><li>VISA on Arrival Forms&nbsp;</li><li>Health Declaration Forms&nbsp;</li><li>Respective Indian State Govt ePass&nbsp;</li><li>24/7 Support during your Tour</li></ol>"
                }
                stylesheet={{
                  li: {
                    fontFamily: "Andika",
                  },
                }}
                renderNode={(node, index, siblings, parent, defaultRenderer) =>
                  renderNode(node, index, siblings, parent, defaultRenderer)
                }
              />
            </View>
          </View>
        );
      case "AIPlan":
        return (
          <PDFReader
            // withPinchZoom
            useGoogleReader
            withScroll
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/OBLU%20HELENGELI%20-%20ISLAND%20PLAN%202021-2022.pdf?alt=media&token=a0116637-1791-449b-b553-1d4bd3412d7f",
            }}
            style={{ height: height / 2, width: width * 0.9 }}
          />
        );
      default:
        break;
    }
  };
  const styles = StyleSheet.create({
    icon: {
      color: "#33a6AA",
      fontSize: 18,
    },
    centeredView: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.8,
      backgroundColor: "transparent",
      height: height,
      paddingTop: 20,
    },
    modalView: {
      zIndex: 10,
    },
    types: {
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",

      fontSize: 13,
      marginBottom: 5,
      paddingBottom: 5,
    },
    feature: {
      justifyContent: "space-between",
      height: height / 1.73,
      margin: 4,
      padding: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 30,
      borderRadius: 30,
      borderTopRightRadius: 0,
      backgroundColor: "#0007",
      alignItems: "center",
      width: 80,
    },
    resortImage: {
      width: width * 0.9,
      height: height / 3.5,
      borderRadius: 20,
      margin: 10,
    },
    resortImages: {
      width: 85,
      height: 80,
      borderRadius: 20,
      margin: 5,
    },
    mainC: {
      paddingHorizontal: 10,
    },
    resortName: {
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
      fontSize: 18,
      paddingBottom: 5,
    },
    resortLocation: {
      color: "black",
      fontFamily: "Andika",
      paddingLeft: 5,
    },
    resortCategories: {
      color: "black",
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",

      paddingTop: 5,
    },
    contents: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingTop: 30,
    },
    reviews: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    stars: {
      fontSize: 16,
      fontFamily: "Andika",
      color: "black",
    },
    google: { marginLeft: 5, height: 20, width: 20 },
    resortCost: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    bookButton: {
      textAlign: "center",
      alignSelf: "center",
      backgroundColor: "#E28633",
      color: "#fff",
      marginBottom: 15,
      padding: 15,
      borderRadius: 15,
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
    },

    // inclusions
    inclusionC: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    inclusionTileC: {
      alignItems: "center",
      paddingHorizontal: 5,
      justifyContent: "center",
    },
    outerDot: {
      backgroundColor: "#33A6AA",
      width: 20,
      height: 20,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 5,
    },
    innerDot: {
      backgroundColor: "#fff",
      width: 8,
      height: 8,
      borderRadius: 15,
      alignSelf: "center",
    },
    inclusion: {
      fontFamily: "Andika",
      fontSize: Platform.OS === "ios" ? 14 : 12,
      paddingBottom: 10,
      color: "black",
    },
    inclusionContainer: {
      flexDirection: "row",
      //   marginBottom: 15,
      //   alignItems: "center",
      //   justifyContent: "space-around",
    },
    inclusionImage: { height: 80, width: 80, borderRadius: 20 },
    resortTypeName: {
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
      fontSize: 15,
    },

    typeAns: {
      fontFamily: "Andika",
      fontSize: 13,
      color: "black",
      paddingLeft: 5,
    },
    rupee: {
      color: "#fff",
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
      paddingLeft: 5,
      fontSize: 15,
    },

    // amenities

    amenitiesC: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingBottom: 100,
      paddingTop: 20,
      flexWrap: "wrap",
    },
    iconC: {
      flexDirection: "row",
      alignItems: "center",
      flexBasis: "40%",
      margin: 8,
    },
    iconStyle: {
      fontFamily: "Andika",
      paddingLeft: 4,
      textAlign: "center",
      fontSize: 12,
    },

    // Highlights
    headerText: {
      backgroundColor: "#33A6AA",
      alignSelf: "flex-start",
      padding: 8,
      borderRadius: 10,
      color: "#fff",
      fontFamily: "Avenir",
      marginVertical: 10,
    },
    doubleRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    names: { fontFamily: "Andika", fontSize: 10 },
    headName: {
      fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
      fontSize: 13,
    },
    rules: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      padding: 20,
    },
  });

  const amenities = [
    {
      name: "Beachfront",
      icon: <MaterialCommunityIcons name="beach" style={styles.icon} />,
    },
    {
      name: "Private Beach Area",
      icon: <MaterialIcons name="beach-access" style={styles.icon} />,
    },
    {
      name: "Garden",
      icon: <MaterialIcons name="park" style={styles.icon} />,
    },
    {
      name: "Bar",
      icon: <MaterialIcons name="local-bar" style={styles.icon} />,
    },
    {
      name: "Restaurent",
      icon: <Ionicons name="fast-food" style={styles.icon} />,
    },
    {
      name: "Live Music",
      icon: <Feather name="music" style={styles.icon} />,
    },
    {
      name: "Movie Nights",
      icon: <MaterialCommunityIcons name="theater" style={styles.icon} />,
    },
    {
      name: "Tennis",
      icon: <MaterialIcons name="sports-tennis" style={styles.icon} />,
    },
    {
      name: "Water Sports",
      icon: <MaterialIcons name="sports-handball" style={styles.icon} />,
    },
    {
      name: "Snorkling",
      icon: <Fontisto name="snorkel" style={styles.icon} />,
    },
    {
      name: "Diving",
      icon: (
        <MaterialCommunityIcons name="diving-scuba-tank" style={styles.icon} />
      ),
    },
    {
      name: "Canoeing",
      icon: <FontAwesome5 name="ship" style={styles.icon} />,
    },
    {
      name: "Billards",
      icon: <MaterialCommunityIcons name="billiards" style={styles.icon} />,
    },
    {
      name: "Fishing",
      icon: <MaterialCommunityIcons name="fish" style={styles.icon} />,
    },
    {
      name: "House Keeping",
      icon: <FontAwesome5 name="laptop-house" style={styles.icon} />,
    },
    {
      name: "Laundry",
      icon: <MaterialIcons name="dry-cleaning" style={styles.icon} />,
    },
    {
      name: "Massage",
      icon: <MaterialIcons name="spa" style={styles.icon} />,
    },
    {
      name: "Hot Tub",
      icon: <FontAwesome5 name="hot-tub" style={styles.icon} />,
    },
    {
      name: "Gym",
      icon: <Ionicons name="ios-body" style={styles.icon} />,
    },
    {
      name: "Security",
      icon: <MaterialIcons name="security" style={styles.icon} />,
    },
    {
      name: "Steam Room",
      icon: <MaterialCommunityIcons name="air-filter" style={styles.icon} />,
    },
    {
      name: "Swimming Pool",
      icon: <MaterialIcons name="pool" style={styles.icon} />,
    },
    {
      name: "Umbrella",
      icon: <FontAwesome name="umbrella" style={styles.icon} />,
    },
    {
      name: "Snack Bar",
      icon: <MaterialCommunityIcons name="food" style={styles.icon} />,
    },
    {
      name: "Shops",
      icon: <Entypo name="shop" style={styles.icon} />,
    },
    {
      name: "Saloon",
      icon: <MaterialCommunityIcons name="hair-dryer" style={styles.icon} />,
    },
    {
      name: "Newspaper",
      icon: <FontAwesome name="newspaper-o" style={styles.icon} />,
    },
    {
      name: "Luggage Storage",
      icon: <MaterialIcons name="luggage" style={styles.icon} />,
    },
    {
      name: "Currency Exchange",
      icon: <MaterialCommunityIcons name="currency-gbp" style={styles.icon} />,
    },
    {
      name: "Kids Play Area",
      icon: <MaterialIcons name="park" style={styles.icon} />,
    },
    {
      name: "Baby Sitting",
      icon: <MaterialIcons name="baby-changing-station" style={styles.icon} />,
    },
    {
      name: "Outdoor Furniture",
      icon: (
        <MaterialCommunityIcons name="table-furniture" style={styles.icon} />
      ),
    },
    {
      name: "Terrace",
      icon: (
        <MaterialCommunityIcons name="office-building" style={styles.icon} />
      ),
    },
    {
      name: "Cycling",
      icon: <FontAwesome name="bicycle" style={styles.icon} />,
    },
  ];

  const _renderPromo = ({ item, index }) => {
    console.log(`item`, item);
    return (
      <TouchableWithoutFeedback
        onPress={() => setModalVisible(false)}
        key={index}
      >
        <View
          style={{
            width: width * 0.9,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Image
            style={{
              width: width * 0.93,
              height: height / 3.5,
              borderRadius: 20,
            }}
            resizeMode="cover"
            source={{ uri: item }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Provider>
      <Portal>
        {pdfView ? (
          <PDFReader
            withPinchZoom
            withScroll
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/OBLU%20HELENGELI%20-%20ISLAND%20PLAN%202021-2022.pdf?alt=media&token=a0116637-1791-449b-b553-1d4bd3412d7f",
            }}
            style={{ height: height * 0.6, width: width }}
          />
        ) : (
          <View
            style={{
              paddingTop: 30,
              flex: 1,
            }}
          >
            <Modal visible={modalVisible}>
              <ScrollView>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Slider
                        data={resorts[0].resortImage}
                        showDots={false}
                        renderItem={_renderPromo}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </Modal>

            <View style={{ padding: 10 }}>
              <View>
                <Image
                  source={{
                    uri: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/100073949.jpg?k=33ba822928642cb7ae1f421eb373691bb00c60fb9517b657b63e9be5c9343677&o=&hp=1",
                  }}
                  resizeMode="cover"
                  style={styles.resortImage}
                />

                <View
                  style={{
                    position: "absolute",
                    justifyContent: "space-between",
                    height: height / 3.35,
                  }}
                >
                  <FontAwesome
                    name="arrow-circle-left"
                    size={34}
                    color="black"
                    onPress={() => navigation.goBack()}
                    style={{ paddingLeft: 20, paddingTop: 20 }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: width * 0.9,
                      alignItems: "center",
                      backgroundColor: "#0004",
                      marginHorizontal: 10,
                      borderRadius: 20,
                      borderTopRightRadius: 0,
                      borderTopLeftRadius: 0,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 10,
                      }}
                    >
                      <FontAwesome name="rupee" size={20} color="#fff" />
                      <Text style={styles.rupee}>1,09,524* / per couple</Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#E28633",
                        padding: 13,
                        borderRadius: 20,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                    >
                      <Text style={{ color: "#fff", fontFamily: "Avenir" }}>
                        Book Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.mainC}>
                <View style={styles.resortDetails}>
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.stars}>
                      {new Array(parseInt(resorts[0].ratings))
                        .fill("1")
                        .map((c, i) => {
                          return (
                            <FontAwesome
                              key={i}
                              name="star"
                              size={14}
                              color="#F5BF00"
                              style={{ paddingRight: 5 }}
                            />
                          );
                        })}{" "}
                    </Text>
                    <Text style={styles.resortName}>
                      Medhufushi Island Resort
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Feather name="map-pin" size={16} color="black" />
                      <Text style={styles.resortLocation}>
                        Medhufush , Maldives
                      </Text>
                    </View>
                    <Text style={styles.resortCategories}>
                      2N {resorts[0].resortCategories[0].name} {"+ "}
                      3N {resorts[0].resortCategories[0].name}
                    </Text>

                    <Text style={{ color: "black", marginTop: 10 }}>
                      98%{" "}
                      <FontAwesome
                        name="heart"
                        size={14}
                        color="red"
                        style={{ paddingRight: 5 }}
                      />
                      {"  "}
                      from travellers
                    </Text>
                    {logo && (
                      <Image
                        source={{
                          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhJcHaHmSuyUX94-YlhGa9YXlhIdymI7qe8g&usqp=",
                        }}
                        style={{ height: 100, width: 100, borderRadius: 50 }}
                      />
                    )}
                  </View>

                  <View style={styles.contents}>
                    <TouchableOpacity onPress={() => setStep("About")}>
                      <View>
                        <Text
                          style={[
                            styles.types,
                            {
                              borderBottomWidth: step === "About" ? 2 : 0,
                              color: step === "About" ? "#E28633" : "black",
                              borderBottomColor:
                                step === "About" ? "#E28633" : "black",
                            },
                          ]}
                        >
                          About
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStep("Inclusion")}>
                      <View>
                        <Text
                          style={[
                            styles.types,
                            {
                              borderBottomWidth: step === "Inclusion" ? 2 : 0,
                              color: step === "Inclusion" ? "#E28633" : "black",
                              borderBottomColor:
                                step === "Inclusion" ? "#E28633" : "black",
                            },
                          ]}
                        >
                          Inclusion
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStep("Amenities")}>
                      <View>
                        <Text
                          style={[
                            styles.types,
                            {
                              borderBottomWidth: step === "Amenities" ? 2 : 0,
                              color: step === "Amenities" ? "#E28633" : "black",
                              borderBottomColor:
                                step === "Amenities" ? "#E28633" : "black",
                            },
                          ]}
                        >
                          Amenities
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setStep("Highlights")}>
                      <View>
                        <Text
                          style={[
                            styles.types,
                            {
                              borderBottomWidth: step === "Highlights" ? 2 : 0,
                              color:
                                step === "Highlights" ? "#E28633" : "black",
                              borderBottomColor:
                                step === "Highlights" ? "#E28633" : "black",
                            },
                          ]}
                        >
                          Highlights
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStep("AIPlan")}>
                      <View>
                        <Text
                          style={[
                            styles.types,
                            {
                              borderBottomWidth: step === "AIPlan" ? 2 : 0,
                              color: step === "AIPlan" ? "#E28633" : "black",
                              borderBottomColor:
                                step === "AIPlan" ? "#E28633" : "black",
                            },
                          ]}
                        >
                          AI Plan
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingBottom: 100, height: height / 2 }}
                  >
                    {render()}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        )}
      </Portal>
    </Provider>
  );
};

export default ResortsInner;
