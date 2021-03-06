import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Tourname from "./Reusable components/Tourname";
import Tourtype from "./Reusable components/Tourtype";
import Travellertype from "./Reusable components/Travellertype";
import Checkout from "./Reusable components/Checkout";
import Touristnumber from "./Reusable components/Touristnumber";
import Travelmode from "./Reusable components/Travelmode";
import DatePicker from "react-native-datepicker";

import Expediture from "./Reusable components/Expediture";
import Tourpreferance from "./Reusable components/Tourpreferance";
import { database } from "firebase";

import { AuthContext } from "../../context/AuthContext";
import SubmittedQuery from "./Reusable components/SubmittedQuery";
import moment from "moment";
import {
  getExpoToken,
  sendEmail,
  sendPushNotification,
} from "./utils/PushNotification";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { useIsFocused } from "@react-navigation/native";

const SurpriseTourScreen = ({ navigation }) => {
  const [tourType, setTourType] = React.useState("");
  const [travellerType, setTravellerType] = React.useState("");
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [travelMode, setTravelMode] = React.useState("");
  const [expediture1, setExpediture1] = useState("");
  const [expediture2, setExpediture2] = useState("");
  const [expediture3, setExpediture3] = useState("");
  const [tourPreferance, setTourPreferance] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [number, setNumber] = useState("");
  const [step, setStep] = useState(1);
  const { isLoggedIn, userInfo } = useContext(AuthContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (!isLoggedIn) {
        navigation.jumpTo("SignInScreen");
      }
    }
    return () => (mounted = false);
  }, [isFocused]);

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
  const description = `We surprise you with the best suitable location within your budget and according to your travel preferences. We don’t have concrete itineraries as we believe that you should decide where you want to invest your money. We also recommend various things to do which you can book yourself or we can book upon your confirmation.`;
  const renderForm = (step) => {
    switch (step) {
      case 1:
        return (
          <Tourname
            tourName={"Suprise Tour"}
            navigation={navigation}
            step={() => nextStep()}
            imgSrc={
              "https://image.freepik.com/free-vector/xmas-surprise-concept-illustration_114360-1824.jpg"
            }
            description={description}
          />
        );

      case 2:
        return (
          <Tourtype
            imgSrc1={require("../../../assets/planned-tour/india.png")}
            imgScr2={require("../../../assets/planned-tour/International.png")}
            tourName={"Suprise Tour"}
            prevStep={() => prevStep()}
            nextStep={() => nextStep()}
            tourType={tourType}
            setDomestic={() => setTourType("Domestic")}
            setInternational={() => setTourType("International")}
          />
        );

      case 3:
        return (
          <Travellertype
            travellerType={travellerType}
            tourName={"Suprise Tour"}
            prevStep={() => prevStep()}
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
            tourName={"Suprise Tour"}
            prevStep={() => prevStep()}
            nextStep={() => nextStep()}
            imgSrc1={
              "https://image.freepik.com/free-vector/illustration-with-young-people-concept_23-2148467324.jpg"
            }
            imgScr2={
              "https://image.freepik.com/free-vector/smiling-boy-girl-kids-holding-hands-childhood-friendship-concept-love-romance-children-cartoon-characters-flat-vector-illustration-isolated-white-background_71593-450.jpg"
            }
            adult={adult}
            children={children}
            setChildren={(value) => setChildren(value)}
            setAdult={(value) => setAdult(value)}
          />
        );
      case 5:
        return (
          <Tourpreferance
            tourName={"Suprise Tour"}
            prevStep={() => prevStep()}
            nextStep={() => nextStep()}
            imgSrc1={
              "https://image.freepik.com/free-vector/skydiving-vector-sport-illustration-extreme-sport-background-skydiving-wing-suit_87946-304.jpg"
            }
            imgSrc2={
              "https://image.freepik.com/free-vector/relaxing-concept-illustration_114360-289.jpg"
            }
            imgSrc3={
              "https://image.freepik.com/free-vector/illustration-kathakali-dancer-performing-white-mandala-pattern-background_1302-19495.jpg"
            }
            imgScr4={
              "https://image.freepik.com/free-vector/backpacker-with-map-search-directions-wilderness_80802-300.jpg"
            }
            tourPreferance={tourPreferance}
            setAdventure={() => setTourPreferance("Adventure")}
            setRelaxation={() => setTourPreferance("Relaxation")}
            setCultural={() => setTourPreferance("Cultural")}
            setExplore={() => setTourPreferance("Explore")}
          />
        );
      case 6:
        return (
          <Travelmode
            tourName={"Suprise Tour"}
            prevStep={() => prevStep()}
            nextStep={() => nextStep()}
            imgSrc1={
              "https://image.freepik.com/free-vector/train-ride-railroad_1308-11154.jpg"
            }
            imgScr2={
              "https://image.freepik.com/free-vector/airplane-sky_1308-31202.jpg"
            }
            name1={"Train"}
            name2={"Flight"}
            travelMode={travelMode}
            setTrain={() => setTravelMode("Train")}
            setFlight={() => setTravelMode("Flight")}
          />
        );
      case 7:
        return (
          <View style={{ alignItems: "center" }}>
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
                }}
              >
                Surprise Tour
              </Text>

              <TouchableOpacity
                onPress={() => {
                  nextStep();
                }}
              >
                <View>
                  {fromDate !== "" && toDate !== "" ? (
                    <AntDesign name="arrowright" size={28} />
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={{ height: HEIGHT / 3, width: WIDTH * 0.8 }}
                source={{
                  uri: "https://image.freepik.com/free-vector/build-your-program-appointment-booking_23-2148552954.jpg",
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
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Andika",
                      paddingLeft: 5,
                    }}
                  >
                    Onward
                  </Text>
                </View>

                <DatePicker
                  onOpenModal={{ useNativeDriver: true }}
                  style={{ width: 200 }}
                  date={fromDate}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  // minDate="2016-05-01"
                  minDate={moment().add(14, "days").format("YYYY-MM-DD")}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => {
                    handleFromDate(date);
                  }}
                />
              </View>
              <View style={styles.dateContainer}>
                <View style={{ width: WIDTH / 3.8 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Andika",
                      paddingLeft: Platform.OS === "ios" ? 15 : 10,
                    }}
                  >
                    Return
                  </Text>
                </View>
                <DatePicker
                  style={{ width: 200 }}
                  date={toDate}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate={fromDate}
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
      case 8:
        return (
          <Expediture
            tourName={"Suprise Tour"}
            prevStep={() => prevStep()}
            nextStep={() => nextStep()}
            imgSrc={
              "https://image.freepik.com/free-vector/romantic-car-illustration_166742-180.jpg"
            }
            expediture3={expediture3}
            expediture2={expediture2}
            expediture1={expediture1}
            startPoint={startPoint}
            setStartPoint={(value) => setStartPoint(value)}
            setExpediture3={(value) => setExpediture3(value)}
            setExpediture2={(value) => setExpediture2(value)}
            setExpediture1={(value) => setExpediture1(value)}
          />
        );
      case 9:
        return (
          <Checkout
            tourName={"Suprise Tour"}
            prevStep={() => prevStep()}
            nextStep={() => nextStep()}
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
            tourType={tourType}
          />
        );
      case 10:
        return <SubmittedQuery navigation={navigation} type={"My Request"} />;

      default:
        break;
    }
  };

  const submitData = () => {
    const userID = userInfo.userID;
    const v = moment().format("L");
    const r = Math.floor((Math.random() + 4) * 345334);

    const tourData = {
      requestID: `TO-${v.slice(3, 5)}${v.slice(0, 2)}${v.slice(8)}-${r}`,
      tourCategory: "Surprise Tour",
      tourType: tourType,
      travellerType: travellerType,
      fromDate: fromDate,
      adult: adult,
      children: children,
      travelMode: travelMode,
      startPoint: startPoint,
      toDate: toDate,
      expediture1: expediture1,
      expediture2: expediture2,
      expediture3: expediture3,
      tourPreferance: tourPreferance,
      name: name,
      number: number,
      budget: budget,
      userID: userID,
      status: "Query Received",
      tourCost: 0,
      requestDate: new Date().toDateString(),
      receivedFrom: "App",
    };

    database()
      .ref(`requests`)
      .push(tourData)
      .then(() => {
        const token = getExpoToken(userID);
        sendEmail(userInfo.email, "Surprise trip");
        const message = {
          to: token,
          sound: "default",
          title: `Query Received`,
          body: `Congratulations! You are one step closer to your dream tour. Your query is under review and tour On will contact you with more details and suggestions. The booking process will start after your confirmation. Please check the My Requests tab for updates.`,
        };
        sendPushNotification(message);
        nextStep();
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.container}>
      {step == 1 || step == 10 ? null : (
        <View style={styles.progressContainer}>
          <View
            style={{
              borderRadius: 20,
              height: 6.5,
              borderWidth: 2,
              borderColor: "#a2cffe",
              paddingVertical: 1,
              width: WIDTH == 360 ? 30.5 * step : 40 * step,
              overflow: "hidden",
              backgroundColor: "#a2cffe",
            }}
          ></View>
        </View>
      )}

      {renderForm(step)}
    </ScrollView>
  );
};

export default SurpriseTourScreen;

const styles = StyleSheet.create({
  progressContainer: {
    height: 10,
    marginHorizontal: 25,
    bottom: 0,
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: "#f0f8ff",
    borderRadius: 20,
    paddingTop: Platform.OS === "ios" ? 70 : 20,

    bottom: 0,
  },
  imageContainer: {
    height: HEIGHT / 2.5,
    width: WIDTH,
    alignItems: "center",
    marginTop: 0,
  },
  dateContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  arrowsContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: WIDTH / 15,
    position: "relative",
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Andika",
    textAlign: "justify",
  },
});
