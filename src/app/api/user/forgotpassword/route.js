import connectDB from "@/config/db";
import errorHandler from "@/helpers/errorHandler";
import mailer from "@/helpers/mailer";
import { msgResponse, successResponse } from "@/helpers/responseHandler";
import userModel from "@/models/userModel";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;
    connectDB();
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return errorHandler("user not found");
    }

    const isSendEmail = await mailer({
      email,
      emailType: "RESET",
      userId: user?._id?.toString(),
    });

    if (!isSendEmail) {
      console.log("forgot password>>>> email not send");
      return errorHandler();
    }

    return msgResponse("please check your mail box");
  } catch (error) {
    console.log("forgot password>>", error);
    return errorHandler();
  }
}
