import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Tourname from "./Reusable components/Tourname";
import Travellertype from "./Reusable components/Travellertype";
import Checkout from "./Reusable components/Checkout";
import Touristnumber from "./Reusable components/Touristnumber";
import Travelmode from "./Reusable components/Travelmode";

import DatePicker from "react-native-datepicker";

import Roadtripques from "./Reusable components/Roadtripques";
import Roadtripques2 from "./Reusable components/Roadtripques2";
import Drivetype from "./Reusable components/Drivetype";
import * as firebase from "firebase";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const RoadTripScreen = ({ navigation }) => {
  const [travelMode, setTravelMode] = React.useState("");
  const [travellerType, setTravellerType] = React.useState("");
  const [adult, setAdult] = React.useState(0);
  const [children, setChildren] = React.useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [driveDuration, setDriveDuration] = useState("");
  const [driveRestriction, setDriveRestriction] = useState("");
  const [stops, setStops] = useState("");
  const [carRent, setCarRent] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(false);
  const [name, setName] = useState("");
  const [driveType, setDriveType] = useState("");
  const [driverType, setDriverType] = useState("");
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
  console.log(userInfo.phoneNumber, "ijnfo");

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
  }, []);
  const onCarRent = () => setIsSwitchOn(!carRent);
  const onAdditionalInfo = () => setIsSwitchOn(!additionalInfo);
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace("SignInScreen");
    }
  });
  useEffect(() => {
    random = Math.floor((Math.random() + 4) * 345334 * Math.random());
    const requestDate = new Date();
    let currentYear = requestDate.getFullYear();
    setDate(requestDate.getDate());
    setMonth(requestDate.getMonth() + 1);
    setYear(currentYear.toString().slice(2, 5));
    formatedMonth = month < 10 ? "0" + month : month;
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
    setNumber("");
  };

  const description = `“It is all about the journey and not the destination.” If this is your mantra, a road trip is the best option for you! A road trip lets you experience the scenic beauty of the places you go by unlike taking a train or a flight. We provide you with appropriate route plans and recommendations of restaurants, fuel stations, etc. We do plan it all out for you, but the decision of what to explore and what not still remains with you.`;
  const renderForm = (step) => {
    switch (step) {
      case 1:
        return (
          <Tourname
            step={() => nextStep()}
            imgSrc={
              "https://image.freepik.com/free-vector/off-road-concept-illustration_114360-1220.jpg"
            }
            description={description}
          />
        );

      case 2:
        return (
          <Travelmode
            imgSrc1={
              "https://image.freepik.com/free-vector/couple-love-scooter_89224-2535.jpg"
            }
            imgScr2={
              "https://image.freepik.com/free-vector/happy-traveler-man-woman-dog-red-trunk-car-back-with-check-point-travel-around-world_48049-454.jpg"
            }
            nextStep={() => nextStep()}
            name1={"Bike"}
            name2={"Car"}
            travelMode={travelMode}
            setTrain={() => setTravelMode("Bike")}
            setFlight={() => setTravelMode("Car")}
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
          <Roadtripques
            imgSrc={
              "https://image.freepik.com/free-vector/car-towing-caravan-trailer-camper-against-mountains-spruce-trees-background-summer-travel-lettering-vehicle-wild-nature-adventure-trip-seasonal-camping-illustration_198278-1324.jpg"
            }
            attr3={startPoint}
            attr1={driveDuration}
            attr2={driveRestriction}
            placeholder1={"Ex.6 hours"}
            placeholder2={" Ex.Veg food only"}
            placeholder3={"Ex.Chennai"}
            que3={"Where will be your starting point ?"}
            que1={"How long would you like to drive? (Optional)"}
            que2={"Any travel or dietary restrictions? (Optional)"}
            func3={(value) => setStartPoint(value)}
            func1={(value) => setDriveDuration(value)}
            func2={(value) => setDriveRestriction(value)}
          />
        );
      case 7:
        return (
          <Roadtripques2
            imgSrc={
              "https://image.freepik.com/free-vector/traveling-car-illustration_126895-243.jpg"
            }
            attr3={stops}
            attr1={additionalInfo}
            attr2={carRent}
            placeholder1={""}
            placeholder2={""}
            placeholder3={"Ex.Food joints"}
            que3={"What kind of stops do you prefer on your drive? (Optional)"}
            que1={
              "Would you like to add extra beds or additional room if travelling as 3/5/7?"
            }
            que2={"Do you need any help in renting a car?"}
            func3={(value) => setStops(value)}
            func1={() => setAdditionalInfo(!additionalInfo)}
            func2={() => setCarRent(!carRent)}
          />
        );
      case 8:
        return (
          <Drivetype
            driveType={driveType}
            driverType={driverType}
            imgSrc1={
              "https://image.freepik.com/free-vector/modern-blue-urban-adventure-suv-vehicle-illustration_1344-205.jpg"
            }
            imgSrc2={
              "https://image.freepik.com/free-photo/black-urban-sport-two-seater-motorcycle_101266-599.jpg"
            }
            imgSrc3={
              "https://image.freepik.com/free-vector/modern-blue-urban-adventure-suv-vehicle-illustration_1344-205.jpg"
            }
            imgSrc4={
              "https://image.freepik.com/free-photo/black-urban-sport-two-seater-motorcycle_101266-599.jpg"
            }
            setRent={() => setDriveType("Rented Bike/Car")}
            setOwned={() => setDriveType("Own Bike/Car")}
            setSelf={() => setDriverType("Self Drive")}
            setDriver={() => setDriverType("Car Driver needed")}
            nextStep={() => nextStep()}
          />
        );
      case 9:
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

      case 10:
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
    console.log(userID);

    firebase
      .database()
      .ref(`requests/`)
      .push({
        requestID: `TO-${date}${formatedMonth}${year}-${random}`,
        tourCategory: "Road Trip",
        travellerType: travellerType,
        fromDate: fromDate,
        adult: adult,
        children: children,
        travelMode: travelMode,
        startPoint: startPoint,
        driveRestriction: driveRestriction,
        driveDuration: driveDuration,
        toDate: toDate,
        stops: stops,
        carRent: carRent,
        additionalInfo: additionalInfo,
        name: name,
        number: number,
        budget: budget,
        driverType: driverType,
        driveType: driveType,
        status: "Query Received",
        userID: userID,
        plans: "",
        reports: "",
        tourCost: 0,
      })
      .then((data) => {
        console.log(data);
        nextStep();
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      {step == 10 ? null : (
        <View style={styles.arrowsContainer}>
          {step == 1 ? (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack("Home");
                console.log("logged");
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
            Road Trip
          </Text>

          <TouchableOpacity
            onPress={() => {
              nextStep();
            }}
          >
            {step !== 9 && step !== 2 && step !== 3 && step !== 8 ? (
              <View>
                <AntDesign name="arrowright" size={28} />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      )}
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

export default RoadTripScreen;

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
