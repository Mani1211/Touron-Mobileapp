import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import PDFReader from "rn-pdf-reader-js";
import * as DocumentPicker from "expo-document-picker";
import { AuthContext } from "../../context/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import * as firebase from "firebase";
const BookingDetails = ({ navigation }) => {
  const [name, setName] = useState("");
  const [uri, setUri] = useState("");
  const [show, setShow] = useState(false);
  const [fileuri, setfileUri] = useState("");
  const { user } = useContext(AuthContext);
  console.log(uri, "uri");
  const _pickImage = async () => {
    setShow(false);
    try {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
      });

      if (!result.cancelled) {
        setName(result.name);
        const response = await fetch(result.uri);
        const blob = await response.blob();
        firebase
          .storage()
          .ref(`users/8wGFqFspRISgtNHAmpqO0iHPhvF2/docs/${result.name}`)
          .put(blob)
          .then(() => {
            firebase
              .storage()
              .ref(`users/8wGFqFspRISgtNHAmpqO0iHPhvF2/docs/${result.name}`)
              .getDownloadURL()
              .then((imageUrl) => {
                setUri(imageUrl);

                console.log(imageUrl, "uploaded");
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Button title="pick pdf" onPress={() => _pickImage()} />
      <Text>{name}</Text>
      <TouchableOpacity>
        <Text>{fileuri}</Text>
      </TouchableOpacity>
      <Button title="Download" onPress={() => setShow(true)} />

      <PDFReader
        withPinchZoom={true}
        onError={(err) => console.log(err, "err")}
        style={{ height: 500, width: WIDTH }}
        noLoader={true}
        source={{
          uri: uri,
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default BookingDetails;
