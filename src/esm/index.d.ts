/**
 * Modulo que contiene la lógica para obtener los días festivos
 * @module festivos-colombia
 */
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
 * @function getHolidaysByYear
 * Calcula y retorna el listado de festivos de un año dado
 * @author Juan Bermudez
 * @since 1.0
 * @param {number} year número del año
 * @returns {Holiday[]} Array con todos los festivos del año
 */
export declare const getHolidaysByYear: (year: number) => Holiday[];
/**
 * @function getHolidaysByYearInterval
 * Calcula todos los días festivos de un rango de años
 * @author Juan Bermudez
 * @since 1.0
 * @param {number} initialYear año de inicio del rango
 * @param {number} finalYear año final del rango
 * @returns {YearHolidays[]} Array con todos los festivos del año
 */
export declare const getHolidaysByYearInterval: (initialYear: number, finalYear: number) => YearHolidays[];
/**
 * @function getHolidayByDate
 * Devuelve el festivo que coincide con la fecha, o `null` si no es festivo.
 * @author Juan Bermudez
 * @since 1.2.0
 * @param {Date | string} date
 * @returns {{date: string, name: string, static: boolean} | null}
 */
export declare const getHolidayByDate: (date: Date | string) => {
    date: string;
    name: string;
    static: boolean;
} | null;
/**
 * @function isHoliday
 * Calcula si un dia en especifico es festivo
 * @author Santiago Alarcón
 * @since 1.0.1
 * @param {Date | string} date Fecha que se busca saber si es o no festivo.
 * @returns {Boolean} Booleano que indica si es o no es festivo.
 */
export declare const isHoliday: (date: Date | string) => boolean;
