import { Router } from "express";
import * as program from "../controllers/programController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router
  .route("/")
  .get(protect, program.getPrograms)
  .post(protect, program.addProgram);

export default router;
