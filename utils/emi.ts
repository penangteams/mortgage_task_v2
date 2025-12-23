export const calculateEMI = (principal: number, annualRate: number, tenureYears: number) => {
  const monthlyRate = annualRate / 12 / 100;
  const months = tenureYears * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return {
    emi: parseFloat(emi.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
  };
};
