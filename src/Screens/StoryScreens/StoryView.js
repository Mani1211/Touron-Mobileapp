import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";
import {
  useRoute,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { AuthContext } from "./../../context/AuthContext";
import StoryViewTile from "./StoryViewTile";
import { database } from "firebase";

const StoryView = () => {
  const navigation = useNavigation();
  // const { fleetData } = useContext(AuthContext);
  const route = useRoute();
  const { index, storyNumber } = route.params;
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [fleetIndex, setFleetIndex] = useState(0);
  const [fleet, setFleet] = useState(user?.stories[fleetIndex] || null);
  console.log(`storyNumber`, storyNumber);
  console.log(`ubbser`, user);
  // console.log(`index`, index);
  console.log(`flbjhveet`, fleet);
  const isFocused = useIsFocused();
  // const [fleetData, setFleetData] = useState([]);

  const getStoriesData = () => {
    let v = [];
    database()
      .ref("stories")
      .on("value", (data) => {
        data.forEach((d) => {
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
  }, [isFocused]);

  useEffect(() => {
    if (!users || users.length === 0) {
      return;
    }
    setUser(users.find((user) => user.storyNumber === storyNumber) || null);
    setFleet(
      users.find((user) => {
        if (user.storyNumber === storyNumber) return user.stories;
      }) || null
    );
    setFleetIndex(0);
  }, [isFocused, users]);

  useEffect(() => {
    if (!user) {
      return;
    }

    // let userIndex = -1;

    // for (let i = 0; i < users?.length; i++) {
    //   if (users[i].storyNumber === user.storyNumber) {
    //     userIndex = i;
    //     break;
    //   }
    // }

    // if (fleetIndex >= user?.stories?.length) {
    //   if (users.length > userIndex + 1) {
    //     // go to the next user

    //     setUser(users[userIndex + 1]);
    //     setFleetIndex(0);
    //   } else if (userIndex === users.length - 1) {
    //     navigation.navigate("Main");
    //   } else {
    //     setFleetIndex(user?.stories?.length);
    //   }
    // } else if (fleetIndex < 0) {
    //   // go to the prev user
    //   if (userIndex > 0) {
    //     setUser(users[userIndex - 1]);
    //     setFleetIndex(users[userIndex - 1].stories.length - 1);
    //   } else if (userIndex === 0) {
    //     navigation.navigate("Main");
    //   } else {
    //     setFleetIndex(0);
    //   }
    // } else {
    //   setFleet(user?.stories[fleetIndex].value);
    // }

    if (fleetIndex < user?.stories?.length) {
      setFleet(user?.stories[fleetIndex].value);
    } else if (fleetIndex === user?.stories?.length) {
      navigation.navigate("Main");
    }
  }, [isFocused, fleetIndex, users]);

  const goToNextFleet = () => {
    setFleetIndex(fleetIndex + 1);
  };

  const goToPrevFleet = () => {
    if (fleetIndex > 0) {
      setFleetIndex(fleetIndex - 1);
    }
  };

  return (
    <>
      {fleet === null ? (
        <ActivityIndicator size={30} color="black" />
      ) : (
        <StoryViewTile
          fleetIndex={fleetIndex}
          fleet={fleet}
          user={user}
          goToPrevFleet={() => goToPrevFleet()}
          goToNextFleet={() => goToNextFleet()}
        />
      )}
    </>
  );
};

export default StoryView;
