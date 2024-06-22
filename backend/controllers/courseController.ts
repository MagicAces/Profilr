import prisma from "../prisma/prisma";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CourseType, Prisma } from "@prisma/client";
import { stringify } from "querystring";

// @desc    Get All Courses for a Student
// route    GET /api/courses/
// @access  Private
export const getCourses = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { program_id, level, semester } = req.query;

    if (!program_id || !level || !semester) {
      res.status(401);
      throw new Error("Level/Program/Semester not choosen");
    }

    const courses = await prisma.course.findMany({
      where: {
        AND: [
          { program_id: Number(program_id) },
          {
            level: level?.toString(),
          },
          { semester: Number(semester) },
        ],
      },
      include: {
        program: true,
      },
    });

    res.status(200).json({
      courses,
    });
  } catch (err) {
    res.status(404);
    throw new Error("Error Fetching Courses");
  }
});
