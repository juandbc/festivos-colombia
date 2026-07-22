"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fc = require("../index.cjs");

test("CJS: getHolidaysByYear works", () => {
	const holidays = fc.getHolidaysByYear(2026);
	assert.equal(holidays.length, 19);
	assert.equal(holidays[0].name, "Año Nuevo");
});

test("CJS: isHoliday works", () => {
	assert.equal(fc.isHoliday("2024-12-25"), true);
	assert.equal(fc.isHoliday("2024-03-15"), false);
});

test("CJS: getHolidayByDate works", () => {
	const h = fc.getHolidayByDate("2024-12-25");
	assert.equal(h?.name, "Día de Navidad");
});

test("CJS: all expected exports are present", () => {
	assert.equal(typeof fc.getHolidaysByYear, "function");
	assert.equal(typeof fc.getHolidaysByYearInterval, "function");
	assert.equal(typeof fc.isHoliday, "function");
	assert.equal(typeof fc.getHolidayByDate, "function");
});
