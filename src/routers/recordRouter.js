import express from "express";

const recordRouter = (CountrySummaryModel, RecordModel) => {
  const router = express.Router();

  /**
   * GET all country summaries
   */
  router.get("/summaries", async (req, res) => {
    try {
      const summaries = await CountrySummaryModel.find({});
      console.log(summaries);
      res.json({ summaries });
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  });

  /**
   * GET a single country summary
   *
   * Return a single object that contains the current date and COVID stats for
   * a country by `geoId`, plus the countries name, emoji flag, flag image URL,
   * latitude (lat), longitude (lng).
   */
  router.get("/summaries/:geoId", async (req, res) => {
    try {
      const summary = await CountrySummaryModel.findOne({
        geoId: req.params.geoId,
      });
      console.log(summary);
      res.json(summary);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });

  /**
   * GET all the records (global)
   */
  router.get("/", async (req, res) => {
    try {
      const records = await RecordModel.find({});
      console.log(records);
      res.json({ records });
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });

  /**
   * GET all the records for a single country
   */
  router.get("/:geoId", async (req, res) => {
    try {
      const record = await RecordModel.find({ geoId: req.params.geoId }).exec();
      console.log(record);
      res.json(record);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });

  return router;
};

export default recordRouter;
