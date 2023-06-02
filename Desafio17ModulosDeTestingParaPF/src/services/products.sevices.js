import { createProduct,getProducts } from "../persistencia/persistence.js";

export async function saveProductServices(product){
    const prod = await createProduct(product)
    return prod
}

export async function getAllProductsServices(){
    const products = await getProducts()
    return products
}