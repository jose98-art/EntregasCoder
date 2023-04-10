import { Router } from "express";
import ProductsManagerMongoose from "../persistencia/daos/productsManagerMoongos.js";

const manager = new ProductsManagerMongoose();

const router = Router();

router.get('/',(req,res)=>{
  res.render('login')
})

router.get('/registros',(req,res)=>{
  res.render('registros')
})

router.get('/errorRegistro',(req,res)=>{
  res.render('errorRegistro')
})

router.get('/errorLogin',(req,res)=>{
  res.render('errorLogin')
})
// router.get('/products',(req,res)=>{
//   res.render('home')
// })

router.get("/chat", (req, res) => {
  res.render("socket");
});

router.get("/products", async (req, res) => {
    // const {limit} = req.query
    // const prodLimit = products.slice(0,limit)
    // res.render('home',{prodLimit})
  await manager
    .getProducts()
    .then((document) => {
      const context = {
        usersDocuments: document.map((doc) => {
          return {
            title: doc.title,
            description: doc.description,
          };
        }),
      };
      res.render("home", {
        usersDocuments: context.usersDocuments,
      });
    })
    .catch((error) => res.status(500).send(error));
});

router.get("/agregar", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
