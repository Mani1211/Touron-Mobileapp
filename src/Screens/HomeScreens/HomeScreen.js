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
import Story from "../StoryScreens/Story";

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
        latitude: "37.4467",
        longitude: "25.3289",
      },
      _id: "5efd6fd68b64970017a68831",
      cityName: "Mykonos",
      countryName: "Greece",
      aboutCity:
        "Mykonos is an island in the Cyclades group in the Aegean Sea. It's popularly known for its summer party atmosphere. Beaches such as Paradise and Super Paradise have bars that blare thumping music. Massive dance clubs attract world-renowned DJs and typically stay open well past dawn.",
      idealDays: "3-4 days",
      imageUrl:
        "https://mk0travelawayrru2xew.kinstacdn.com/wp-content/uploads/2016/04/bay-mykonos-town.jpg",
      weather: "18 C - 30 C",
      travelDuration: "14-16 hours",
      famousPlacesToVisit:
        "1. Little Venice Mykonos Quarter 2. Kato Mili 3. Island Of Delos 4. Platys Gialos Beach 5. Panagia Paraportiani 6. Ano Mera 7. Elia Beach 8. Paradise Beach 9. Rarity Gallery 10. Matoyianni Street",
      airportType: "Nearest Airport",
      airportName: "Athens International Airport",
      documentsRequired:
        "<p>Passport<br>Flight Tickets<br>Tour and Hotel Vouchers<br>Visa<br>RT-PCR Test Reports/Vaccine Certificates</p>",
      thingsToPack:
        "<p>1. Passport&nbsp;<br>2. Essential medicines<br>3. RT-PCR Negative Test Report/ Vaccination certificate<br>4. Tour and Hotel Vouchers<br>5. Suitable Clothes for the weather<br>6. Comfortable Footwear<br>7. Camera and other gadgets<br>8. Sunscreen and an Umbrella<br>9. Face Mask and Hand Sanitiser</p>",
    },
    {
      coordinates: {
        latitude: "8.3405° S",
        longitude: "115.0920° E",
      },
      _id: "5ef49464bd272f0017c7920b",
      cityName: "Bali",
      countryName: "Indonesia",
      aboutCity:
        "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.",
      idealDays: "4-5 days",
      imageUrl:
        "https://images.pexels.com/photos/2474689/pexels-photo-2474689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      weather: "26 to 27",
      travelDuration: "8-10 hours",
      famousPlacesToVisit:
        "Denpasar, Kuta, Ubud, Mount Batur, Seminyak, Jimbaran, Canggu, Nusa Penida, Nusa Dua",
      airportName: "Ngurah Rai International Airport (DPS)",
      airportType: "Native Airport",
      cityTips:
        "<ol><li>Tips on Coping with a Tsunami in Bali</li><li>Prepare yourself for the worst:&nbsp;If you are staying at one of the vulnerable areas mentioned above, study the attached evacuation maps, and familiarise yourself with the escape routes and the direction of the yellow zone.</li><li>Cooperate with your Bali hotel:&nbsp;Ask your hotel in Bali for the tsunami preparation procedures. Do participate in tsunami and earthquake drills, if requested by the hotel.</li><li>Assume the worst when an earthquake strikes:&nbsp;After an earthquake, move away from the beach immediately without waiting for the siren, and head for the designated yellow zone in your immediate vicinity.</li><li>Keep your ears open for the siren:&nbsp;If you hear the siren sound a three-minute long wail, head immediately for the designated yellow zone, or if that is impossible, look for the vertical evacuation centre closest to you.</li><li>Check broadcast media for tsunami updates:&nbsp;The Bali local radio station RPKD Radio 92.6 FM (radio.denpasarkota.go.id) is assigned to send tsunami updates live on the air. National TV channels will also broadcast tsunami warnings as breaking news.</li><li>Check social media, too:&nbsp;The BMKG government office issues regular updates on their&nbsp;official Twitter account, and via&nbsp;apps for iPhones and Android devices.</li></ol>",
      documentsRequired:
        "<p>Passport<br>Flight Tickets<br>Tour and Hotel Vouchers<br>Visa<br>RT-PCR Test Reports/Vaccine Certificates</p>",
      thingsToPack:
        "<p>1. Passport&nbsp;<br>2. Essential medicines<br>3. RT-PCR Negative Test Report/ Vaccination certificate<br>4. Tour and Hotel Vouchers<br>5. Airy Cotton Clothes<br>6. Comfortable Footwear<br>7. Camera and other gadgets<br>8. Sunscreen and an Umbrella<br>9. Face Mask and Hand Sanitiser</p>",
    },
    {
      coordinates: {
        latitude: "48.8566",
        longitude: "2.3522",
      },
      _id: "5ef9c93759661c0017caa7b8",
      cityName: "Paris",
      countryName: "France",
      aboutCity:
        "1. Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture.\n2.  Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture.",
      idealDays: "4-5 days",
      imageUrl:
        "https://images.pexels.com/photos/2675268/pexels-photo-2675268.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "15 C - 27 C",
      travelDuration: "12-14 hours",
      famousPlacesToVisit:
        "1. Eiffel Tower 2. Notre Dame Cathedral 3. Louvre Museum 4. Arc de Triomphe  5. Cruise on the Seine 6. Montmartre 7. Latin Quarter of Paris 8. Moulin Rouge 9. Disneyland Paris 10. Palace of Versailles",
      airportType: "Native Airport",
      airportName: "Charles de Gaulle Airport",
      updatedAt: "2021-05-31T09:17:15.538Z",
      documentsRequired:
        "<p>Passport<br>Flight Tickets<br>Tour and Hotel Vouchers<br>Visa<br>RT-PCR Test Reports/Vaccine Certificates</p>",
      thingsToPack:
        "<p>1. Passport&nbsp;<br>2. Essential medicines<br>3. RT-PCR Negative Test Report/ Vaccination certificate<br>4. Tour and Hotel Vouchers<br>5. Suitable Clothes for the weather<br>6. Comfortable Footwear<br>7. Camera and other gadgets<br>8. Sunscreen and an Umbrella<br>9. Face Mask and Hand Sanitiser</p>",
    },

    {
      coordinates: {
        latitude: "42.6507",
        longitude: "18.0944",
      },
      _id: "5efad3a88985b80017a0fbd8",
      cityName: "Dubrovnik ",
      countryName: "Croatia",
      aboutCity:
        "1. DescriptionDubrovnik is a city in southern Croatia fronting the Adriatic Sea. \n2. It's known for its distinctive Old Town, encircled with massive stone walls completed in the 16th century.",
      idealDays: "4-5 days",
      imageUrl:
        "https://images.pexels.com/photos/3566139/pexels-photo-3566139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "20 C - 30 C",
      travelDuration: "12-14 hours",
      famousPlacesToVisit:
        "1. Dubrovnik’s City Walls 2. Stradun 3. Dubrovnik Cable Car 4. Rector's Palace 5. Fort Lovrijenac 6. Pile Gate 7. Onofrio Fountain 8. Franciscan Monastery 9. Banje Beach 10. Dubrovnik’s Old Harbour",
      airportType: "Native Airport",
      airportName: "Dubrovnik Airport",
      documentsRequired:
        "<p>Passport<br>Flight Tickets<br>Tour and Hotel Vouchers<br>Visa<br>RT-PCR Test Reports/Vaccine Certificates</p>",
      thingsToPack:
        "<p>1. Passport&nbsp;<br>2. Essential medicines<br>3. RT-PCR Negative Test Report/ Vaccination certificate<br>4. Tour and Hotel Vouchers<br>5. Warm Clothes and Jerkins&nbsp;<br>6. Comfortable Footwear fit for mountainous regions&nbsp;<br>7. Camera and other gadgets<br>8. Moisturiser / Cold cream<br>9. Face Mask and Hand Sanitiser</p>",
    },

    {
      coordinates: {
        latitude: "64.1466",
        longitude: "21.9426",
      },
      _id: "5efdba43d87364001723458f",
      cityName: "Reykjavik",
      countryName: "Iceland",
      aboutCity:
        "Reykjavik, on the coast of Iceland, is the country's capital and largest city. It's home to the National and Saga museums, tracing Iceland’s Viking history. ",
      idealDays: "3-4 days",
      imageUrl:
        "https://www.dontforgettomove.com/wp-content/uploads/2020/04/virtual-helsinki.jpg",
      weather: "2 C - 14 C",
      travelDuration: "12-14 hours",
      famousPlacesToVisit:
        "1. Saga Museum 2. Volcano House 3. Laugavegur 4. Arbaer Open Air Museum  5. Harpa 6. Perlan 7. Settlement Exhibition 8. National Museum of Iceland 9. Solfar Sculpture 10. Hallgrimskirkja",
      airportType: "Native Airport",
      airportName: " Keflavík International Airport",
    },
  ];

  const country = [
    {
      visa: {
        onArrival: "No",
        cost: 5000,
      },
      general: {
        bestTimeToVisit: [
          "January",
          "Febuary",
          "March",
          "April",
          "November",
          "December",
        ],
        currency: "AED",
        timeZone: "-1.5 Hours",
      },
      _id: "5ef48d3fbd272f0017c79205",
      countryName: "United Arab Emirates",
      aboutCountry:
        "The United Arab Emirates, sometimes simply called the Emirates, is a country in Western Asia located at the eastern end of the Arabian Peninsula. It borders Oman and Saudi Arabia, and has maritime borders in the Persian Gulf with Qatar and Iran.",
      idealDays: "6-7 days",
      imageUrl:
        "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "37",
      bestPlaces: "Abu Dhabi, Sharjah,  Ajman, Dubai",
      countryFlagImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEW1S1lnXteMi2CvVkd0ZcCdv4DvsWBXRg5Q&usqp=CAU",
    },
    {
      visa: {
        onArrival: "Yes",
        cost: 0,
      },
      general: {
        bestTimeToVisit: [
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        currency: "Maldivian rufiyaa",
        timeZone: "-30 min",
      },
      _id: "5ef5f055db65dc0017ca6936",
      countryName: "Maldives",
      aboutCountry:
        "The Maldives, officially the Republic of Maldives, is a small island nation in South Asia, located in the Arabian Sea of the Indian Ocean. It lies southwest of Sri Lanka and India, about 1,000 kilometres from the Asian continent",
      idealDays: "4-5 days",
      imageUrl:
        "https://images.pexels.com/photos/3601421/pexels-photo-3601421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "26 to 32",
      bestPlaces: "Male",
      countryFlagImage:
        "https://www.countryflags.com/wp-content/uploads/maldives-flag-png-large.png",
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
        onArrival: "No",
        cost: 8000,
      },
      general: {
        bestTimeToVisit: [
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
        ],
        currency: "Euros",
        timeZone: "3.5 hours ",
      },
      _id: "5ef9b7f559661c0017caa7b6",
      countryName: "France",
      aboutCountry:
        "1. France, in Western Europe, encompasses medieval cities, alpine villages and Mediterranean beaches.\n2. The country is also renowned for its wines and sophisticated cuisine.",
      idealDays: "8-10 days",
      imageUrl:
        "https://images.pexels.com/photos/705764/pexels-photo-705764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "16 to 24",
      bestPlaces: "1. Paris\n2. Lyon\n3. Bordeaux\n4. Marseille\n5. Nice",
      countryFlagImage:
        "https://www.countryflags.com/wp-content/uploads/france-flag-png-large.png",
    },
    {
      visa: {
        onArrival: "NO",
        cost: 8000,
      },
      general: {
        bestTimeToVisit: ["April", "May", "June", "September", "October"],
        currency: "Euro",
        timeZone: "-2.5 Hours",
      },
      _id: "5efc876a7766b900172619c9",
      countryName: "Greece",
      aboutCountry:
        "The story of Greece is long and formidable, but it all started on a beautiful land enclosed by seas that soon gave birth to modern necessities such as democracy. In the midst of those discoveries, Western civilization grew, leaving countless relics that have stunned wanderers thousands of years after. ",
      idealDays: "8-10 days",
      imageUrl:
        "https://images.pexels.com/photos/5865865/pexels-photo-5865865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      weather: "5 to 37",
      bestPlaces: "1. Crete \n2. Santorini\n3. Athens\n4. Mykonos",
      countryFlagImage:
        "https://www.countryflags.com/wp-content/uploads/greece-flag-png-large.png",
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
        // console.log("WhatsApp Opened successfully " + data);
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
              <View style={{ paddingHorizontal: 20 }}>
                <Header navigation={navigation} />
              </View>

<<<<<<< HEAD
              {/* {promotions.length === 0 ? (
                <View>
=======
              <Story />

              {promotions.length === 0 ? (
                <>
>>>>>>> d0ba9f59fc38510b51fbb38b97593e9bbdd6c4e0
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
                </View>
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
              )} */}
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
