import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import SearchBar from "../../Reusable Components/SearchBar";
import HeaderTile from "./../../Reusable Components/HeaderTile";
import ResortTile from "./ResortTile";
import { database } from "firebase";
const ResortHome = ({ navigation }) => {
  const [resorts, setResorts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setErrorMessage] = useState("");
  const [resortName, setResortName] = useState("");
  const [pageSize, setPageSize] = useState(10);

  console.log(`resorts`, resorts);

  const getResorts = () => {
    setLoader(true);
    database()
      .ref("resorts")
      .on("value", (data) => {
        let req = [];
        if (data !== null) {
          data.forEach((d) => {
            req.push(d.val());
          });
        }
        setResorts(req);
      });
    setLoader(false);
  };

  useEffect(() => {
    getResorts();
    return () => {
      getResorts();
    };
  }, []);

  //   const search = () => {
  //     const d = country.filter((c) => {
  //       return c.countryName
  //         .trim()
  //         .toUpperCase()
  //         .includes(countryName.trim().toUpperCase());
  //     });
  //     return d;
  //   };

  const resort = [
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://images.pexels.com/photos/6044984/pexels-photo-6044984.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://images.pexels.com/photos/5579729/pexels-photo-5579729.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://images.pexels.com/photos/7663387/pexels-photo-7663387.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/33653522.jpg?k=82b437d4406dbe1612164362995e071555857d70e979359be9e77551bb2f5c1c&o=&hp=1",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/100074455.jpg?k=5f0e4746cbfe7802f2de2956dfaff049dbd0da775fa58716d6c25b61cce7239d&o=&hp=1",
    },
    {
      name: "Medgufaru Island",
      city: "Maldives",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/33655729.jpg?k=fb9174823149e3164d1b512bfa197972f072c52c7d20aa4f64ec802a265b63ed&o=&hp=1",
    },
  ];
  return (
    <View style={styles.container}>
      <View>
        <HeaderTile name={"Resorts"} navigation={navigation} />
        <View style={{ paddingHorizontal: 10 }}>
          <SearchBar
            onChangeText={(value) => setCountryName(value)}
            placeholder={"Search reosrts...."}
          />
        </View>
        {loader ? (
          <ActivityIndicator
            color="black"
            size="large"
            style={{
              alignSelf: "center",
              justifyContent: "center",
              height: HEIGHT * 0.6,
            }}
          />
        ) : (
          <ScrollView>
            <View style={styles.countryGrid}>
              {resort.map((item, index) => {
                if (index < pageSize)
                  return <ResortTile item={item} index={index} />;
              })}

              {/* {pageSize < 45 && countryName === "" && (
                <TouchableOpacity
                  onPress={() => setPageSize(pageSize + 10)}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      backgroundColor: "#E28633",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    Load More ...
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ResortHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  countryGrid: {
    width: WIDTH,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    paddingBottom: 150,
  },
});
