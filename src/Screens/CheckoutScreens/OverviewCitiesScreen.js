import React, { useState, useContext } from "react";
import DatePicker from "react-native-datepicker";
import moment from "moment";

import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Text,
  Image,
  TextInput,
  View,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { Surface } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
// import { SelfTourContext } from "../../context/ SelfTourContext";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "./../../context/AuthContext";
const OverviewCitiesScreen = ({ prevStep, setStep, selectedCitys }) => {
  const { setDetails, details } = useContext(AuthContext);
  const [selectedCity, setSelectedCity] = useState(selectedCitys);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  console.log(`totalDays`, totalDays);
  const calculateTotalDays = () => {
    let count = 0;
    selectedCity.forEach((c) => {
      return (count = count + c.days * 1);
    });
    console.log(`count`, count);
    return count;
  };

  return (
    <ScrollView style={{ marginBottom: 0, backgroundColor: "white" }}>
      <View
        style={{
          width: WIDTH * 0.9,
          alignItems: "flex-end",
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 30,
          position: "relative",
          paddingTop: Platform.OS === "ios" ? 60 : 30,
          paddingBottom: Platform.OS === "ios" ? 30 : 30,
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
            fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
            flex: 0.5,
          }}
        >
          Overview
        </Text>

        <TouchableOpacity>
          <View>{/* <AntDesign name="arrowright" size={28} /> */}</View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff", paddingBottom: 0 }}>
        {selectedCity.map((item, index) => (
          <Surface style={styles.surfaces} key={index}>
            <View>
              <Surface style={styles.surface}>
                <Image
                  style={styles.cityimage}
                  source={{ uri: item.imageUrl }}
                />
              </Surface>

              <Text style={styles.cityName}>{item.cityName}</Text>
            </View>

            <View>
              <Image
                style={{ height: 40, width: 40 }}
                source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2FCity%20images%2FCalendar.png?alt=media&token=e6b7dfb2-8e95-45ae-9c75-c224ebe4d1a8",
                }}
              />
            </View>
            <View
              style={{
                marginHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Enter No Of Days
              </Text>

              <View style={styles.inputContainer}>
                <TextInput
                  keyboardType="number-pad"
                  onChangeText={(value) => {
                    console.log("value", value);
                    const index = selectedCity.findIndex((a) => {
                      return a.cityName === item.cityName;
                    });
                    const ne = [...selectedCity];
                    ne[index].days = value * 1;

                    setSelectedCity(ne);
                    setTotalDays(calculateTotalDays());
                  }}
                  style={{
                    fontSize: 25,
                    marginTop: 5,
                    height: HEIGHT / 25,
                    width: WIDTH / 9,
                    textAlign: "center",
                  }}
                  editable={true}
                />
              </View>
            </View>
          </Surface>
        ))}

        <View style={{ width: WIDTH, marginLeft: -20 }}>
          <Image
            style={styles.calendarImage}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/touronapp-248e4.appspot.com/o/Touron%20app%2Fstats%20and%20Default%2FBoard.jpg?alt=media&token=be1b5370-9893-41be-b3a4-fef78b592715",
            }}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              left: 20,
            }}
          >
            <View style={styles.embark}>
              <Text
                style={{
                  fontSize: WIDTH / 22,
                  color: "#F1F3F6",
                  fontFamily: "Andika",
                  textAlign: "center",
                }}
              >
                When do you embark your journey
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <View>
                <View style={styles.from}>
                  <Text style={{ fontSize: 20, color: "#fff" }}>Onward</Text>
                </View>
                <View style={styles.picker}>
                  <DatePicker
                    style={{ width: 200 }}
                    date={fromDate}
                    mode="date"
                    minDate={moment().add(14, "days").format("YYYY-MM-DD")}
                    placeholder=""
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => {
                      const dates = moment(date)
                        .add(totalDays - 1, "days")
                        .format("YYYY-MM-DD");
                      setFromDate(date);
                      setToDate(dates);
                    }}
                    showIcon={false}
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                      },
                    }}
                  />
                </View>
              </View>
              <View>
                <View style={styles.from}>
                  <Text style={{ fontSize: 20, color: "#fff" }}>Return</Text>
                </View>
                <View style={styles.picker}>
                  {toDate === "" ? (
                    <Text style={{ fontSize: 15, color: "#333" }}>
                      Select Date
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 15, color: "#333" }}>
                      {toDate}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.numbers}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontFamily: "Avenir",
                }}
              >
                No of Persons
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginVertical: 1,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.personText}>Adults</Text>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://image.freepik.com/free-vector/illustration-with-young-people-concept_23-2148467324.jpg",
                    }}
                  />
                  <View style={styles.personContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (adult > 0) setAdult(adult - 1);
                      }}
                    >
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                      <TextInput
                        keyboardType="number-pad"
                        style={{
                          fontSize: 20,
                          marginTop: 10,
                        }}
                        value={adult.toString()}
                        editable={true}
                        onChangeText={(value) => setAdult(+value)}
                      />
                    </View>
                    <TouchableOpacity onPress={() => setAdult(adult + 1)}>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.personText}>Childrens</Text>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://image.freepik.com/free-vector/smiling-boy-girl-kids-holding-hands-childhood-friendship-concept-love-romance-children-cartoon-characters-flat-vector-illustration-isolated-white-background_71593-450.jpg",
                    }}
                  />
                  <View style={styles.personContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        if (children > 0) setChildren(children - 1);
                      }}
                    >
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        -
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={{
                          marginTop: 10,
                          fontSize: 20,
                        }}
                        editable={true}
                        value={children.toString()}
                        onChangeText={(value) => setChildren(+value)}
                        keyboardType="number-pad"
                      />
                    </View>
                    <TouchableOpacity onPress={() => setChildren(children + 1)}>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {fromDate !== "" && adult > 0 && totalDays > 0 ? (
              <TouchableOpacity
                style={{
                  marginTop: HEIGHT < 550 ? -WIDTH / 10 - 20 : -WIDTH / 10 - 20,
                }}
                onPress={() => {
                  setDetails({
                    ...details,
                    fromDate: fromDate,
                    toDate: toDate,
                    adult: adult,
                    children: children,
                    totalDays: totalDays,
                  });
                  setStep();
                }}
              >
                <View style={styles.buttonContainer}>
                  <Text style={styles.exploreButton}>Proceed</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OverviewCitiesScreen;

const styles = StyleSheet.create({
  picker: {
    width: WIDTH / 3,
    height: WIDTH / 8,
    borderRadius: 15,
    backgroundColor: "#f1f2f6",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  from: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  dateContainer: {
    width: WIDTH,
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-around",
    position: "absolute",
    flexDirection: "row",
    bottom: HEIGHT * 0.5,
  },
  embark: {
    position: "absolute",
    bottom: HEIGHT / 1.45,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  calendarImage: {
    marginTop: 0,
    height: HEIGHT / 1.3,
    width: WIDTH * 1.1,
    position: "relative",
  },
  cityimage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 20,
  },
  surfaces: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    height: 160,
    borderRadius: 20,
    width: WIDTH * 0.9,
    elevation: 8,
    justifyContent: "space-between",
  },
  numbers: {
    position: "absolute",
    height: HEIGHT / 3.7,
    width: WIDTH * 0.9,
    marginHorizontal: 20,
    zIndex: 1,
    bottom: HEIGHT * 0.11,
    borderRadius: 20,
  },
  personText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Andika",
  },
  personContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: WIDTH / 3,
    alignItems: "center",
  },
  image: {
    height: HEIGHT / 10,
    width: WIDTH / 4,
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: "#f1f2f6",
    marginTop: 5,
    height: HEIGHT / 25,
    width: WIDTH / 9,
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor: "#E28633",
    borderRadius: 10,
    alignItems: "center",
    width: WIDTH * 0.9,
    marginRight: 15,
    marginLeft: 10,
    marginBottom: 1,
  },
  exploreButton: {
    fontSize: 15,
    color: "white",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Avenir",
    padding: WIDTH / 25,
  },
  cityName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginHorizontal: 5,
    alignItems: "center",
    width: WIDTH / 6,
    height: WIDTH / 8,
    backgroundColor: "#F1F3F6",
    borderRadius: 15,
    marginVertical: 10,
  },
  surface: {
    padding: 8,
    height: 100,
    borderRadius: 20,
    width: 100,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
  },
  cityImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 100,
  },
  proceedButton: {
    width: WIDTH * 0.9,
    backgroundColor: "#626E7B",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },

  background: {
    backgroundColor: "#fff",
    height: HEIGHT / 15,
    borderRadius: 20,
    flexDirection: "row",
    marginVertical: 10,
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

  ftype: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    height: WIDTH / 3,
    borderRadius: 20,
    width: WIDTH / 3,
  },
  ftypecontainer: {
    alignItems: "center",
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "center",
  },
  tick: {
    top: 0,
    right: 0,
    borderBottomLeftRadius: 20,
    position: "absolute",
    backgroundColor: "#00d8d6",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
  },
});
