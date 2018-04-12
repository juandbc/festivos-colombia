# FESTIVOS COLOMBIA

Módulo de JavaScript para obtener los días festivos de Colombia.
[Basado en la ley 51 de 1983](http://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=4954).

## Example

`npm install festivos-colombia`

```javascript
const fc = require('festivos-colombia');

let year = 2018;

let holidays = holidays = fc.getHolidaysByYear(year);
holidays.forEach(element => {
	if (element.static) {
		console.log(element.date + " - " + element.name);
	} else {
		console.log(element.date + " - " + element.name);
	}
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

holidays = fc.getHolidaysByYearInterval(year, 2026);
holidays.forEach(obj => {
	console.log("Año: " + obj.year);
	obj.holidays.forEach(element => {
		if (element.static) {
			console.log(element.date + " - " + element.name);
		} else {
			console.log(element.date + " - " + element.name);
		}
	});
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
// Año: 2019
// 01/01/2019 - Año Nuevo
// 07/01/2019 - Día de los Reyes Magos
// 25/03/2019 - Día de San José
// 18/04/2019 - Jueves Santo
// 19/04/2019 - Viernes Santo
// 01/05/2019 - Día del Trabajo
// 03/06/2019 - Ascensión del Señor
// 24/06/2019 - Corphus Christi
// 01/07/2019 - Sagrado Corazón de Jesús
// 01/07/2019 - San Pedro y San Pablo
// 20/07/2019 - Día de la Independencia
// 07/08/2019 - Batalla de Boyacá
// 19/08/2019 - La Asunción de la Virgen
// 14/10/2019 - Día de la Raza
// 04/11/2019 - Todos los Santos
// 11/11/2019 - Independencia de Cartagena
// 08/12/2019 - Día de la Inmaculada Concepción
// 25/12/2019 - Día de Navidad
// Año: 2020
// 01/01/2020 - Año Nuevo
// 06/01/2020 - Día de los Reyes Magos
// 23/03/2020 - Día de San José
// 09/04/2020 - Jueves Santo
// 10/04/2020 - Viernes Santo
// 01/05/2020 - Día del Trabajo
// 25/05/2020 - Ascensión del Señor
// 15/06/2020 - Corphus Christi
// 22/06/2020 - Sagrado Corazón de Jesús
// 29/06/2020 - San Pedro y San Pablo
// 20/07/2020 - Día de la Independencia
// 07/08/2020 - Batalla de Boyacá
// 17/08/2020 - La Asunción de la Virgen
// 12/10/2020 - Día de la Raza
// 02/11/2020 - Todos los Santos
// 16/11/2020 - Independencia de Cartagena
// 08/12/2020 - Día de la Inmaculada Concepción
// 25/12/2020 - Día de Navidad
// Año: 2021
// 01/01/2021 - Año Nuevo
// 11/01/2021 - Día de los Reyes Magos
// 22/03/2021 - Día de San José
// 01/04/2021 - Jueves Santo
// 02/04/2021 - Viernes Santo
// 01/05/2021 - Día del Trabajo
// 17/05/2021 - Ascensión del Señor
// 07/06/2021 - Corphus Christi
// 14/06/2021 - Sagrado Corazón de Jesús
// 05/07/2021 - San Pedro y San Pablo
// 20/07/2021 - Día de la Independencia
// 07/08/2021 - Batalla de Boyacá
// 16/08/2021 - La Asunción de la Virgen
// 18/10/2021 - Día de la Raza
// 01/11/2021 - Todos los Santos
// 15/11/2021 - Independencia de Cartagena
// 08/12/2021 - Día de la Inmaculada Concepción
// 25/12/2021 - Día de Navidad
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
// Año: 2023
// 01/01/2023 - Año Nuevo
// 09/01/2023 - Día de los Reyes Magos
// 20/03/2023 - Día de San José
// 06/04/2023 - Jueves Santo
// 07/04/2023 - Viernes Santo
// 01/05/2023 - Día del Trabajo
// 22/05/2023 - Ascensión del Señor
// 12/06/2023 - Corphus Christi
// 19/06/2023 - Sagrado Corazón de Jesús
// 03/07/2023 - San Pedro y San Pablo
// 20/07/2023 - Día de la Independencia
// 07/08/2023 - Batalla de Boyacá
// 21/08/2023 - La Asunción de la Virgen
// 16/10/2023 - Día de la Raza
// 06/11/2023 - Todos los Santos
// 13/11/2023 - Independencia de Cartagena
// 08/12/2023 - Día de la Inmaculada Concepción
// 25/12/2023 - Día de Navidad
// Año: 2024
// 01/01/2024 - Año Nuevo
// 08/01/2024 - Día de los Reyes Magos
// 25/03/2024 - Día de San José
// 28/03/2024 - Jueves Santo
// 29/03/2024 - Viernes Santo
// 01/05/2024 - Día del Trabajo
// 13/05/2024 - Ascensión del Señor
// 03/06/2024 - Corphus Christi
// 10/06/2024 - Sagrado Corazón de Jesús
// 01/07/2024 - San Pedro y San Pablo
// 20/07/2024 - Día de la Independencia
// 07/08/2024 - Batalla de Boyacá
// 19/08/2024 - La Asunción de la Virgen
// 14/10/2024 - Día de la Raza
// 04/11/2024 - Todos los Santos
// 11/11/2024 - Independencia de Cartagena
// 08/12/2024 - Día de la Inmaculada Concepción
// 25/12/2024 - Día de Navidad
// Año: 2025
// 01/01/2025 - Año Nuevo
// 06/01/2025 - Día de los Reyes Magos
// 24/03/2025 - Día de San José
// 17/04/2025 - Jueves Santo
// 18/04/2025 - Viernes Santo
// 01/05/2025 - Día del Trabajo
// 02/06/2025 - Ascensión del Señor
// 23/06/2025 - Corphus Christi
// 30/06/2025 - Sagrado Corazón de Jesús
// 30/06/2025 - San Pedro y San Pablo
// 20/07/2025 - Día de la Independencia
// 07/08/2025 - Batalla de Boyacá
// 18/08/2025 - La Asunción de la Virgen
// 13/10/2025 - Día de la Raza
// 03/11/2025 - Todos los Santos
// 17/11/2025 - Independencia de Cartagena
// 08/12/2025 - Día de la Inmaculada Concepción
// 25/12/2025 - Día de Navidad
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