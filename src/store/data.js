import { getDataPoints } from '../utility.js';

// Action Types
const RAN_CALCULATOR = 'RAN_CALCULATOR';

// Action Creators
const ranCalculator = (data, labels) => ({
  type: RAN_CALCULATOR,
  data,
  labels,
});

// Thunks
export const runCalculator = formInputs => dispatch => {
  const { dataPoints, ageLables } = getDataPoints(formInputs);
  dispatch(ranCalculator(dataPoints, ageLables));
};

// initial state
const initialState = {
  data: [],
  labels: [],
};

// Reducer
export default function(graph = initialState, action) {
  switch (action.type) {
    case RAN_CALCULATOR:
      return { data: action.data, labels: action.labels };
    default:
      return graph;
  }
}
