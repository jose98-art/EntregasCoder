import express from 'express'
import Productos from './productManager.js'

const app = express()
const manager = new Productos('productManager.json')

//Mostramos todos los productos o por un limite por filtro
app.get('/products', async (req,res)=>{
  const {limit} = req.query
  let prod = await manager.getProducts()
  const prodLitmit = prod.slice(0,limit)
  return res.json({Productos:prodLitmit})
})

// Mostramos los productos por ID
app.get('/products/:idProd',async(req,res)=>{
  const {idProd} = req.params
  let prod = await manager.getProducts()
  const producto = prod.find(product => product.id === parseInt(idProd))
  console.log(producto)
  res.json(producto)

})


app.listen(8080,(req,res)=>{
    console.log('Escuchando al puerto 8080')
})