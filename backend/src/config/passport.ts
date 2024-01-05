import passport from "passport";
import passportLocal from "passport-local";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import UserModel, { User } from "../models/user.model.js";
import { comparePassword } from "../utils/helpers.js";

const LocalStrategy = passportLocal.Strategy;

function passportConfig() {
  passport.serializeUser((user, done) => {
    console.log("Serializing User...");
    console.log(user);
    if (user.id)
      done(null, user.id);
    else
      done(null, user.username)
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing User");
    console.log(id);
    try {
      const user = await UserModel.findOne(id);
      if (!user) throw new Error("User not found");
      done(null, user);
    } catch (err) {
      console.log(err);
      done(err, null);
    }
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        console.log("Local");
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

  passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				callbackURL: "/auth/google/callback",
			},
			async function (accessToken, refreshToken, profile, callback) {
				// Add user to db
				if(profile?.id){
					const userDB = await UserModel.findOne(profile.id);
					if(!userDB){
						const newUser: User = {
							username: profile.id,
							password: profile.id,
							name: profile.displayName,
							email: profile.emails[0]?.value,
							loginType: "google",
							status: "N",
						};
						await UserModel.create(newUser);
					}
				}
				callback(null, profile);
			}
		)
	);
}

export default passportConfig;