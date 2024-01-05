// import passport from "passport";
// import UserModel, { User } from "../models/user.model.js";

// function passportGoogleConfig() {
// 	passport.use(
// 		new GoogleStrategy(
// 			{
// 				clientID: process.env.CLIENT_ID,
// 				clientSecret: process.env.CLIENT_SECRET,
// 				callbackURL: "/auth/google/callback",
// 			},
// 			async function (accessToken, refreshToken, profile, callback) {
// 				// Add user to db
// 				if(profile?.id){
// 					const userDB = await UserModel.findOne(profile.id);
// 					if(!userDB){
// 						const newUser: User = {
// 							username: profile.id,
// 							password: profile.id,
// 							name: profile.displayName,
// 							email: profile.emails[0]?.value,
// 							loginType: "google",
// 							status: "N",
// 						};
// 						await UserModel.create(newUser);
// 					}
// 				}
// 				callback(null, profile);
// 			}
// 		)
// 	);
	
// 	passport.serializeUser((user, done) => {
// 		console.log("HHHH");
// 		done(null, user);
// 	});
	
// 	passport.deserializeUser((user, done) => {
// 		console.log("JJJJJ");
// 		done(null, user);
// 	});
// }

// export default passportGoogleConfig;