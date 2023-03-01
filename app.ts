import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import { url } from "inspector";
import path from "path";
import passportMiddleware from "./middleware/passportMiddleware";

const port = process.env.port || 8000;

const app = express();

app.set("view engine", "ejs");
// to see the incoming url
app.use(function (req, res, next) {
  // console.log("RECEIVED REQUEST FROM BROWSER: " + req.url);
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
passportMiddleware(app);
// this passportMiddlewarexx

app.use((req, res, next) => {
  console.log(`req.user details are: `);
  console.log(req.user);

  console.log("req.session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log((req.session as any).passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
