import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator } from "react-native";
import {
  useRoute,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import StoryViewTile from "./StoryViewTile";

const StoryView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { story } = route.params;
  const [fleetIndex, setFleetIndex] = useState(0);
  const [fleet, setFleet] = useState(story?.stories[fleetIndex] || null);
  console.log(`flbjhveet`, fleet);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!story) {
      return;
    }
    if (fleetIndex < story?.stories?.length) {
      setFleet(story?.stories[0]);
    } else if (fleetIndex === story?.stories?.length) {
      navigation.navigate("StorySection");
    }
  }, [isFocused, fleetIndex]);

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
          user={story}
          goToPrevFleet={() => goToPrevFleet()}
          goToNextFleet={() => goToNextFleet()}
        />
      )}
    </>
  );
};

export default StoryView;
