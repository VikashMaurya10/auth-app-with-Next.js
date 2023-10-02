import connectDB from "@/config/db";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";

// import handlers
import errorHandler from "@/helpers/errorHandler";
import { msgResponse, successResponse } from "@/helpers/responseHandler";
import { isValidEmail, isValidPassword } from "@/helpers/validationMethods";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log("signup>>>", reqBody);
    connectDB();

    const isEmail = isValidEmail(email);
    const isPassword = isValidPassword(password);

    if (!isEmail || !isPassword) {
      return msgResponse("Please reload the page!...");
    }

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return msgResponse("user already registered!..");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = new userModel({
      email: email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      return errorHandler();
    }

    return msgResponse("user registered...👍");
  } catch (error) {

    console.log("signup>>> catch", error);
    return errorHandler();
  }
}
