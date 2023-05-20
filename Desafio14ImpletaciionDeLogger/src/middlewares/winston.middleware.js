import logger from "../utils/winston.js";
export const createLog = (req,res,next)=>{
    logger.information(`Method: ${req.method} - URL: ${req.url}- date:${Date().toString()}`)
    next()
}