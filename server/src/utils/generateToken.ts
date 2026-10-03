import jwt, { SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";

function generateToken(userId: Types.ObjectId | string): string {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "3d") as SignOptions["expiresIn"],
  };

  return jwt.sign(
    { id: userId.toString() },
    process.env.JWT_SECRET as string,
    options,
  );
}

export default generateToken;
