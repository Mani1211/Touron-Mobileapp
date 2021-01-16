import React, { useState, useEffect, useContext } from "react";

import DatePicker from "react-native-datepicker";

import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Text,
  Image,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Tourname from "./Reusable components/Tourname";
import Checkout from "./Reusable components/Checkout";
import Destination from "./Reusable components/Destination";
import Tourtype from "./Reusable components/Tourtype";
import Travellertype from "./Reusable components/Travellertype";
import Travelmode from "./Reusable components/Travelmode";
import Touristnumber from "./Reusable components/Touristnumber";
import * as firebase from "firebase";
import { AuthContext } from "../../context/AuthContext";
import NationalPark from "./Reusable components/NationalPark";
import { getExpoToken, sendPushNotification } from "./utils/PushNotification";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const WildLife = ({ navigation, route }) => {
  const [travellerType, setTravellerType] = React.useState("");
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [nationalPark, setNationalPark] = useState("");
  const [travelMode, setTravelMode] = React.useState("");
  const [preferanece, setPreferanece] = React.useState("");
  const [startPoint, setStartPoint] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [number, setNumber] = useState("");
  const [step, setStep] = useState(1);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const [destination, setDestination] = useState(nationalPark);
  let random;
  let formatedMonth;

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    random = Math.floor((Math.random() + 4) * 345334 * Math.random());
    const requestDate = new Date();
    let currentYear = requestDate.getFullYear();
    setDate(requestDate.getDate());
    setMonth(requestDate.getMonth() + 1);
    setYear(currentYear.toString().slice(2, 5));
    formatedMonth = month < 10 ? "0" + month : month;
  });

  const getUserData = () => {
    if (user !== null) {
      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          setUserInfo(data.val());
          setName(data.val().name);
          setNumber(data.val().phoneNumber);
        });
    }
  };

  useEffect(() => {
    getUserData();
    if (route.params !== undefined) {
      const countryName = route.params.countryName;
      const type = route.params.type;
      {
        type == "International" ? setTourType(type) : setTourType("Domestic");
      }
      setStep(3);
      setDestination(countryName);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace("SignInScreen");
    }
  });

  const handleFromDate = (date) => {
    setFromDate(date);
  };

  const handleToDate = (date) => {
    setToDate(date);
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const description = `This tour is perfect for all busy-bee travel enthusiasts! Our itinerary completely depends on you and your preferences and wepersonalize the whole tour accordingly We offer you a complete list ofthings to do, places to visit, etc. and further prepare an appropriate itinerary for you within your budget and according to your travel preferences, making the experience worth every penny!`;

  const renderForm = (step) => {
    switch (step) {
      case 1:
        return (
          <Tourname
            step={() => nextStep()}
            imgSrc={
              "https://www.udaipurblog.com/wp-content/uploads/2018/04/travel-triangle.jpg"
            }
            description={description}
          />
        );

      case 2:
        return (
          <NationalPark
            nationalPark={nationalPark}
            setNationalPark={(name) => {
              setNationalPark(name);
              setDestination(name);
              setStep(step + 1);
            }}
          />
        );

      case 3:
        return (
          <Travellertype
            imgSrc1={
              "https://image.freepik.com/free-vector/local-tourism-concept_23-2148606915.jpg"
            }
            imgSrc2={
              "https://image.freepik.com/free-vector/big-happy-family-with-flat-design_23-2147834774.jpg"
            }
            imgSrc3={
              "https://image.freepik.com/free-vector/group-happy-students-with-backpacks-books-stand-together_131590-216.jpg"
            }
            imgScr4={
              "https://image.freepik.com/free-vector/couple-celebrating-valentine-s-day_23-2148538999.jpg"
            }
            travellerType={travellerType}
            nextStep={() => nextStep()}
            setSolo={() => {
              setTravellerType("Solo");
              setStep(5);
            }}
            setFamily={() => setTravellerType("Family")}
            setFriends={() => setTravellerType("Friends")}
            setHoneymoon={() => setTravellerType("Honeymoon")}
          />
        );

      case 4:
        return (
          <Touristnumber
            imgSrc1={
              "https://image.freepik.com/free-vector/illustration-with-young-people-concept_23-2148467324.jpg"
            }
            imgScr2={
              "https://image.freepik.com/free-vector/smiling-boy-girl-kids-holding-hands-childhood-friendship-concept-love-romance-children-cartoon-characters-flat-vector-illustration-isolated-white-background_71593-450.jpg"
            }
            nextStep={() => nextStep()}
            adult={adult}
            children={children}
            setChildren={(value) => setChildren(value)}
            setAdult={(value) => setAdult(value)}
          />
        );
      case 5:
        return (
          <Travelmode
            imgSrc1={
              "https://image.freepik.com/free-vector/train-ride-railroad_1308-11154.jpg"
            }
            imgScr2={
              "https://image.freepik.com/free-vector/airplane-sky_1308-31202.jpg"
            }
            nextStep={() => nextStep()}
            name1={"Train"}
            name2={"Flight"}
            travelMode={travelMode}
            setTrain={() => setTravelMode("Train")}
            setFlight={() => setTravelMode("Flight")}
          />
        );
      case 6:
        return (
          <View style={{ alignItems: "center" }}>
            <View style={styles.imageContainer}>
              <Image
                style={{ height: HEIGHT / 3, width: WIDTH * 0.8 }}
                source={{
                  uri:
                    "https://image.freepik.com/free-vector/build-your-program-appointment-booking_23-2148552954.jpg",
                }}
              />
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: "NewYorkl",
                }}
              >
                When do you want to embark on your journey?
              </Text>
              <View style={styles.dateContainer}>
                <View style={{ width: WIDTH / 3.8 }}>
                  <Text style={{ fontSize: 20, fontFamily: "Andika" }}>
                    From:
                  </Text>
                </View>
                <View style={styles.dateContainer}>
                  <View></View>
                </View>
                <DatePicker
                  style={{ width: 200 }}
                  date={fromDate}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  // minDate="2016-05-01"
                  maxDate="2021-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {
                    handleFromDate(date);
                  }}
                />
              </View>
              <View style={styles.dateContainer}>
                <View style={{ width: WIDTH / 4 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginRight: 0,
                      fontFamily: "Andika",
                    }}
                  >
                    To:
                  </Text>
                </View>
                <DatePicker
                  style={{ width: 200 }}
                  date={toDate}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  // minDate="2016-05-01"
                  maxDate="2021-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {
                    handleToDate(date);
                  }}
                />
              </View>
            </View>
          </View>
        );
      case 7:
        return (
          <Destination
            imgSrc={
              "https://image.freepik.com/free-vector/destination-concept-illustration_114360-453.jpg"
            }
            destination={destination}
            preferanece={preferanece}
            startPoint={startPoint}
            setDestination={(value) => setDestination(value)}
            setStartPoint={(value) => setStartPoint(value)}
            setPreferanece={(value) => setPreferanece(value)}
          />
        );
      case 8:
        return (
          <Checkout
            imgSrc={
              "https://image.freepik.com/free-vector/business-background-design_1270-63.jpg"
            }
            setName={(value) => setName(value)}
            setNumber={(value) => setNumber(value)}
            setBudget={(value) => setBudget(value)}
            submitData={() => submitData()}
            name={name}
            number={number}
            budget={budget}
          />
        );

      case 9:
        return (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <View
              style={{
                height: HEIGHT * 0.8,
                alignItems: "center",
                justifyContent: "center",
                width: WIDTH,
              }}
            >
              <Image
                style={{ height: HEIGHT / 3, width: WIDTH * 0.7 }}
                source={{
                  uri:
                    "https://image.freepik.com/free-vector/thank-you-with-character-vector_2029-149.jpg",
                }}
              />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
              <View style={{ alignItems: "center", margin: 10 }}>
                <Text
                  style={{
                    // backgroundColor: "red",
                    textAlign: "center",
                    padding: 8,
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 20,
                  }}
                >
                  Back to Home
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      default:
        break;
    }
  };

  const submitData = () => {
    const userID = user.uid;

    const data = {
      requestID: `T0-${date}${formatedMonth}${year}-${random}`,
      nationalPark: nationalPark,
      tourCategory: "Wildlife",
      travellerType: travellerType,
      fromDate: fromDate,
      nationalPark: nationalPark,
      adult: adult,
      children: children,
      travelMode: travelMode,
      startPoint: startPoint,
      toDate: toDate,
      preferanece: preferanece,
      destination: destination,
      name: name,
      number: number,
      budget: budget,
      status: "Query Received",
      userID: userID,
      plans: "",
      reports: "",
      tourCost: 0,
    };
    firebase
      .database()
      .ref(`requests`)
      .push(data)
      .then((data) => {
        const token = getExpoToken(userID);

        const message = {
          to: token,
          sound: "default",
          title: `Request Status Changed`,
          body: `Request for wildlife received `,
          // data: plan,
        };
        console.log(data);
        sendPushNotification(message);
        nextStep();
      })
      .catch((err) => console.log(err));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {step == 9 ? null : (
          <View style={styles.arrowsContainer}>
            {step == 1 ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack("Home");
                  //   console.log("logged");
                }}
              >
                <View>
                  <AntDesign name="arrowleft" size={28} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => prevStep()}>
                <View>
                  <AntDesign name="arrowleft" size={28} />
                </View>
              </TouchableOpacity>
            )}

            <Text
              style={{
                fontSize: 20,
                fontFamily: "NewYorkl",
                marginTop: Platform.OS == "android" ? HEIGHT / 14 : 80,
              }}
            >
              Wildlife Santuary
            </Text>

            <TouchableOpacity
              onPress={() => {
                nextStep();
              }}
            >
              {step !== 8 && step !== 2 && step !== 3 && step !== 5 ? (
                <View>
                  <AntDesign name="arrowright" size={28} />
                </View>
              ) : null}
            </TouchableOpacity>
          </View>
        )}
        {step == 1 || step == 9 ? null : (
          <View style={styles.progressContainer}>
            <View
              style={{
                borderRadius: 20,
                height: 6.5,
                borderWidth: 2,
                borderColor: "#a2cffe",
                paddingVertical: 1,
                width: WIDTH == 360 ? 38.5 * step : 45 * step,
                overflow: "hidden",
                backgroundColor: "#a2cffe",
              }}
            ></View>
          </View>
        )}
        {renderForm(step)}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WildLife;

const styles = StyleSheet.create({
  progressContainer: {
    height: 10,
    marginHorizontal: 25,
    bottom: 0,
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: "#f0f8ff",
    borderRadius: 20,
    marginTop: 20,
    bottom: 0,
  },
  dateContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    position: "relative",
  },
  arrowsContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: WIDTH / 15,
    position: "relative",
  },
  imageContainer: {
    height: HEIGHT / 2.5,
    width: WIDTH,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Andika",
    textAlign: "justify",
  },
});
