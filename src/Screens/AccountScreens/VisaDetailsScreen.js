import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { DataTable, Surface } from "react-native-paper";
const WIDTH = Dimensions.get("window").width;
import touron from "../../api/touron";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import * as firebase from "firebase";
const HEIGHT = Dimensions.get("window").height;
const VisaDetailsScreen = ({ navigation }) => {
  const [visa, setVisa] = useState([]);
  const [visaName, setVisaName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [step, setStep] = useState(0);
  const [visaData, setVisaData] = useState({});
  const [visaRequest, setVisaRequest] = useState([]);

  const getUserData = () => {
    if (user !== null) {
      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          if (data.val() !== null) {
            let val = data.val();
            setIsAdmin(val.admin);
          }
        });
    }
  };

  const getVisaRequests = (value) => {
    let request = [];
    firebase
      .database()
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
    getUserData();
    getVisaRequests();
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

  const getExpoToken = (userId) => {
    // console.log(userId, "id");
    let token = "";
    firebase
      .database()
      .ref(`userGeneralInfo/${userId}`)
      .on("value", (data) => {
        if (data.val() !== null) {
          let val = data.val();
          token = val.pushNotificationToken;
        }
      });
    return token;
  };

  const sendPushNotification = async (expoToken) => {
    console.log(expoToken, "messag");
    const messages = {
      to: expoToken,
      sound: "default",
      title: "Visa Details Info",
      body: notificationMessage,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });
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

  const renderVisaForm = () => {
    switch (step) {
      case 0:
        return (
          <View style={{ backgroundColor: "white", flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <View>
                <Feather
                  name="arrow-left"
                  size={28}
                  color="black"
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: Platform.OS === "ios" ? 50 : 10,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                marginHorizontal: 30,
                marginVertical: 30,
              }}
            >
              <Image
                style={{
                  height: HEIGHT / 5,
                  width: HEIGHT / 5,
                  marginTop: 10,
                }}
                source={require("../../../assets/playstore.png")}
              />

              <Text
                style={{ marginTop: 20, fontSize: 16, fontFamily: "Avenir" }}
              >
                Admin : {user.email}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Avenir",
                  }}
                >
                  Status :
                </Text>
                <FontAwesome
                  name="circle"
                  size={20}
                  color="#7bed9f"
                  style={{
                    marginLeft: WIDTH / 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Avenir",
                    marginHorizontal: 10,
                  }}
                >
                  Online
                </Text>
              </View>
            </View>

            <DataTable style={{ width: WIDTH }}>
              <DataTable.Header>
                <DataTable.Title>Country</DataTable.Title>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title numeric>Phone Number</DataTable.Title>
              </DataTable.Header>

              <FlatList
                data={visaRequest}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setVisaData(item);
                        setStep(1);
                      }}
                    >
                      <DataTable.Row>
                        <DataTable.Cell>{item.countryName}</DataTable.Cell>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell numeric>
                          <Text
                            style={{
                              fontSize: 15,
                              fontFamily: "Andika",
                              // color: "black",
                            }}
                          >
                            {item.phoneNumber}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    </TouchableOpacity>
                  );
                }}
              />

              <DataTable.Pagination
                page={1}
                numberOfPages={1}
                onPageChange={(page) => console.log(page)}
                label={`${1}-${5} of ${visaRequest.length}`}
              />
            </DataTable>
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
              Visa Details of {data.name}
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: WIDTH,
              justifyContent: "space-around",
              padding: 10,
            }}
          >
            <Text>Message :</Text>
            <TextInput
              style={{
                width: WIDTH / 2,
                borderColor: "#34495e",
                borderRadius: 4,

                borderWidth: 1.5,
              }}
              multiline={true}
              onChangeText={(value) => setNotificationMessage(value)}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              const token = getExpoToken(data.userID);
              sendPushNotification(token);
            }}
          >
            <View style={{ padding: 10 }}>
              <Text style={styles.button}>Send Notification Message</Text>
            </View>
          </TouchableOpacity>
        </Surface>
      </View>
    );
  };
  return (
    <>
      {isAdmin ? (
        <>{renderVisaForm()}</>
      ) : (
        <View
          animation="bounceIn"
          duration={3000}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              marginTop: HEIGHT / 14,
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
                  style={{ paddingHorizontal: 20 }}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                flex: 1,
              }}
            >
              Select the Country you are Travelling
            </Text>
          </View>
          <View style={styles.background}>
            <Feather name="search" style={styles.iconStyle}></Feather>
            <TextInput
              style={styles.inputStyle}
              placeholder="Search"
              onChangeText={(value) => setVisaName(value)}
              onSubmitEditing={search}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>
          <FlatList
            data={search()}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            renderItem={({ item }) => {
              return (
                <View style={{ alignItems: "center" }}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("VisaInner", { item: item })
                      }
                    >
                      <Image
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
      )}
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
  background: {
    backgroundColor: "#fff",
    height: HEIGHT / 15,
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: WIDTH / 18,
  },
  inputStyle: {
    fontSize: 18,
    flex: 1,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 15,
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
    fontFamily: "WSansl",
    borderRadius: 20,
  },
});
export default VisaDetailsScreen;
