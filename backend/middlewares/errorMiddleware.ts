import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;
  console.log(error.name + "/");
  console.log(error.message);

  if (error.name === "PrismaClientInitializationError") {
    statusCode = 500;
    message = "Server Error"
  }
  
    if (
      error.message === "Not Authorized- No Token" &&
      req.originalUrl === "/api/users/fetch"
    ) {
      statusCode = 401;
      message = "OAuth Login Failure. Try Again";
    }

  if (error.message === "AxiosError: Request failed with status code 400") {
    statusCode = 401;
    message = "Error Occurred. Try Again";
  }

  if (error.name === "InternalOAuthError" || error.name === "TokenError") {
    res.redirect("/api/users/auth/failure?error=1");
  } else {
    res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === "development" ? error.stack : null,
    });
  }
};

export { notFound, errorHandler };
