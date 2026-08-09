/**
 * Modulo que contiene la lógica para obtener los días festivos
 * @module festivos-colombia
 */

import { holidays } from "./holidays.ts";

export interface Holiday {
	date: string;
	name: string;
	static: boolean;
}

export interface YearHolidays {
	year: number;
	holidays: Holiday[];
}

/**
 * @function pad2
 * Aplica el formato de dos dígitos a un número menor que diez
 * @author Juan Bermudez
 * @since 1.0
 * @param {number} number número a aplicar el formato
 * @returns {string} texto formateado
 */
const pad2 = (number: number): string => String(number).padStart(2, "0");

/**
 * @function toColombiaDateFormat
 * Aplica el formato DD/MM/YYYY a una fecha
 * @author Juan Bermudez
 * @since 1.0
 * @param {Date} date objeto con la fecha a formatear
 * @returns {string} texto de la fecha formateada
 */
const toColombiaDateFormat = (date: Date): string =>
	`${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`;

/**
 * @function getEasterSunday
 * Algoritmo propuesto por Ian Stewart en 2001 para calcular la fecha
 * exacta del domingo de resurrección/pascua
 * @author Juan Bermudez
 * @since 1.0
 * @param {number} year número del año
 * @returns {Date} Retorna el domingo de resurrección/pascua
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
 * @param {Date} date fecha de partida
 * @returns {Date} retorna el próximo lunes a la fecha
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
 * @param {string} stringDate objeto de la fecha
 * @param {number} dayToSum cantidad de días a sumar
 * @returns {Date} retorna la nueva fecha con los días sumados
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
 * @param {number} year número del año
 * @returns {Holiday[]} Array con todos los festivos del año
 */
export const getHolidaysByYear = (year: number): Holiday[] => {
	if (typeof year !== "number" || !Number.isFinite(year)) {
		throw new TypeError(`El año debe ser un número finito, recibido: ${year}`);
	}
	//Obtiene el domingo de pascua para calcular los días litúrgicos
	const easterSunday = getEasterSunday(year);

	return holidays.map((rule) => {
		let baseDate =
			rule.daysToSum != null
				? sumDay(easterSunday.toDateString(), rule.daysToSum)
				: new Date(`${rule.date}/${year}`);

		if (rule.nextMonday) baseDate = getNextMonday(baseDate);

		return {
			date: toColombiaDateFormat(baseDate),
			name: rule.name,
			static: rule.nextMonday,
		};
	});
};

/**
 * @function getHolidaysByYearInterval
 * Calcula todos los días festivos de un rango de años
 * @author Juan Bermudez
 * @since 1.0
 * @param {number} initialYear año de inicio del rango
 * @param {number} finalYear año final del rango
 * @returns {YearHolidays[]} Array con todos los festivos del año
 */
export const getHolidaysByYearInterval = (
	initialYear: number,
	finalYear: number,
): YearHolidays[] => {
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
 * @param {Date | string} date
 * @returns {{date: string, name: string, static: boolean} | null}
 */
export const getHolidayByDate = (
	date: Date | string,
): { date: string; name: string; static: boolean } | null => {
	const d = date instanceof Date ? date : new Date(`${date}T00:00:00`);
	if (Number.isNaN(d.getTime())) return null;
	const target = toColombiaDateFormat(d);
	return (
		getHolidaysByYear(d.getUTCFullYear()).find((h) => h.date === target) ?? null
	);
};

/**
 * @function isHoliday
 * Calcula si un dia en especifico es festivo
 * @author Santiago Alarcón
 * @since 1.0.1
 * @param {Date | string} date Fecha que se busca saber si es o no festivo.
 * @returns {Boolean} Booleano que indica si es o no es festivo.
 */
export const isHoliday = (date: Date | string): boolean => {
	const d = date instanceof Date ? date : new Date(`${date}T00:00:00`);
	if (Number.isNaN(d.getTime())) return false;
	const target = toColombiaDateFormat(d);
	return getHolidaysByYear(d.getUTCFullYear()).some((h) => h.date === target);
};
