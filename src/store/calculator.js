import { getChartData } from './chart';

// Action Types
const RAN_CALCULATOR = 'RUN_CALCULATOR';

// Action Creators
const ranCalculator = calculator => ({
  type: RAN_CALCULATOR,
  calculator,
});

// Thunk Creators
export const runCalculator = calculator => dispatch => {
  dispatch(ranCalculator(calculator));
  dispatch(getChartData(calculator));
};

// Initial State
const initialState = {
  age: 25,
  salary: 50000,
  salaryGrowth: 2,
  expenses: 43000,
  expensesGrowth: 1,
  returnRate: 6,
  retirementAge: 65,
  retirementReturnRate: 2,
  status: 'single',
};

// Reducer
export default function(calculator = initialState, action) {
  switch (action.type) {
    case RAN_CALCULATOR:
      return action.calculator;
    default:
      return calculator;
  }
}
