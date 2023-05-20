import passport from "passport";
import { userModel } from "../persistencia/mogodb/models/users.model.js"; 
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import {hashData, compareHashData} from '../utils/utils.js';


passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userModel.findOne({ email });
      if (user) {
        return done(null, false);
      }
      const hashNewPassword = await hashData(password);
      const newUserAndPasswordHash = { ...req.body, password: hashNewPassword };
      const userNewDB = await userModel.create(newUserAndPasswordHash);
      done(null, userNewDB);
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async(req,email,password,done)=>{
      try {
        const userDB = await userModel.findOne({email})
        if(!userDB){
          return done(null, false)
        }else{
          const comparePassword = await compareHashData(passport, userDB.password)
          if(!comparePassword){
            return done(null,false)
          }else{
            done(null,userDB)
          }
        }
      } catch (error) {
        done(error)
      }
    }
  )
)


//github strategi
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: 'Iv1.608547a821d898be',
      clientSecret: 'e1aa7ba1f3032ad434b90c33db4cc180eca433b1',
      callbackURL: "http://localhost:8080/users/github",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await userModel.findOne({ email:profile._json.email });
      if(!user){
        const newUser = {
          first_name:profile._json.name.split(' ')[0],
          last_name:profile._json.name.split(' ')[1]||'',
          email:profile._json.email,
          password:' '
          //, isGithub:true
        }
        const userDB = await userModel.create(newUser)
        done(null,userDB)
      }else{
        done(null, user)
      }
    }
  )
);

const cookieExtractor = (req) =>{
  const token = req.cookies.token
  return token
}

passport.use('jwtCookies', new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey:'secretJWT'
},async(jwt_payload, done)=>{
  done(null,jwt_payload)
}))

passport.serializeUser((user, done) => {
  //paso1
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  //paso1
  const user = await userModel.findById(id);
  done(null, user);
  // User.findById(id, function (err, user) {//se cambio la funcion de callback por promesa ↑
  //   done(err, user);
  // });
});


