import fetch from "node-fetch";
import dotenv from "dotenv";
import CountrySummaryModel from "../models/countrySummaryModel";
import RecordModel from "../models/recordModel";
import parseRecords from "./country-summary/parseRecords";
import calcSummaries from "./country-summary/calcSummaries";
import bulkLoader from "./country-summary/bulkLoader";
import { connect, disconnect } from "../database";

connect();
dotenv.config();

const generateSummaryData = async () => {
  try {
    // fetch COVID records from European CDC
    const URL = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json";
    const response = await fetch(URL);

    if (response.ok) {
      const results = await response.json();
      const records = parseRecords(results.records);
      const summaries = calcSummaries(results.records);
      console.log("summaries", summaries);

      await bulkLoader(RecordModel, records);
      await bulkLoader(CountrySummaryModel, summaries);
    } else {
      throw new Error(`Failed to fetch from ECDC API`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await disconnect();
  }
};

if (Boolean(process.env.LOAD)) {
  generateSummaryData();
}

export default generateSummaryData;
