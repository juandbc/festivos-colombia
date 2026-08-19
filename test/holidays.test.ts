import {
	getHolidayByDate,
	getHolidaysByMonth,
	getHolidaysByYear,
	getHolidaysByYearInterval,
	type HolidayResp,
	isHoliday,
} from "../src/index";

function assertHoliday(holidays: HolidayResp[], expectedArr: string[][], isFixed: boolean) {
	const expectedItems = expectedArr.map(([name, date]) => {
		return { name, date, static: isFixed };
	});
	expect(holidays).toEqual(expect.arrayContaining(expectedItems));
}

function assertFixedHoliday(holidays: HolidayResp[], expectedArr: string[][]) {
	assertHoliday(holidays, expectedArr, true);
}

describe("#getHolidaysByYear", () => {
	describe("returns 19 when given year is 2024", () => {
		const holidays = getHolidaysByYear(2024);
		expect(holidays).toHaveLength(19);

		it("returns known fixed dates", () => {
			assertFixedHoliday(holidays, [
				["Año Nuevo", "01/01/2024"],
				["Día del Trabajo", "01/05/2024"],
				["Día de la Independencia", "20/07/2024"],
				["Batalla de Boyacá", "07/08/2024"],
				["Día de Navidad", "25/12/2024"],
			]);
		});

		it("returns Easter-based dates for a year", () => {
			assertHoliday(
				holidays,
				[
					["Jueves Santo", "28/03/2024"],
					["Viernes Santo", "29/03/2024"],
					["Ascensión del Señor", "13/05/2024"],
					["Corpus Christi", "03/06/2024"],
					["Sagrado Corazón de Jesús", "10/06/2024"],
				],
				false,
			);
		});
	});

	it("returns next monday for 'Reyes Magos' holidays", () => {
		const holidays = getHolidaysByYear(2018);
		const reyes = holidays.find((h) => h.name === "Día de los Reyes Magos");
		expect(reyes?.date).toBe("08/01/2018");
	});

	it("throws an exception when year is not finite", () => {
		expect(() => getHolidaysByYear(10 ** 1000)).toThrow(TypeError);
	});

	it("throws an exception when year is not a number", () => {
		expect(() => getHolidaysByYear("2020" as unknown as number)).toThrow(TypeError);
	});
});

describe("#getHolidaysByYearInterval", () => {
	it("returns ordered holidays in an inclusive range", () => {
		const result = getHolidaysByYearInterval(2020, 2022);
		expect(result).toHaveLength(3);
		expect(result.map((r) => r.year)).toEqual([2020, 2021, 2022]);
		expect(result[1].holidays).toHaveLength(19);
	});

	it("throws when given inverted range", () => {
		expect(() => getHolidaysByYearInterval(2025, 2020)).toThrow(/mayor o igual/);
	});

	it("throws when year is not a number", () => {
		expect(() => getHolidaysByYearInterval("1" as unknown as number, 2020)).toThrow(TypeError);
	});
});

describe("#isHoliday", () => {
	it("returns true when given a date object", () => {
		expect(isHoliday(new Date("2024-01-01T00:00:00"))).toBeTruthy();
	});

	it("returns true  when given a string date", () => {
		expect(isHoliday("2024-12-25")).toBeTruthy();
	});

	it("returns false when given a regular weekday", () => {
		expect(isHoliday(new Date("2024-03-15T00:00:00Z"))).toBeFalsy();
	});

	it("returns false when given an invalid string", () => {
		expect(isHoliday("not a date")).toBeFalsy();
	});
});

describe("#getHolidayByDate", () => {
	it("returns matching holiday when given a string date", () => {
		const h = getHolidayByDate("2024-08-07");
		expect(h).toEqual({ name: "Batalla de Boyacá", date: "07/08/2024", static: true });
	});

	it("returns matching holiday when given a Date object", () => {
		const h = getHolidayByDate(new Date("2024-08-07T00:00:00"));
		expect(h).toEqual({ name: "Batalla de Boyacá", date: "07/08/2024", static: true });
	});

	it("returns null when given an invalid date", () => {
		expect(getHolidayByDate("15/23/2024")).toBeNull();
	});

	it("returns null when given a non-holidays", () => {
		expect(getHolidayByDate("15/03/2024")).toBeNull();
	});
});

describe("#getHolidaysByMonth", () => {
	function assertDecemberHolidays(h: HolidayResp[], y: number) {
		expect(h).toHaveLength(2);
		expect(h).toEqual([
			expect.objectContaining({ date: `08/12/${y}`, static: true }),
			expect.objectContaining({ date: `25/12/${y}`, static: true }),
		]);
	}

	it("returns holidays when given month number", () => {
		const h = getHolidaysByMonth(12);
		const y = new Date().getFullYear();
		assertDecemberHolidays(h, y);
	});

	it("returns holidays when given month number as string", () => {
		const h = getHolidaysByMonth("12");
		const y = new Date().getFullYear();
		assertDecemberHolidays(h, y);
	});

	it("returns zero holidays when given an invalid month number", () => {
		const h = getHolidaysByMonth("13");
		expect(h).toHaveLength(0);
	});

	it("returns holidays when given a month name", () => {
		const h = getHolidaysByMonth("diciembre");
		const y = new Date().getFullYear();
		assertDecemberHolidays(h, y);
	});

	it("returns holidays when given a month name and year", () => {
		const y = 2024;
		const h = getHolidaysByMonth("diciembre", y);
		assertDecemberHolidays(h, y);
	});

	it("returns holidays when given a month number and year", () => {
		const y = 2024;
		const m = 1;
		const h = getHolidaysByMonth(m, y);
		expect(h).toHaveLength(2);
		expect(h).toEqual([
			expect.objectContaining({ date: `01/01/${y}`, static: true }),
			expect.objectContaining({ date: `08/01/${y}`, static: false }),
		]);
	});

	it("returns holidays relating to Easter", () => {
		const y = 2027;
		const m = 3;
		const h = getHolidaysByMonth(m, y);
		expect(h).toHaveLength(3);
		expect(h).toEqual([
			expect.objectContaining({ date: `22/03/${y}`, static: false }),
			expect.objectContaining({ date: `25/03/${y}`, static: false }),
			expect.objectContaining({ date: `26/03/${y}`, static: false }),
		]);
	});
});
