import { Router } from "express";
import * as student from "../controllers/studentController";

import { shield } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", shield, student.getStudents);
router.get("/:id", shield, student.getStudent);
router.post("/", shield, student.createStudent);
router.put("/:id", shield, student.editStudent);

export default router;
