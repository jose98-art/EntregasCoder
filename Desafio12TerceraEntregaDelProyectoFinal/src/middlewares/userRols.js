export const userRol = (req,res,next)=>{
    const positionRol = req.cookies.userInfo
    if(positionRol){
        if(positionRol.rol !== 'admin' || positionRol.rol === 'user' || positionRol === 'undefined' || positionRol === null){
            res.status(403).redirect('/users/noAuthorized')
        }else{
            next()
        }
    }else{
        res.status(403).redirect('/users/noAuthorized')
    }
}