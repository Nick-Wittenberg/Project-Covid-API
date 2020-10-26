import model from "../recordModel";

describe("Record model", () => {
  test("_id property", () => {
    const _id = model.schema.obj._id;
    expect(_id).toEqual({ type: String, required: true });
  });

  test("dateRep property", () => {
    const dateRep = model.schema.obj.dateRep;
    expect(dateRep).toEqual(String);
  });

  test("day property", () => {
    const day = model.schema.obj.day;
    expect(day).toEqual(Number);
  });

  test("month property", () => {
    const month = model.schema.obj.month;
    expect(month).toEqual(Number);
  });

  test("year property", () => {
    const year = model.schema.obj.year;
    expect(year).toEqual(Number);
  });

  test("cases property", () => {
    const cases = model.schema.obj.cases;
    expect(cases).toEqual(Number);
  });

  test("deaths property", () => {
    const deaths = model.schema.obj.deaths;
    expect(deaths).toEqual(Number);
  });

  test("countriesAndTerritories property", () => {
    const countriesAndTerritories = model.schema.obj.countriesAndTerritories;
    expect(countriesAndTerritories).toEqual(String);
  });

  test("geoId property", () => {
    const geoId = model.schema.obj.geoId;
    expect(geoId).toEqual({ type: String, required: true });
  });

  test("countryterritoryCode property", () => {
    const countryterritoryCode = model.schema.obj.countryterritoryCode;
    expect(countryterritoryCode).toEqual(String);
  });

  test("popData2019 property", () => {
    const popData2019 = model.schema.obj.popData2019;
    expect(popData2019).toEqual(Number);
  });

  test("continentExp property", () => {
    const continentExp = model.schema.obj.continentExp;
    expect(continentExp).toEqual(String);
  });
});
