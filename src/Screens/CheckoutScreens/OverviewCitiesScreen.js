import React, { useState, useContext } from "react";
import { DatePicker } from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
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
import { SelfTourContext } from "../../context/ SelfTourContext";
const OverviewCitiesScreen = ({ navigation, route }) => {
  const { details, setDetails } = useContext(SelfTourContext);
  const cities = route.params.cities;
  const selectedCity = route.params.selectedCity;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [cityDetails, setCityDetails] = useState([...cities]);
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const handleToDate = (date) => {
    setDatePickerVisibility(false);
    const updatedDate = date.toDateString();
    setToDate(updatedDate);
  };
  const handleFromDate = (date) => {
    setDatePickerVisibility(false);
    setFromDate(date.toDateString());
    setDate(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    console.log(date.getFullYear(), "op");
  };

  const getCurrentCity = (item) => {
    const specificCity = cityDetails.find((city) => {
      return city.name === item.name;
    });
    return specificCity;
  };

  const updatedDate = (item) => {
    const specificCity = getCurrentCity(item);
    const cityDate = [...cityDetails];
    const date = cityDate.filter((city) => {
      return city.name !== specificCity.name;
    });

    return date;
  };

  let totalDays = 0;
  const getTotalNoOfDays = () => {
    cityDetails.forEach((city) => {
      return (totalDays = totalDays * 1 + city.days * 1);
    });
    return totalDays;
  };

  getTotalNoOfDays();
  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#F1F3F6" }}>
        <View style={{ marginTop: HEIGHT / 13, marginBottom: HEIGHT / 30 }}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            Overview of the seletecd cities
          </Text>
        </View>

        {cities.map((item, index) => (
          <Surface style={styles.surfaces} key={index}>
            <View>
              <Surface style={styles.surface}>
                <Image
                  style={styles.cityimage}
                  source={{ uri: item.imageUrl }}
                />
              </Surface>

              <Text style={styles.cityName}>{item.name}</Text>
            </View>

            <View>
              <Image
                style={{ height: 40, width: 40 }}
                source={require("../../../assets/Calendar.png")}
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
                  style={{
                    fontSize: 25,
                    marginTop: 5,
                  }}
                  editable={true}
                  onChangeText={(value) => {
                    const date = updatedDate(item);
                    const specificCity = getCurrentCity(item);
                    setCityDetails([
                      ...date,
                      {
                        name: specificCity.name,
                        days: value,
                        imageUrl: item.imageUrl,
                      },
                    ]);
                  }}
                />
              </View>
            </View>
          </Surface>
        ))}
        {/* <FlatList
          data={cities}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
             
            );
          }}
        /> */}
        <View style={{ width: WIDTH, marginLeft: -20 }}>
          <Image
            style={styles.calendarImage}
            source={require("../../../assets/Boardingcard.png")}
          />
        </View>
        <View>
          <View style={styles.embark}>
            <Text
              style={{
                fontSize: WIDTH / 22,
                color: "#F1F3F6",
                fontFamily: "Avenir",
              }}
            >
              When do you embark your journey
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <View style={styles.from}>
              <Text style={{ fontSize: 20, color: "#fff" }}>From</Text>
            </View>
            <View style={styles.picker}>
              <DatePicker
                locale={"en"}
                modalTransparent={true}
                animationType={"fade"}
                textStyle={{ fontFamily: "Andika" }}
                androidMode={"spinner"}
                onDateChange={(date) => handleFromDate(date)}
              />
              <Image
                style={{ width: 20, height: 20, marginRight: 5 }}
                source={require("../../../assets/c.png")}
              />
            </View>
          </View>
          <View style={styles.planeCOntainer}>
            <Image
              source={require("../../../assets/Plane.png")}
              style={{ height: 35, width: 35 }}
            />
          </View>
          <View style={styles.toContainer}>
            <View style={styles.from}>
              <Text style={{ fontSize: 20, color: "#fff" }}>To</Text>
            </View>
            <View style={styles.picker}>
              <DatePicker
                textStyle={{ color: "#FFF", fontFamily: "Andika" }}
                minimumDate={new Date(year, month, date * 1 + totalDays - 1)}
                maximumDate={new Date(year, month, date * 1 + totalDays - 1)}
                animationType={"fade"}
                textStyle={{ fontFamily: "Andika" }}
                androidMode={"spinner"}
                onDateChange={handleToDate}
              />
              <Image
                style={{ width: 20, height: 20, marginRight: 5 }}
                source={require("../../../assets/c.png")}
              />
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
                    uri:
                      "https://image.freepik.com/free-vector/illustration-with-young-people-concept_23-2148467324.jpg",
                  }}
                />
                <View style={styles.personContainer}>
                  <TouchableOpacity onPress={() => setAdult(adult - 1)}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>-</Text>
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
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.personText}>Childrens</Text>
                <Image
                  style={styles.image}
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/smiling-boy-girl-kids-holding-hands-childhood-friendship-concept-love-romance-children-cartoon-characters-flat-vector-illustration-isolated-white-background_71593-450.jpg",
                  }}
                />
                <View style={styles.personContainer}>
                  <TouchableOpacity onPress={() => setChildren(children - 1)}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>-</Text>
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
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginTop: HEIGHT < 550 ? -WIDTH / 10 - 20 : -WIDTH / 10 - 20,
          }}
          onPress={() => {
            setDetails({
              fromDate: fromDate,
              toDate: toDate,
              adult: adult,
              children: children,
            });
            navigation.navigate("SelfTourHome", {
              selectedCity: selectedCity,
              cityDetails: cityDetails,
            });
          }}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.exploreButton}>Explore Tours</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OverviewCitiesScreen;

const styles = StyleSheet.create({
  toContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: HEIGHT * 0.5,
    left: WIDTH / 1.75,
    zIndex: 1,
    marginVertical: 5,
  },
  planeCOntainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: HEIGHT * 0.51,
    left: WIDTH / 2.18,
    zIndex: 1,
    marginVertical: 5,
  },
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
    alignItems: "center",
    marginVertical: 5,
    position: "absolute",
    bottom: HEIGHT * 0.5,
    left: WIDTH / 10,
    zIndex: 1,
  },
  embark: {
    position: "absolute",
    bottom: HEIGHT / 1.45,
    left: WIDTH / 10,
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
    backgroundColor: "#626E7B",
    borderRadius: 10,
    alignItems: "center",
    marginRight: 15,
    marginLeft: 10,
    marginBottom: 1,
  },
  exploreButton: {
    fontSize: 15,
    color: "white",
    fontFamily: "Avenir",
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
});
