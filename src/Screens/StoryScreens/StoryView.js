import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const StoryView = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [fleetIndex, setFleetIndex] = useState(-1);
  const [fleet, setFleet] = useState(null);

  const { width } = useWindowDimensions();
  const fleetCount = user.fleets.items.length;
  const customWidth = (width * 0.9) / user.fleets.items.length;
  const singleWidth = width * 0.95;

  const getStoriesData = () => {
    let v = [];
    database()
      .ref("stories")
      .on("value", (data) => {
        data.forEach((d) => {
          console.log(`key`, d.key);
          let stories = [];
          d.forEach((s) => {
            stories.push({ key: s.key, value: s.val() });
          });
          v.push({
            storyNumber: d.key,
            categoryTitle: stories[0].value.categoryTitle,
            stories: stories,
          });
        });
      });
    setUsers(v);
  };

  useEffect(() => {
    getStoriesData();
  }, []);

  useEffect(() => {
    if (!users || users.length === 0) {
      return;
    }
    setUser(users.find((u) => u.storyNumber === userId) || null);
    setFleetIndex(0);
  }, [users]);

  useEffect(() => {
    if (!user) {
      return;
    }

    let userIndex = -1;

    for (let i = 0; i < users?.length; i++) {
      if (users[i].storyNumber === user.storyNumber) {
        userIndex = i;
        break;
      }
    }

    if (fleetIndex >= user?.fleets?.items.length) {
      if (users.length > userIndex + 1) {
        // go to the next user
        setUser(users[userIndex + 1]);
        setFleetIndex(0);
      } else {
        setFleetIndex(user?.fleets?.items.length);
      }
    } else if (fleetIndex < 0) {
      // go to the prev user
      if (userIndex > 0) {
        setUser(users[userIndex - 1]);
        setFleetIndex(users[userIndex - 1].fleets.items.length - 1);
      } else {
        setFleetIndex(0);
      }
    } else {
      setFleet(user?.fleets?.items[fleetIndex]);
    }
  }, [fleetIndex]);

  const goToNextFleet = () => {
    setFleetIndex(fleetIndex + 1);
  };

  const goToPrevFleet = () => {
    setFleetIndex(fleetIndex - 1);
  };

  if (fleet === null) {
    return <ActivityIndicator />;
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f2027",
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          flex: 1,
          zIndex: 10,
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => goToPrevFleet()}
          style={{
            width: "50%",
            height: "100%",
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={() => goToNextFleet()}
          style={{
            width: "50%",
            height: "100%",
          }}
        ></TouchableOpacity>
      </View>
      {fleet.type === "IMAGE" && (
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{
            uri: fleet.image,
          }}
        />
      )}
      {fleet.type === "TEXT" && (
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            margin: 20,
            color: "#fff",
          }}
        >
          {fleet.text}
        </Text>
      )}
      <View
        style={{
          height: 5,
          width: width,
          marginBottom: 10,
          // backgroundColor: '#e7e7e739',
          position: "absolute",
          top: 20,
          flexDirection: "row",
          marginHorizontal: 15,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 50,
        }}
      >
        {user.fleets.items.map((i, index) => (
          <View
            style={{
              height: 3,
              width: fleetCount > 1 ? customWidth : singleWidth,
              marginBottom: 10,
              marginRight: fleetCount - 1 === index ? 0 : 5,
              backgroundColor: fleetIndex < index ? "#e7e7e739" : "#e1e1e1",
              // backgroundColor: '#e1e1e1',
              borderRadius: 50,
            }}
          ></View>
        ))}
      </View>
      <View
        style={{
          position: "absolute",
          top: 25,
          left: 5,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              padding: 5,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#fff",
              marginRight: 20,
            }}
          >
            {/* <Image
              style={{ height: 50, width: 50, borderRadius: 30 }}
              source={{
                uri: user.image,
              }}
            /> */}
          </View>
          <View>
            {/* <Text style={{ fontSize: 23, color: "#fff" }}>{user.username}</Text> */}
            <Text style={{ fontSize: 23, color: "#fff" }}>username</Text>
            <Text style={{ fontSize: 15, color: "#fff" }}>12 hours ago</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StoryView;
