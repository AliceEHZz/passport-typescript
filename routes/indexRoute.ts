import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log(req.session);
  res.render("dashboard", {
    user: req.user,
  });
});

export default router;
