import express from "express";
import session from "express-session";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

//* admin routes

router.get("/admin", ensureAuthenticated, (req, res) => {
  const user = req.user;
  const store = req.sessionStore;

  if ((user as any).role === "admin") {
    (store as any).all((error: Error, sessions: any) => {
      if (error) {
        throw new Error("error from store.all");
      } else {
        let sessionInfo = [];
        let sessionId: string[] = Object.keys(sessions); // an array of Session Ids
        let userId: number[] = []; // an array of User Ids
        Object.values(sessions).forEach((userSession: any) =>
          userId.push(parseInt(userSession.passport.user))
        );
        // combine sessionID and userId into sessionInfo - this would be a list of objects.
        for (let i = 0; i < sessionId.length; i++) {
          sessionInfo.push({
            sessionId: sessionId[i],
            userId: userId[i],
          });
        }
        res.render("admin", {
          user: user,
          sessionInfo: sessionInfo,
        });
      }
    });
  } else {
    res.redirect("/dashboard");
  }
});

router.post("/admin/:sessionid", (req, res) => {
  const sessionId = req.params.sessionid;
  console.log(sessionId);
  console.log("req.body.session" + req.body.session);
  const store = req.sessionStore;

  store.destroy(sessionId, (err) => {
    if (err) {
      console.log(err);
      res.send(`destroy err: ${err.message}`);
    } else {
      res.redirect("/dashboard");
    }
  });
});

export default router;