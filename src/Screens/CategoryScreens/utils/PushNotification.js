import { database } from "firebase";
import axios from "axios";

export const getExpoToken = (userId) => {
  let token = "";
  database()
    .ref(`userGeneralInfo/${userId}`)
    .on("value", (data) => {
      if (data.val() !== null) {
        let val = data.val();
        token = val.pushNotificationToken;
      }
    });
  return token;
};

export const sendPushNotification = async (message) => {
  const messages = {
    to: message.to,
    sound: message.sound,
    title: message.title,
    body: message.body,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });
};

export const sendEmail = async (email, countryname) => {
  await axios
    .post(
      `https://us-central1-touronapp-248e4.cloudfunctions.net/sendMail?dest=${email}&countryName=${countryname}`
    )
    .then((d) => console.log("d", d))
    .catch((err) => console.log("err", err));
};

export const isSubmittedFeedback = (uid) => {
  // console.log(`uilnd`, uid);
  let result = [];
  database()
    .ref("customerFeedbacks")
    .on("value", (data) => {
      data.forEach((d) => {
        // console.log(`d.val().uselklkjbbrId`, d.val().userId);
        result.push(d.val().userId);
      });
    });

  return result.includes(uid);
};
