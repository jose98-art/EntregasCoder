import mongoose from "mongoose";
import config from '../src/config.js'

const uri = config.URI

mongoose.connect(uri)
.then(()=>console.log('Conectado a la base de datos'))
.catch(error=>console.log(error))