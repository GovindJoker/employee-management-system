import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../errors/AppError.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  // Your custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Unknown error
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};
