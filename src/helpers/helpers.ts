export const getBorderStyle = (isDarkMode: boolean, condition: any) => {
  if (condition) {
    return isDarkMode
      ? 'border dark:border-dark-border-medium dark:bg-dark-background-secondary/50'
      : 'border border-light-border-medium bg-light-background-tertiary';
  } else if (!condition) {
    return isDarkMode
      ? 'border dark:border-dark-border-medium'
      : 'border border-light-border-medium';
  }
  return '';
};
