import { Router } from "express";
import passport from "passport";
import { postRegister } from "../controllers/user.js";

const authRouter = Router();

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged In");
  res.status(200).send("Login successful!");
});

authRouter.post("/register", postRegister);

export default authRouter;
