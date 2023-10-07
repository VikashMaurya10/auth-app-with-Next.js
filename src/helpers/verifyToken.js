import errorHandler from "@/helpers/errorHandler";
import jwt from "jsonwebtoken";

const VerifyToken = (req) => {
  try {
    const inCodedToken = req?.cookies?.get("token")?.value;
    if (
      inCodedToken?.length > 0 &&
      inCodedToken != null &&
      inCodedToken != undefined
    ) {
      const deCodedToken = jwt.verify(inCodedToken, process.env.SECRET_KEY);
      return deCodedToken.id;
    }
  } catch (error) {
    console.log("varifyToken>>>", error);
    return errorHandler();
  }
};

export default VerifyToken;
