import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import swaggerDocs from "./utils/swagger.js";
import "dotenv/config";

import { redisStore } from "./config/redisconnect.js";

// Routes
import routers from "./routes/index.js";

// Passport config
import passportConfig from "./config/passport.js";
passportConfig();

const app = express();
const PORT = process.env.APP_PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: process.env.SESSION_NAME,
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: false,
      secure: false,
      path: "/",
    },
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routers);

app.listen(PORT, () => {
  console.log(`Running Express Server on Port ${PORT}!`);
  swaggerDocs(app);
});
