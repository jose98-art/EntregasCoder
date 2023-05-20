import { Router } from "express";
import UsersManager from "../persistencia/mogodb/daos/UserManager.js";
import passport from "passport";
import { generateUser } from "../utils/mocks.js";
// import { generateToken } from "../utils/utils.js";

const router = Router();
const userManager = new UsersManager();

router.post("/registros", async (req, res) => {
  const newUser = await userManager.createUser(req.body);
  if (newUser) {
    res.redirect("/views");
  }else{
    res.redirect("/views/errorRegistro");
  }

});
router.get("/mockingProducts",(req, res) => {
  const users = []
  for(let i = 0; i < 5; i++){
    const user = generateUser()
    users.push(user)
  }
  res.json({users})
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  const user = await userManager.loginUser(req.body);
  if (user) {
    req.session.email = email;
    req.session.password = password;
    res.redirect("/views/home");
  } else {
    res.redirect("/views/errorLogin");
  }
});

router.get(
  "/registroGithub",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get("/github", passport.authenticate("github"),(req,res)=>{
  req.session.email = req.user.email
  res.redirect('/views/products')
});

router.get("/logout", (req, res) => {
  res.clearCookie('userInfo'); 
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect("/users/login");
    }
  });
  res.redirect("/users/login");
});

export default router;
