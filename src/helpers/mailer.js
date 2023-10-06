import userModel from "@/models/userModel";
import errorHandler from "./errorHandler";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

const mailer = async ({ email, emailType, userId }) => {
  try {
    // create hash token
    const hashedToken = await bcryptjs.hash(userId, 10);

    if (emailType === "VERIFY") {
      await userModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await userModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpire: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "reset your password",
      html: `
        <p>Click here 
        <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "updatepassword"
      }?token=${hashedToken}">
        here </br>
        ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "updatepassword"
      }?token=${hashedToken}
        </a>
         ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
         </p>
        `,
    };

    const isSendEmail = transport.sendMail(options);
    if (!isSendEmail) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("mailer>>>", error);
    return errorHandler();
  }
};

export default mailer;
