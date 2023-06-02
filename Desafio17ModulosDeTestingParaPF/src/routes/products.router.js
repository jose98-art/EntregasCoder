import { Router } from "express";
// import Productos from '../ProductManager.js';
import Productos from '../persistencia/mogodb/daos/productsManagerMoongos.js'
// import {productsModel} from '../persistencia/mogodb/models/productos.model.js';
import { saveController, getAllController } from "../controllers/products.controllers.js";
import { generateUser } from "../utils/mocks.js";


const router = Router();
const manager = new Productos();

router.get('/', getAllController)//esta ruta esta enlazada a controllers


router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  let prod = await manager.getProductById(idProduct);
  if (prod) {
    res.json({ prod });
  } else {
    res.send("productos no existe");
  }
});

router.post('/',saveController)//esta ruta esta enlazada a controllers


router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const prodNew = req.body;
  const newEdit = Object.keys(newValue).toString()
  const value = Object.values(newValue).toString()
  const editProd = await manager.updateProßduct(idProduct, newEdit, value, prodNew);
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
