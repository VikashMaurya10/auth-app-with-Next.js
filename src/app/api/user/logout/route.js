import errorHandler from "@/helpers/errorHandler";
import { msgResponse } from "@/helpers/responseHandler";

export async function GET() {
  try {
    const response = msgResponse("logout successfull");
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return errorHandler();
  }
}
