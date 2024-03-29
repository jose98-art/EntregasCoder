import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  URI: process.env.URI,

  gmail_password: process.env.GMAIL_PASSWORD,
  gmail_user: process.env.GMAIL_USER,

  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
  twilio_sid: process.env.TWILIO_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
};
