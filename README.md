# FESTIVOS COLOMBIA

Módulo de JavaScript para obtener los días festivos de Colombia.
[Basado en la ley 51 de 1983](http://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=4954).

## Instalación

Requiere **Node.js >= 22**.

```bash
npm install festivos-colombia
```

> [!IMPORTANT]
> La versión publicada del proyecto en NPM está desactualizada (1.0.0) debido a que perdí mi cuenta.
> Cuando recupere la propiedad del paquete, actualizaré las versiones. Mientras tanto, realizar la
> instalación desde GitHub o ![JSR](https://img.shields.io/badge/jsr-black?style=for-the-badge&logo=JSR)


![NPM](https://img.shields.io/badge/npm-red?style=for-the-badge&logo=npm)
```bash
npm install git+https://github.com/juandbc/festivos-colombia
npx jsr add @juandbc/festivos-colombia
```
![pnpm](https://img.shields.io/badge/pnpm-white?style=for-the-badge&logo=pnpm)
```bash
pnpm install git+https://github.com/juandbc/festivos-colombia
pnpx jsr add @juandbc/festivos-colombia
```

![Bun](https://img.shields.io/badge/bun-black?style=for-the-badge&logo=bun)
```bash
bun add github:juandbc/festivos-colombia
bun add git@github.com:juandbc/festivos-colombia.git
bun install git+https://github.com/juandbc/festivos-colombia
bunx jsr add @juandbc/festivos-colombia
```
![Yarn](https://img.shields.io/badge/yarn-white?style=for-the-badge&logo=yarn)
```bash
yarn add juandbc@git@github.com:juandbc/festivos-colombia.git
yarn add jsr:@juandbc/festivos-colombia
```

# Documentación

La documentación es generada con [TypeDoc](https://typedoc.org/) y puede ser consultada en https://juandbc.github.io/festivos-colombia/

## Uso

### CommonJS

```javascript
const { getHolidaysByYear, isHoliday } = require("festivos-colombia");

console.log(isHoliday("2024-08-07")); // true
```

### ESM

```javascript
import { getHolidaysByYear, isHoliday } from "festivos-colombia";
```

```javascript
let year = 2018;

let holidays = getHolidaysByYear(year);
holidays.forEach((element) => {  
  console.log(`${element.date} - ${element.name}`);
});

// OUTPUT
// 01/01/2018 - Año Nuevo
// 08/01/2018 - Día de los Reyes Magos
// 19/03/2018 - Día de San José
// 29/03/2018 - Jueves Santo
// 30/03/2018 - Viernes Santo
// 01/05/2018 - Día del Trabajo
// 14/05/2018 - Ascensión del Señor
// 04/06/2018 - Corphus Christi
// 11/06/2018 - Sagrado Corazón de Jesús
// 02/07/2018 - San Pedro y San Pablo
// 20/07/2018 - Día de la Independencia
// 07/08/2018 - Batalla de Boyacá
// 20/08/2018 - La Asunción de la Virgen
// 15/10/2018 - Día de la Raza
// 05/11/2018 - Todos los Santos
// 12/11/2018 - Independencia de Cartagena
// 08/12/2018 - Día de la Inmaculada Concepción
// 25/12/2018 - Día de Navidad

holidays = getHolidaysByYearInterval(year, 2026);
holidays.forEach((obj) => {
  console.log("Año: " + obj.year);
  obj.holidays.forEach((element) =>
    console.log(`${element.date} - ${element.name}`),
  );
});

// OUTPUT
// Año: 2018
// 01/01/2018 - Año Nuevo
// 08/01/2018 - Día de los Reyes Magos
// 19/03/2018 - Día de San José
// 29/03/2018 - Jueves Santo
// 30/03/2018 - Viernes Santo
// 01/05/2018 - Día del Trabajo
// 14/05/2018 - Ascensión del Señor
// 04/06/2018 - Corphus Christi
// 11/06/2018 - Sagrado Corazón de Jesús
// 02/07/2018 - San Pedro y San Pablo
// 20/07/2018 - Día de la Independencia
// 07/08/2018 - Batalla de Boyacá
// 20/08/2018 - La Asunción de la Virgen
// 15/10/2018 - Día de la Raza
// 05/11/2018 - Todos los Santos
// 12/11/2018 - Independencia de Cartagena
// 08/12/2018 - Día de la Inmaculada Concepción
// 25/12/2018 - Día de Navidad
//...
//...
//...
//...
// Año: 2022
// 01/01/2022 - Año Nuevo
// 10/01/2022 - Día de los Reyes Magos
// 21/03/2022 - Día de San José
// 14/04/2022 - Jueves Santo
// 15/04/2022 - Viernes Santo
// 01/05/2022 - Día del Trabajo
// 30/05/2022 - Ascensión del Señor
// 20/06/2022 - Corphus Christi
// 27/06/2022 - Sagrado Corazón de Jesús
// 04/07/2022 - San Pedro y San Pablo
// 20/07/2022 - Día de la Independencia
// 07/08/2022 - Batalla de Boyacá
// 15/08/2022 - La Asunción de la Virgen
// 17/10/2022 - Día de la Raza
// 07/11/2022 - Todos los Santos
// 14/11/2022 - Independencia de Cartagena
// 08/12/2022 - Día de la Inmaculada Concepción
// 25/12/2022 - Día de Navidad
//...
//...
//...
//...
// Año: 2026
// 01/01/2026 - Año Nuevo
// 12/01/2026 - Día de los Reyes Magos
// 23/03/2026 - Día de San José
// 02/04/2026 - Jueves Santo
// 03/04/2026 - Viernes Santo
// 01/05/2026 - Día del Trabajo
// 18/05/2026 - Ascensión del Señor
// 08/06/2026 - Corphus Christi
// 15/06/2026 - Sagrado Corazón de Jesús
// 29/06/2026 - San Pedro y San Pablo
// 20/07/2026 - Día de la Independencia
// 07/08/2026 - Batalla de Boyacá
// 17/08/2026 - La Asunción de la Virgen
// 12/10/2026 - Día de la Raza
// 02/11/2026 - Todos los Santos
// 16/11/2026 - Independencia de Cartagena
// 08/12/2026 - Día de la Inmaculada Concepción
// 25/12/2026 - Día de Navidad
```
