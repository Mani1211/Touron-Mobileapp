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
import Travelmode from "./Reusable components/Travelmode";
import { database } from "firebase";
import { AuthContext } from "../../context/AuthContext";
import SubmittedQuery from "./Reusable components/SubmittedQuery";
import moment from "moment";
import {
  sendEmail,
  sendPushNotification,
  getExpoToken,
} from "./utils/PushNotification";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { useIsFocused } from "@react-navigation/native";

const Honeymoon = ({ navigation, route }) => {
  const [fromDate, setFromDate] = useState("");
  const [tourType, setTourType] = React.useState("");
  const [toDate, setToDate] = useState("");
  const [travelMode, setTravelMode] = React.useState("");
  const [preferanece, setPreferanece] = React.useState("");
  const [destination, setDestination] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [number, setNumber] = useState("");
  const [step, setStep] = useState(1);
  const { isLoggedIn, user, userInfo } = useContext(AuthContext);
  const isFocused = useIsFocused();
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (route.params !== undefined) {
        const countryName = route.params.countryName;
        const type = route.params.type;
        {
          type == "International" ? setTourType(type) : setTourType("Domestic");
        }
        setStep(3);
        setDestination(countryName);
      }
    }
    return () => (mounted = false);
  }, []);

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

  const description = `Are you the newly-wed, blissed-out couple looking for a perfect romantic getaway? Then look no further! tour On will help you plan the magical Honeymoon of your dreams. 

This tour is exclusively for honeymooners and we provide you with suggestions of the most beautiful places with moonlight walks on magnificent riverbanks, candlelit dinners within the beauty of nature and the perfect tour spots for you and your better half. We provide you all the suggestions but the decision of what to choose and where to go is completely up to you. You dream, we make it happen!
`;

  const renderForm = (step) => {
    switch (step) {
      case 1:
        return (
          <Tourname
            tourName={"Honeymoon Tour"}
            navigation={navigation}
            step={() => nextStep()}
            imgSrc={
              "https://image.freepik.com/free-vector/newlywed-couple-is-driving-car-their-honeymoon_3446-291.jpg"
            }
            description={description}
          />
        );

      case 2:
        return (
          <Tourtype
            imgSrc1={require("../../../assets/planned-tour/india.png")}
            imgScr2={require("../../../assets/planned-tour/International.png")}
            tourName={"Honeymoon Tour"}
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
            tourType={tourType}
            setDomestic={() => setTourType("Domestic")}
            setInternational={() => setTourType("International")}
          />
        );

      case 3:
        return (
          <Travelmode
            tourName={"Honeymoon Tour"}
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
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

      case 4:
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
                Honeymoon Trip
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
      case 5:
        return (
          <Destination
            tourName={"Honeymoon Tour"}
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
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
      case 6:
        return (
          <Checkout
            tourName={"Honeymoon Tour"}
            nextStep={() => nextStep()}
            prevStep={() => prevStep()}
            imgSrc={
              "https://image.freepik.com/free-vector/business-background-design_1270-63.jpg"
            }
            setName={(value) => setName(value)}
            setNumber={(value) => setNumber(value)}
            setBudget={(value) => setBudget(value)}
            submitData={() => submitData()}
            name={name}
            number={number}
            tourType={tourType}
            budget={budget}
          />
        );

      case 7:
        return <SubmittedQuery navigation={navigation} type={"My Request"} />;
      default:
        break;
    }
  };

  const submitData = () => {
    const userID = userInfo.userID;
    const v = moment().format("L");
    const r = Math.floor((Math.random() + 4) * 345334);

    const data = {
      requestID: `TO-${v.slice(3, 5)}${v.slice(0, 2)}${v.slice(8)}-${r}`,
      tourCategory: "Honeymoon Trip",
      fromDate: fromDate,
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
      receivedFrom: "App",
      tourCost: 0,
    };

    database()
      .ref(`requests`)
      .push(data)
      .then((data) => {
        const token = getExpoToken(userID);
        sendEmail(userInfo.email, destination);
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
        {step == 1 || step == 7 ? null : (
          <View style={styles.progressContainer}>
            <View
              style={{
                borderRadius: 20,
                height: 6.5,
                borderWidth: 2,
                borderColor: "#a2cffe",
                paddingVertical: 1,
                width: WIDTH == 360 ? 38.5 * step : 60 * step,
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

export default Honeymoon;

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
    justifyContent: "center",
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
