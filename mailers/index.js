/* eslint-disable max-len */
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");
const {defineString} = require("firebase-functions/params");

const gmailEmail = defineString("GMAIL_EMAIL");
const gmailPassword = defineString("GMAIL_PASSWORD");

/**
 * Sanitizes a string or number by replacing common HTML special characters
 * with their corresponding HTML entities and removing unsafe tags and attributes.
 *
 * @param {string|number} str - The string or number to sanitize.
 * @return {string} The sanitized string with HTML special characters replaced and unsafe tags removed.
 */
function sanitizeHTML(str) {
  // If the input is not a string or number, return it as is
  if (typeof str !== "string" && typeof str !== "number") {
    return str;
  }

  // Convert the input to a string if it's a number
  const inputStr = str.toString();

  // Remove dangerous tags like <script>, <style>, <iframe>
  let sanitized = inputStr.replace(/<\/?(script|style|iframe|link|object|embed)[^>]*>/gi, "");

  // Remove inline event handlers like onclick, onload, etc.
  sanitized = sanitized.replace(/\s(on\w+)=["'][^"']*["']/gi, "");

  // Replace special characters with HTML entities
  sanitized = sanitized
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  return sanitized;
}

/**
 * Sanitizes a string or number by replacing common HTML special characters
 * with their corresponding HTML entities and removing unsafe tags and attributes.
 *
 * @param {string|number} fullName - The string or number to sanitize.
 * @return {string} The sanitized string with HTML special characters replaced and unsafe tags removed.
 */
function getFirstName(fullName) {
  const nameParts = fullName.trim().split(" "); // Split name by spaces
  return nameParts[0]; // Return the first part (first name)
}

exports.sendEmailOnNewDocument =
    onDocumentCreated("rsvps/{docId}", async (event) => {
      const snap = event.data;
      const data = snap.data();

      let {name, attendance, accommodation, transport, food, alcohol} = data;

      const accommodationOptions = ["Nepotrebujem", "1 noc", "2 noci"];
      const transportOptions = ["Vlastná doprava", "Iba zo svadby", "Iba na svadbu", "Na svadbu aj späť"];

      accommodation = accommodationOptions[accommodation] || "Nepotrebujem";
      transport = transportOptions[transport] || "Vlastná doprava";
      food = sanitizeHTML(food || "Žiadna alergia ani preferencie");
      alcohol = sanitizeHTML(alcohol || "Žiadna preferencia");

      const firstName = getFirstName(name);
      console.log(`Sending email to: ${firstName}`);
      console.log(name, attendance, accommodation, transport, food, alcohol);

      const attending = `<p style="font-size: 20px; line-height: 1.5; margin: 0;">
                                Ahoj, <strong>${firstName}</strong>,
                            </p>
                            <p style="font-size: 20px; line-height: 1.5; margin: 10px 0;">
                                Ďakujeme za potvrdenie účasti na našej svadbe! Tešíme sa, že môžeme spoločne zdielať
                                tento
                                výnimočný deň.
                            </p>
                            <table class="preferences"
                                style="border-spacing: 0;border-collapse: collapse;width: 100%;text-align: left;padding: 10px 20px;">
                                <tr>
                                    <td style="padding-left: 3px">
                                        <p style="font-size: 20px; font-weight: bold; margin: 10px 0;">
                                            Preferencie:
                                        </p>
                                        <ul style="margin: 0;padding: 0;list-style-type: none; font-size: 20px;">
                                            <li style="margin-bottom: 5px;"><strong>Ubytovanie: </strong>${accommodation}
                                            </li>
                                            <li style="margin-bottom: 5px;"><strong>Doprava: </strong>${transport}</li>
                                            <li style="margin-bottom: 5px;"><strong>Jedlo: </strong>${food}</li>
                                            <li style="margin-bottom: 5px;"><strong>Pitie: </strong>${alcohol}</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            <p style="font-size: 20px; line-height: 1.5; margin: 20px 0;">
                                Keby sa niečo zmenilo, daj nám prosim vedieť čo najskôr
                                odpoveďou na tento email.
                            </p>`;

      const notAttending = `<p style="font-size: 20px; line-height: 1.5; margin: 0;">
                                Ahoj, <strong>${firstName}</strong>,
                            </p>
                            <p style="font-size: 20px; line-height: 1.5; margin: 10px 0;">
                                Mrzí nás, že sa na našej svatbe neuvidíme. <br> Pozvanie každopádne stále platí, keby sa
                                niečo zmenilo, daj nám prosim vedieť čo najskôr.
                            </p>`;

      const byAttendance = attendance ? attending : notAttending;
      const emailHtml = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Svadobné potvrdenie</title>
    
</head>

<body style="margin: 0;padding: 0;background-color: #f4f4f9;font-family: Arial, sans-serif;color: #000000;">
    <table width="100%" bgcolor="#f4f4f9" style="padding: 20px 0;border-spacing: 0;border-collapse: collapse;width: 100%;">
        <tr>
            <td align="center">
                <table class="container" bgcolor="#ffffff" style="border-spacing: 0;border-collapse: collapse;width: 100%;max-width: 600px;margin: 0 auto;background-color: #ffffff;border-radius: 10px;">
                    <tr>
                        <td align="center" class="header">
                            <img src="https://i.ibb.co/5Yd8g11/path3.png" alt="Logo" style="display: block;max-width: 100%;height: auto;width: 100px;margin: 20px auto;">
                        </td>
                    </tr>

                    <tr>
                        <td class="content" align="center" style="padding: 20px;">
                            ${byAttendance}
                        </td>
                    </tr>

                    <tr>
                        <td class="footer"
                            style="text-align: center;font-size: 15px;color: #888888;padding-top: 20px; padding-bottom: 20px;">
                            Všetko dobré <br> ❤️<br>Alenka & Jakub
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`;

      const {email} = data;

      if (!email) {
        console.error("Missing required fields in Firestore document:", data);
        return null;
      }

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
        subject: "Alenka & Jakub - RSVP",
        html: emailHtml,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully: ${info.response}`);
      } catch (error) {
        console.error("Error sending email:", error);
      }

      return null;
    });
