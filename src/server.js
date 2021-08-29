import express from "express";
import fs from "fs";
import path from "path";
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

// check public key exists
const publicKeyPath = path.join(__dirname, "./certs/jwtRS256.key.pub");
if (!fs.existsSync(publicKeyPath)) {
  throw new Error("Could not find jwtRS256 public key.");
}
const publicKey = fs.readFileSync(publicKeyPath);

// check private key exists
const privateKeyPath = path.join(__dirname, "./certs/jwtRS256.key");
if (!fs.existsSync(privateKeyPath)) {
  throw new Error("Could not find RS256 Private Key");
}
const privateKey = fs.readFileSync(privateKeyPath);

dotenv.config();
connect(); // to database

const PORT = process.env.PORT || 5000;
const server = express();

server.use(cors());
server.use(express.json());

server.use("/auth", authRouter(UserModel, privateKey));
server.use("/api/profiles", profileRouter(UserModel, requireAuth, publicKey));
server.use("/api/records", recordRouter(CountrySummaryModel, RecordModel));

if (process.env.NODE_ENV != "test") {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default server;
