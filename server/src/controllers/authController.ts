import { Request, Response } from "express";
import { Types } from "mongoose";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middleware/auth";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

const registerUser = asyncHandler(
  async (
    req: Request<unknown, unknown, RegisterBody>,
    res: Response,
  ): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required");
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409);
      throw new Error("An Account with this email already exists");
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id as Types.ObjectId),
    });
  },
);

const loginUser = asyncHandler(
  async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    // .select("+password") because the schema excludes it by default
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id as Types.ObjectId),
    });
  },
);

const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

export { registerUser, loginUser, getMe };
