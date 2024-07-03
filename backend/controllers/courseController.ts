import prisma from "../prisma/prisma";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CourseType } from "@prisma/client";

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

// @desc    Add A Course
// route    POST /api/courses/
// @access  Private
export const addCourse = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    code,
    level,
    semester,
    program_id,
    credit,
    type,
    admin_secret,
  } = req.body;

  if (!admin_secret && admin_secret !== process.env.ADMIN_SECRET) {
    res.status(401);
    throw new Error("You're not an Admin");
  }

  if (
    !name ||
    !code ||
    !level ||
    !semester ||
    !program_id ||
    !credit ||
    !type
  ) {
    res.status(401);
    throw new Error("Incomplete course details");
  }

  try {
    const newCourse = await prisma.course.create({
      data: {
        name,
        code,
        level,
        semester,
        program_id,
        credit,
        type: type === "compulsory" ? CourseType.Compulsory: CourseType.Elective,
      },
    });

    if (newCourse) {
      res.status(201).json({ message: "Course successfully added" });
    } else {
      throw new Error("Error adding course");
    }
  } catch (error: any) {
    res.status(401);
    throw new Error(error);
  }
});
