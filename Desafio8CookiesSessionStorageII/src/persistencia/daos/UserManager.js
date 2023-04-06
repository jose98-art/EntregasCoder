import { userModel } from "../models/users.model.js"
export default class UsersManager{
    async createUser(user){
        try {
          const {email, password} = user
        const existteUser = await userModel.find({email,password})
        console.log(existteUser)
        if(existteUser.length === 0){
            const newUser = await userModel.create(user)
            return newUser
        }else{
            return null
        }  
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
        
    }

    async loginUser(user){
        const {email, password}= user
        const usuario = await userModel.find({email, password})
        if(usuario.length !== 0){
            return usuario
        }else{
            return null
        }
        
    }
}