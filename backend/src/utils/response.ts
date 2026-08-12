import { Response } from "express";

interface SuccessResponseOptions<T> {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
  meta?: unknown;
}

export const successResponse = <T>({
  res,
  statusCode,
  message,
  data,
  meta,
}: SuccessResponseOptions<T>) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
};