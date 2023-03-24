import {productsModel} from './db/models/productos.model.js';

export default class ProductsManagerMongoose{
    async getProducts(){
        try {
            const products = await productsModel.find({})
        return products
        } catch (error) {
            console.log(error)
        }
        
    }

    async getProductById(id){
        try {
            const products = await productsModel.findById(id)
            return products

        } catch (error) {
            console.log(error)
        }
    }

    async createProduct(prod){
        try {
            const newProduct = productsModel.create(prod)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }
}