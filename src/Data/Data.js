import React, { useState, useEffect } from "react";
import { database, auth } from "firebase";
import touron from "../api/touron";
import axios from "axios";

import AsyncStorage from "@react-native-community/async-storage";

const Data = () => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tours, setTour] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  //  return () => {
  //    source.cancel();
  //  };
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCities = async () => {
      const cityResponse = await touron.get(`/city/search`);
      setCities(cityResponse.data);
    };
    getCities();
    return () => {
      source.cancel();
    };
    console.log(`object`, source);
  }, []);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getTours = async () => {
      const tourResponse = await touron.get(`/tour?page=1&pageSize=90`);
      setTour(tourResponse.data);
    };

    getTours();
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCountries = async () => {
      const countryResponse = await touron.get(`/country`);
      setCountries(countryResponse.data);
    };
    getCountries();
    return () => {
      source.cancel();
    };
  }, []);

  const getUserData = (uid) => {
    database()
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
    console.log(`mounted`, mounted);

    if (mounted) {
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
        getToken();
      };

      return () => {
        mounted = false;
        console.log(`m`, mounted);
      };
    }
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
