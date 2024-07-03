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


// @desc    Add A Program
// route    POST /api/programs/
// @access  Private
export const addProgram = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    admin_secret,
  } = req.body;

  if (!admin_secret && admin_secret !== process.env.ADMIN_SECRET) {
    res.status(401);
    throw new Error("You're not an Admin");
  }

  if (
    !name 
  ) {
    res.status(401);
    throw new Error("Incomplete program details");
  }

  try {
    const newProgram = await prisma.program.create({
      data: {
        name
      },
    });

    if (newProgram) {
      res.status(201).json({ message: "Program successfully added" });
    } else {
      throw new Error("Error adding program");
    }
  } catch (error: any) {
    res.status(401);
    throw new Error(error);
  }
});


