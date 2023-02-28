import express from "express";
import passport from "passport";
import { forwardAuthenticated } from "../middleware/checkAuth";

// a better way is to declaration merging interfaces.
// declare module "express-session"{
//   interface SessionData {
//     messages: {string[]};
//   }
// }

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", {
    messages: (req.session as any).messages,
  });
});

// ts does not know req.session - which is from express module. ts doesn't know what are available in req.session. So set it to "as any" can  solve the problem

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
    /* FIX ME: 😭 - fixed 😊 failureMsg needed when login fails */
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

//* from passport documentation
router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default router;

/**
 * app.post("/login", (req, res) => {
 * // if (loginType === "INSTA"){
 * // do instagram login logic
 * }
 * else {
 *
 *  //email and password
 *  const email = req.body.email;
 *  const password = req.body.password;
 *
 * //check the database
 *  const isValid = checkIfUserInDB(email, password);
 * }
 *  if (isValid) {
 * // user is valid, log them in !
 * //create a session
 * // or use express session and do req.session.userID = userIDFromDB: req.session.userID= user.id
 * }
 * })
 */
