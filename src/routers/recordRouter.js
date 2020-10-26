import express from "express";

const recordRouter = (CountrySummaryModel, RecordModel) => {
  const router = express.Router();

  /**
   * GET all country summaries
   */
  router.get("/summaries", async (req, res) => {
    /** TODO */
  });

  /**
   * GET a single country summary
   *
   * Return a single object that contains the current date and COVID stats for
   * a country by `geoId`, plus the countries name, emoji flag, flag image URL,
   * latitude (lat), longitude (lng).
   */
  router.get("/summaries/:geoId", async (req, res) => {
    /** TODO */
  });

  /**
   * GET all the records (global)
   */
  router.get("/", async (req, res) => {
    /** TODO */
  });

  /**
   * GET all the records for a single country
   */
  router.get("/:geoId", async (req, res) => {
    /** TODO */
  });

  return router;
};

export default recordRouter;
