import React from "react";
import ProgressiveImage from "./../../../Reusable Components/ProgressiveImage";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  a,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const NationalPark = ({ nationalPark, setNationalPark, tourName }) => {
  const sendEmail = async () => {
    await axios
      .post(
        `https://us-central1-touronapp-248e4.cloudfunctions.net/sendMail?dest=touronholidayz@gmail.com&countryName=Maldives`
      )
      .then((d) => console.log("d", d))
      .catch((err) => console.log("err", err))
      .catch((err) => console.log("err", err));
  };

  const nationalParks = [
    {
      imageUrl: "https://www.corbettnationalpark.in/assets/img/bannersss.jpg",
      name: "Jim Corbett",
    },
    {
      imageUrl: "https://www.girnationalpark.in/images/jungle_safari.jpg",
      name: "Gir",
    },
    {
      imageUrl:
        "https://static.india.com/wp-content/uploads/2014/09/Kaziranga-National-Park.jpg",
      name: "Kaziranga",
    },
    {
      imageUrl:
        "https://curlytales.com/wp-content/uploads/2020/04/white-bengal-tigers-768x504-1.jpg",
      name: "Sunderban",
    },
    {
      imageUrl:
        "https://breathedreamgo.com/wp-content/uploads/2018/02/Khana-Guide-HD-2.jpg",
      name: "Kanha",
    },
    {
      imageUrl:
        "https://www.thehotelguru.com/_images/3f/5f/3f5fb246f07c2cc4bf014d8946da8801/500x332.jpg",
      name: "Bandhavgarh",
    },
    {
      imageUrl:
        "https://davidsbeenhere.com/wp-content/uploads/2019/06/manas-national-park-travel-guide19.jpg",
      name: "Manas",
    },
    {
      imageUrl:
        "https://www.explorationscompany.com/media/6552/india-reni-pani-jungle-lodge-satpura-national-park-muggar-crocodile.jpg?anchor=center&mode=crop&quality=80&width=680&height=384&rnd=131623229190000000",
      name: "Saptura",
    },

    {
      imageUrl:
        "http://www.jagranjosh.com/imported/images/E/Articles/76.%20Nanda%20Devi%20National%20Park_%20Facts%20at%20a%20Glance2.jpg",
      name: "Nandha Devi",
    },
    {
      imageUrl:
        "https://media.istockphoto.com/photos/big-sloth-bear-or-melursus-ursinus-vulnerable-species-encounter-in-picture-id1177584713?k=6&m=1177584713&s=612x612&w=0&h=2Hdmo4p81mO3FV1uXHRqruhs_H88dhEUTJKIigMW-eI=",
      name: "Pench",
    },
    {
      imageUrl:
        "https://s01.sgp1.cdn.digitaloceanspaces.com/article/144005-lgvnxmsved-1594103535.jpeg",
      name: "Nagarhole",
    },
    {
      imageUrl:
        "https://indiatrotter.com/wp-content/uploads/2020/08/periyar-national-park-location.jpg",
      name: "Periyar",
    },
    {
      imageUrl:
        "https://keralatourism.travel/images/places-to-visit/headers/eravikulam-national-park-munnar-tourism-entry-fee-timings-holidays-reviews-header.jpg",
      name: "Eravikulam",
    },
    {
      imageUrl:
        "https://sites.google.com/a/miamioh.edu/geo121f15/_/rsrc/1444604447269/home/asia-valley-of-the-flowers-india-10/ValleyofFlowers.jpg",
      name: "Valley Of Flowers",
    },
    {
      imageUrl:
        "https://viewtraveling.com/wp-content/uploads/2018/06/Bandipur-National-Park-India.jpg",
      name: "Bandipur",
    },
  ];
  return (
    <View>
      <View
        style={{
          width: WIDTH * 0.9,
          alignItems: "flex-end",
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 30,
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            prevStep();
          }}
        >
          <View>
            <AntDesign name="arrowleft" size={28} />
          </View>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontFamily: "NewYorkl",
            marginTop: Platform.OS == "android" ? HEIGHT / 14 : 40,
            flex: 0.4,
          }}
        >
          {tourName}
        </Text>

        <TouchableOpacity
          onPress={() => {
            nextStep();
          }}
        >
          <View></View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Andika",
            marginVertical: 10,
            textAlign: "center",
          }}
        >
          Select the National Park
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {nationalParks.map((item, index) => (
          <View key={index}>
            {nationalPark === item.name ? (
              // <TouchableOpacity onPress={() => setNationalPark(item.name)}>
              <TouchableOpacity onPress={sendEmail}>
                <ProgressiveImage
                  style={styles.cityImage}
                  source={require("../../../../assets/ticks.png")}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setNationalPark(item.name)}>
                <Image
                  style={styles.cityImage}
                  source={{ uri: item.imageUrl }}
                />
              </TouchableOpacity>
            )}
            <Text style={{ textAlign: "center", marginBottom: 5 }}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>

      {/* <FlatList
        data={nationalParks}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
              {nationalPark === item.name ? (
                // <TouchableOpacity onPress={() => setNationalPark(item.name)}>
                <TouchableOpacity onPress={sendEmail}>
                  <Image
                    style={styles.cityImage}
                    source={require("../../../../assets/ticks.png")}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setNationalPark(item.name)}>
                  <Image
                    style={styles.cityImage}
                    source={{ uri: item.imageUrl }}
                  />
                </TouchableOpacity>
              )}
              <Text style={{ textAlign: "center", marginBottom: 5 }}>
                {item.name}
              </Text>
            </View>
          );
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cityImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 100,
  },
});
export default NationalPark;
