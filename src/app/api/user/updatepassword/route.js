import connectDB from "@/config/db";
import errorHandler from "@/helpers/errorHandler";
import { msgResponse, successResponse } from "@/helpers/responseHandler";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { incodedToken, password } = reqBody;
    connectDB();

    const user = await userModel.findOne({
      forgotPasswordToken: incodedToken,
      forgotPasswordTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return errorHandler("Invalid Token");
    }

    const newHashPassword = await bcrypt.hash(password, 10);
    user.password = newHashPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpire = undefined;

    await user.save();

    return msgResponse("password updated");
  } catch (error) {
    console.log("update password>>> ", error);
    return errorHandler();
  }
}
