export function sumNumbersInString(inputString: string, tax: string): number {
    // Split the string into numeric values
    const values: number[] = inputString
      .split(",")
      .map((value) => parseFloat(value));
    // Filter out non-numeric values
    const numericValues: number[] = values.filter((value) => !isNaN(value));
    // Sum the numeric values
    const sum: number = numericValues.reduce(
      (accumulator, value) => accumulator + value,
      0
    );
  
    return sum + parseFloat(tax);
  }
  