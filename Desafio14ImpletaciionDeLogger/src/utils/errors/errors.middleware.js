export const errorMiddleware = (error,req,res,next)=>{ //un middleware de error recibe 4 parametros y uno normal solo 3
    res.send({
        status:error.name,
        message:error.message,
        cause: error.cause
    })
}
