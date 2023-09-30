import mongoose from "mongoose";

const connectDB = async () => {
  const URI = process.env.URI;
  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connected to MongoDB database👍`);
    })
    .catch((error) => {
      console.log(`err: ${error.message}\nFailed to connect MongoDB🪲`);
    });
};
export default connectDB;
