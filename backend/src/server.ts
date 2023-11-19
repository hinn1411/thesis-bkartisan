import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import 'dotenv/config';

// Routes
import routers from "./routes/index.js";

// Passport config
import passportConfig from "./config/passport.js";
passportConfig();

const app = express();
const PORT = process.env.APP_PORT;

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

app.use('/', routers);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));