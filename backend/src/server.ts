import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { createClient } from "redis";

// Routes
//import authRouter from "./routes/auth.route.js";

import * as userController from "./controllers/user.js"

// Passport config
import passportConfig from "./config/passport.js";
passportConfig();

// Database config
import dbconnect from "./config/dbconnect.js";
dbconnect();

const client = await createClient({
  password: "x9AZUFlRp1RWgiF4tF62ofbGKSN2QN0Y",
  socket: {
    host: "redis-19842.c9.us-east-1-4.ec2.cloud.redislabs.com",
    port: 19842,
  },
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    secret: 'APODAJDSDASMCZXMZADASDASDPASDOASDSAK',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

//app.post('/login', userController.postLogin);
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(200);
});
app.post('/register', userController.postRegister);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));