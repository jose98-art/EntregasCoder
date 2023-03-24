import { Router } from "express";
import { socketServer } from "../app.js";

const router = Router()

router.get('/',(req,res)=>{
    res.render('socket')
})

export default router 