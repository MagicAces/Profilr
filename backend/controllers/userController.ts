import _ from "lodash";
import generateToken from "../utils/generateToken";
import asyncHandler from "express-async-handler";
import prisma from "../prisma/prisma";
import { Request, Response } from "express";
import { StudentInput } from "../types/express";
import { Gender, UserStatus } from "@prisma/client";
import { utapi } from "../utils/uploadthing";
import { base64ToBuffer } from "../utils/functs";
import sharp from "sharp";

// @desc    Auth user using Google
// route    GET /api/users/auth/google
// @access  Public
export const authGoogle = asyncHandler(async (req: Request, res: Response) => {
  if (req.user && req.user.id) {
    generateToken(res, req.user.id.toString());
    res.redirect(`${process.env.CLIENT_URL}/login?auth-success=true`);
  } else {
    res.redirect(
      `${process.env.CLIENT_URL}/login?error=User not authenticated`
    );
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

  if (!req.body || !req.body.id) {
    res.status(401).json({ message: " No Id Provided" });
    return;
  }

  try {
    await prisma.user.update({
      where: { id: req.body.id },
      data: { lastLogin: new Date() },
    });
  } catch (error) {
    throw new Error("Server Error");
  }

  req.logout((err: Error) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error logging out" });
      return;
    }
    res.status(200).json({ message: "Successfully logged out" });
  });
});

export const testRoute = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ name: "3223" });
});

// @desc    Get user profile
// route    GET /api/users/profile or POST /api/users/fetch
// @access  Private
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user_id = req?.user?.id;

  if (!user_id) {
    res.status(401);
    throw new Error("You are not authenticated");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
    include: {
      student: {
        include: {
          program: true,
          courses: {
            include: {
              program: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json({ user });
});

// @desc    Get user profile
// route    POST /api/users/fetch
// @access  Private
export const fetchProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user_id = req?.user?.id;

    if (!user_id) {
      res.status(401);
      throw new Error("You are not authenticated");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        student: {
          include: {
            program: true,
            courses: {
              include: {
                program: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json({ user });
  }
);

// @desc    Create Student's Profile
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
      image,
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
      (!image && !image.length) ||
      !course_ids
    ) {
      res.status(400);
      throw new Error(
        "Incomplete student details. Please provide all required fields."
      );
    }

    let courses: number[] = course_ids.map((id) => Number(id));
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
    const imageBuffer = base64ToBuffer(image);
    const processedImage = await sharp(imageBuffer)
      .resize(294, 412)
      .jpeg({ quality: 95 })
      .toBuffer();

    const mimeType = "image/jpeg";

    const file = new File(
      [processedImage as BlobPart],
      `${index_number}_${first_name}_${last_name}`,
      {
        type: mimeType,
      }
    );

    const uploadResponse = await utapi.uploadFiles(file);

    const image_url = uploadResponse.data?.url;
    const image_key = uploadResponse.data?.key;

    await prisma.student.create({
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
        image_key: image_key ?? "",
        image_url: image_url ?? "",
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
    image,
  } = req.body as StudentInput;
  const { id: student_id } = req.params;
  const user_id = req?.user?.id;

  if (!user_id) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  let courses: { id: number }[] = course_ids.map((id) => ({
    id: Number(id),
  }));

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

  let upload = true;
  let new_image_url: undefined | string = "";
  let new_image_key: undefined | string = "";
  if (
    image.length > 0 &&
    (image.includes("https://") || image === foundStudent.image_url)
  ) {
    upload = false;
  }

  if (image.length > 0 && upload) {
    const imageBuffer = base64ToBuffer(image);
    const processedImage = await sharp(imageBuffer)
      .resize(294, 412)
      .jpeg({ quality: 95 })
      .toBuffer();

    const mimeType = "image/jpeg";

    const file = new File(
      [processedImage as BlobPart],
      `${index_number}_${first_name}_${last_name}`,
      {
        type: mimeType,
      }
    );

    const uploadResponse = await utapi.uploadFiles(file);
    await utapi.deleteFiles(foundStudent.image_key);

    new_image_url = uploadResponse.data?.url;
    new_image_key = uploadResponse.data?.key;
  }

  const updatedStudent = await prisma.student.update({
    where: {
      id: parseInt(student_id),
    },
    data: {
      first_name:
        first_name && first_name.length > 0
          ? first_name.trim()
          : foundStudent.first_name,
      last_name:
        last_name && last_name.length > 0
          ? last_name.trim()
          : foundStudent.last_name,
      other_name: other_name || foundStudent?.other_name,
      email: email && email.length > 0 ? email.trim() : foundStudent.email,
      level:
        level && level.length > 0 ? Number(level.trim()) : foundStudent.level,
      index_number:
        index_number && index_number.length > 0
          ? Number(index_number.trim())
          : foundStudent.index_number,
      reference_no:
        reference_no && reference_no.length > 0
          ? Number(reference_no.trim())
          : foundStudent.reference_no,
      program_id:
        program_id && program_id.length > 0
          ? Number(program_id.trim())
          : foundStudent.program_id,
      image_url:
        upload && image.length > 0
          ? new_image_url ?? ""
          : foundStudent.image_url,
      image_key:
        upload && image.length > 0
          ? new_image_key ?? ""
          : foundStudent.image_key,
      courses: {
        set: courses,
      },
      status: UserStatus.Pending,
    },
  });

  res.status(201).json({
    message: "Student profile updated successfully",
    student: updatedStudent,
  });
});

// @desc    Get students' profile
// route    GET /api/users/student
// @access  Private
export const getProfiles = asyncHandler(async (req: Request, res: Response) => {
  const { secret } = req.query;

  if (!secret && secret === process.env.ADMIN_SECRET) {
    res.status(401);
    throw new Error("You're not an admin");
  }

  const students = await prisma.student.findMany({
    // where: {
    //   status: UserStatus.Pending,
    // },
    orderBy: {
      updated_at: "desc",
    },
    include: {
      program: true,
      courses: true,
    },
  });

  res.status(200).json({ students });
});

// @desc    Get student details
// route    GET /api/users/student/:id
// @access  Private
export const getStudent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id || !isNaN(Number(id))) {
    res.status(401);
    throw new Error("Id not present");
  }

  const foundStudent = await prisma.student.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json({ student: foundStudent });
});

// @desc    Approve student profile
// route    POST /api/users/student/approve
// @access  Private
export const approveProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { secret, approved, student_id } = req.body;
    
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      res.status(401);
      throw new Error("You're not an admin");
    }
    
    if (!student_id || !approved ) {
      res.status(401);
      throw new Error("Incomplete body details");
    }

    await prisma.student.update({
      where: {
        id: student_id,
      },
      data: {
        status: approved === "true" ? UserStatus.Approved : UserStatus.Rejected,
      },
    });

    res.status(200).json({ message: "Student profile updated successfully" });
  }
);
