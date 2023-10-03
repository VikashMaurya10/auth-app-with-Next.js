import errorHandler from "@/helpers/errorHandler";
import mongoose from "mongoose";

const connectDB = async () => {
  const URI = process.env.URI;
  const dbName = "wallet_dashboard";
  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    })
    .then(() => {
      console.log(`Connected to MongoDB database ${dbName} 👍`);
    })
    .catch((error) => {
      console.log(`err: ${error.message}\nFailed to connect MongoDB🪲`);
      return errorHandler();
    });
};
export default connectDB;
