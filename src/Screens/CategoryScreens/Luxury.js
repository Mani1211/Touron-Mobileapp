import React, { useState, useEffect, useContext } from "react";

import DatePicker from "react-native-datepicker";

import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
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
import * as firebase from "firebase";
import { AuthContext } from "../../context/AuthContext";
import Touristnumber from "./Reusable components/Touristnumber";

import SubmittedQuery from "./Reusable components/SubmittedQuery";
import {
  sendEmail,
  sendPushNotification,
  getExpoToken,
} from "./utils/PushNotification";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Luxury = ({ navigation, route }) => {
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [tourType, setTourType] = React.useState("");
  const [travellerType, setTravellerType] = React.useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [preferanece, setPreferanece] = React.useState("");
  const [destination, setDestination] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [number, setNumber] = useState("");
  const [step, setStep] = useState(1);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  let random;
  let formatedMonth;

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    random = Math.floor((Math.random() + 4) * 345334);
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

  const description = `In this tour, we make sure the no element of lavishness is missed!

Luxury tours are tailor made to individual requirements. Be it India or abroad, we make sure to deliver way beyond your expectations. So do you love the finest dining experiences and the classiest stays? This is the tour choice made for you! We provide you with a complete list of high-end resorts, hotels and luxury travel choices along with an appropriate itinerary. You then get to make the choice which is perfect for you and enjoy your perfect Vacay!
`;

  const renderForm = (step) => {
    switch (step) {
      case 1:
        return (
          <Tourname
            step={() => nextStep()}
            imgSrc={
              "https://image.freepik.com/free-vector/global-travelling-abstract-concept-vector-illustration-global-insurance-world-trip-international-tourism-travel-agency-working-holiday-luxury-vacation-resort-chain-abstract-metaphor_335657-2953.jpg"
            }
            description={description}
          />
        );

      case 2:
        return (
          <Tourtype
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
            imgSrc1={
              "https://image.freepik.com/free-vector/local-tourism-concept_23-2148606915.jpg"
            }
            imgSrc2={
              "https://image.freepik.com/free-vector/big-happy-family-with-flat-design_23-2147834774.jpg"
            }
            imgSrc3={
              "https://image.freepik.com/free-vector/group-happy-students-with-backpacks-books-stand-together_131590-216.jpg"
            }
            imgSrc4={
              "https://image.freepik.com/free-vector/people-holding-travel-related-icons_53876-64662.jpg"
            }
            travellerType={travellerType}
            nextStep={() => nextStep()}
            setSolo={() => {
              setTravellerType("Solo");
              setStep(5);
            }}
            setFamily={() => setTravellerType("Family")}
            setFriends={() => setTravellerType("Friends")}
            setHoneymoon={() => setTravellerType("Group")}
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
      case 6:
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
      case 7:
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

      case 8:
        return <SubmittedQuery navigation={navigation} />;

      default:
        break;
    }
  };

  const submitData = () => {
    const userID = user.uid;

    const data = {
      requestID: `T0-${date}${formatedMonth}${year}-${random}`,
      tourCategory: "Luxury Tour",
      adult: adult,
      children: children,
      travellerType: travellerType,
      fromDate: fromDate,
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
      requestDate: new Date().toDateString(),
    };
    firebase
      .database()
      .ref(`requests`)
      .push(data)
      .then((data) => {
        console.log(data);
        const token = getExpoToken(userID);
        sendEmail(user.email, destination);
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
      {step == 8 ? null : (
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
            Luxury
          </Text>

          <TouchableOpacity
            onPress={() => {
              nextStep();
            }}
          >
            {step == 1 || step == 2 || step == 3 || step == 7 ? null : (
              <View>
                <AntDesign name="arrowright" size={28} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
      {step == 1 || step == 8 ? null : (
        <View style={styles.progressContainer}>
          <View
            style={{
              borderRadius: 20,
              height: 6.5,
              borderWidth: 2,
              borderColor: "#a2cffe",
              paddingVertical: 1,
              width: WIDTH == 360 ? 45 * step : 50 * step,
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

export default Luxury;

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
