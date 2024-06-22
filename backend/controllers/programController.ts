import prisma from "../prisma/prisma";

import asyncHandler from "express-async-handler"
import { Request, Response } from "express";

// @desc    Get All Programs
// route    GET /api/programs/
// @access  Private
export const getPrograms = asyncHandler(async (req: Request, res: Response) => {
  try {
    const programs = await prisma.program.findMany();

      if (programs.length > 0) {
          res.status(200).json({ programs });
        }
      else {
          res.status(200).json({programs: []})
        }
  } catch (error) {
      res.status(404);
      throw new Error("Error fetching programs")
  }
});