import { Router } from "express";
// import Productos from '../ProductManager.js';
import Productos from "../persistencia/daos/productsManagerMoongos.js";
import {productsModel} from '../persistencia/models/productos.model.js';

const router = Router();
const manager = new Productos();

router.get("/", async (req, res) => {
  const {limit = 10, page= 1}= req.query
  const product = await manager.getProducts(limit, page)
  if(product.length === 0){
    res.json({message: 'lista vacia'})
  }else{
    const product = await manager.getProducts(limit, page)
    .then((document)=>{
      const context ={
        usersDocuments: document.map(prop =>{
        return {
          title: prop.title,
          description: prop.description
        }
      })
    }
    res.render('products',{usersDocuments:context.usersDocuments}
    )
    })
    
  }
});

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  let prod = await manager.getProductById(idProduct);
  if (prod) {
    res.json({ prod });
  } else {
    res.send("productos no existe");
  }
});

router.post("/", async (req, res) => {
  const prod = req.body;
  const prodCreate = await manager.createProduct(prod);
  res.json({ message: "producto creado con exito", prodCreate });
});

router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const prodNew = req.body;
  const newEdit = Object.keys(newValue).toString()
  const value = Object.values(newValue).toString()
  const editProd = await manager.updateProduct(idProduct, newEdit, value, prodNew);
  res.json({message:editProd});
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await manager.deleteProduct(id);
  res.json({ message: "Producto elminado con exito", deleteProduct });
});

router.delete("/", async (req, res) => {
  const deleteFile = await manager.deleteFile();
  res
    .status(200)
    .json({
      mensaje: "todos los productos se eliminaron exitosamente",
      deleteFile,
    });
});

export default router;
