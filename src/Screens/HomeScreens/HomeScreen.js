import React, { useState, useEffect, useMemo } from "react";
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
import Categories from "./components/CategoriesScreen";
import ContentList from "./components/ContentList";
import { Feather, FontAwesome } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { Portal, Provider } from "react-native-paper";
import touron from "../../api/touron";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import { database } from "firebase";
const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [status, setStatus] = useState(true);
  // const [networkLoader, setNetworkLoader] = useState(false);
  // const [tour, setTour] = useState([]);
  // const [cities, setCities] = useState([]);
  // const [countries, setCountries] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [googleStats, setGoogleStats] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);
  const [activePromoSlide, setActivePromoSlide] = useState(0);
  const [selectedPromotion, setSelectedPromotion] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  // const cityPage = Math.round(Math.random() * 15);
  // const countryPage = Math.round(Math.random() * 7);
  // const tourPage = Math.round(Math.random() * 50);

  // console.log(`testimonials`, testimonials);

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
    {
      coordinates: {
        latitude: "4.1755",
        longitude: "73.5093",
      },
      _id: "5ef5f193db65dc0017ca6937",
      cityName: "Male",
      countryName: "Maldives",
      aboutCity:
        "Malé is the densely populated capital of the Maldives, an island nation in the Indian Ocean. It's known for its mosques and colorful buildings. The Islamic Centre (Masjid-al-Sultan Muhammad Thakurufaanu Al Auzam) features a mosque, a library and a distinctive gold dome. Near the harbor, a popular fish market offers the day's catch, and a produce market is stocked with local fruit",
      idealDays: "3-4 days",
      imageUrl:
        "https://images.pexels.com/photos/3601437/pexels-photo-3601437.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "27 - 31 C",
      travelDuration: "4-6 hours",
      famousPlacesToVisit: "Hulhumale, Atoll, Sultan Park",
      __v: 0,
      airportName: "Velana International Airport (MLE)",
      airportType: "Native Airport",
      createdAt: "2020-09-17T07:22:25.127Z",
      updatedAt: "2020-09-17T07:22:25.127Z",
    },
    {
      coordinates: {
        latitude: "14.679442",
        longitude: "121.038155",
      },
      _id: "5ef5f1a1db65dc0017ca6938",
      cityName: "Quezon City",
      countryName: "Philippines",
      aboutCity:
        "Quezon City is located on the Guadalupe Plateau, just northeast of Manila, in the Philippines",
      idealDays: "5-6 days",
      imageUrl:
        "https://images.summitmedia-digital.com/topgear/images/2020/05/21/quezon-city-travel-pass-guidelines-1590038324.jpg",
      weather: "30 C",
      travelDuration: "8-10 hours",
      famousPlacesToVisit:
        "Quezon Memorial Circle, Monasterio de Santa Clara,  Eastwood City",
      __v: 0,
    },
  ];

  const country = [
    {
      visa: {
        onArrival: "NO",
        cost: 5000,
      },
      general: {
        bestTimeToVisit: [
          "March",
          "April",
          "May",
          "August",
          "September",
          "October",
        ],
        currency: "Turkish lira",
        timeZone: "-2.5 Hours",
      },
      _id: "5efddd4dd87364001723459a",
      countryName: "Turkey",
      aboutCountry:
        "Turkey, officially the Republic of Turkey, is a transcontinental country in Eurasia, located mainly on the Anatolian peninsula in Western Asia, with a smaller portion on the Balkan peninsula in Southeastern Europe",
      idealDays: "8-10 days",
      imageUrl:
        "https://images.pexels.com/photos/4242184/pexels-photo-4242184.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "-2 to 23",
      bestPlaces: "1.Istanbul 2.Antalya 3.Cappadocia",
      __v: 0,
      createdAt: "2020-08-26T10:17:00.720Z",
      updatedAt: "2021-02-01T09:53:16.919Z",
      countryFlagImage:
        "https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png",
    },
    {
      visa: {
        onArrival: "NO",
        cost: 8000,
      },
      general: {
        bestTimeToVisit: ["May", "June", "July", "August", "September"],
        currency: "Euro",
        timeZone: "+3.5 Hours",
      },
      _id: "5f1682a1c975160017755de3",
      countryName: "Germany",
      aboutCountry:
        "Germany is a Western European country with a landscape of forests, rivers, mountain ranges and North Sea beaches. It has over 2 millennia of history. Berlin, its capital, is home to art and nightlife scenes",
      idealDays: "8-10 days",
      imageUrl:
        "https://images.pexels.com/photos/3484001/pexels-photo-3484001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "0 to 24",
      bestPlaces: "1. Berlin\n2. Hamburg\n3. Munich\n4. Frankfurt",
      __v: 0,
      createdAt: "2020-08-26T10:16:47.450Z",
      updatedAt: "2021-02-01T09:53:49.883Z",
      countryFlagImage:
        "https://www.countryflags.com/wp-content/uploads/germany-flag-png-large.png",
    },
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
      createdAt: "2020-07-23T09:05:59.537Z",
      updatedAt: "2021-02-01T09:54:41.421Z",
      __v: 0,
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
      createdAt: "2020-08-07T07:19:00.991Z",
      updatedAt: "2021-02-01T09:55:25.985Z",
      __v: 0,
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
      createdAt: "2020-08-07T07:41:36.711Z",
      updatedAt: "2021-02-01T10:08:31.909Z",
      __v: 0,
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
      createdAt: "2020-08-07T07:54:55.727Z",
      updatedAt: "2021-02-01T10:09:07.649Z",
      __v: 0,
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
      __v: 3,
      countryName: "Singapore",
      dropTime: "-",
      pickUpLocation: "-",
      pickUpTime: "-",
      termsAndCondition: "-",
      createdAt: "2020-09-09T11:36:12.262Z",
      updatedAt: "2021-03-15T10:51:10.927Z",
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
      __v: 0,
      createdAt: "2021-02-03T10:20:46.342Z",
      updatedAt: "2021-03-17T08:44:46.552Z",
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
      __v: 0,
      createdAt: "2021-02-03T10:21:58.681Z",
      updatedAt: "2021-03-17T08:45:21.450Z",
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
      __v: 1,
      createdAt: "2021-02-02T09:51:17.191Z",
      updatedAt: "2021-03-15T11:06:02.465Z",
    },
  ];
  // useEffect(() => {
  //   getCounries();
  // }, []);

  useEffect(() => {
    getPromotions();
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

  const getStats = async () => {
    const tours = await touron.get("stats");
    setGoogleStats(...tours.data);
  };
  useEffect(() => {
    getTestimonial();
  }, []);
  useEffect(() => {
    getStats();
  }, []);

  // const getTours = async () => {
  //   const tours = await touron.get(`/tour?page=${tourPage}&pageSize=10`);
  //   setTour(tours.data);
  // };
  // const getCounries = async () => {
  //   const country = await touron.get(`/country?page=${countryPage}&pageSize=6`);
  //   setCountries(country.data);
  // };
  // const getCities = async () => {
  //   const city = await touron.get(`/city?page=${cityPage}&pageSize=5`);
  //   setCities(city.data);
  // };
  // const getNetwork = async () => {
  //   setNetworkLoader(true);
  //   const status = (await Network.getNetworkStateAsync()).isConnected;
  //   setStatus(status);
  //   setNetworkLoader(false);
  // };

  // useEffect(() => {
  //   getNetwork();
  // }, []);

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
                🚀 <Text style={{ fontWeight: "bold" }}>Mission</Text> to{" "}
                {item.tourPlace}
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

  const renderCountry = ({ item }) => {
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
  };
  const memoizedCountry = useMemo(() => renderCountry, [country]);

  const renderCity = ({ item }) => (
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

  const memoizedCity = useMemo(() => renderCity, [city]);

  const renderTour = ({ item }) => (
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
  const memoizedTour = useMemo(() => renderTour, [tours]);

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
                  paddingTop: Platform.OS === "ios" ? 35 : 0,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.toggleDrawer()}
                  style={{
                    flexBasis: "40%",
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
                      flexBasis: "60%",
                      alignSelf: "flex-start",
                      fontSize: 30,
                      fontFamily: "PlaylistScript",
                      color: "#263768",
                    }}
                  >
                    tour On
                  </Text>
                </View>
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
                    padding: 30,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../../../assets/fonts/google.png")}
                      style={{ marginRight: 20 }}
                    />
                    <Image
                      style={{ height: 40, width: 40 }}
                      source={require("../../../assets/fonts/facebook.png")}
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
                    {" "}
                    From -{googleStats.googleReviewCount}+ Feedbacks from our
                    travellers
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
