import mongoose  from "mongoose";

const uri = "mongodb://JS:coderJS@ac-mcjfqnx-shard-00-00.einlumx.mongodb.net:27017,ac-mcjfqnx-shard-00-01.einlumx.mongodb.net:27017,ac-mcjfqnx-shard-00-02.einlumx.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-nkbpb7-shard-0&authSource=admin&retryWrites=true&w=majority"

try {
   await mongoose.connect(uri)
  console.log('conectado a la base de datos con exito -ecommerce-')  
} catch (error) {
  console.log(error)
}