import {Router} from 'express'
// import UsersManager from '../persistencia/daos/UserManager.js'
import passport from 'passport'

const router = Router()
// const usermanager = new UsersManager()

router.get('/',(req,res)=>{
    res.json(req.session)
})

router.get('/logout',async(req,res)=>{
    try {
        req.session.destroy((error)=>{
            if(error){
                res.send('Logout error')
            }else{
                res.status(400).json({status:true})
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/login',(req,res)=>{
    passport.authenticate('login',{
        failureRedirect:'/loginError',
        passReqToCallback:true
    }),async(req,res)=>{
        req.session.userInfo = req.user,
        req.session.email. req.body.email
        res.redirect('/products')
    }
})

router.post('/registro',
    passport.authenticate('registro',{
        failureRedirect:'/registroFailed',
        successRedirect:'/registroSucces',
        passReqToCallback:true
    })
)

router.get('/current',(req,res)=>{
    res.send('sessions')
})

export default router