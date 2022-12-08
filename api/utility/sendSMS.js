import axios from "axios";
import createError from "./createError.js";

// Register Confirmatin OTP
export const sendRegistrationOTP = async (sms, cell) => {
  try {
    await axios.get(
      `https://bulksmsbd.net/api/smsapi?api_key=(${process.env.SMS_API_KEY})&type=${process.env.SMS_TYPE}&number=(${cell})&senderid=(${process.env.SENDER_ID})&message=(${sms}) `
    );
  } catch (error) {
    createError(error);
  }
};
