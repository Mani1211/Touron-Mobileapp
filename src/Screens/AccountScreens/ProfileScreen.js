import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { database } from "firebase";

import { AntDesign } from "@expo/vector-icons";

import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [pic, setPic] = useState("");

  const [step, setStep] = useState(2);
  const [aboutMe, setAboutMe] = useState("");
  const [travellerType, setTravellerType] = useState("");
  const { user } = useContext(AuthContext);

  const [loaded, setLoaded] = useState(true);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEditable(true);
    }, 100);
  }, []);

  const getUserData = () => {
    if (user !== null) {
      setName(user.displayName);
      setEmail(user.email);

      // console.log(`user,uid`, user.uid);
      database()
        .ref(`userGeneralInfo/${user.uid}`)
        .on("value", (data) => {
          // console.log(data, "DATA");
          if (data.val() == null) {
            setAboutMe("");
            setAddress("");
            setAge("");
            setNumber("");
            setGender("");
            setTravellerType("");
          }

          if (data.val() !== null) {
            let val = data.val();
            setUserInfo(val);
            setAboutMe(val.aboutMe);
            setAddress(val.address);
            setAge(val.age);
            setNumber(val.phoneNumber);
            setGender(val.gender);
            setPic(val.photoURL);
            setTravellerType(val.travellerType);
          }
        });
    }
    setLoaded(false);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getUserData();
    }
    return () => (mounted = false);
  }, []);

  // const updateProfilePic = async (uri) => {
  //   if (user !== null) {
  //     // firebase
  //     database()
  //       .ref(`userGeneralInfo/${user.uid}`)
  //       .update({
  //         photoURL: uri,
  //       })
  //       .then(() => {
  //         setLoading(false);
  //       });
  //   }
  // };
  const updateUser = () => {
    database().ref(`userGeneralInfo/${user.uid}`).update({
      name: name,
      phoneNumber: number,
      address: address,
      age: age,
      gender: gender,
      aboutMe: aboutMe,
      travellerType: travellerType,
      admin: false,
      photoURL: pic,
    });
  };

  // const _pickImage = async () => {
  //   try {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [5, 6],
  //       quality: 1,
  //     });
  //     if (!result.cancelled) {
  //       setLoading(true);
  //       const response = await fetch(result.uri);
  //       const blob = await response.blob();
  //       // firebase
  //       storage()
  //         .ref(`users/${user.uid}/profile.jpg`)
  //         .put(blob)
  //         .then(() => {
  //           // firebase
  //           storage()
  //             .ref(`users/${user.uid}/profile.jpg`)
  //             .getDownloadURL()
  //             .then((imageUrl) => {
  //               setPic(imageUrl);
  //               updateProfilePic(imageUrl);
  //               console.log(imageUrl, "lo");
  //             });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   } catch (E) {
  //     console.log(E);
  //   }
  // };

  // const nextStep = () => {
  //   setStep(step + 1);
  // };
  const prevStep = () => {
    setStep(step - 1);
  };

  const renderPage = (step) => {
    switch (step) {
      case 1:
        return (
          <View>
            {/* <View style={{ position: "relative" }}>
              {pic === "" ? (
                <Image
                  source={{
                    uri:
                      "https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
                  }}
                  style={{
                    width: WIDTH,

                    height: HEIGHT / 1.3,
                    borderBottomLeftRadius: WIDTH / 10,
                    borderBottomRightRadius: WIDTH / 10,
                  }}
                />
              ) : (
                <>
                  <ProgressiveImage
                    source={{ uri: pic }}
                    style={{
                      width: WIDTH,
                      height: HEIGHT / 1.3,
                      borderBottomLeftRadius: WIDTH / 10,
                      borderBottomRightRadius: WIDTH / 10,
                    }}
                  />
                </>
              )}
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  width: WIDTH * 0.9,
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  height: HEIGHT,
                  marginTop: 20,
                  zIndex: 10,
                }}
              >
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                  <View>
                    <MaterialCommunityIcons
                      name="menu"
                      size={28}
                      color="black"
                      style={{ paddingHorizontal: 20, paddingTop: 10 }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={_pickImage}>
                  <View style={{ alignItems: "center" }}>
                    <Entypo
                      name="upload"
                      size={24}
                      color="black"
                      style={{ paddingHorizontal: 20, paddingTop: 10 }}
                    />

                    <Text style={{ color: "black", fontSize: 14 }}>
                      Change Pic
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 35,
                  color: "black",
                  marginHorizontal: WIDTH / 10,
                  paddingBottom: 10,
                  fontFamily: "NewYorkl",
                }}
              >
                {name}
              </Text>
              {age == "" && travellerType == "" ? null : (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      // paddingBottom: 20,
                    }}
                  >
                    <FontAwesome
                      name="circle"
                      size={20}
                      color="green"
                      style={{
                        marginLeft: WIDTH / 10,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: WIDTH / 20,
                        color: "black",
                        fontFamily: "Andika",
                      }}
                    >
                      {age},{travellerType}
                    </Text>
                  </View>
                </View>
              )}
              <TouchableOpacity onPress={() => nextStep()}>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingTop: 20,
                  }}
                >
                  <Entypo
                    name="edit"
                    size={28}
                    color="black"
                    onPress={navigation.toggleDrawer}
                    style={{ paddingRight: 5 }}
                  />

                  <Text style={{ fontFamily: "Andika", fontSize: 18 }}>
                    Edit Profile
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}
            <Text>Profile Page</Text>
          </View>
        );

      case 2:
        return (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
              style={{ flex: 1, height: HEIGHT }}
              // behavior="position"
            >
              <ScrollView>
                <View
                  style={{
                    position: "absolute",
                    alignItems: "flex-start",
                  }}
                >
                  <ImageBackground
                    style={{
                      width: WIDTH,
                      height: HEIGHT * 1.3,
                    }}
                    source={{
                      uri: "https://images.pexels.com/photos/207237/pexels-photo-207237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    }}
                  />
                </View>
                <View
                  style={{
                    height: HEIGHT / 8,
                    alignItems: "center",
                    flexDirection: "row",
                    // position: "absolute",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      updateUser();
                      navigation.toggleDrawer();
                    }}
                  >
                    <View>
                      <AntDesign
                        name="left"
                        size={28}
                        color="black"
                        style={{ paddingHorizontal: 20, paddingTop: 35 }}
                        onPress={() => navigation.toggleDrawer()}
                      />
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 0.8,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingTop: 35,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "NewYorkl",
                      }}
                    >
                      Profile
                    </Text>
                  </View>
                </View>

                <View>
                  <View
                    style={{
                      width: WIDTH,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={(value) => setName(value)}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Type"
                        value={travellerType}
                        keyboardType="visible-password"
                        onChangeText={(value) => setTravellerType(value)}
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        keyboardType="email-address"
                        onChangeText={(value) => setEmail(value)}
                        editable={editable}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginVertical: 10 }}>
                      <View style={{ width: WIDTH / 2, paddingHorizontal: 20 }}>
                        <TextInput
                          style={styles.input}
                          placeholder="Age"
                          value={age}
                          keyboardType="visible-password"
                          onChangeText={(value) => setAge(value)}
                        />
                      </View>

                      <View style={{ width: WIDTH / 2 }}>
                        {/* <TextInput
                          style={styles.input}
                          placeholder="Gender"
                          value={gender}
                          onChangeText={(value) => setGender(value)}
                        /> */}
                        <DropDownPicker
                          items={[
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" },
                          ]}
                          placeholder="Select Gender"
                          defaultValue={gender}
                          containerStyle={{
                            height: 40,
                            width: WIDTH / 2.7,
                            marginRight: 10,
                          }}
                          style={{ backgroundColor: "transparent" }}
                          itemStyle={{
                            justifyContent: "flex-start",
                          }}
                          onChangeItem={(item) => {
                            setGender(item.value);
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="About Me"
                        value={aboutMe}
                        onChangeText={(value) => setAboutMe(value)}
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={number}
                        onChangeText={(value) => setNumber(value)}
                        keyboardType="number-pad"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={address}
                        multiline
                        onChangeText={(value) => setAddress(value)}
                      />
                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 40 }}>
                      <TouchableOpacity
                        onPress={() => {
                          prevStep();
                        }}
                      >
                        <View style={styles.otpButton}>
                          <Text style={styles.otpText}> Discard</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => updateUser()}>
                        <View
                          style={[
                            styles.otpButton,
                            { backgroundColor: "white" },
                          ]}
                        >
                          <Text style={[styles.otpText, { color: "black" }]}>
                            Save
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loaded ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        />
      ) : (
        <>{renderPage(step)}</>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = new StyleSheet.create({
  input: {
    marginHorizontal: 20,
    width: WIDTH * 0.8,
    height: 60,
    color: "#333",
    fontFamily: "Andika",
    fontSize: 18,
  },
  inputContainer: {
    height: HEIGHT / 15,
    borderRadius: 10,
    marginBottom: 20,
    borderBottomColor: "grey",
  },
  otpButton: {
    marginBottom: 85,
    backgroundColor: "black",
    borderRadius: 10,
    width: WIDTH / 3,
    alignContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    position: "relative",
  },
  otpText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "white",
    fontSize: 16,
    fontFamily: "Andika",
    // fontWeight: "bold",
  },
});
