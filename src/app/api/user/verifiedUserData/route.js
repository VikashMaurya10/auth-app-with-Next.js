import connectDB from "@/config/db";
import errorHandler from "@/helpers/errorHandler";
import { successResponse } from "@/helpers/responseHandler";
import VerifyToken from "@/helpers/verifyToken";
import userModel from "@/models/userModel";

export async function GET(req) {
  try {
    connectDB();
    const user_Id = await VerifyToken(req);

    if (!user_Id) {
      return errorHandler();
    }

    const userData = await userModel
      .findOne({ _id: user_Id })
      .select("-password");
    return successResponse(userData);
  } catch (err) {
    console.log("verifyUser>>>", err);
    return errorHandler();
  }
}
