import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
import touron from "../../api/touron";
import { Feather } from "@expo/vector-icons";
import { database } from "firebase";
import ProgressiveImage from "./../../Reusable Components/ProgressiveImage";
import SearchBar from "./../../Reusable Components/SearchBar";

const VisaDetailsScreen = ({ navigation }) => {
  const [visa, setVisa] = useState([]);
  const [visaName, setVisaName] = useState("");
  const [visaRequest, setVisaRequest] = useState([]);

  const getVisaRequests = (value) => {
    let request = [];
    database()
      .ref(`visaSubmission/`)
      .on("value", (data) => {
        if (data) {
          data.forEach((c) => {
            request.push(c.val());
          });
        }
      });

    setVisaRequest(request);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getVisaRequests();
    }
    return () => (mounted = false);
  }, []);
  const search = () => {
    if (visa.length > 0) {
      const d = visa.filter((c) => {
        return c.countryName
          .trim()
          .toUpperCase()
          .includes(visaName.trim().toUpperCase());
      });
      return d;
    }
  };

  const getVisaDetails = async () => {
    const visaResponse = await touron.get("/visa");
    setVisa(visaResponse.data);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getVisaDetails();
    }
    return () => (mounted = false);
  }, []);

  return (
    <>
      <View
        animation="bounceIn"
        duration={3000}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <StatusBar backgroundColor="transparent" />
        <View
          style={{
            // marginTop: 40,
            marginVertical: 20,
            width: WIDTH,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View
              style={{
                //flex: 0.2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather
                name="arrow-left"
                size={28}
                color="black"
                style={{ paddingRight: 10, paddingLeft: 20 }}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              flex: 1,
              fontFamily: "Avenir",
            }}
          >
            Select the Country you are Travelling
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10, alignSelf: "stretch" }}>
          <SearchBar
            onChangeText={(value) => setVisaName(value)}
            placeholder={"Search Country...."}
          />
        </View>
        <FlatList
          data={search()}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("VisaInner", { item: item })
                    }
                  >
                    <ProgressiveImage
                      style={styles.cityImage}
                      source={{ uri: item.imageUrl }}
                    />
                  </TouchableOpacity>
                  <Text style={{ textAlign: "center", marginBottom: 5 }}>
                    {item.countryName}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = new StyleSheet.create({
  cityImage: {
    width: 100,
    height: 100,
    margin: 10,
    marginTop: 20,
    borderRadius: 100,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  text: {
    fontSize: 17,
    fontFamily: "Andika",
    textAlign: "left",
  },
  text1: {
    fontSize: 14,
    fontFamily: "Andika",
  },
  button: {
    backgroundColor: "#34495e",
    paddingVertical: 13,
    paddingHorizontal: 20,
    color: "white",
    fontSize: 18,
    fontFamily: "Andika",
    borderRadius: 20,
  },
});
export default VisaDetailsScreen;
