const fs = require("fs");
const path = "./Products.json";

class ProductManager {
  constructor () {
    const usuaFile = this.getProducts();
    this.path =  usuaFile
  }

  async getProducts() {
    try {
      if (fs.existsSync(path)) {
        const products = await fs.promises.readFile(path, "utf-8");
        const productsJSON = JSON.parse(products);
        return productsJSON;

      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
    return this.path
  }
  
  async addProduct(products) {
    try {
      const { title, description, price, thumbnail, code, stock } = products;
      const producto = {
        id: this.#generarId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
          const productFile = await this.getProducts()
          productFile.push(producto)
          // this.path.push(producto);
          await fs.promises.writeFile(path, JSON.stringify(productFile))
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    const productFile = await this.getProducts()
    const searchProductId = productFile.find(idProduc => idProduc.id === id)
    if(searchProductId){
        return console.log("Este es tu produto ", searchProductId);
    } else {
      console.log(`El producto con el id ${id} no existe`);
    }
  }
  
  async updateProduct(id, object){
    try {
      const {newtitle, newdescription, newprice, newthumbnail, newcode, newstock } = object
      const editProduct = await this.path.find(prod =>prod.id === id)
      if(editProduct){
        const newObject = {
          ...editProduct,
          id:this.#generarId(),
          title:newtitle,
          description:newdescription,
          price:newprice,
          thumbnail:newthumbnail,
          code:newcode,
          stock: newstock,
        }
        const productFile = await this.getProducts()
        productFile.push(newObject)
        // await fs.promises.appendFile(path, JSON.stringify(productFile))
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  #evaluarProduct(idProduc){
    return this.path.find(prod => prod.id === idProduc)
  }
  #generarId() {
    const count = this.path.length;
    const idIncre = count > 0 ? this.path[count - 1].id + 1 : 1;
    return idIncre;
  }
  
}

//-------
const manager = new ProductManager()

let product1 = {
    title:"IPhone",
    description: "IPhone 12 pro Max, 128G",
    price: 23458,
    thumbnail: "prueba.js",
    code:1234,
    stock:23
}
let product2 = {
    title:"IPad",
    description: "IPad Mini M2, 228G",
    price: 12458,
    thumbnail: "prueba.js",
    code:1234,
    stock:12
}

async function prueba(){
    console.log(await manager.getProducts())
    // manager.addProduct(product1)
    // manager.addProduct(product2)
    // manager.getProductById(1)
    console.log(await manager.updateProduct(1, product1))
    // manager.addProduct(product2)
}

prueba()
