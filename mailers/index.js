const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");
const {defineString} = require("firebase-functions/params");

const gmailEmail = defineString("GMAIL_EMAIL");
const gmailPassword = defineString("GMAIL_PASSWORD");

exports.sendEmailOnNewDocument =
    onDocumentCreated("rsvps/{docId}", async (event) => {
      const snap = event.data;
      const data = snap.data();

      const {email} = data;

      if (!email) {
        console.error("Missing required fields in Firestore document:", data);
        return null;
      }

      console.log("email, pass", gmailEmail.value(), gmailPassword.value());

      // Move `transporter` creation to runtime logic
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailEmail.value(), // Access values during runtime
          pass: gmailPassword.value(),
        },
      });

      const mailOptions = {
        to: email,
        from: gmailEmail.value(),
        subject: "Hello World",
        html: "<p>This is a test email.</p>",
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully: ${info.response}`);
      } catch (error) {
        console.error("Error sending email:", error);
      }

      return null;
    });
