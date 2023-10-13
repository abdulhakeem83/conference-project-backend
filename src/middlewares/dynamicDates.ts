// Get the current date
const date = new Date();

// Function to get the first and last dates of the current week
export const getFirstAndLastOfWeek = () => {
  const firstDayOfWeek = new Date(date);
  const lastDayOfWeek = new Date(date);
  const dayOfWeek = date.getDay();
  const diff = dayOfWeek - 1;
  firstDayOfWeek.setDate(date.getDate() - diff);
  lastDayOfWeek.setDate(date.getDate() + (6 - diff));

  // Function to format a date to "dd.mm.yyyy" format
  const formatDate = (dateToFormat: Date) => {
    const year = dateToFormat.getFullYear();
    const month = String(dateToFormat.getMonth() + 1).padStart(2, "0");
    const day = String(dateToFormat.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const firstDateOfWeek = formatDate(firstDayOfWeek);
  const lastDateOfWeek = formatDate(lastDayOfWeek);

  return { firstDateOfWeek, lastDateOfWeek };
};

// Function to get the month name from a date object
export const getMonthString = (val: Date) => {
  const options: Intl.DateTimeFormatOptions = { month: "long" };
  return val.toLocaleString(undefined, options);
};

// Function to format a date to "dd.mm.yyyy" format
export const formatToDate = (val: Date) => {
  const year = val.getFullYear();
  const month = String(val.getMonth() + 1).padStart(2, "0");
  const day = String(val.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Get the first and last dates of the current week
const { lastDateOfWeek } = getFirstAndLastOfWeek();

// converts single digit date to double digit
const doubleDigitConverter = (val: string) => String(val).padStart(2, "0");

// Array containing conference dates information
export const conferenceDates = [
  {
    id: 0,
    name: "Today",
    value: `${date.getFullYear()}-${doubleDigitConverter(
      String(date.getMonth() + 1),
    )}-${doubleDigitConverter(String(date.getDate()))}`,
  },
  {
    id: 1,
    name: "Tomorrow",
    value: `${date.getFullYear()}-${doubleDigitConverter(
      String(date.getMonth() + 1),
    )}-${doubleDigitConverter(String(date.getDate() + 1))}`,
  },
  {
    id: 2,
    name: "This Week",
    value: {
      startDate: `${date.getFullYear()}-${doubleDigitConverter(
        String(date.getMonth() + 1),
      )}-${doubleDigitConverter(String(date.getDate()))}`,
      endDate: `${lastDateOfWeek}`,
    },
  },
  {
    id: 3,
    name: "Next Three Months",
    value: {
      startDate: `${date.getFullYear()}-${doubleDigitConverter(
        String(date.getMonth() + 1),
      )}-${doubleDigitConverter(String(date.getDate()))}`,
      endDate: `${date.getFullYear()}-${doubleDigitConverter(
        String(date.getMonth() + 4),
      )}-${doubleDigitConverter(String(date.getDate()))}`,
    },
  },
  {
    id: 4,
    name: `${date.getFullYear()}`,
    value: {
      startDate: `${date.getFullYear()}-${doubleDigitConverter(
        String(date.getMonth() + 1),
      )}-${doubleDigitConverter(String(date.getDate()))}`,
      endDate: `${date.getFullYear()}-12-31`,
    },
  },
  {
    id: 5,
    name: `${getMonthString(date)}, ${date.getFullYear()}`,
    value: {
      startDate: `${date.getFullYear()}-${doubleDigitConverter(
        String(date.getMonth() + 1),
      )}-${doubleDigitConverter(String(date.getDate()))}`,
      endDate: `${formatToDate(
        new Date(date.getFullYear(), date.getMonth() + 1, 0),
      )}`,
    },
  },
];
