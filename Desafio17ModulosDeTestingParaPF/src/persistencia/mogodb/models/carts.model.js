import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      productList: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
          },
          quantity: {
            Type: Number,
          },
        },
      ],
    })

export const cartsModel = mongoose.model('carts',cartSchema)