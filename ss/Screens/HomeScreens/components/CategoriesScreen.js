import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const Categories = React.memo(({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Planned")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <View>
              <Image
                style={styles.categoryImage}
                source={{
                  uri:
                    "https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                }}
              />
            </View>
            <Text style={styles.text}>Planned </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Road")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Image
                style={styles.categoryImage}
                source={{
                  uri:
                    "https://images.pexels.com/photos/3593923/pexels-photo-3593923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                }}
              />
            </View>
            <Text style={styles.text}>Road </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Surprise")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Image
                style={styles.categoryImage}
                source={{
                  uri:
                    "https://images.pexels.com/photos/4254562/pexels-photo-4254562.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                }}
              />
            </View>
            <Text style={styles.text}>Surprise </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Honeymoon")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Image
                style={styles.categoryImage}
                source={{
                  uri:
                    "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                }}
              />
            </View>
            <Text style={styles.text}>Honeymoon</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Luxury")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Image
                style={styles.categoryImage}
                source={{
                  uri:
                    "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                }}
              />
            </View>
            <Text style={styles.text}>Luxury</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Wildlife")}>
          <View
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <View>
              <Image
                style={styles.categoryImage}
                source={{
                  uri:
                    "https://www.udaipurblog.com/wp-content/uploads/2018/04/travel-triangle.jpg",
                }}
              />
            </View>
            <Text style={styles.text}>WildLife</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default Categories;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },

  text: {
    fontSize: 15,
    fontWeight: "900",
    justifyContent: "space-evenly",
    marginVertical: 20,
    marginHorizontal: 5,
    fontFamily: "Andika",
  },
  categoryImage: {
    height: WIDTH / 4.3,
    borderRadius: 50,
    width: WIDTH / 4.3,
    marginTop: 5,
  },
});
