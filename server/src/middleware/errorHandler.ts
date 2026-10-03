import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || "Server error",
    stack: process.env.NODE_ENV === "testing" ? undefined : err.stack,
  });
}

function notFound(req: Request, res: Response, next: NextFunction): void {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

export { errorHandler, notFound };
