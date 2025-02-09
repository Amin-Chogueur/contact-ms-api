import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from "./routes/usersRoutes.js";
import personRoute from "./routes/personRoute.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "https://contact-msa.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/contact", personRoute);

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "contact-ms" });
    console.log("db connected successfully");
    app.listen(4000, () => {
      console.log("server started at port 4000");
    });
  } catch (error) {
    console.log(error);
  }
}
connectToDb();
