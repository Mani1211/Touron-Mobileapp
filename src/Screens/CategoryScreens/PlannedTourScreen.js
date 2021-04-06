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
import {
  getExpoToken,
  sendEmail,
  sendPushNotification,
} from "./utils/PushNotification";
import SubmittedQuery from "./Reusable components/SubmittedQuery";
import moment from "moment";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PlannedTourScreen = ({ navigation, route }) => {
  const [tourType, setTourType] = React.useState("");
  const [travellerType, setTravellerType] = React.useState("");
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [travelMode, setTravelMode] = React.useState("");
  const [preferanece, setPreferanece] = React.useState("");
  const [destination, setDestination] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [number, setNumber] = useState("");
  const [step, setStep] = useState(1);
  const { isLoggedIn, userInfo } = useContext(AuthContext);
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  let random;
  let formatedMonth;

  useEffect(() => {
    random = Math.floor((Math.random() + 4) * 345334);
    const requestDate = new Date();
    let currentYear = requestDate.getFullYear();
    setDate(requestDate.getDate());
    setMonth(requestDate.getMonth() + 1);
    setYear(currentYear.toString().slice(2, 5));
    formatedMonth = month < 10 ? "0" + month : month;
  });

  useEffect(() => {
    if (route.params !== undefined) {
      const countryName = route.params.countryName;
      const type = route.params.type;
      {
        type == "International" ? setTourType(type) : setTourType("");
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
            navigation={navigation}
            step={() => nextStep()}
            tourName={"Planned Tour"}
            imgSrc={
              "https://image.freepik.com/free-vector/traveling-man-with-backpack-luggage-camping-trip-outdoor-adventure-hiking-hipster-tourism-engraved-hand-drawn-old-sketch-vintage-style-vacation-tour_248627-527.jpg"
            }
            description={description}
          />
        );

      case 2:
        return (
          <Tourtype
            tourName={"Planned Tour"}
            prevStep={() => prevStep()}
            imgSrc1={require("../../../assets/planned-tour/india.png")}
            imgScr2={require("../../../assets/planned-tour/International.png")}
            nextStep={() => nextStep()}
            tourType={tourType}
            setDomestic={() => setTourType("Domestic")}
            setInternational={() => setTourType("International")}
          />
        );

      case 3:
        return (
          <Travellertype
            tourName={"Planned Tour"}
            travellerType={travellerType}
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
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
            tourName={"Planned Tour"}
            imgSrc1={
              "https://image.freepik.com/free-vector/illustration-with-young-people-concept_23-2148467324.jpg"
            }
            imgScr2={
              "https://image.freepik.com/free-vector/smiling-boy-girl-kids-holding-hands-childhood-friendship-concept-love-romance-children-cartoon-characters-flat-vector-illustration-isolated-white-background_71593-450.jpg"
            }
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
            adult={adult}
            children={children}
            setChildren={(value) => setChildren(value)}
            setAdult={(value) => setAdult(value)}
          />
        );
      case 5:
        return (
          <Travelmode
            tourName={"Planned Tour"}
            imgSrc1={
              "https://image.freepik.com/free-vector/train-ride-railroad_1308-11154.jpg"
            }
            imgScr2={
              "https://image.freepik.com/free-vector/airplane-sky_1308-31202.jpg"
            }
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
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
                  flex: 0.6,
                }}
              >
                Planned Tour
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
      case 7:
        return (
          <Destination
            tourName={"Planned Tour"}
            imgSrc={
              "https://image.freepik.com/free-vector/destination-concept-illustration_114360-453.jpg"
            }
            destination={destination}
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
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
            tourName={"Planned Tour"}
            imgSrc={
              "https://image.freepik.com/free-vector/business-background-design_1270-63.jpg"
            }
            setName={(value) => setName(value)}
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
            setNumber={(value) => setNumber(value)}
            setBudget={(value) => setBudget(value)}
            submitData={() => submitData()}
            name={name}
            number={number}
            budget={budget}
            tourType={tourType}
          />
        );

      case 9:
        return <SubmittedQuery navigation={navigation} type={"My Request"} />;
      default:
        break;
    }
  };

  const submitData = () => {
    const userID = userInfo.userID;

    const data = {
      requestID: `TO-${date}${formatedMonth}${year}-${random}`,
      tourCategory: "Planned Tour",
      tourType: tourType,
      travellerType: travellerType,
      fromDate: fromDate,
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
      requestDate: new Date().toDateString(),

      tourCost: 0,
    };
    firebase
      .database()
      .ref(`requests`)
      .push(data)
      .then((data) => {
        console.log(data);
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
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
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

export default PlannedTourScreen;

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
