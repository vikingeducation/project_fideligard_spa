export const parseDate = (date, difference, symbol, data) => {
  let newdate = new Date(date);
  newdate.setDate(newdate.getDate() - difference);
  const string = newdate.toISOString().split("T")[0];
  return data[string][symbol];
};

export const formatSidebarData = (today, stocks, date) => {
  const dataArray = Object.entries(today);
  const newDate = new Date(date);
  return dataArray.map(row => {
    row.push(Number(row[1] - parseDate(newDate, 1, row[0], stocks)).toFixed(2));
    row.push(Number(row[1] - parseDate(newDate, 7, row[0], stocks)).toFixed(2));
    row.push(
      Number(row[1] - parseDate(newDate, 30, row[0], stocks)).toFixed(2)
    );
    return row;
  });
};
