/**
 * Datos de los días festivos de Colombia.
 * Basado en la Ley 51 de 1983.
 *
 * Cada festivo puede definirse de dos formas:
 *  - Con una fecha fija:  { date: "MM-DD", name, nextMonday }
 *  - Relativo a Pascua:   { daysToSum: <número>, name, nextMonday }
 */
export declare const holidays: ({
    date: string;
    nextMonday: boolean;
    name: string;
    daysToSum?: undefined;
} | {
    date?: undefined;
    daysToSum: number;
    nextMonday: boolean;
    name: string;
})[];
