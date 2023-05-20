export default class Memory {
    constructor(){
        this.products = []
    }

    async save(){
        this.products.push(obj)
        return obj
    }
    async getAll(){
        return this.products
    }
}