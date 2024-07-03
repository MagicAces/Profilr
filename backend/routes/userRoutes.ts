import { Router } from "express";
import passport from "passport";
import flash from "connect-flash";
import * as user from "../controllers/userController";

import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.use(flash());

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
    failureRedirect: "/api/users/auth/failure",
    failureFlash: true,
  })
);

router.get("/", user.testRoute);
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

router.get("/student", protect, user.getProfiles);
router.get("/student/:id", protect, user.getStudent);
router.post("/fetch", protect, user.fetchProfile);
router.get("/profile", protect, user.getProfile);
router.post("/profile", protect, user.createProfile);
router.post("/student/approve", protect, user.approveProfile);
router.put("/profile/:id", protect, user.editProfile);

export default router;
