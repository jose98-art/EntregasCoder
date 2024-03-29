import express from 'express'
import { Server } from 'socket.io'
import cartsRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import mensajes from './routes/message.router.js'
import './db/dbConfig.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname+'/public'))

app.use('/api/carts',cartsRouter)
app.use('/api/products',productRouter)
app.use('/api/mensaje',mensajes)


//motores de plantilla
app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views',__dirname+'/views')

//ruta raiz
app.use('/products',viewsRouter)


const httpServer = app.listen(8080,(req,res)=>{
    console.log('Escuchando al puerto 8080')
})

//websocket
export const socketServer = new Server(httpServer)

const mensaje = []

socketServer.on('connection',socket=>{
    console.log('usuario conectado',socket.id)

    socket.on('disconnect',()=>{
        console.log('Usuario desconectado',socket.id)
    })

    socket.on('newUser', user=>{
        console.log('Usuario: ', user)
        socket.broadcast.emit('broadcast',user)
    })

    socket.on('mensaje',info=>{
        mensaje.push(info)
        socketServer.emit('chat',mensaje)
    })


    socket.on("prod",async (productosAdd)=>{
        let prodForm = await managerProd.listToShow();
        prodForm.push(productosAdd)
        socketServer.emit('productoFromForm',prodForm)

        
    });


    socket.on("prodDelete",async (prod) =>{
        const {id} = prod;
        let prodServer = await managerProd.listToShow(id);
        socketServer.emit("prodDeletelist", prodServer)
    })
})

//minuto mongoose 1.6