import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./database";
import CountrySummaryModel from "./models/countrySummaryModel";
import RecordModel from "./models/recordModel";
import UserModel from "./models/userModel";
import authRouter from "./routers/authRouter";
import profileRouter from "./routers/profileRouter";
import recordRouter from "./routers/recordRouter";
import requireAuth from "./middleware/authMiddleware";

dotenv.config();
connect(); // to database

const PORT = process.env.PORT || 5000;
const server = express();

server.use(cors());
server.use(express.json());

server.use("/auth", authRouter(UserModel));
server.use("/api/profiles", profileRouter(UserModel, requireAuth));
server.use("/api/records", recordRouter(CountrySummaryModel, RecordModel));

if (process.env.NODE_ENV != "test") {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default server;
