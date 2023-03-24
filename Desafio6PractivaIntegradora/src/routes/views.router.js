import { Router } from "express";
import { socketServer } from "../app.js";

const router = Router()

router.get('/',(req,res)=>{
    res.render('socket')
})

router.get('/agregar',(req,res)=>{
    res.render('realTimeProducts')
})

export default router 