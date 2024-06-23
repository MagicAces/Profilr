import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from "path";

import { User } from "@prisma/client";
import { errorHandler, notFound } from "./middlewares/errorMiddleware";

import userRouter from "./routes/userRoutes";
import courseRouter from "./routes/courseRoutes";
import programRouter from "./routes/programRoutes";

import { googleStrategy } from "./utils/strategy";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET || "",
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: `${
        process.env.SERVER_URL || ""
      }/api/users/auth/google/welcome`,
    },
    googleStrategy
  )
);

passport.serializeUser((user, cb) => {
  cb(null, {
    id: user.id,
    username: user.username,
  });
});

passport.deserializeUser((user, cb) => {
  cb(null, user as User);
});

app.use(express.static(path.join(__dirname, "backend", "public")));
app.use("/api/users", userRouter);
app.use("/api/programs", programRouter);
app.use("/api/courses", courseRouter);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("Server is up and running");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
