import { Router } from "express";
import * as program from "../controllers/programController";
import { shield } from "../middlewares/authMiddleware";

const router = Router();

router
  .route("/")
  .get(shield, program.getPrograms)
  .post(shield, program.addProgram);

export default router;
