import { Router } from "express";
import passport from "passport";
import { register, logout } from "../controllers/user.js";

const authRouter = Router();

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged In");
  res.status(200).json({msg: "Login successful!"});
});

authRouter.post("/register", register);

authRouter.post("/logout", logout);

export default authRouter;
