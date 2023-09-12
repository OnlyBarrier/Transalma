export function calculateTax(description: string, values: string): string {
  const validOptions = ["Alquiler", "Alquileres y Almacenaje", "Almacenaje"];

  // Dividimos la cadena de description y values en arrays
  const descriptionArray: string[] = description
    .split(",")
    .map((item) => item.trim());
  const valuesArray: string[] = values.split(",").map((item) => item.trim());

  // Inicializamos una variable para llevar la suma de impuestos
  let totalTax = 0;

  // Iteramos sobre la descripción y valores
  descriptionArray.forEach((desc, index) => {
    // Convertimos el desc en minúsculas para hacer coincidencias sin importar la capitalización
    const descLowerCase = desc.toLowerCase();

    // Comprobamos si el desc coincide con alguna opción válida
    if (
      validOptions.some((option) =>
        descLowerCase.includes(option.toLowerCase())
      )
    ) {
      // Si coincide, tomamos el valor correspondiente de valuesArray y calculamos el 7% de impuesto
      const value = parseFloat(valuesArray[index]);
      if (!isNaN(value)) {
        totalTax += value * 0.07;
      }
    }
  });
  // Formateamos el resultado a un string con dos decimales
  const formattedTotalTax = totalTax.toFixed(2);

  return formattedTotalTax;
}
