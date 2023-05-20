import mongoose  from "mongoose";
import config from "../config.js";

try {
   await mongoose.connect(config.URI)
  console.log('conectado a la base de datos con exito -ecommerce-')  
} catch (error) {
  console.log(error)
}