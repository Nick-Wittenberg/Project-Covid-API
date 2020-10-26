import mongoose from "mongoose";
const { Schema } = mongoose;

const model = new Schema({
  _id: { type: String, required: true }, // use the `geoId` as `_id`
  geoId: { type: String, required: true },
  name: String,
  emoji: String,
  cases: Number,
  deaths: Number,
  date: String,
  day: Number,
  month: Number,
  year: Number,
  lat: Number,
  lng: Number,
});

export default mongoose.model("CountrySummary", model, "countrySummaries");
