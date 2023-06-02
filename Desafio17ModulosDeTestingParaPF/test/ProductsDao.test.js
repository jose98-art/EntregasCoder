import './db.js'
import ProductsManagerMongoose from '../src/persistencia/mogodb/daos/productsManagerMoongos.js'
import assert from 'assert'
import mongoose from 'mongoose'

describe("Testing de Products Dao para mongoDB", () => {
    before(function () {
        this.productDao = new ProductsManagerMongoose();
      });

      beforeEach(function(){
        mongoose.connection.collections.products.drop()
      })

      it("Retorna todos los productos de la base de datos", async function(){
        const result = await this.productDao.getProducts()
        assert.notEqual(Array.isArray (result), false)
      })

      it("Debe agregar un producto a la base de datos", async function(){
        const productsTest = {
            title: "Lentes",
            description: "Lentes para proyteger los ojos para los aficionados del Gamer",
            code:12345,
            precio: 1099,
            status: true,
            stock: 3,
            category: "Tecnología",
            thumbnails: "web"
        }
        const result = await this.productDao.createProduct(productsTest)
        assert.ok(result._id)
      })

      it("Devuelve un producto por id", async function(){
        const _id = '6415e17967a5e8619e492194' //id obtenido de la base de datos
        const result = await this.productDao.getProductById(_id)
        assert.ok(result)
      })
})