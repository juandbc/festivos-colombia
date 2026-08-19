/**
 * Modulo que contiene la lógica para obtener los días festivos
 * @module festivos-colombia
 */

import { type Holiday, holidays } from "./holidays.ts";

/**
 * Representa un día festivo
 */
export interface HolidayResp {
	/**
	 * Fecha del festivo in formato DD/MM/YYYY
	 */
	date: string;
	/** Indica si el festivo es fijo o se mueve a otra fecha */
	static: boolean;
	/** Nombre del festivo */
	name: string;
}

/**
 * Representa los días festivos de un año
 */
export interface YearHolidays {
	/** Año */
	year: number;
	/** Festivos del año */
	holidays: HolidayResp[];
}

/**
 * @function pad2
 * Aplica el formato de dos dígitos a un número menor que diez
 * @author Juan Bermudez
 * @since 1.0
 * @param number - número a aplicar el formato
 * @returns texto formateado
 */
const pad2 = (number: number): string => String(number).padStart(2, "0");

/**
 * @function toColombiaDateFormat
 * Aplica el formato DD/MM/YYYY a una fecha
 * @author Juan Bermudez
 * @since 1.0
 * @param date - objeto con la fecha a formatear
 * @returns texto de la fecha formateada
 */
const toColombiaDateFormat = (date: Date): string =>
	`${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`;

/**
 * @function getEasterSunday
 * Algoritmo propuesto por Ian Stewart en 2001 para calcular la fecha
 * exacta del domingo de resurrección/pascua
 * @author Juan Bermudez
 * @since 1.0
 * @param year - número del año
 * @returns Retorna el domingo de resurrección/pascua
 */
const getEasterSunday = (year: number): Date => {
	const a = year % 19;
	const b = year % 4;
	const c = year % 7;
	const d = (19 * a + 24) % 30;
	const e = (2 * b + 4 * c + 6 * d + 5) % 7;
	const day = 22 + d + e;
	const month = day <= 31 ? 3 : 4;
	const dayOfMonth = day <= 31 ? day : day - 31;
	return new Date(year, month - 1, dayOfMonth);
};

/**
 * @function getNextMonday
 * Calcula el próximo lunes de una fecha dada
 * @author Juan Bermudez
 * @since 1.0
 * @param date - fecha de partida
 * @returns retorna el próximo lunes a la fecha
 */
const getNextMonday = (date: Date): Date => {
	while (date.getDay() !== 1) {
		date.setDate(date.getDate() + 1);
	}
	return date;
};

/**
 * @function sumDay
 * Suma una cantidad de días a una fecha dada
 * @author Juan Bermudez
 * @since 1.0
 * @param stringDate - objeto de la fecha
 * @param dayToSum - cantidad de días a sumar
 * @returns retorna la nueva fecha con los días sumados
 */
const sumDay = (stringDate: string, dayToSum: number): Date => {
	const date = new Date(stringDate);
	date.setDate(date.getDate() + dayToSum);
	return date;
};

/**
 * @function getHolidaysByYear
 * Calcula y retorna el listado de festivos de un año dado
 * @author Juan Bermudez
 * @since 1.0
 * @param year - número del año
 * @returns Array con todos los festivos del año
 */
export const getHolidaysByYear = (year: number): HolidayResp[] => {
	if (typeof year !== "number" || !Number.isFinite(year)) {
		throw new TypeError(`El año debe ser un número finito, recibido: ${year}`);
	}
	//Obtiene el domingo de pascua para calcular los días litúrgicos
	const easterSunday = getEasterSunday(year);

	return holidays.map((holiday) => {
		let baseDate =
			holiday.daysToSum != null
				? sumDay(easterSunday.toDateString(), holiday.daysToSum)
				: new Date(`${holiday.date}/${year}`);

		if (holiday.nextMonday) baseDate = getNextMonday(baseDate);

		return {
			date: toColombiaDateFormat(baseDate),
			name: holiday.name,
			static: isFixed(holiday),
		};
	});
};

/**
 * @function getHolidaysByYearInterval
 * Calcula todos los días festivos de un rango de años
 * @author Juan Bermudez
 * @since 1.0
 * @param initialYear - año de inicio del rango
 * @param finalYear - año final del rango
 * @returns Array con todos los festivos del año
 */
export const getHolidaysByYearInterval = (initialYear: number, finalYear: number): YearHolidays[] => {
	if (typeof initialYear !== "number" || typeof finalYear !== "number") {
		throw new TypeError("Los años deben ser números.");
	}
	if (finalYear < initialYear) {
		throw new RangeError("El año final debe ser mayor o igual al año inicial.");
	}
	const holidaysArray = [];
	for (let year = initialYear; year <= finalYear; year++) {
		holidaysArray.push({ year, holidays: getHolidaysByYear(year) });
	}
	return holidaysArray;
};

/**
 * @function getHolidayByDate
 * Devuelve el festivo que coincide con la fecha, o `null` si no es festivo.
 * @author Juan Bermudez
 * @since 1.2.0
 * @param date - fecha a buscar
 * @returns El objeto del festivo correspondiente
 */
export const getHolidayByDate = (date: Date | string): HolidayResp | null => {
	const d = date instanceof Date ? date : new Date(`${date}T00:00:00`);
	if (Number.isNaN(d.getTime())) return null;
	const target = toColombiaDateFormat(d);
	return getHolidaysByYear(d.getUTCFullYear()).find((h) => h.date === target) ?? null;
};

/**
 * @function isHoliday
 * Calcula si un dia en especifico es festivo
 * @author Santiago Alarcón
 * @since 1.0.1
 * @param date - Fecha que se busca saber si es o no festivo.
 * @returns Booleano que indica si es o no es festivo.
 */
export const isHoliday = (date: Date | string): boolean => {
	const d = date instanceof Date ? date : new Date(`${date}T00:00:00`);
	if (Number.isNaN(d.getTime())) return false;
	const target = toColombiaDateFormat(d);
	return getHolidaysByYear(d.getUTCFullYear()).some((h) => h.date === target);
};

/**
 * Retorna si un festivo es fijo o se mueve
 * @author Juan Bermudez
 * @since 1.4.1
 * @param holiday - objeto a validar
 * @returns true or false
 */
const isFixed = (holiday: Holiday): boolean => !holiday.nextMonday && holiday.daysToSum === undefined;

/**
 * Obtiene el número del mes a partir de su nombre
 * @author Juan Bermudez
 * @since 1.4.1
 * @param monthName - nombre del mes
 * @param locale - código de localización del idioma, por defecto Español
 * @returns número del mes
 */
const getMonthNumber = (monthName: string, locale: string = "es"): number => {
	const formatter = new Intl.DateTimeFormat(locale, { month: "long" });
	return (
		Array.from({ length: 12 }, (_, i) => {
			const date = new Date(2026, i, 1);
			return formatter.format(date);
		}).findIndex((m) => m.toLocaleLowerCase() === monthName.toLocaleLowerCase()) + 1
	);
};

/**
 * @function getHolidaysByMonth
 * Devuelve los festivos de un mes en especifico.
 * @author Juan Bermudez
 * @since 1.4.0
 * @param month - número o nombre del mes
 * @param year - año del mes a calcular. Si no se envía, se asume el año actual
 * @param locale - código de localización del idioma, por defecto Español
 * @returns Vector con los festivos del mes
 */
export const getHolidaysByMonth = (
	month: string | number,
	year?: number | undefined,
	locale?: string,
): HolidayResp[] => {
	const monthHolidays: HolidayResp[] = [];
	if (typeof month === "string") {
		if (Number.isInteger(Number(month))) {
			month = Number(month);
			if (month < 1 || month > 12) return monthHolidays;
		} else month = getMonthNumber(month, locale);
	}
	year = year ? year : new Date().getFullYear();
	const easterSunday = getEasterSunday(year);

	holidays
		.filter(
			(h) =>
				h.date?.startsWith(pad2(month)) ||
				(h.daysToSum && sumDay(easterSunday.toDateString(), h.daysToSum).getMonth() + 1 === month),
		)
		.forEach((h) => {
			let date: Date;
			if (h.daysToSum != null) {
				date = sumDay(easterSunday.toDateString(), h.daysToSum);
			} else {
				date = new Date(`${h.date}/${year}`);
			}
			if (h.nextMonday) date = getNextMonday(date);

			monthHolidays.push({
				date: toColombiaDateFormat(date),
				name: h.name,
				static: isFixed(h),
			});
		});

	return monthHolidays;
};
