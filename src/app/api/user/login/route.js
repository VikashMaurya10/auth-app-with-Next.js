import errorHandler from "@/helpers/errorHandler";
import { msgResponse, successResponse } from "@/helpers/responseHandler";
import userModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    console.log("login>>", reqBody);
    const { email, password } = reqBody;

    const user = await userModel.findOne({ email });
    if (!user) {
      return errorHandler("User not found!.. please registered first");
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return errorHandler("Please enter correct password");
    }

    // create a payload or encode data which is send by jwt token
    const tokenData = {
      id: user._id,
      email: user.email,
    };

    // create token
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const response = msgResponse("login Successful");

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      expiresIn: "1d",
    });

    return response;
  } catch (error) {
    return errorHandler();
  }
}
