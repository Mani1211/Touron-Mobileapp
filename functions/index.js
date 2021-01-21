const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

/**
 * Here we're using Gmail to send
 */

let transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, //ssl
  auth: {
    user: "hello@touron.in",
    pass: "EIPuZ5A61I6a",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const dest = req.query.dest;
    const countryName = req.query.countryName;
    const mailOptions = {
      from: "tour on <hello@touron.in>", // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: `Your ${countryName} Query received !!`, // email subject
      html: `
                
                <p margin-bottom='20px';>Congratulations! You are about to embark on a wonderful journey and tour
On will guide you every step of the way.<br/>

We have received your preferences and we will contact you with your
dream tour plan in 24-48 hours. Please check the status of your query
under My Requests tab in the tour On App
</p>
<h4>Bon Voyage!</h4>
                <img src="https://touron.in/assets/frontend/images/logo/logo-black-color-1.png"  width='200px' height='70px'/>
                <p>Cheers ,tour On<br/>
                  Contact:Ph: 6383756188<br/>

</p>
            `, // email content in HTML
    };

    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sended");
    });
  });
});
