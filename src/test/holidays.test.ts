import {
	getHolidayByDate,
	getHolidaysByMonth,
	getHolidaysByYear,
	getHolidaysByYearInterval,
	type HolidayResp,
	isHoliday,
} from "../index.js";

const byName = (arr: HolidayResp[], name: string): HolidayResp | undefined => arr.find((e) => e.name === name);

function assertHoliday(holidays: HolidayResp[], name: string, expectedDate: string, isFixed: boolean) {
	const h = byName(holidays, name);
	expect(h !== undefined).toBeTruthy();
	expect(h?.date).toBe(expectedDate);
	expect(h?.static).toBe(isFixed);
}

function assertFixedHoliday(holidays: HolidayResp[], name: string, expectedDate: string) {
	assertHoliday(holidays, name, expectedDate, true);
}

describe("#getHolidaysByYear", () => {
	describe("should returns 19 when year is 2024", () => {
		const holidays = getHolidaysByYear(2024);
		expect(holidays.length).toBe(19);

		it("should returns known fixed dates", () => {
			assertFixedHoliday(holidays, "Año Nuevo", "01/01/2024");
			assertFixedHoliday(holidays, "Año Nuevo", "01/01/2024");
			assertFixedHoliday(holidays, "Día del Trabajo", "01/05/2024");
			assertFixedHoliday(holidays, "Día de la Independencia", "20/07/2024");
			assertFixedHoliday(holidays, "Batalla de Boyacá", "07/08/2024");
			assertFixedHoliday(holidays, "Día de Navidad", "25/12/2024");
		});
		// Pascua 2024 = 31 de marzo
		it("should returns Easter-based dates for a year", () => {
			assertHoliday(holidays, "Jueves Santo", "28/03/2024", false);
			assertHoliday(holidays, "Viernes Santo", "29/03/2024", false);
			assertHoliday(holidays, "Ascensión del Señor", "13/05/2024", false);
			assertHoliday(holidays, "Corpus Christi", "03/06/2024", false);
			assertHoliday(holidays, "Sagrado Corazón de Jesús", "10/06/2024", false);
		});
	});

	it("should returns next monday for Reyes Magos holidayResp", () => {
		const holidays = getHolidaysByYear(2018);
		const reyes = holidays.find((h) => h.name === "Día de los Reyes Magos");
		expect(reyes?.date).toBe("08/01/2018");
	});

	it("should throws an exception when year is not finite", () => {
		expect(() => getHolidaysByYear(10 ** 1000)).toThrow(TypeError);
	});
});

describe("#getHolidaysByYearInterval", () => {
	it("should returns ordered holidays in an inclusive range", () => {
		const result = getHolidaysByYearInterval(2020, 2022);
		expect(result.length).toBe(3);
		expect(result[0].year).toBe(2020);
		expect(result[2].year).toBe(2022);
		expect(result[1].holidays.length).toBe(19);
	});

	it("should rejects inverted range", () => {
		expect(() => getHolidaysByYearInterval(2025, 2020)).toThrow(/mayor o igual/);
	});
});

describe("#isHoliday", () => {
	it("should returns true for a known holidayResp", () => {
		expect(isHoliday(new Date("2024-01-01T00:00:00"))).toBeTruthy();
		expect(isHoliday("2024-12-25")).toBeTruthy();
	});

	it("should returns false for a regular weekday", () => {
		expect(isHoliday(new Date("2024-03-15T00:00:00Z"))).toBeFalsy();
	});

	it("should returns false for invalid input", () => {
		expect(isHoliday("not a date")).toBeFalsy();
	});
});

describe("#getHolidayByDate", () => {
	it("should returns the matching holidayResp", () => {
		const h = getHolidayByDate("2024-08-07");
		expect(h?.name).toBe("Batalla de Boyacá");
		expect(h?.date).toBe("07/08/2024");
	});

	it("should returns null for a non-holidayResp", () => {
		expect(getHolidayByDate("15/03/2024")).toBeNull();
	});
});

describe("#getHolidaysByMonth", () => {
	it("should returns the holidays current december", () => {
		const h = getHolidaysByMonth(12);
		const y = new Date().getFullYear();
		expect(h.length).toBe(2);
		expect(h[0].date).toBe(`08/12/${y}`);
		expect(h[1].date).toBe(`25/12/${y}`);
		expect(h[1].static).toBeTruthy();
	});

	it("should returns the holidays by month number string", () => {
		const h = getHolidaysByMonth("12");
		const y = new Date().getFullYear();
		expect(h.length).toBe(2);
		expect(h[0].date).toBe(`08/12/${y}`);
		expect(h[1].date).toBe(`25/12/${y}`);
		expect(h[1].static).toBeTruthy();
	});

	it("should returns no holidays when given an invalid month number", () => {
		const h = getHolidaysByMonth("13");
		expect(h.length).toBe(0);
	});

	it("should returns the holidays by month name", () => {
		const h = getHolidaysByMonth("diciembre");
		const y = new Date().getFullYear();
		expect(h.length).toBe(2);
		expect(h[0].date).toBe(`08/12/${y}`);
		expect(h[1].date).toBe(`25/12/${y}`);
		expect(h[1].static).toBeTruthy();
	});

	it("should returns the holidays by month name with year", () => {
		const y = 2024;
		const h = getHolidaysByMonth("diciembre", y);
		expect(h.length).toBe(2);
		expect(h[0].date).toBe(`08/12/${y}`);
		expect(h[1].date).toBe(`25/12/${y}`);
		expect(h[1].static).toBeTruthy();
	});

	it("should returns the holidays by month with year", () => {
		const y = 2024;
		const m = 1;
		const h = getHolidaysByMonth(m, y);
		expect(h.length).toBe(2);
		expect(h[0].date).toBe(`01/01/${y}`);
		expect(h[1].date).toBe(`08/01/${y}`);
		expect(h[0].static).toBeTruthy();
		expect(h[1].static).toBeFalsy();
	});

	it("should returns the holidays relating to Easter", () => {
		const y = 2027;
		const m = 3;
		const h = getHolidaysByMonth(m, y);
		expect(h.length).toBe(3);
		expect(h[0].date).toBe(`22/03/${y}`);
		expect(h[1].date).toBe(`25/03/${y}`);
		expect(h[2].date).toBe(`26/03/${y}`);
		expect(h[0].static).toBeFalsy();
		expect(h[1].static).toBeFalsy();
		expect(h[2].static).toBeFalsy();
		expect(h.length).toBe(3);
	});
});
