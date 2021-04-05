import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import touron from "../api/touron";
import AsyncStorage from "@react-native-community/async-storage";

const Data = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tours, setTour] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    firebase.default.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getCities();
    }
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getTours();
    }
    return () => (mounted = false);
  }, []);

  const getTours = async () => {
    const tourResponse = await touron.get(`/tour?page=1&pageSize=90`);
    setTour(tourResponse.data);
  };

  const getCountries = async () => {
    const countryResponse = await touron.get(`/country`);
    setCountries(countryResponse.data);
  };
  const getCities = async () => {
    const cityResponse = await touron.get(`/city`);
    setCities(cityResponse.data);
  };

  const getToken = async () => {
    try {
      const data = await AsyncStorage.getItem("userToken");
      const userToken = JSON.parse(data);
      if (userToken) {
        setIsLoggedIn(true);
        setUser(userToken);
        getUserData(userToken.uid);
      } else {
        setUser(null);
        setUserInfo({});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserData = (uid) => {
    // console.log(`user.uid`, uid);
    firebase
      .database()
      .ref(`userGeneralInfo/${uid}`)
      .on("value", (data) => {
        // console.log(`d`, data);
        if (data === null) {
          setUserInfo({});
        } else {
          let val = data.val();
          setUserInfo(val);
        }
      });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getToken();
      getCountries();
    }
    return () => (mounted = false);
  }, []);

  return [
    user,
    setUser,
    userInfo,
    setUserInfo,
    isLoggedIn,
    setIsLoggedIn,
    cities,
    countries,
    tours,
  ];
};

export default Data;
