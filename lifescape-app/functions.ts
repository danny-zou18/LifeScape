//FILE TO DEFINE UNIVERSAL FUNCTIONS, either for calculations or for other purposes

export const calculatePercentage = (
  current: number,
  nextLevel: number,
): string => {
  if (nextLevel === 0) return "0%";
  const percentage = (current / nextLevel) * 100;
  return `${percentage}%`;
};
