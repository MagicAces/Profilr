import { Router } from "express";
import * as course from "../controllers/courseController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router
  .route("/")
  .get(protect, course.getCourses)

export default router;
