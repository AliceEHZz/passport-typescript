import express from "express";
import passport from "passport";
import {
  ensureAuthenticated,
  forwardAuthenticated,
} from "../middleware/checkAuth";

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
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);



export default router;
