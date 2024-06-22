import _ from "lodash";
import generateToken from "../utils/generateToken";
import asyncHandler from "express-async-handler";
import prisma from "../prisma/prisma";
import { Request, Response, NextFunction } from "express";
import { StudentInput } from "../types/express";
import { Gender } from "@prisma/client";

// @desc    Auth user using Google
// route    GET /api/users/auth/google
// @access  Public
export const authGoogle = asyncHandler(async (req: Request, res: Response) => {
  // Successful authentication, redirect home.
  if (req.user && req.user.id) {
    // Successful authentication, redirect home.
    generateToken(res, req.user.id.toString());
    res.redirect(`${process.env.CLIENT_URL}/success`);
  } else {
    res.status(400).json({ message: "User not authenticated" });
  }
});

// @desc    Handle OAuth Failures
// route    GET /api/users/auth/failure
// @access  Public
export const authFailure = asyncHandler(async (req: Request, res: Response) => {
  const error = req.query.error as string;
  let message;

  if (error) {
    message = "Error Occurred. Try Again";
  } else {
    message = req.flash("error")[0];
  }
  res.redirect(
    `${process.env.CLIENT_URL}/failure?message=${encodeURIComponent(message)}`
  );
});

// @desc    Log user out
// route    POST /api/users/logout
// @access  Public
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  console.log(req.body);
  if (!req.body || !req.body.id) {
    res.status(401).json({ message: " No Id Provided" });
    return;
  }

  await prisma.user.update({
    where: { id: req.body.id },
    data: { lastLogin: new Date() },
  });

  req.logout((err: Error) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error logging out" });
      return;
    }
    res.status(200).json({ message: "Successfully logged out" });
  });
});

// @desc    Get user profile
// route    GET /api/users/profile or POST /api/users/fetch
// @access  Private
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = { ...req.user };
  res.status(200).json({ user });
});

// @desc    CreateStudent's Profile
// route    POST /api/users/profile
// @access  Private
export const createProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      first_name,
      last_name,
      other_name,
      email,
      level,
      index_number,
      reference_no,
      course_ids,
      program_id,
      image_url,
      gender,
      phone_no,
    } = req.body as StudentInput;

    const user_id = req?.user?.id;

    if (!user_id) {
      res.status(401);
      throw new Error("Unauthorized Access");
    }

    if (
      (!first_name && !first_name?.length) ||
      (!last_name && !last_name?.length) ||
      (!email && !email?.length) ||
      (!level &&
        (level !== "100" ||
          level !== "200" ||
          level !== "300" ||
          level !== "400")) ||
      (!index_number && !index_number.length) ||
      (!reference_no && !reference_no.length) ||
      (!program_id && !program_id?.length) ||
      (!image_url && !image_url.length) ||
      !course_ids
    ) {
      res.status(400);
      throw new Error(
        "Incomplete student details. Please provide all required fields."
      );
    }

    let courses: string[] | number[] = course_ids;
    if (!Array.isArray(course_ids)) {
      if (course_ids) courses = [parseInt(course_ids)];
      else {
        res.status(400);
        throw new Error(
          "Incomplete student details. Please provide all required fields."
        );
      }
    } else {
      courses = courses
        .filter((course_id) => course_id.length > 0)
        .map((course_id) => parseInt(course_id));
    }

    const existingStudent = await prisma.student.findFirst({
      where: {
        OR: [
          { index_number: Number(index_number) },
          { reference_no: Number(reference_no) },
          { email },
        ],
      },
    });

    if (existingStudent) {
      res.status(400);
      throw new Error(
        "Student with the same index number, reference number, or email already exists"
      );
    }

    // Create new student
    const newStudent = await prisma.student.create({
      data: {
        first_name,
        last_name,
        other_name,
        email,
        level: Number(level),
        index_number: Number(index_number),
        reference_no: Number(reference_no),
        program_id: Number(program_id),
        user_id,
        gender: gender === "male" ? Gender.Male : Gender.Female,
        phone_no,
        courses: {
          connect: courses.map((id) => ({ id })),
        },
      },
      include: {
        courses: true,
      },
    });

    res.status(201).json({
      message: "Student profile created successfully",
      student: newStudent,
    });
  }
);

// @desc    Edit Student's Profile
// route    PUT /api/users/profile/:id
// @access  Private
export const editProfile = asyncHandler(async (req: Request, res: Response) => {
  const {
    first_name,
    last_name,
    other_name,
    email,
    level,
    index_number,
    reference_no,
    course_ids,
    program_id,
    image_url,
  } = req.body;
  const { id: student_id } = req.params;
  const user_id = req?.user?.id;

  if (!user_id) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  let courses = course_ids;
  if (!Array.isArray(course_ids)) {
    if (course_ids) courses = [parseInt(course_ids)];
    else {
      res.status(400);
      throw new Error(
        "Incomplete student details. Please provide all required fields."
      );
    }
  } else {
    courses = courses
      .filter((course_id: string) => course_id.length > 0)
      .map((course_id: string) => parseInt(course_id));
  }

  const foundStudent = await prisma.student.findUnique({
    where: {
      id: parseInt(student_id),
    },
  });

  if (!foundStudent) {
    res.status(404);
    throw new Error("Student not found");
  }

  const duplicateStudent = await prisma.student.findFirst({
    where: {
      AND: [
        {
          OR: [
            { index_number: Number(index_number) },
            { reference_no: Number(reference_no) },
            { email },
          ],
        },
        { id: { not: parseInt(student_id) } },
      ],
    },
  });

  if (duplicateStudent) {
    res.status(401);
    throw new Error(
      "Student with the same index number, reference number, or email already exists"
    );
  }

  const updatedStudent = await prisma.student.update({
    where: {
      id: parseInt(student_id),
    },
    data: {
      first_name:
        first_name && first_name.length
          ? first_name.trim()
          : foundStudent.first_name,
      last_name:
        last_name && last_name.length
          ? last_name.trim()
          : foundStudent.last_name,
      other_name: other_name || foundStudent?.other_name,
      email: email && email.length ? email.trim() : foundStudent.email,
      level: level && level.length ? Number(level.trim()) : foundStudent.level,
      index_number:
        index_number && index_number.length
          ? Number(index_number.trim())
          : foundStudent.index_number,
      reference_no:
        reference_no && reference_no.length
          ? Number(reference_no.trim())
          : foundStudent.reference_no,
      program_id:
        program_id && program_id.length
          ? program_id.trim()
          : foundStudent.program_id,
      image_url:
        image_url && image_url.length ? image_url : foundStudent.image_url,
      courses: {
        connect: courses.map((id: number) => {
          id;
        }),
      },
    },
  });

  res.status(201).json({
    message: "Student profile updated successfully",
    student: updatedStudent,
  });
});
