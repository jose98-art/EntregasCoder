import { Router } from "express";
import UsersManager from "../persistencia/daos/UserManager.js";
const router = Router();
const userManager = new UsersManager();

router.post("/registros", async (req, res) => {
  const newUser = await userManager.createUser(req.body);
  if (newUser) {
    res.redirect("/views");
  } else {
    res.redirect("/views/errorRegistro");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userManager.loginUser(email,password);
  if (user) {
    req.session.email = email;
    req.session.password = password;
    res.redirect("/views/products");
  } else {
    res.redirect("/views/errorLogin");
  }
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
