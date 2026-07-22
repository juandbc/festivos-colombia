/**
 * Modulo que contiene la lógica para obtener los días festivos
 * @module festivos-colombia
 */

import { holidays } from "../holidays.js";

/**
 * @function applyTwoDigits
 * Aplica el formato de dos dígitos a un número menor que diez
 * @author Juan Bermudez
 * @since 1.0
 * @param {number} number número a aplicar el formato
 * @returns {string} texto formateado
 */
const applyTwoDigits = (number) => {
	return number < 10 ? "0" + number : number;
}

/**
 * @function formatDate
 * Aplica el formato DD/MM/YYYY a una fecha
 * @author Juan Bermudez
 * @since 1.0
 * @param {Date} date objeto con la fecha a formatear
 * @returns {string} texto de la fecha formateada
 */
const formatDate = (date) => {
  return applyTwoDigits(date.getDate()) + "/" + applyTwoDigits(date.getMonth() + 1) + "/" + date.getFullYear();
}

/**
 * @function getEasterSunday
 * Algoritmo propuesto por Ian Stewart en 2001 para calcular la fecha
 * exacta del domingo de resurrección/pascua
 * @author Juan Bermudez
 * @since 1.0
 * @param {number} year número del año
 * @returns {Date} Retorna el domingo de resurrección/pascua
 */
const getEasterSunday = (year) => {
	let a, b, c, d, e, day;
	a = year % 19;
	b = year % 4;
	c = year % 7;
	d = (19 * a + 24) % 30;
	e = (2 * b + 4 * c + 6 * d + 5) % 7;
	day = 22 + d + e;

	if (day >= 1 && day <= 31) {
		return new Date(`03/${applyTwoDigits(day)}/${year}`);
	} else {
		return new Date(`04/${applyTwoDigits(day - 31)}/${year}`);
	}
}

/**
 * @function getNextMonday
 * Calcula el próximo lunes de una fecha dada
 * @author Juan Bermudez
 * @since 1.0
 * @param {Date} date fecha de partida
 * @returns {Date} retorna el próximo lunes a la fecha
 */
const getNextMonday = (date) => {
	while (date.getDay() !== 1) {
		date.setDate(date.getDate() + 1);
	}
	return date;
}

/**
 * @function sumDay
 * Suma una cantidad de días a una fecha dada
 * @author Juan Bermudez
 * @since 1.0
 * @param {string} stringDate objeto de la fecha
 * @param {number} dayToSum cantidad de días a sumar
 * @returns {Date} retorna la nueva fecha con los días sumados
 */
const sumDay = (stringDate, dayToSum) => {
	let date = new Date(stringDate);
	date.setDate(date.getDate() + dayToSum);
	return date;
}

/**
 * @function getHolidaysByYear
 * Calcula y retorna el listado de festivos de un año dado
 * @author Juan Bermudez
 * @since 1.0
 * @param {number} year número del año
 * @returns {Array} Array con todos los festivos del año
 */
export const getHolidaysByYear = (year) => {
	let holidaysArray = [];
	//Obtiene el domingo de pascua para calcular los días litúrgicos
	let easterSunday = getEasterSunday(year);

	holidays.forEach(element => {
		let date;
		if (!element.daysToSum) {
			date = new Date(element.date + "/" + year);
		} else {
			date = sumDay(easterSunday.toDateString(), element.daysToSum);
		}

		if (element.nextMonday) {
			date = getNextMonday(date);
		}
		holidaysArray.push({
			date: formatDate(date),
			name: element.name,
			static: element.nextMonday
		});
	});
	return holidaysArray;
}

/**
 * @function getHolidaysByYear
 * Calcula todos los días festivos de un rango de años
 * @author Juan Bermudez
 * @since 1.0
 * @param {number} initialYear año de inicio del rango
 * @param {number} finalYear año final del rango
 * @returns {Array} Array con todos los festivos del año
 */
export const getHolidaysByYearInterval = (initialYear, finalYear) => {
	let holidaysArray = [];
	//Obtiene el domingo de pascua para calcular los días litúrgicos
	for (let i = initialYear; i <= finalYear; i++) {
		let year = {
			year : i,
			holidays: []
		};
		let easterSunday = getEasterSunday(i);

		holidays.forEach(element => {
			let date;
			if (!element.daysToSum) {
				date = new Date(element.date + "/" + i);
			} else {
				date = sumDay(easterSunday.toDateString(), element.daysToSum);
			}

			if (element.nextMonday) {
				date = getNextMonday(date);
			}
			year.holidays.push({
				date: formatDate(date),
				name: element.name,
				static: element.nextMonday
			});
		});
		holidaysArray.push(year);
	}
	return holidaysArray;
}

/**
 * @function isHoliday
 * Calcula si un dia en especifico es festivo
 * @author Santiago Alarcón
 * @since 1.0.1
 * @param {Date} date Fecha que se busca saber si es o no festivo.
 * @returns {Boolean} Booleano que indica si es o no es festivo.
 */
export const isHoliday = (date) => {
  return !!getHolidaysByYear(date.getFullYear()).find((holiday) => {
		return holiday.date == formatDate(date);
	})
}
