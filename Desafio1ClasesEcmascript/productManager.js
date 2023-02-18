
class ProductManager{
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const producto = {
            id: this.#generarId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log(`El producto con el nombre ${title} tiene campos vacios`)
            
        }else{
            const validarCode = this.products.find(validarCode => validarCode.code === code)
            if(validarCode){
                console.log(`El producto con el code ${code} ya existe`)
            }else{
                console.log(`El producto con el code ${code} se ha agregado con exito`)
                this.products.push(producto)
            }        
        }
    }


    getProductById(id){
        const searchProduct = this.products.find(producto => producto.id === id)
        if(searchProduct){
            return console.log('Este es tu produto ', searchProduct)
        }else{
            console.log(`El producto con el id ${id} no existe`)
        }
    }

    #generarId() {
    let id = 1;
    if (this.products.length !== 0) {
      id = this.products[this.products.length - 1].id + 1;
    }
    return id;
  }
}

const producto1 = new ProductManager()
producto1.addProduct('mochila', 'mochila negra', 234, 'moc.png', 12134, 3)
producto1.addProduct('camisa', 'camisa negra', 234, 'cam.png', 2365, 3)
producto1.addProduct('cam', 'ca negra', 2234, 'cam.spng', 12134, 3)
producto1.addProduct('camisa', 'camisa negra', 'cam.png', 12134, 3)

console.log(producto1.getProducts()) 
producto1.getProductById(1)
// console.log(producto1)

