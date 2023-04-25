import { userModel } from "../models/users.model.js";
import { hashData, compareHashData } from "../../../utils.js";

export default class UsersManager{
    async createUser(user){
        try {
          const {email, password} = user
        const existteUser = await userModel.find({email,password})
        console.log(existteUser)
        if(existteUser.length === 0){
            const hashNewPassword = await hashData(password)
            const newUserAndPassword = {...user, password:hashNewPassword}
            await userModel.create(newUserAndPassword)
            return newUserAndPassword
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
        const usuario = await userModel.findOne({email})
        if(usuario){
            const isPassword = compareHashData(password, usuario.password)
            if(isPassword){
                return usuario
            }
        }
            return null
        
        
    }
}