import { Router } from "express";
import { Request, Response, NextFunction } from 'express';
import passport from "passport";
import { register, logout, loginSuccess } from "../controllers/user.js";
import 'dotenv/config';

// Extends the definition of the Request object
interface CustomRequest extends Request {
  user?: any;
}

const authRouter = Router();

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged In");
  res.status(200).json({msg: "Login successful!"});
});

authRouter.post("/register", register);

authRouter.post("/logout", logout);

// Call google auth
authRouter.get("/google", passport.authenticate("google", {scope: ['profile', 'email']}));

// Handle res google
// authRouter.get(
// 	"/auth/google/callback", (req: CustomRequest, res: Response, next: NextFunction) => {
//     passport.authenticate("google", (error, profile) => {
//       req.user = profile;
//       console.log(req.session);
//       next();
//     })(req, res, next)
//   }, (req: CustomRequest, res: Response, next: NextFunction) => {
//       req.session.save(err => {
//         if (err) throw err;
//         res.cookie('sessionID', req.sessionID);
//         res.redirect(`http://localhost:5173/login/`);
//       });
//       res.cookie('sessionID', req.cookies);
//       res.redirect(`http://localhost:5173/login/`);
//       console.log("Here");
//       res.redirect(`http://localhost:5173/login/`);
//       next();
//   }
// );

authRouter.get(
	"/auth/google/callback", passport.authenticate('google'), (req: CustomRequest, res: Response, next: NextFunction) => {
      res.redirect(`http://localhost:5173/login/`);
  }
);

authRouter.post("/login/success", loginSuccess);

export default authRouter;
