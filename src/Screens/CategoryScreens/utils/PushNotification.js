import * as firebase from "firebase";

export const getExpoToken = (userId) => {
  let token = "";
  firebase
    .database()
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
    // data: { data: message.data },
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
