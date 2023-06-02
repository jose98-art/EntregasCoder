import ProductManager from './fielsystem/ProductManager.js';
import ProductsManagerMongoose from './mogodb/daos/productsManagerMoongos.js';
import Memory from './memory/memory.js';

let persistencia

let argv = process.argv[2]

switch(argv){
    case 'fs':
        persistencia = new ProductManager('./fielsystem/db.json')
        console.log(argv)
        break
    
    case 'mongo':
        persistencia = new ProductsManagerMongoose('products')
        console.log(argv)
        break

    default:
        persistencia = new Memory()
        break
}

export async function createProduct(obj){
    return await persistencia.save(obj)
}

export async function getProducts(){
    return await persistencia.getProducts()
}

