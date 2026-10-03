import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/User";

interface JwtPayload {
  id: string;
}

export interface AuthRequest<
  Params = unknown,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown,
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  user?: IUser;
}

const protect = asyncHandler(
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token provided");
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;
      const user = await User.findById(decoded.id);

      if (!user) {
        res.status(401);
        throw new Error("Not authorized, user no longer exists");
      }

      req.user = user;
      next();
    } catch {
      res.status(401);
      throw new Error("Not authorized, token invalid or expired");
    }
  },
);

export { protect };
