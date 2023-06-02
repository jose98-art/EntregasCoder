import './db.js'
import CartManager from '../src/persistencia/mogodb/daos/carManager.js'
import assert from 'assert'
import mongoose from 'mongoose'

describe("Testing de Carts Dao para mongoDB",()=>{
    before(function(){
        this.carttDao = new CartManager()
    })

    beforeEach(function(){
        mongoose.connection.collections.carts.drop()
    })

    it("Retorna el prodcuto por id del carrito", async function(){
        const mockProductID = "6478a68228361464c1585959" //id obtenido del carrito en DB
        const result = await this.carttDao.getCartsById(mockProductID)
        assert.strictEqual(Array.isArray(result),false)
    })

    // it("Debe agregar un producto al carrito", async function(){
    //     const userAndProduct = {
    //         userId : "6433b9004305977601394f05",
    //         productList: "6478a68228361464c1585959"
    //     }
    //     const result = await this.carttDao.createCart(userAndProduct)
    //     assert.ok(result)
    // })

    

})