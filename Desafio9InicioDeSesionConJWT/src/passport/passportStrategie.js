import passport from "passport";
import { userModel } from "../persistencia/models/users.model.js"; 
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import {hashPassword} from '../utils.js';


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
      const hashNewPassword = await hashPassword(password);
      const newUserAndPasswordHash = { ...req.body, password: hashNewPassword };
      const userNewDB = await userModel.create(newUserAndPasswordHash);
      done(null, userNewDB);
    }
  )
);

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


