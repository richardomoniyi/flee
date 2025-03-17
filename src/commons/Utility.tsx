import moment from "moment";

/*export const formatDate = (dateString: string) => {
  let dateStr = convertToDate(dateString);
  try {
    console.log(dateStr);
    const cleanedDate = dateString.replace(/\[UTC\]/g, ""); // Remove [UTC]
    dateStr = moment(cleanedDate).format("MMM Do, YYYY h:mm A");
  } catch (Exception) {}
  return dateStr;
  // Example Output: "Feb 28th, 2025 12:44 PM"
};*/
export const removeFormatting = (formattedValue: string): number => {
  console.log("removeFormatting Amount::",formattedValue);
  return parseFloat(formattedValue.replace(/[^0-9.]/g, "")) || 0;
};
export const formatCurrency = (value: string, currencySymbol: string = "₦"): string => {
  console.log("formatCurrency Amount::",value);
  let numericValue = value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except "."
  const decimalCount = (numericValue.match(/\./g) || []).length;
  if (decimalCount > 1) {
      numericValue = numericValue.slice(0, numericValue.lastIndexOf("."));
  }
  const numberValue = parseFloat(numericValue);
  if (isNaN(numberValue)) return "";
  return `${currencySymbol}${numberValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
export const formatDate = (isoDate: string): string => {
  return moment(isoDate).utc().format("MMM Do, YYYY h:mmA").toUpperCase();
};
const isNumeric = (value: string): boolean => {
    return /^-?\d+(\.\d+)?$/.test(value); // Regex to check if input is a valid number
};
const isValidDate = (dateStr: string): boolean => {
  return !isNaN(Date.parse(dateStr)); // Check if string can be parsed as a Date
};
//Date | null

export const convertToDate = (input: string): String => {
  if (isNumeric(input)) {
      return new Date(Number(input)).toISOString(); // Convert timestamp to Date
  } else if (isValidDate(input)) {
      return new Date(input).toISOString(); // Convert valid date string
  }
  return ""; // Return null if invalid
};
export const formatToNaira1 = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

export const formatToNaira = (amount: number): string => {
  const formattedAmount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Math.abs(amount)); // Format without sign

  return amount < 0 ? `(${formattedAmount})` : formattedAmount;
};