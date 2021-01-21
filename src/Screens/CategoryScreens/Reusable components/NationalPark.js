import React from "react";
import ProgressiveImage from "./../../../Reusable Components/ProgressiveImage";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const NationalPark = ({ nationalPark, setNationalPark }) => {
  const sendEmail = async () => {
    const details = {
      name: "Mani",
      requestID: "T0-140121-989898",
      destination: nationalPark,
    };
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
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Jim Corbett",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Gir",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Kaziranga",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Sunderban",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Kanha",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Bandhavgarh",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Manas",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Saptura",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Valley Of Powers",
    },

    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Nandha Devi",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Pench",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Nagarhole",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Periyar",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Eravikulam",
    },
    {
      imageUrl:
        "https://www.ranthamborenationalpark.in/images/ranthmbore-park.jpg",
      name: "Bandipur",
    },
  ];
  return (
    <View>
      <TouchableOpacity onPress={() => sendEmail()}>
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
