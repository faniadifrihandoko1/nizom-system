function formatDate(dateString: string): string {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Juli",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const [year, month, day] = dateString.split("-");
  const monthIndex: number = parseInt(month) - 1;
  const monthName: string = months[monthIndex];

  return `${parseInt(day)} ${monthName} ${parseInt(year)}`;
}

export default formatDate;
