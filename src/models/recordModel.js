import mongoose from "mongoose";
const { Schema } = mongoose;

const model = new Schema({
  _id: { type: String, required: true }, // should be `geoId-yyyymmdd` format
  /** TODO */
  dateRep: String,
  day: Number,
  month: Number,
  year: Number,
  cases: Number,
  deaths: Number,
  countriesAndTerritories: String,
  geoId: { type: String, required: true },
  countryterritoryCode: String,
  popData2019: Number,
  continentExp: String,
});

export default mongoose.model("Record", model, "records");
