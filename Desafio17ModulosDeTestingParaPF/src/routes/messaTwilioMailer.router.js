import { Router } from "express";
import { transporte } from "../nodemailer.js";
import { __dirname } from "../utils/utils.js";
import { client } from "../twilio.js";
import config from "../config.js";
import CustomError from "../utils/errors/CustomError.js";
import {
  ErrorName,
  ErrorCause,
  ErrorMessage,
} from "../utils/errors/error.enum.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    await transporte.sendMail({
      from: "Ecommerce",
      to: "josesantiagov124@gmail.com",
      subject: "Mi primer email",
      html: "<h1>Informacion de la pag web</h1>",
    });
    res.send("Email enviado exitosamente");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { email, message } = req.body;
  if ((!email, !message)) {
    CustomError.createCustomError({
      name: ErrorName.PRODU_DATA_INCOMPLETE,
      cause: ErrorCause.PRODU_DATA_INCOMPLETE,
      messsage: ErrorMessage.PRODU_DATA_INCOMPLETE,
    });
  }else{
    try {
        await transporte.sendMail({
          from: "Ecommerce",
          to: email,
          subject: "Mi primer email",
          html: `<h1>${message}</h1>`,
        });
        res.send("Email enviado exitosamente");
      } catch (error) {
        console.log(error);
      }
  }
  
});

router.get("/twilio", async (req, res) => {
  client.messages.create({
    body: "Probando twilio",
    from: config.twilio_phone_number,
    to: "+525570504930",
  });
  res.send("Provando twilio");
});

export default router;
