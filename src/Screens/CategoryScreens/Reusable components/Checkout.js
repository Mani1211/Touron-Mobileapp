import React, { useState, useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import { AuthContext } from "./../../../context/AuthContext";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Dimensions,
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Checkout = ({
  imgSrc,
  setName,
  setBudget,
  setNumber,
  submitData,
  prevStep,
  name,
  tourType,
  number,
  tourName,
  budget,
}) => {
  const { user } = useContext(AuthContext);
  console.log("tourType :>> ", tourType);
  console.log("tourName :>> ", tourName);

  const getUserData = () => {
    if (user !== null) {
      firebase
        .database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          // console.log("data", data);s
          if (data.val() === null) {
            return;
          }
          setName(data.val().name);
          setNumber(data.val().phoneNumber);
        });
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const [error, setError] = useState("");
  console.log("error :>> ", error);

  const render = () => {
    switch (tourName) {
      case "Luxury Tour":
        return (
          <View style={styles.checkContainer}>
            <View style={styles.checkCont}>
              <Text style={styles.name}>Name:</Text>
              <TextInput
                onChangeText={(value) => setName(value)}
                placeholder="Vikash"
                value={name}
                maxLength={10}
                style={{ width: 80 }}
              />
            </View>
            {tourType === "Domestic" ? (
              <View style={styles.budgetC}>
                <Text style={styles.budget}>Budget:</Text>
                <TextInput
                  onChangeText={(value) => setBudget(value)}
                  keyboardType="number-pad"
                  value={budget}
                  style={{ width: 80 }}
                  placeholder="Min 50000"
                />
              </View>
            ) : (
              <View style={styles.budgetC}>
                <Text style={styles.budget}>Budget:</Text>
                <TextInput
                  onChangeText={(value) => setBudget(value)}
                  keyboardType="number-pad"
                  value={budget}
                  style={{ width: 80 }}
                  placeholder="Min 75000"
                />
              </View>
            )}
            <View style={styles.numC}>
              <Text style={styles.num}>Whatsapp Number:</Text>
              <TextInput
                onChangeText={(value) => setNumber(value)}
                keyboardType="number-pad"
                placeholder="9098909565"
                value={number.toString()}
              />
            </View>
            <Text style={{ color: "red" }}>{error}</Text>

            {tourType === "Domestic" ? (
              <View style={styles.submitCont}>
                <TouchableOpacity
                  onPress={() => {
                    if (budget >= 50000 && name !== "" && number !== "") {
                      setError("");
                      submitData();
                    } else {
                      setError("Min Budget 50,000");
                    }
                  }}
                >
                  <View style={styles.subC}>
                    <Text style={styles.sub}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.submitCont}>
                <TouchableOpacity
                  onPress={() => {
                    if (budget >= 75000 && name !== "" && number !== "") {
                      setError("");
                      submitData();
                    } else {
                      setError("Min Budget 75,000");
                    }
                  }}
                >
                  <View style={styles.subC}>
                    <Text style={styles.sub}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      case "Wildlife":
      case "Road Trip":
        return (
          <View style={styles.checkContainer}>
            <View style={styles.checkCont}>
              <Text style={styles.name}>Name:</Text>
              <TextInput
                onChangeText={(value) => setName(value)}
                placeholder="Vikash"
                value={name}
                maxLength={10}
                style={{ width: 80 }}
              />
            </View>
            <View style={styles.budgetC}>
              <Text style={styles.budget}>Budget:</Text>
              <TextInput
                onChangeText={(value) => setBudget(value)}
                keyboardType="number-pad"
                value={budget}
                style={{ width: 80 }}
                placeholder="Min 20000"
              />
            </View>
            <View style={styles.numC}>
              <Text style={styles.num}>Whatsapp Number:</Text>
              <TextInput
                onChangeText={(value) => setNumber(value)}
                keyboardType="number-pad"
                placeholder="9098909565"
                value={number.toString()}
              />
            </View>
            <Text style={{ color: "red" }}>{error}</Text>

            <View style={styles.submitCont}>
              <TouchableOpacity
                onPress={() => {
                  if (budget >= 20000 && name !== "" && number !== "") {
                    setError("");
                    submitData();
                  } else {
                    setError("Min Budget 20,000");
                  }
                }}
              >
                <View style={styles.subC}>
                  <Text style={styles.sub}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "Planned Tour":
      case "Suprise Tour":
      case "Honeymoon Trip":
        return (
          <View style={styles.checkContainer}>
            <View style={styles.checkCont}>
              <Text style={styles.name}>Name:</Text>
              <TextInput
                onChangeText={(value) => setName(value)}
                placeholder="Vikash"
                value={name}
                maxLength={10}
                style={{ width: 80 }}
              />
            </View>
            {tourType === "Domestic" ? (
              <View style={styles.budgetC}>
                <Text style={styles.budget}>Budget:</Text>
                <TextInput
                  onChangeText={(value) => setBudget(value)}
                  keyboardType="number-pad"
                  value={budget}
                  style={{ width: 80 }}
                  placeholder="Min 10000"
                />
              </View>
            ) : (
              <View style={styles.budgetC}>
                <Text style={styles.budget}>Budget Per Person:</Text>
                <TextInput
                  onChangeText={(value) => setBudget(value)}
                  keyboardType="number-pad"
                  value={budget}
                  style={{ width: 80 }}
                  placeholder="Min 40000"
                />
              </View>
            )}
            <View style={styles.numC}>
              <Text style={styles.num}>WhatsApp Number:</Text>
              <TextInput
                onChangeText={(value) => setNumber(value)}
                keyboardType="number-pad"
                placeholder="9098909565"
                value={number.toString()}
              />
            </View>
            <Text style={{ color: "red" }}>{error}</Text>
            {tourType === "Domestic" ? (
              <View style={styles.submitCont}>
                <TouchableOpacity
                  onPress={() => {
                    if (budget >= 10000 && name !== "" && number !== "") {
                      setError("");
                      submitData();
                    } else {
                      setError("Min Budget 10,000");
                    }
                  }}
                >
                  <View style={styles.subC}>
                    <Text style={styles.sub}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.submitCont}>
                <TouchableOpacity
                  onPress={() => {
                    if (budget >= 40000 && name !== "" && number !== "") {
                      setError("");
                      submitData();
                    } else {
                      setError("Min Budget 40,000");
                    }
                  }}
                >
                  <View style={styles.subC}>
                    <Text style={styles.sub}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        <View style={{ alignItems: "center", justifyContent: "center" }}>
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
                // navigation.goBack("Home");
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
              {tourName}
            </Text>

            <TouchableOpacity>
              <View></View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: HEIGHT / 2.5,
              width: WIDTH,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              style={{ height: HEIGHT / 2.5, width: 300 }}
              source={{ uri: imgSrc }}
            />
          </View>
          {render()}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Checkout;

const styles = new StyleSheet.create({
  checkContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  checkCont: {
    height: HEIGHT / 13,
    flexDirection: "row",
    width: WIDTH * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontFamily: "Andika",
    width: WIDTH / 2,
    textAlign: "left",
  },
  budgetC: {
    height: HEIGHT / 13,
    flexDirection: "row",
    width: WIDTH * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  budget: {
    fontSize: 20,
    fontFamily: "Andika",
    paddingRight: 100,
    width: WIDTH / 2,
    textAlign: "left",
  },
  numC: {
    height: HEIGHT / 13,
    flexDirection: "row",
    width: WIDTH * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  num: {
    fontSize: 18,
    fontFamily: "Andika",
    width: WIDTH / 2,
    textAlign: "left",
  },
  submitCont: {
    height: HEIGHT / 13,
    width: WIDTH * 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  subC: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sub: {
    textAlign: "center",
    fontSize: 18,
    padding: 10,
  },
});
