const fs = require("fs");
const path = "./Products.json";

class ProductManager {
  constructor () {
    this.path =  path
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJSON = JSON.parse(products);
        return productsJSON;

      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async addProduct(products) {
    try {
      const { title, description, price, thumbnail, code, stock } = products;
      const producto = {
        id: await this.#generarId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
          const productFile = await this.getProducts()
          productFile.push(producto)
          this.path.push(producto);
          await fs.promises.writeFile(this.path, JSON.stringify(productFile))
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
    let copyProduct = await this.getProducts()
    let escanerCopy = copyProduct.find(product => product.id === id)
    const {title, description, price, thumbnail, code, stock } = object
    if(code && copyProduct.some(prod => prod.code === code)){
      return 400
    }else if(code){
      escanerCopy.code = code
    }
    if(title){
      escanerCopy.title = title
    }
    if(description){
      escanerCopy.description = description
    }
    if(price){
      escanerCopy.price = price
    }
    if(thumbnail){
      escanerCopy.thumbnail = thumbnail
    }
    if(stock){
      escanerCopy.stock = stock
    }
    await fs.promises.writeFile(this.path, JSON.stringify(copyProduct))
  }

  async deleteProductById(id){
    const deletetFile = await this.getProducts()
    const deleteProduct = deletetFile.filter(prod => prod.id !== id)
    await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct))
  }
 
  async #generarId() {
    let id = 1 
    const countFile = await this.getProducts()
    if(countFile.length !== 0){
      id = countFile[countFile.length -1].id + 1
    }
    return id
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
    // manager.deleteProductById(3)
    // console.log(await manager.updateProduct(1, product1))
}


 prueba()
