import supertest from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";

const request = supertest("http://localhost:8080")

const productsTest = {
    title: "Lentes",
    description: "Lentes para proyteger los ojos para los aficionados del Gamer",
    code:12345,
    precio: 1099,
    status: true,
    stock: 3,
    category: "Tecnología",
    thumbnails: "web"
}

describe("Rutas products",function(){
    it("Probar metodo GET /api/products",async function(){
        const response = await request.get("/api/products")
        console.log(response._body)
        expect(response).to.be.have.property('description')
    })

    it("Probar metodo POST /api/products", async function(){
        const response = await request.post("/api/products").send(productsTest)
        console.log(response._body)
        expect(response).to.be.ok
    })
})