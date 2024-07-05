import { Router } from "express";
import * as course from "../controllers/courseController";
import { shield } from "../middlewares/authMiddleware";

const router = Router();

router
  .route("/")
  .get(shield, course.getCourses)
  .post(shield, course.addCourse)

export default router;
