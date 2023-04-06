import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartListProduct: []
})

export const cartsModel = mongoose.model('carts',cartSchema)