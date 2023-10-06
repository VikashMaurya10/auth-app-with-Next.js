import errorHandler from "@/helpers/errorHandler";
import { msgResponse } from "@/helpers/responseHandler";
import userModel from "@/models/userModel";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    const user = await userModel.findOne({
      verifyToken: token,
      verifyTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return errorHandler("Invalid token");
    }
    
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;

    await user.save();
    return msgResponse("Email has been verified");
  } catch (error) {
    console.log("verify email", error);
    return errorHandler();
  }
}
