import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import { Switch } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
const VisaInner = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const visaDetails = route.params.item;
  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [country, setCountry] = useState(visaDetails.countryName);
  const [salaried, setSalaried] = useState(false);
  const [selfEmployed, setSelfEmployed] = useState(false);
  const [travelMonth, setTravelMonth] = useState("");
  const [load, setLoad] = useState(false);
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
    setName("");
    setNumber("");
    setCountry("");
  };

  const submitVisa = () => {
    firebase
      .database()
      .ref(`visaSubmission`)
      .push({
        userID: user.uid,
        name: name,
        phoneNumber: number,
        countryName: visaDetails.countryName,
        workType: salaried ? "Salaried" : "Self Employed",
        travelMonth: travelMonth,
      });

    setLoad(true);
    setName("");
    setNumber("");
    setCountry("");
  };

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = () => {
    if (user !== null) {
      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          if (data.val() !== null) {
            let val = data.val();
            setUserInfo(val);
            setName(val.name);
            setNumber(val.phoneNumber);
          }
        });
    }
  };

  const renderItem = () => {
    switch (step) {
      case 0:
        return (
          <View>
            <Text style={styles.headings}>Document Required</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Andika",
                }}
              >
                {visaDetails.salaryDocs.salaryDocsRequired}
              </Text>
            </View>
            <Text style={styles.headings}>Financials</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.salaryDocs.salaryFinancials}
              </Text>
            </View>

            <Text style={styles.headings}>Submission</Text>

            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.salaryDocs.salarySubmission}
              </Text>
            </View>

            <Text style={styles.headings}>Appointment</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.salaryDocs.salaryAppointment}
              </Text>
            </View>

            <Text style={styles.headings}>Honeymooners</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.salaryDocs.salaryHoneymooners}
              </Text>
            </View>

            <Text style={styles.headings}>Duration</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.salaryDocs.salaryDuration}
              </Text>
            </View>

            <Text style={styles.headings}>Photograph</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.salaryDocs.salaryPhotography}
              </Text>
            </View>
          </View>
        );
      case 1:
        return (
          <View>
            <Text style={styles.headings}>Document Required</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Andika",
                }}
              >
                {visaDetails.selfEmployedDocs.selfEmployedDocsRequired}
              </Text>
            </View>
            <Text style={styles.headings}>Financials</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.selfEmployedDocs.selfEmployedFinancials}
              </Text>
            </View>

            <Text style={styles.headings}>Submisiion</Text>

            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.selfEmployedDocs.selfEmployedSubmission}
              </Text>
            </View>

            <Text style={styles.headings}>Appointment</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.selfEmployedDocs.selfEmployedAppointment}
              </Text>
            </View>

            <Text style={styles.headings}>Honeymooners</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.selfEmployedDocs.selfEmployedHoneymooners}
              </Text>
            </View>

            <Text style={styles.headings}>Duration</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.selfEmployedDocs.selfEmployedDuration}
              </Text>
            </View>

            <Text style={styles.headings}>Photograph</Text>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ fontSize: 16, fontFamily: "Andika" }}>
                {visaDetails.selfEmployedDocs.selfEmployedPhotography}
              </Text>
            </View>
          </View>
        );
    }
  };

  return (
    <ScrollView>
      <View
        animation="bounceIn"
        duration={3000}
        style={{ flex: 1, position: "relative" }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            top: WIDTH / 14,
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Visa")}>
            <AntDesign name="arrowleft" size={36} color="#333" />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            width: WIDTH,
            height: HEIGHT / 3,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
          source={{ uri: visaDetails.imageUrl }}
        />

        <View
          style={{
            position: "absolute",
            zIndex: 2,
            justifyContent: "center",
            alignItems: "center",
            width: WIDTH,
            top: -HEIGHT / 10 + 20,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              color: "white",
              fontFamily: "NewYorkl",
            }}
          >
            {visaDetails.countryName}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => prevStep()}>
            <Text
              style={{
                borderColor: "#A6C5CD",
                borderWidth: 1,
                borderRightWidth: 0,
                padding: 8,
                backgroundColor: step == 0 ? "#A6C5CD" : null,
                color: step == 0 ? "white" : "black",
                alignItems: "center",
              }}
            >
              Salaried
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextStep()}>
            <Text
              style={{
                borderColor: "#A6C5CD",
                borderWidth: 1,
                padding: 8,
                backgroundColor: step == 1 ? "#A6C5CD" : null,
                color: step == 1 ? "white" : "black",
              }}
            >
              Self Employed
            </Text>
          </TouchableOpacity>
        </View>
        {formVisible ? null : (
          <TouchableOpacity onPress={() => setFormVisible(true)}>
            <Text
              style={{
                textAlign: "center",
                color: "#FC427B",
                fontSize: 18,
                fontFamily: "NewYorkl",
              }}
            >
              Apply visa for {visaDetails.countryName}
            </Text>
          </TouchableOpacity>
        )}
        {formVisible ? (
          <View
            style={{
              padding: 20,
              marginHorizontal: 15,
              borderRadius: 10,
              backgroundColor: "#7f8c8d",
              marginTop: 20,
            }}
          >
            {!load ? (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.text}>Name : </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    value={name}
                    onChangeText={(value) => setName(value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.text}>Country Name : </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    value={country}
                    onChangeText={(value) => setCountry(value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.text}>Phone Number : </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={number}
                    onChangeText={(value) => setNumber(value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.text}>Travel Month : </Text>
                  <TextInput
                    style={styles.input}
                    value={travelMonth}
                    onChangeText={(value) => setTravelMonth(value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.text}>Work Type : </Text>
                  <View>
                    <Switch
                      value={salaried}
                      onValueChange={() => setSalaried(!salaried)}
                      color="#e74c3c"
                      ios_backgroundColor="white"
                    />
                    <Text style={styles.text1}>Salaried </Text>
                  </View>
                  <View>
                    <Switch
                      value={selfEmployed}
                      onValueChange={() => setSelfEmployed(!selfEmployed)}
                      color="#e74c3c"
                      ios_backgroundColor="white"
                    />
                    <Text style={styles.text1}>Self Employed </Text>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <TouchableOpacity
                    onPress={() => setFormVisible(false)}
                    style={{
                      borderRadius: 10,
                      backgroundColor: "black",
                      paddingVertical: 13,
                      paddingHorizontal: 20,
                      width: WIDTH / 3.8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.button}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => submitVisa()}
                    style={{
                      borderRadius: 10,
                      backgroundColor: "#34495e",
                      paddingVertical: 13,
                      paddingHorizontal: 20,
                      width: WIDTH / 3.8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.button}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Image
                  style={{
                    width: WIDTH / 3,
                    height: WIDTH / 3,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    marginBottom: 20,
                  }}
                  source={require("../../../assets/tick.png")}
                />
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 16,
                    fontFamily: "NewYorkl",
                    textAlign: "center",
                  }}
                >
                  Request Submitted {"\n"}
                  Our Team will reach you back
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setFormVisible(false);
                    setLoad(false);
                  }}
                >
                  <Text style={styles.button}>Back</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : null}
        {renderItem()}
      </View>
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  headings: {
    fontFamily: "NewYorkl",
    fontSize: 24,
    marginLeft: 10,
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    width: WIDTH * 0.4,
    height: Platform.OS === "ios" ? 40 : 20,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 17,
    fontFamily: "Andika",
  },
  text1: {
    fontSize: 14,
    fontFamily: "Andika",
  },
  button: {
    color: "white",
    fontSize: 18,
    fontFamily: "Andika",
  },
});

export default VisaInner;
