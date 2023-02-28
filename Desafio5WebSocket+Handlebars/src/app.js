import express from 'express'
import cartsRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import handlebars from 'express-handlebars'
// import { Server } from 'socket.io'
import { __dirname } from './utils.js'

const app = express()

// Archivos estaticos
app.use(express.static(__dirname+'/public'))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Handlebars
app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views',__dirname+'/views')

app.use('/api/carts',cartsRouter)
app.use('/api/products',productRouter)

app.listen(8080,(req,res)=>{
        console.log('Escuchando al puerto 8080')
    })

// const httpServer = app.listen(8080,(req,res)=>{
//     console.log('Escuchando al puerto 8080')
// })

// const socketServer = new Server(httpServer)



