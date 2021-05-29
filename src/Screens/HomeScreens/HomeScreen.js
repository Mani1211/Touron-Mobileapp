import React, { useState, useEffect, useMemo, useContext } from "react";
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
import HTMLView from "react-native-htmlview";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Categories from "./components/CategoriesScreen";
import ContentList from "./components/ContentList";
import { FontAwesome } from "@expo/vector-icons";
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
  const { isLoggedIn, userInfo } = useContext(AuthContext);
  useEffect(() => {
    let mounted = true;
    // console.log(
    //   `isSubmittedFeedback(userInfo.userID)`,
    //   isSubmittedFeedback(userInfo.userID)
    // );
    if (mounted) {
      if (isLoggedIn && isSubmittedFeedback(userInfo.userID) === false) {
        setTimeout(() => setReview(true), 30000);
      }
    }
    return () => (mounted = false);
  }, [userInfo]);
  const city = [
    {
      coordinates: {
        latitude: "27.4712",
        longitude: "89.6339",
      },
      _id: "5ef5db91db65dc0017ca692c",
      cityName: "Thimphu",
      countryName: "Bhutan",
      aboutCity:
        "Thimphu, Bhutan’s capital, occupies a valley in the country’s western interior. In addition to being the government seat, the city is known for its Buddhist sites.",
      idealDays: "3-4 days",
      imageUrl:
        "https://lp-cms-production.imgix.net/2019-06/920de4c69eb8dc956b6687b1e78ae804-trashi-chhoe-dzong.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
      weather: "26 C",
      travelDuration: "8-10 hours",
      famousPlacesToVisit:
        "1. Trashi Chho Dzong 2. Changangkha Lhakhang 3. Tango Goemba 4. National Memorial Chorten 4. Motithang Takin Preserve 5. Dechen Phodrang",
      __v: 0,
      airportName: "Bagdogra International Airport",
      airportType: "Nearest Airport",
    },
    {
      coordinates: {
        latitude: "27.4287",
        longitude: "89.4164",
      },
      _id: "5ef5e625db65dc0017ca692e",
      cityName: "Paro",
      countryName: "Bhutan",
      aboutCity:
        "1. Paro is a valley town in Bhutan, west of the capital\n2. It is the site of the country’s only international airport and is also known for the many sacred sites in the area.",
      idealDays: "3-4 days",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/68/Paro%2C_Paro%2C_Bhutan_%288026008882%29.jpg",
      weather: "- 2 C - 23 C",
      travelDuration: "6-8 hours",
      famousPlacesToVisit:
        "1. Taktsang Lhakhang or the Tiger’s Nest 2. Chele La pass 3. Rinchen Pung Dzong 4. Drukgyel Dzong 5. Druk Choeding temple 6. National Museum",
      __v: 0,
      airportName: "Paro International Airport ",
      airportType: "Native Airport",
    },
    {
      coordinates: {
        latitude: "11.5564",
        longitude: "104.9282",
      },
      _id: "5ef5ed3adb65dc0017ca6932",
      cityName: "Phnom Penh",
      countryName: "Cambodia",
      aboutCity:
        "Phnom Penh, Cambodia’s busy capital, sits at the junction of the Mekong and Tonlé Sap rivers. It was a hub for both the Khmer Empire and French colonialists. On its walkable riverfront, lined with parks, restaurants and bars, are the ornate Royal Palace, Silver Pagoda and the National Museum, displaying artifacts from around the country. At the city’s heart is the massive, art deco Central Market.",
      idealDays: "3-4 days",
      imageUrl:
        "https://images.pexels.com/photos/3226403/pexels-photo-3226403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "26 - 34 C",
      travelDuration: "8-10 hours",
      famousPlacesToVisit:
        "Royal Palace, Wat Phnom, Central Market, Tuol Sleng Genocide Museum, National Museum of Cambodia, Independence Monument.",
      __v: 0,
      airportName: "Phnom Penh International (PNH) Airport",
      airportType: "Native Airport",
      createdAt: "2020-10-27T06:09:37.314Z",
      updatedAt: "2020-11-03T09:30:10.333Z",
    },
    {
      coordinates: {
        latitude: "27.7172",
        longitude: "85.3240",
      },
      _id: "5ef5edcfdb65dc0017ca6933",
      cityName: "Kathmandu",
      countryName: "Nepal",
      aboutCity:
        "1. Kathmandu, Nepal's capital, is set in a valley surrounded by the Himalayan mountains. \n2. At the heart of the old city’s mazelike alleys is Durbar Square, which becomes frenetic during Indra Jatra, a religious festival featuring masked dances",
      idealDays: "3-4 days",
      imageUrl:
        "https://images.pexels.com/photos/4133938/pexels-photo-4133938.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "20 C - 30 C",
      travelDuration: "6-8 hours",
      famousPlacesToVisit:
        "1. Tabitha Bahal 2. Boudhanath Stupa 3. Swayambhunath temple 4. Kathmandu Durbar Square 5. Pashupati temple",
      __v: 0,
      airportName: "Tribhuvan International Airport",
      airportType: "Native Airport",
      createdAt: "2020-11-03T09:29:21.354Z",
      updatedAt: "2021-01-31T14:10:19.141Z",
    },

    {
      coordinates: {
        latitude: "28.2096",
        longitude: "83.9856",
      },
      _id: "5ef5effadb65dc0017ca6935",
      cityName: "Pokhara",
      countryName: "Nepal",
      aboutCity:
        "1. Pokhara is a city on Phewa Lake, in central Nepal.\n2. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas.",
      idealDays: "8-10 days",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2018/10/Phewa-Lake-Cover.jpg",
      weather: "21 C",
      travelDuration: "10-12hours",
      famousPlacesToVisit:
        "1. Phewa Lake / Tal 2. David’s falls 3. Bindabasini temple 4. Gupteshwor Mahadev 5. Bats Cave 6. Mahendra cave 7.Museum 8. Begnas Lake 9. Sarangkot 10. World Peace Stupa",
      __v: 0,
      airportName: "Tribhuvan International",
      airportType: "Nearest Airport",
    },
  ];

  const country = [
    {
      visa: {
        onArrival: "no",
        cost: 6000,
      },
      general: {
        bestTimeToVisit: ["June", "July", "August", "September", "October"],
        currency: "Russian Rouble",
        timeZone: "-2.5 Hours",
      },
      _id: "5f1952f78a23960017195e17",
      countryName: "Russia",
      aboutCountry:
        "Russia is a land of superlatives. By far the world’s largest country, it covers nearly twice the territory of Canada, the second largest. It extends across the whole of northern Asia and the eastern third of Europe, spanning 11 time zones and incorporating a great range of environments and landforms, from deserts to semiarid steppes to deep forests and Arctic tundra.",
      idealDays: "7-8 days",
      imageUrl:
        "https://images.pexels.com/photos/753339/pexels-photo-753339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "-5 to 17",
      bestPlaces: "Mosow, Saint Petersburg",
      countryFlagImage:
        "https://www.countryflags.com/wp-content/uploads/russia-flag-png-large.png",
    },
    {
      visa: {
        onArrival: "YES",
        cost: 0,
      },
      general: {
        bestTimeToVisit: [
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        currency: "Mauritian Rupee",
        timeZone: "1.30 HRS",
      },
      _id: "5f2d0064e0533b0017e1df03",
      countryName: "Mauritius",
      aboutCountry:
        "Mauritius, an Indian Ocean island nation, is known for its beaches, lagoons and reefs. The mountainous interior includes Black River Gorges National Park, with rainforests, waterfalls, hiking trails and wildlife like the flying fox. ",
      idealDays: "8-10 days",
      imageUrl:
        "https://www.andbeyond.com/wp-content/uploads/sites/5/Beautiful-Mauritius-Beaches-1920x1080.jpg",
      weather: "19 to 22",
      bestPlaces: "1. Port Louis\n2. Beau Bassin-Rose Hill\n3. Vacoas ",
      countryFlagImage:
        "https://www.countryflags.com/wp-content/uploads/mauritius-flag-png-large.png",
    },
    {
      visa: {
        onArrival: "YES",
        cost: 0,
      },
      general: {
        bestTimeToVisit: ["April", "May", "October", "November"],
        currency: "Seychellois Rupee",
        timeZone: "1.30 HRS",
      },
      _id: "5f2d05b0e0533b0017e1df04",
      countryName: "Seychelles",
      aboutCountry:
        "The Seychelles is an archipelago of 115 islands in the Indian Ocean, off East Africa. It's home to numerous beaches, coral reefs and nature reserves, as well as rare animals such as giant Aldabra tortoises. ",
      idealDays: "6-7 days",
      imageUrl:
        "https://images.pexels.com/photos/2956470/pexels-photo-2956470.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "25 to 30",
      bestPlaces: "1. Mahe\n2. Praslin\n3. La Digue\n4. Beau Vallon",
      countryFlagImage:
        "https://www.countryflags.com/wp-content/uploads/seychelles-flag-png-large.png",
    },
    {
      visa: {
        onArrival: "NO",
        cost: 8000,
      },
      general: {
        bestTimeToVisit: [
          "March",
          "April",
          "May",
          "September",
          "October",
          "November",
        ],
        currency: "Polish Zloty",
        timeZone: "3.30 Hours°",
      },
      _id: "5f2d08cfe0533b0017e1df05",
      countryName: "Poland",
      aboutCountry:
        "Poland, officially the Republic of Poland, is a country located in Central Europe. It is divided into 16 administrative subdivisions, covering an area of 312,696 square kilometres, and has a largely temperate seasonal climate.",
      idealDays: "5-6 days",
      imageUrl:
        "https://images.pexels.com/photos/4552456/pexels-photo-4552456.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "12 to 25",
      bestPlaces: "1. Krakow\n2. Warsaw\n3. Gdansk\n4. Wrocław",
      countryFlagImage:
        "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png",
    },
  ];

  const tours = [
    {
      tourCost: { adult: 4200, children: 3200 },
      pickUpPoint: ["No Pickup"],
      tourCategory: ["Attraction"],
      idealType: ["Family and kids"],
      pickUpAvailableOn: ["Morning", "Afternoon"],
      _id: "5efedc32f5de0700179d59d3",
      cityName: "Singapore",
      tourName: "Universal Studios Singapore",
      aboutTour:
        "Universal studious is well known and the name itself reminds us of the wonderful and amazing movies produced by this production house. Imagine a theme park that brings all of its characters and stories to life. The theme park houses different areas like Hollywood, New York, Sci-fi City, Ancient Egypt, The Lost World, Far Far Away and Madagascar, each having a certain significance in the real world, as well as in the movies.\nAlso, have a dining experience from local to international cuisines, varieties ranging from food to snacks, a full fine dining experience, shop various merchandise, souvenirs, etc. in the retail stores and many shops present in this park",
      imageUrl:
        "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720,f_auto/activities/alpvicdble0gnuia3jzw/UniversalStudiosSingaporeOne-DayTicket.webp",
      ratings: "4.8",
      reviews: "70,587",
      inclusion: "-",
      itinerary: "-",
      tourDuration: "6-7 hours",
      tourType: "Full Day Tour",
      additionalInformation:
        "<ul><li>Check out the show schedule once you arrive onsite. Consider Waterworld show times, and for weekend visitors, plan around the Hollywood Dreams Parade and the Lake Hollywood Spectacular fireworks show</li><li>Please note: Universal Studios Singapore will be closed until 01 June 2020 (inclusive).</li><li>Re-entry is allowed, but make sure to get a hand stamp at the exit</li></ul>",
      tourPreferance: "SIC Basis",
      trending: "Yes",
      referanceLink:
        "https://www.klook.com/en-IN/activity/117-universal-studios-singapore/#krt=r20&krid=f4c2d56f-46cb-4443-79af-390bc33948c0",
      countryName: "Singapore",
      dropTime: "-",
      pickUpLocation: "-",
      pickUpTime: "-",
      termsAndCondition: "-",
      tourVideoSrc: "",
      videoAuthor: "",
    },
    {
      tourCost: { adult: 1000, children: 600 },
      pickUpPoint: ["No Pickup"],
      tourCategory: ["Attraction"],
      idealType: ["Solo", "Mature Couple", "Friends"],
      pickUpAvailableOn: ["Morning", "Afternoon", "Evening"],
      _id: "5f0598e28011da00177a3685",
      cityName: "Kyoto",
      tourName: "Nijo Castle and Ninomaru Palace Admission Ticket in Kyoto",
      aboutTour:
        "Visit one of Kyoto’s world famous UNESCO World Heritage sites Nijo Castle and Ninomaru Palace. Learn about the history of Japan as you wander around the castle and palace’s vast grounds. Be in awe at the beauty of the blooming flowers during the Nijo Castle 2019 Sakura Festival. Skip the long lines at the castle’s entrance and enter with your voucher’s QR code. Explore the exclusive area in Nijo Castle with a certified English-speaking guide",
      imageUrl:
        "https://d3bbatwdaufxg9.cloudfront.net/content/2214/5559/8497/01-20140407_NijoCastle-4.jpg",
      ratings: "4.7",
      reviews: "258",
      inclusion: "<ul><li>English-speaking guide</li></ul>",
      itinerary: "-",
      tourDuration: "3-4 hours",
      tourType: "Full Day Tour",
      additionalInformation:
        "<ul><li>Storage areas are available at the venue. Please contact staff on site for rates&nbsp;</li><li>Re-entry is not allowed after you leave the venue</li><li>For participants with wheelchairs, please note that if you enter the Ninomaru Palace, you will be requested to change into a palace specialized wheelchair&nbsp;</li><li>Visitors wearing a kimono during the evening admission can visit for free</li><li>Photography and video recording is strictly prohibited within the Ninomaru Palace</li></ul>",
      tourPreferance: "On Your Own",
      trending: "No",
      referanceLink:
        "https://www.klook.com/en-IN/activity/20913-nijo-castle-ninomaru-palace-ticket-kyoto/#krt=r22&krid=da8fb6e8-ee7d-4e7a-486b-bec21708332d",
      countryName: "Japan",
      pickUpTime: "N.A",
      dropTime: "N.A",
    },
    {
      tourCost: { adult: 2000, children: 1200 },
      pickUpPoint: ["No Pickup"],
      tourCategory: ["Attraction"],
      idealType: ["All Traveller Profile"],
      pickUpAvailableOn: ["Morning", "Afternoon", "Evening"],
      _id: "5f059bcd8011da00177a3686",
      cityName: "Osaka",
      tourName: "Osaka Aquarium Kaiyukan Ticket",
      aboutTour:
        " Visit Osaka Aquarium, one of the world's largest aquariums, with over 600 species of animals. Witness aquatic animals of the Pacific Rim in the recreation of their habitats. Take a virtual tour of the Pacific Ocean as you explore the aquarium's 15+ large tanks. Visit the seals at the world's largest dome-shaped ceiling tank in the Arctic zone",
      imageUrl:
        "https://lh3.googleusercontent.com/yjOBarSzGYgZ9kaFbJk4LHI-i2mPrjaZfdicWL-FwZ23c_ygcMWIZyoVzIhbDPans3973lnO-9knvMwCYaVsAd7YZm4EkVoLcgSV5xa-KipgEXrt-dR3rsfqbTbojyTly5NYYwo4GialRwJ3_UU3oXpmg3r27uLnvFnCZraWAj7MW2bMUXBHbKq7A2bhQzyBQ5ADSLOdp_mtrKZONT09Fg2BgVH85xb-QCypFkF_vkraCSgjlIFC_6CCOuUtuyuR4waf1jU8-rejW-N8p53KgQUgbL9ByrHw6l1qxd8fan7euZ8t7OTFfo8VTdjgJVjMEUrOeadoKHbCp4kMFDt5l5mq9nNwhTML0ddVpH_Ch_2fYQdPtIHSsO9qZTx5jQS8stTfC-bByk-3_jZFHZC5lS-GDBZgDV37lK70C04vQ6YhDPqlbSjuv6cuA-gOFa77aWn-GgQWseHT5Whzc4BPH0nRJSOf-bSOH9IxHcRwgKWxpZY5dJhC8nak959A2vEn84ggPIRMGgsfM2GrMJPwyUmHqxQVIEFILVpTvy3ulnTlxmonaZdToWB5ZhdKE5aK1P4GDaO_ZhsWi-uyJ5Wrf-k55XmhiI9mJcrk_DPwm6zE0j0Z71ebD_dWYwaDeiKIed5u8uFi23u2FW3WyZEA35ttEkPSRQP0l5i5C1V658HGUjbNWSOAVQBsoO_zGhQzBG9B0t3kp5m4wND80V8=w2236-h1490-no",
      ratings: "4.8",
      reviews: "14,874",
      inclusion: "<ul><li>1 Osaka Aquarium ticket(s)</li></ul>",
      itinerary: "-",
      tourDuration: "2-3 hours",
      tourType: "Half Day Tour",
      additionalInformation:
        "<ul><li>Storage areas are available at the venue. Please contact staff on site for rates</li><li>Audio guide in Japanese, English, Chinese, and Korean, is available for rent (JPY500) at the Kaiyukan Information Counter&nbsp;</li><li>Please make sure to enter correct age while purchasing. If your age does not match the age on the ticket, you cannot enter the aquarium/modify your ticket and will need to purchase another one. No refunds will be provided</li></ul>",
      tourPreferance: "On Your Own",
      trending: "No",
      referanceLink:
        "https://www.klook.com/en-IN/activity/598-osaka-aquarium-kaiyukan-japan/#krt=r20&krid=c01f05b0-af1d-4596-5319-e9b7a19cd1b9",
      countryName: "Japan",
      pickUpTime: "N.A",
      dropTime: "N.A",
    },

    {
      tourCost: { adult: 2800, children: 2800 },
      pickUpPoint: ["No Pickup"],
      tourCategory: ["Activities", "Attraction", "Theme Park"],
      idealType: ["Family and kids", "Young Couple", "Friends", "Honeymoon"],
      pickUpAvailableOn: ["Morning", "Afternoon", "Evening"],
      _id: "5f02d4fa5d974f00174f4fa5",
      cityName: "Singapore",
      tourName: "Sentosa Fun Pass",
      aboutTour:
        "The Sentosa Island cum entertainment capital of Singapore is brimful of adventurous attractions. This place is home to the most unique experiences and adventures that you cannot find anywhere in the city-state. The Sentosa Fun Pass allows you to witness The Universal Studios, Adventure Cove Waterpark, Madame Tussauds Wax Museum, Tiger Sky Tower, Luge and Sky ride, Images of Singapore Live (IoS Live), Wings of Time, Maritime Experiential Museum, S.E.A Aquarium, and many more such spectacular attractions. The adventure begins, as soon as you arrive at this island.\n",
      imageUrl:
        "https://res.klook.com/image/upload/c_fill,w_960,h_460,f_auto/w_80,x_15,y_15,g_south_west,l_klook_water/activities/b8351e89-Sentosa-FUN-Pass-Singapore.JPG",
      ratings: "4.6",
      reviews: "5,527",
      inclusion:
        "<ul><li>2-day consecutive attraction pass Sentosa Token FUN Pass with 55 tokens</li></ul>",
      itinerary: "-",
      tourDuration: "6-7 hours",
      tourType: "Full Day Tour",
      additionalInformation:
        "<ul><li>Once you activate a pass, it can only be used by that individual. Passes cannot be re-sold or used by more than one person</li><li>Wings of Time tickets must be redeemed at Wings of Time Ticketing Counters prior to the show</li><li>Guests will be able to top up their Sentosa FUN Passes at all Sentosa Ticketing Counters in blocks of 5 tokens for SGD5</li><li>All guests must present a valid ticket to staff manning the island or attraction's admission points or the outlet staff to avail the service or products indicated on the tickets</li><li>Please refer to the official website for the respective attractions’ height, weight, and age restrictions</li><li>Tickets are not to be used for touting purposes Please see the full list of attractions and number of tokens required to participate for more information</li></ul>",
      tourPreferance: "SIC Basis",
      trending: "No",
      referanceLink:
        "https://www.klook.com/en-IN/activity/2121-sentosa-fun-pass-singapore/#krt=r22&krid=71de5334-4cd0-442f-74da-076a0fe8c8b6",
      countryName: "Singapore",
      pickUpTime: "N.A",
      dropTime: "N.A",
    },
  ];

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
      .then((data) => {
        console.log("WhatsApp Opened successfully " + data);
      })
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
  const memoizedCountry = useMemo(() => renderCountry, [country]);

  const renderCity = ({ item }) => (
    <CountryCityTile
      item={item}
      navigation={navigation}
      navName={"CityInner"}
      name={item.cityName}
    />
  );

  const memoizedCity = useMemo(() => renderCity, [city]);

  const renderTour = ({ item }) => (
    <TourTile navigation={navigation} item={item} navName={"TourInner"} />
  );
  const memoizedTour = useMemo(() => renderTour, [tours]);

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
              <Header navigation={navigation} />

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
                  renderItem={memoizedCountry}
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
                  renderItem={memoizedCity}
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
                  renderItem={memoizedTour}
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
    padding: 15,
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
