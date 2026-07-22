import assert from "node:assert/strict";
import test from "node:test";
import {
	getHolidayByDate,
	getHolidaysByYear,
	getHolidaysByYearInterval,
	isHoliday,
} from "../src/index.js";

test("getHolidaysByYear returns 19 holidays for 2024", () => {
	const holidays = getHolidaysByYear(2024);
	assert.equal(holidays.length, 19);
});

test("known fixed dates for 2024", () => {
	const holidays = getHolidaysByYear(2024);
	const byName = Object.fromEntries(holidays.map((h) => [h.name, h.date]));
	assert.equal(byName["Año Nuevo"], "01/01/2024");
	assert.equal(byName["Día del Trabajo"], "01/05/2024");
	assert.equal(byName["Día de la Independencia"], "20/07/2024");
	assert.equal(byName["Batalla de Boyacá"], "07/08/2024");
	assert.equal(byName["Día de Navidad"], "25/12/2024");
});

test("Easter-based dates for 2024", () => {
	const holidays = getHolidaysByYear(2024);
	const byName = Object.fromEntries(holidays.map((h) => [h.name, h.date]));
	// Pascua 2024 = 31 de marzo
	assert.equal(byName["Jueves Santo"], "28/03/2024");
	assert.equal(byName["Viernes Santo"], "29/03/2024");
	assert.equal(byName["Ascensión del Señor"], "13/05/2024");
	assert.equal(byName["Corpus Christi"], "03/06/2024");
	assert.equal(byName["Sagrado Corazón de Jesús"], "10/06/2024");
});

test("nextMonday rule for Reyes Magos in 2018 (Saturday → Monday)", () => {
	const holidays = getHolidaysByYear(2018);
	const reyes = holidays.find((h) => h.name === "Día de los Reyes Magos");
	assert.equal(reyes?.date, "08/01/2018");
});

test("getHolidaysByYearInterval is inclusive and ordered", () => {
	const result = getHolidaysByYearInterval(2020, 2022);
	assert.equal(result.length, 3);
	assert.equal(result[0].year, 2020);
	assert.equal(result[2].year, 2022);
	assert.equal(result[1].holidays.length, 19);
});

test("getHolidaysByYearInterval rejects inverted range", () => {
	assert.throws(() => getHolidaysByYearInterval(2025, 2020), /mayor o igual/);
});

test("isHoliday returns true for a known holiday", () => {
	assert.equal(isHoliday(new Date("2024-01-01T00:00:00")), true);
	assert.equal(isHoliday("2024-12-25"), true);
});

test("isHoliday returns false for a regular weekday", () => {
	assert.equal(isHoliday(new Date("2024-03-15T00:00:00Z")), false);
});

test("isHoliday returns false for invalid input", () => {
	assert.equal(isHoliday("not a date"), false);
});

test("getHolidayByDate returns the matching holiday", () => {
	const h = getHolidayByDate("2024-08-07");
	assert.equal(h?.name, "Batalla de Boyacá");
	assert.equal(h?.date, "07/08/2024");
});

test("getHolidayByDate returns null for a non-holiday", () => {
	assert.equal(getHolidayByDate("15/03/2024"), null);
});

test("getHolidaysByYear validates input", () => {
	assert.throws(() => getHolidaysByYear("2024"), TypeError);
});
