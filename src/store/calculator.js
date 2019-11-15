// Action Types
const RUN_CALCULATOR = 'RUN_CALCULATOR';

// Action Creators
export const runCalculator = calculator => ({
  type: RUN_CALCULATOR,
  calculator,
});

// Thunk Creators (if necessary)

// Initial State
const initialState = {
  age: 25,
  salary: 50000,
  salaryGrowth: 2,
  _401k: 6,
  expenses: 36000,
  expensesGrowth: 1,
  retirementAge: 65,
  status: 'single',
};

// Reducer
export default function(calculator = initialState, action) {
  switch (action.type) {
    case RUN_CALCULATOR:
      return action.calculator;
    default:
      return calculator;
  }
}
