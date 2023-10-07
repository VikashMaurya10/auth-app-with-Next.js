import connectDB from "@/config/db";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";

// import handlers
import errorHandler from "@/helpers/errorHandler";
import mailer from "@/helpers/mailer";
import { msgResponse } from "@/helpers/responseHandler";
import { isValidEmail, isValidPassword } from "@/helpers/validationMethods";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    connectDB();

    const isEmail = isValidEmail(email);
    const isPassword = isValidPassword(password);

    if (!isEmail || !isPassword) {
      return errorHandler("Please reload the page!...");
    }

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return errorHandler("user already registered!..");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new userModel({
      email: email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      return errorHandler();
    }
    // send verification email
    const isSendEmail = await mailer({
      email,
      emailType: "VERIFY",
      userId: savedUser?._id?.toString(),
    });

    if (!isSendEmail) {
      console.log("signup>>>> email not send");
      return errorHandler("some email issue");
    }

    return msgResponse("user registered...👍");
  } catch (error) {
    console.log("signup>>> catch", error);
    return errorHandler();
  }
}
