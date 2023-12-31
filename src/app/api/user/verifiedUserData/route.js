import connectDB from "@/config/db";
import errorHandler from "@/helpers/errorHandler";
import { successResponse } from "@/helpers/responseHandler";
import VerifyToken from "@/helpers/verifyToken";
import userModel from "@/models/userModel";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    // console.log(reqBody);
    connectDB();
    const user_Id = await VerifyToken(req);

    if (!user_Id) {
      return errorHandler();
    }

    // console.log(user_Id);
    const userData = await userModel
      .findOne({ _id: user_Id })
      .select("email isAdmin  isVerified createdAt updatedAt");

    return successResponse(userData);
  } catch (err) {
    console.log("verifyUser>>>", err);
    return errorHandler();
  }
}
