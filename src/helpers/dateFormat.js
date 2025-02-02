export const formatDateTime = (
  dateTimeString = '2024-03-01T14:15:13',
  format = 'default',
) => {
  const date = new Date(dateTimeString);

  const getFormattedTime = () =>
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);

  const getFormattedDate = () =>
    date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });

  const getFormattedDateTime = () =>
    date.toLocaleString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      year: '2-digit',
      weekday: 'long',
    });

  const getDayOfWeek = type =>
    new Intl.DateTimeFormat('en-US', {weekday: type}).format(date);

  const defaultFormat = {
    time: getFormattedTime(),
    date: `${date.getDate()}`,
    datetime: getFormattedDateTime(),
    dayOfWeek: getDayOfWeek('long'),
    dayOfWeekShort: getDayOfWeek('short'),
    year: date.getFullYear() % 100,
    month: date.toLocaleString('en-US', {month: 'short'}),
  };

  const formats = {
    time: () => ({time: getFormattedTime()}),
    date: () => ({time: getFormattedTime(), date: getFormattedDate()}),
    datetime: () => ({
      time: getFormattedTime(),
      date: getFormattedDate(),
      datetime: getFormattedDateTime(),
      dayOfWeek: getDayOfWeek('long'),
      year: date.getFullYear() % 100,
      month: date.toLocaleString('en-US', {month: 'short'}),
    }),
    default: () => defaultFormat,
  };

  return formats[format]();
};
