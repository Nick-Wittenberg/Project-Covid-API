import mongoose from "mongoose";

const MONGO_PORT = process.env.MONGO_PORT || 27017;

const mongoUri = `mongodb://localhost:${MONGO_PORT}/covidAPI`;
const mongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connection.on("error", (e) => {
  if (e.message.code === "ETIMEDOUT") {
    console.log(e);
    mongoose.connect(mongoUri, mongooseOpts);
  }
  console.log(e);
});

mongoose.connection.once("open", () => {
  console.log(`MongoDB successfully connected to ${mongoUri}`);
});

export const connect = async () => {
  await mongoose.connect(mongoUri, mongoOpts);
};

export const disconnect = async () => {
  await mongoose.disconnect();
};
