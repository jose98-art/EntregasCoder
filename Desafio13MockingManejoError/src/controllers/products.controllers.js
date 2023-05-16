import {
  saveProductServices,
  getAllProductsServices,
} from "../services/products.sevices.js";

export const saveController = async (req, res) => {
    const prod = req.body;
    const prodCreate = await saveProductServices(prod);
    res.json({ message: "producto creado con exito", prodCreate });
};

export const getAllController = async (req, res) => {
    const {limit = 10, page= 1}= req.query
    const product = await getAllProductsServices(limit, page)
    if(product.length === 0){
      res.json({message: 'lista vacia'})
    }else{
      const product = await getAllProductsServices(limit, page)
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
};
