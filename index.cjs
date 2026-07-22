/**
 * festivos-colombia — CommonJS entry point.
 * Re-exports the ESM implementation via dynamic import shim.
 */
const {
  getHolidaysByYear,
  getHolidaysByYearInterval,
  isHoliday
} = require("./src/index.js");
module.exports = {
  getHolidaysByYear,
  getHolidaysByYearInterval,
  isHoliday
};
