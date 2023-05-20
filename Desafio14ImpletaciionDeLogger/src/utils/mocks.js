import {faker} from "@faker-js/faker";

export function generateUser(){
    const products = []
        for(let i = 0; i < 5 ; i++){
            const product = generateProduct()
            products.push(product)
        }


    const user = {
        id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        gender: faker.person.gender(),
        sex: faker.person.sex(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        carrito: products
    }
    return user
}

export function generateProduct(){
    const product = {
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        stock: faker.string.numeric()
    }

    return product
}