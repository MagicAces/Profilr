import { Router } from "express";
import passport from "passport";
import flash from "connect-flash";
import * as user from "../controllers/userController";

import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.use(flash());

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email", "openid"] })
);

router.get(
  "/auth/google/welcome",
  passport.authenticate("google", {
    failureRedirect: "/api/users/auth/failure",
    failureFlash: true,
  }),
  user.authGoogle
);
router.get("/auth/failure", user.authFailure);

router.post("/logout", user.logoutUser);

router.get("/profile", protect, user.getProfile);
router.post("/profile", protect, user.createProfile);
router.put("/profile/:id", protect, user.editProfile);

export default router;
