/**
 * Modulo que contiene la lógica para obtener los días festivos
 * @module calendar
 * @author Juan Bermudez <juanbermucele@hotmail.com>
 * @since 1.0
 */
const HOLIDAYS = require("./holidays.js").holidays;

/**
 * @function applyTwoDigits
 * Aplica el formato de dos dígitos a un número menor que diez
 * @author Juan Bermudez <juanbermucele@hotmail.com>
 * @since 1.0
 * @param {number} number 
 * @returns {string} texto formateado
 */
function applyTwoDigits(number) {
	return number < 10 ? "0" + number : number;
}

/**
 * @function formatDate
 * Aplica el formato DD/MM/YYYY a una fecha
 * @author Juan Bermudez <juanbermucele@hotmail.com>
 * @since 1.0
 * @param {Date} date objeto con la fecha a formatear
 * @returns {string} texto de la fecha formateada
 */
function formatDate(date) {
	return applyTwoDigits(date.getDate()) + "/" + applyTwoDigits(date.getMonth() + 1) + "/" + date.getFullYear();
}

/**
 * @function getEasterSunday
 * Algoritmo propuesto por Ian Stewart en 2001 para calcular la fecha
 * exacta del domingo de resurrección/pascua
 * @author Juan Bermudez <juanbermucele@hotmail.com>
 * @since 1.0
 * @param {number} year número del año
 * @returns {Date} Retorna el domingo de resurrección/pascua
 */
function getEasterSunday(year) {
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
 * @author Juan Bermudez <juanbermucele@hotmail.com>
 * @since 1.0
 * @param {Date} date fecha de partida
 * @returns {Date} retorna el próximo lunes a la fecha
 */
function getNextMonday(date) {
	//console.log("Fecha recibida: " + date.toDateString());
	while (date.getDay() !== 1) {
		date.setDate(date.getDate() + 1);
		//console.log("New date: " + date);
	}
	return date;
}

/**
 * @function sumDay
 * Suma una cantidad de días a una fecha dada
 * @author Juan Bermudez <juanbermucele@hotmail.com>
 * @since 1.0
 * @param {string} stringDate objeto de la fecha
 * @param {number} dayToSum cantidad de días a sumar
 * @returns {Date} retorna la nueva fecha con los días sumados
 */
function sumDay(stringDate, dayToSum) {
	let date = new Date(stringDate);
	date.setDate(date.getDate() + dayToSum);
	return date;
}

/**
 * @function getHolidaysByYear
 * Calcula y retorna el listado de festivos de un año dado
 * @author Juan Bermudez <juanbermucele@hotmail.com>
 * @since 1.0
 * @param {number} year número del año
 * @returns {Array} Array con todos los festivos del año
 */
function getHolidaysByYear(year) {
	let holidaysArray = [];
	//Obtiene el domingo de pascua para calcular los días litúrgicos
	let easterSunday = getEasterSunday(year);

	HOLIDAYS.forEach(element => {
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
 * @author Juan Bermudez <juanbermucele@hotmail.com>
 * @since 1.0
 * @param {*} initialYear año de inicio del rango
 * @param {*} finalYear año final del rango
 * @returns {Array} Array con todos los festivos del año
 */
function getHolidaysByYearInterval(initialYear, finalYear) {
	let holidaysArray = [];
	//Obtiene el domingo de pascua para calcular los días litúrgicos
	for (let i = initialYear; i <= finalYear; i++) {
		let year = {
			year : i,
			holidays: []
		};
		let easterSunday = getEasterSunday(i);

		HOLIDAYS.forEach(element => {
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

module.exports.getHolidaysByYear = getHolidaysByYear;
module.exports.getHolidaysByYearInterval = getHolidaysByYearInterval;