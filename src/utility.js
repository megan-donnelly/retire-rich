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
    const max = brackets[rate][status];
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
    expenses,
    expensesGrowth,
    returnRate,
    retirementAge,
    retirementReturnRate,
    status,
  } = calculatorInputs;
  let dataPoints = [];
  let ageLables = [];

  // cashSavings = (salary * getTaxRate(status, salary) / 100 ) - expenses
  let currentAge = age;
  let currentSalary = salary;
  let currentExpenses = expenses;
  let cashSavings = 0;

  // calculate cash savings for every year
  // from starting age until retirement
  while (currentAge < retirementAge) {
    // add rate of return to total savings if not negative
    if (cashSavings > 0) {
      cashSavings += (cashSavings * returnRate) / 100;
    }
    // add current years savings to total savings
    cashSavings +=
      (currentSalary * (100 - getTaxRate(status, currentSalary))) / 100 -
      currentExpenses;

    dataPoints.push(cashSavings);
    ageLables.push(currentAge);

    currentAge++;
    currentSalary += (currentSalary * salaryGrowth) / 100;
    currentExpenses += (currentExpenses * expensesGrowth) / 100;
  }
  // calculate cash saving for every year
  // from retirement until savings is 0

  let retirementSavings = dataPoints[dataPoints.length - 1];
  while (retirementSavings > 0 && currentAge <= 100) {
    // add retirement rate of return to total savings
    retirementSavings += (retirementSavings * retirementReturnRate) / 100;
    // remove expenses from total savings
    retirementSavings -= currentExpenses;

    if (retirementSavings < 0) {
      dataPoints.push(0);
    } else {
      dataPoints.push(retirementSavings);
    }
    ageLables.push(currentAge);

    currentAge++;
    currentExpenses += (currentExpenses * expensesGrowth) / 100;
  }
  return { dataPoints, ageLables };
};
