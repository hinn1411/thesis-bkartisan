import passport from "passport";
import passportLocal from "passport-local";

import UserModel from "../models/user.model.js";
import { comparePassword } from "../utils/helpers.js";

const LocalStrategy = passportLocal.Strategy;

function passportConfig() {
  passport.serializeUser((user, done) => {
    console.log("Serializing User...");
    console.log(user);
    done(null, user.username);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing User");
    console.log(id);
    try {
      const user = await UserModel.findOne(id);
      if (!user) throw new Error("User not found");
      console.log(user);
      done(null, user);
    } catch (err) {
      console.log(err);
      done(err, null);
    }
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        if (!username || !password) throw new Error("Missing Credentials");
        const userDB = await UserModel.findOne(username);
        if (!userDB) throw new Error("User not found");
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          console.log("Authenticated Successfully!");
          done(null, userDB);
        } else {
          console.log("Invalid Authentication");
          done(null, null);
        }
      } catch (err) {
        done(err, null);
      }
    })
  );
}

export default passportConfig;