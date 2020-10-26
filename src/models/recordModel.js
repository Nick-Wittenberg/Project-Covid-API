import mongoose from "mongoose";
const { Schema } = mongoose;

const model = new Schema({
  _id: { type: String, required: true }, // should be `geoId-yyyymmdd` format
  /** TODO */
});

export default mongoose.model("Record", model, "records");
