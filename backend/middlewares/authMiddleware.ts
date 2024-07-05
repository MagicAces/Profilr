// import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
// import prisma from "../prisma/prisma";
// import { User } from "@prisma/client";

// export const protect = asyncHandler(async (req, res, next) => {
//   let token = req.cookies.jwt;

//   if (token) {
//     try {
//       const secret = process.env.JWT_SECRET as string;
//       const decoded = jwt.verify(token, secret) as { userId: string };

//       const user = await prisma.user.findUnique({
//         where: {
//           id: Number(decoded?.userId),
//         },
//         include: {
//           student: {
//             include: {
//               program: true,
//               courses: {
//                 include: {
//                   program: true,
//                 },
//               },
//             },
//           },
//         },
//       });

//       if (!user) {
//         res.status(401);
//         throw new Error("Invalid User");
//       }

//       req.user = user as User;
//       next();
//     } catch (err) {
//       console.log(err);
//       res.status(401);
//       throw new Error("Not Authorized- Invalid Token");
//     }
//   } else {
//     res.status(401);
//     throw new Error("Not Authorized- No Token");
//   }
// });
export const shield = asyncHandler(async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"] as string;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res.status(400);
    throw new Error("Unauthorized Operation");
  }

  // Extract the token from the authorization header
  const token = authorizationHeader.split(" ")[1];

  // Compare the token with the ADMIN_SECRET
  if (token !== process.env.ADMIN_SECRET) {
    res.status(400);
    throw new Error("Unauthorized Operation");
  }

  next();
});

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.user) next();
  else {
    res.status(401);
    throw new Error("Not Authenticated");
  }
});
