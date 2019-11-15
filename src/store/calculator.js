import axios from 'axios';

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
  growthRate: 2,
  retirementAge: 65,
};

// Reducer
export default function(calculator = initialState, action) {
  switch (action.type) {
    case RUN_CALCULATOR:
      console.log(`RUN_CALCULATOR`, action.calculator);
      return action.calculator;
    default:
      return calculator;
  }
}
