import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";
import {
  useRoute,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { AuthContext } from "./../../context/AuthContext";
import StoryViewTile from "./StoryViewTile";

const StoryView = () => {
  const navigation = useNavigation();
  const { fleetData } = useContext(AuthContext);
  const route = useRoute();
  const { index } = route.params;
  const [users, setUsers] = useState(fleetData);
  const [user, setUser] = useState(fleetData[index] || null);
  const [fleetIndex, setFleetIndex] = useState(0);
  const [fleet, setFleet] = useState(null);
  // console.log(`user`, user);
  // console.log(`index`, index);
  // console.log(`fleet`, fleet);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!users || users.length === 0) {
      return;
    }
    setUser(users[index] || null);
    setFleetIndex(0);
  }, [isFocused, users]);

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

    if (fleetIndex >= user?.stories?.length) {
      if (users.length > userIndex + 1) {
        // go to the next user

        setUser(users[userIndex + 1]);
        setFleetIndex(0);
      } else if (userIndex === users.length - 1) {
        navigation.navigate("Main");
      } else {
        setFleetIndex(user?.stories?.length);
      }
    } else if (fleetIndex < 0) {
      // go to the prev user
      if (userIndex > 0) {
        setUser(users[userIndex - 1]);
        setFleetIndex(users[userIndex - 1].stories.length - 1);
      } else {
        setFleetIndex(0);
      }
    } else {
      setFleet(user?.stories[fleetIndex].value);
    }
  }, [isFocused, fleetIndex]);

  const goToNextFleet = () => {
    setFleetIndex(fleetIndex + 1);
  };

  const goToPrevFleet = () => {
    setFleetIndex(fleetIndex - 1);
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
