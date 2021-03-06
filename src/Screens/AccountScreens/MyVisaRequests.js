import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { database } from "firebase";
import { List, Surface } from "react-native-paper";

const MyVisaRequestsScreen = ({ navigation }) => {
  const [visaRequest, setVisaRequest] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [step, setStep] = useState(0);
  const [visaData, setVisaData] = useState({});
  const getUserVisaRequest = () => {
    const request = [];
    database()
      .ref(`visaSubmission`)
      .on("value", (data) => {
        data.forEach((c) => {
          if (c.val().userID === userInfo.userID) {
            request.push(c.val());
          }
          setVisaRequest(request.reverse());
        });
      });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUserVisaRequest();
    }
    return () => (mounted = false);
  }, []);

  const renderScreen = () => {
    switch (step) {
      case 0:
        return (
          <View
            animation="bounceIn"
            duration={3000}
            style={{ flex: 1, backgroundColor: "white" }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                alignItems: "center",
                paddingTop: Platform.OS === "ios" ? 60 : 40,
                paddingBottom: Platform.OS === "ios" ? 20 : 20,

                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View>
                  <Feather
                    name="arrow-left"
                    size={28}
                    color="black"
                    style={{
                      paddingHorizontal: 20,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 25, fontFamily: "NewYorkl" }}>
                  My Visa Request
                </Text>
              </View>
            </View>
            {visaRequest.length == 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    height: HEIGHT / 2,
                    width: WIDTH * 0.7,
                    marginTop: WIDTH / 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fstats%20and%20Default%2Fmyplans.png?alt=media&token=cb00ebb1-1511-4994-ac33-cc1f36e6a399",
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Avenir",
                    fontSize: 20,
                    marginTop: WIDTH / 10,
                  }}
                >
                  No Visa Request Yet
                </Text>
              </View>
            ) : (
              <View>
                {visaRequest.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setStep(1);
                        setVisaData(item);
                      }}
                    >
                      <List.Section>
                        <List.Item
                          title={item.countryName}
                          style={{ margin: 10 }}
                          left={(props) => (
                            <View
                              style={{
                                marginHorizontal: 5,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <FontAwesome5
                                name="passport"
                                size={23}
                                color="#C1C5C6"
                              />
                            </View>
                          )}
                        />
                      </List.Section>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        );

      case 1:
        return <>{visaFormInner(visaData)}</>;
    }
  };

  const visaFormInner = (data) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "#34495e",
        }}
      >
        <Surface
          style={{
            backgroundColor: "white",
            padding: 30,
            alignItems: "center",
            borderRadius: 30,
            elevation: 100,
            shadowColor: "#7ed6df",
            shadowOpacity: 3,
          }}
        >
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 30, fontFamily: "Avenir" }}>
              {" "}
              Visa Details of {data.name}{" "}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Name : </Text>
            <Text style={styles.text}>{data.name}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Country Name : </Text>
            <Text style={styles.text}>{data.countryName}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Phone Number: </Text>
            <Text style={styles.text}>{data.phoneNumber}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Travel Month: </Text>
            <Text style={styles.text}>{data.travelMonth}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => setStep(0)}>
              <Text style={styles.button}>Back</Text>
            </TouchableOpacity>
          </View>
        </Surface>
      </View>
    );
  };
  return (
    <>
      <StatusBar
        backgroundColor="#28C9E1"

        // animated={true}
      />
      {renderScreen()}
    </>
  );
};

export default MyVisaRequestsScreen;

const styles = new StyleSheet.create({
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
