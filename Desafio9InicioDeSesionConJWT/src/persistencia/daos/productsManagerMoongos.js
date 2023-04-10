import {productsModel} from '../models/productos.model.js';

export default class ProductsManagerMongoose{
    async getProducts(limit,page){
        try {
            const products = await productsModel.paginate({},{limit,page,lean:true})
        return products.docs
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
  
    async getProductById(id){
        try {
            const products = await productsModel.find({'_id':id})
            return products

        } catch (error) {
            console.log(error)
        }
    }
    
    async deleteById(id){
        try {
            const deleteProduct = await productsModel.deleteOne({'_id':id})
            return 'Se ha eliminado el producto',deleteProduct
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, newValue, value){
        try {
                if(newValue === "title"){
                    const updateNew = productsModel.updateOne( { '_id' : id }, {$set:{ "title" : value } }); 
                    return updateNew
                }

                if(newValue === "description"){
                    const updateNew = productsModel.updateOne( { '_id' : id }, {$set:{ "description" : value } }); 
                    return updateNew
                }

                if(newValue === "code"){
                    const updateNew = productsModel.updateOne( { '_id' : id }, {$set:{ "code" : value } }); 
                    return updateNew
                }

                if(newValue === "precio"){
                    const updateNew = productsModel.updateOne( { '_id' : id }, {$set:{ "precio" : value } }); 
                    return updateNew
                }

                if(newValue === "status"){
                    const updateNew = productsModel.updateOne( { '_id' : id }, {$set:{ "status" : value } }); 
                    return updateNew
                }

                if(newValue === "category"){
                    const updateNew = productsModel.updateOne( { '_id' : id }, {$set:{ "category" : value } }); 
                    return updateNew
                }

                if(newValue === "stock"){
                    const updateNew = productsModel.updateOne( { '_id' : id }, {$set:{ "stock" : value } }); 
                    return updateNew
                }

                if(newValue === "thumbnail"){
                    const updateNew = productsModel.updateOne( { '_id' : id }, {$set:{ "thumbnail" : value } }); 
                    return updateNew
                }

            return 'prod editado ok ', updateNew
        } catch (error) {
            return error;
        }
    }

    async deleteAll(){
        return await productsModel.deleteMany()
    }
}