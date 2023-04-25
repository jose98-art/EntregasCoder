import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productosSchema = mongoose.Schema({
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
  },
  status: {
    type:Boolean,
    required: true
  },
  stock: {
    type:Number,
    required: true
  },
  category: {
    type:String,
    required: true
  },
  thumbnails: {
    type:String,
    required: true
  },
});
productosSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('products', productosSchema);
