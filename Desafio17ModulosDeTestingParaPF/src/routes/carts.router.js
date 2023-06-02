import {Router} from "express";
import CartManager from "../persistencia/mogodb/daos/carManager.js";

const router = Router()
const managerCarrito = new CartManager()


router.post('/',async(req,res)=>{
    const createNewCart = await managerCarrito.createCart()
    res.status(200).json({message:'Carrito creado con exito', createNewCart})
})

router.get('/:idCart',async(req,res)=>{
    const {idCart} = req.params
    const prodCart = await managerCarrito.getCartsById(id)
    res.status(200).json({message: `Carrito numero id: ${idCart} identiicado`, prodCart})
})

router.post('/:idC/products/:idP',async(req,res)=>{
    const {idC, idP} = req.paramsç
    const {quantity} = req.body
    const prodCart = await managerCarrito.addProductsCart(idC, idP, parseInt(quantity))
    res.status(200).json(prodCart)
})

router.delete(':idC/products/:idP',async(req,res)=>{
    const {idP} = req.params
    const deleteProd = await managerCarrito.deleteProd(idP)
    res.json({message: 'producto eliminado', deleteProd})
})




export default router