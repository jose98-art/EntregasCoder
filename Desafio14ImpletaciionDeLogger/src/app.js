import express from 'express'
import compression from 'express-compression'
import { Server } from 'socket.io'
import cartsRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import { __dirname } from './utils/utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import mensajes from './routes/message.router.js'
import './persistencia/dbConfig.js'
import cookieParser from 'cookie-parser'
import mongoStore from 'connect-mongo'
import session from 'express-session'
import usersRouter from './routes/users.router.js'
import sessionRouter from './routes/sessions.router.js'
import messageRouter from './routes/messaTwilioMailer.router.js'
import { errorMiddleware } from './utils/errors/errors.middleware.js'
import { createLog } from './middlewares/winston.middleware.js'
// import dotenv from 'dotenv'
import config from './config.js'

import passport from 'passport'
import './passport/passportStrategie.js'


const app = express()



// dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());
app.use(createLog)

app.use(compression({ brotli: { enabled: true, zlib: {} } }))
app.use(express.static(__dirname+'/public'))

app.use('/api/carts',cartsRouter)
app.use('/api/products',productRouter)
app.use('/api/mensaje',mensajes)
app.use('/api/sessions',sessionRouter)
app.use('/users',usersRouter)
app.use('/message',messageRouter)


//motores de plantilla
app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views',__dirname+'/views')

//ruta raiz
app.use('/views',viewsRouter)


app.use(errorMiddleware)
//passport
//inicializar passport
app.use(passport.initialize())
//passport guarda la informacion de session
app.use(passport.session())




//mongoSesion
app.use(
    session({
      secret: "sessionKey",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 30000 },//opcional el maxAge
      store: new mongoStore({//para guardar en archivos las sessions
        mongoUrl:"mongodb://JS:coderJS@ac-mcjfqnx-shard-00-00.einlumx.mongodb.net:27017,ac-mcjfqnx-shard-00-01.einlumx.mongodb.net:27017,ac-mcjfqnx-shard-00-02.einlumx.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-nkbpb7-shard-0&authSource=admin&retryWrites=true&w=majority"
      }),
    })
  );

// const PORT = process.env.PORT

const httpServer = app.listen(config.PORT,()=>{
    console.log(`Escuchando al puerto ${config.PORT}`)
    // console.log(process.env.URI)
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

