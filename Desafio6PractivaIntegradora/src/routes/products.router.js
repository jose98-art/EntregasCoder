import { Router } from "express";
// import Productos from '../ProductManager.js';
import Productos from "../productsManagerMoongos.js";

const router = Router()
const manager = new Productos()

router.get('/',async(req,res)=>{
    const products = await manager.getProducts()
    if(products.length !== 0 ){
    res.json({products})
   }else{
    res.send('No hay productos')
   }
})

router.get('/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    let prod = await manager.getProductById(idProduct)
    if(prod){
        res.json({prod})
    }else{
        res.send('productos no existe')
    }
})

router.post('/',async(req,res)=>{
    const prod = req.body
    const prodCreate = await manager.createProduct(prod)
    res.json({message: 'producto creado con exito',prodCreate})
})

// router.put('/:idProduct',async(req,res)=>{
//     const {idProduct} = req.params
//     const prodNew = req.body
//     const prodUpdate = await manager.updateProduct(Number(idProduct), prodNew)
//     res.json(prodUpdate)
// })

// router.delete('/:idProduct',async(req,res)=>{
//     const {idProduct} = req.params
//     const prodDelete = await manager.deleteProductById(Number(idProduct))
//     res.json(prodDelete)
// })

export default router