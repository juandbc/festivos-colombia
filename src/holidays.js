/**
 * Datos de los días festivos de Colombia.
 * Basado en la Ley 51 de 1983.
 *
 * Cada festivo puede definirse de dos formas:
 *  - Con una fecha fija:  { date: "MM-DD", name, nextMonday }
 *  - Relativo a Pascua:   { daysToSum: <número>, name, nextMonday }
 */
export const holidays = [
	{ date: "01/01", nextMonday: false, name: "Año Nuevo" },
	{ date: "01/06", nextMonday: true, name: "Día de los Reyes Magos" },
	{ date: "03/19", nextMonday: true, name: "Día de San José" },
	{ daysToSum: -3, nextMonday: false, name: "Jueves Santo" },
	{ daysToSum: -2, nextMonday: false, name: "Viernes Santo" },
	{ date: "05/01", nextMonday: false, name: "Día del Trabajo" },
	{ daysToSum: 40, nextMonday: true, name: "Ascensión del Señor" },
	{ daysToSum: 60, nextMonday: true, name: "Corpus Christi" },
	{ daysToSum: 71, nextMonday: true, name: "Sagrado Corazón de Jesús" },
	{ date: "06/29", nextMonday: true, name: "San Pedro y San Pablo" },
	{
		date: "07/09",
		nextMonday: true,
		name: "Nuestra Señora del Rosario de Chiquinquirá",
	},
	{ date: "07/20", nextMonday: false, name: "Día de la Independencia" },
	{ date: "08/07", nextMonday: false, name: "Batalla de Boyacá" },
	{ date: "08/15", nextMonday: true, name: "La Asunción de la Virgen" },
	{ date: "10/12", nextMonday: true, name: "Día de la Raza" },
	{ date: "11/01", nextMonday: true, name: "Todos los Santos" },
	{ date: "11/11", nextMonday: true, name: "Independencia de Cartagena" },
	{ date: "12/08", nextMonday: false, name: "Día de la Inmaculada Concepción" },
	{ date: "12/25", nextMonday: false, name: "Día de Navidad" },
];

/*
pascua entre marzo 22 y abril 25
ascensión 40 días después de pascua
corpus christi 60 días después de pascua
sagrado corazon 71 días después de pascua
*/
