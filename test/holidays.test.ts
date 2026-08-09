import assert from "node:assert";
import { describe, it } from "node:test";
import {
	getHolidayByDate,
	getHolidaysByYear,
	getHolidaysByYearInterval,
	isHoliday,
} from "../src/esm/index.ts";

describe("#getHolidaysByYear", () => {
	it("should returns 19 when year is 2024", () => {
		const holidays = getHolidaysByYear(2024);
		assert.equal(holidays.length, 19);
	});

	it("should returns known fixed dates for a year", () => {
		const holidays = getHolidaysByYear(2024);
		const byName = Object.fromEntries(holidays.map((h) => [h.name, h.date]));
		assert.equal(byName["Año Nuevo"], "01/01/2024");
		assert.equal(byName["Día del Trabajo"], "01/05/2024");
		assert.equal(byName["Día de la Independencia"], "20/07/2024");
		assert.equal(byName["Batalla de Boyacá"], "07/08/2024");
		assert.equal(byName["Día de Navidad"], "25/12/2024");
	});

	it("should returns Easter-based dates for a year", () => {
		const holidays = getHolidaysByYear(2024);
		const byName = Object.fromEntries(holidays.map((h) => [h.name, h.date]));
		// Pascua 2024 = 31 de marzo
		assert.equal(byName["Jueves Santo"], "28/03/2024");
		assert.equal(byName["Viernes Santo"], "29/03/2024");
		assert.equal(byName["Ascensión del Señor"], "13/05/2024");
		assert.equal(byName["Corpus Christi"], "03/06/2024");
		assert.equal(byName["Sagrado Corazón de Jesús"], "10/06/2024");
	});

	it("should returns nextMonday rule for Reyes Magos holiday", () => {
		const holidays = getHolidaysByYear(2018);
		const reyes = holidays.find((h) => h.name === "Día de los Reyes Magos");
		assert.equal(reyes?.date, "08/01/2018");
  });

	it("should throws an exception when given a string", () => {
		assert.throws(() => getHolidaysByYear("2024"), TypeError);
  });

	it("should throws an exception when year is not finite", () => {
		assert.throws(() => getHolidaysByYear(10**1000), TypeError);
	});
});

describe("#getHolidaysByYearInterval", () => {
	it("should returns ordered holidays in an inclusive range", () => {
		const result = getHolidaysByYearInterval(2020, 2022);
		assert.equal(result.length, 3);
		assert.equal(result[0].year, 2020);
		assert.equal(result[2].year, 2022);
		assert.equal(result[1].holidays.length, 19);
	});

	it("should rejects inverted range", () => {
		assert.throws(() => getHolidaysByYearInterval(2025, 2020), /mayor o igual/);
	});
});

describe("#isHoliday", () => {
	it("should returns true for a known holiday", () => {
		assert.equal(isHoliday(new Date("2024-01-01T00:00:00")), true);
		assert.equal(isHoliday("2024-12-25"), true);
	});

	it("should returns false for a regular weekday", () => {
		assert.equal(isHoliday(new Date("2024-03-15T00:00:00Z")), false);
	});

	it("should returns false for invalid input", () => {
		assert.equal(isHoliday("not a date"), false);
	});
});

describe("#getHolidayByDate", () => {
  it("should returns the matching holiday", () => {
		const h = getHolidayByDate("2024-08-07");
		assert.equal(h?.name, "Batalla de Boyacá");
		assert.equal(h?.date, "07/08/2024");
	});

	it("should returns null for a non-holiday", () => {
		assert.equal(getHolidayByDate("15/03/2024"), null);
	});
});
