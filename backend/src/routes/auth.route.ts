import { Router } from "express";
import passport from "passport";

import User from "../models/User.js";
import { hashPassword } from "../utils/helpers.js";

const authRouter = Router();

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged In");
  res.send(200);
});

authRouter.post("/register", async (request, response) => {
  const { username, email } = request.body;
  const userDB = await User.findOne({ username });
  if (userDB) {
    response.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(request.body.password);
    const newUser = await User.create({ username, password, email });
    response.send(201);
  }
});

export default authRouter;
