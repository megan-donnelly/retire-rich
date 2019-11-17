import { getDataPoints } from '../utility.js';

// Action Types
const GOT_CHART_DATA = 'GOT_CHART_DATA';

// Action Creators
const gotChartData = (data, labels) => ({
  type: GOT_CHART_DATA,
  data,
  labels,
});

// Thunks
export const getChartData = formInputs => dispatch => {
  const { dataPoints, ageLables } = getDataPoints(formInputs);
  dispatch(gotChartData(dataPoints, ageLables));
};

// initial state
const initialState = {
  data: [],
  labels: [],
};

// Reducer
export default function(chart = initialState, action) {
  switch (action.type) {
    case GOT_CHART_DATA:
      return { data: action.data, labels: action.labels };
    default:
      return chart;
  }
}
