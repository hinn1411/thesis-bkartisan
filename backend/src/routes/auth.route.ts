import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { register, logout, loginSuccess } from "../controllers/user.js";
import "dotenv/config";

// Extends the definition of the Request object
interface CustomRequest extends Request {
  user?: any;
}

const authRouter = Router();

/**
 * @openapi
 * /login:
 *  post:
 *     tags:
 *     - Authentication
 *     description: Login into web app.
 *     responses:
 *       200:
 *         description: Login successful
 */
authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged In");
  res.status(200).json({ msg: "Login successful!" });
});

authRouter.post("/register", register);

authRouter.post("/logout", logout);

// Call google auth
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req: CustomRequest, res: Response, next: NextFunction) => {
    res.redirect(`http://localhost:5173/login/`);
  }
);

authRouter.post("/login/success", loginSuccess);

export default authRouter;
