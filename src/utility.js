export const getTaxRate = function(status = 'single', income = 50000) {
  const brackets = {
    // key is tax rate
    // values are max for bracket
    10: { single: 9700, joint: 19400, separate: 9700, head: 13850 },
    12: { single: 39475, joint: 78950, separate: 39475, head: 52850 },
    22: { single: 84200, joint: 168400, separate: 84200, head: 84200 },
    24: { single: 160725, joint: 321450, separate: 160725, head: 160700 },
    32: { single: 204100, joint: 408200, separate: 204100, head: 204100 },
    35: { single: 510300, joint: 612350, separate: 306175, head: 510300 },
    // 37: {} --> Highest tax bracket
  };
  for (let rate in brackets) {
    const max = rate[status];
    if (income <= max) {
      return Number(rate);
    }
  }
  return 37;
};

export const getDataPoints = function(calculatorInputs) {
  const {
    age,
    salary,
    salaryGrowth,
    _401k,
    expenses,
    expensesGrowth,
    retirementAge,
    status,
  } = calculatorInputs;
  let dataPoints = [];
  let ageLables = [];
  const jumpSize = (retirementAge - age) / 10;
};
