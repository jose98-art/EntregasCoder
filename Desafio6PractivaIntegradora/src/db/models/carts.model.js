import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
      },
      description: {
        type:String,
        required: true
      },
      code: {
        type:Number,
        required: true,
        unique:true
      },
      precio: {
        type:Number,
        required: true
      }
})

export const cartsModel = mongoose.model('carts',cartSchema)