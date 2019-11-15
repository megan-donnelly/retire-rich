import React, { Component } from 'react';

class Calculator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="calculator">
        <h1 className="view-title">Retirement Calculator</h1>
        <form>
          <div className="form-group">
            <label htmlFor="current-age">Current Age</label>
            <input
              type="number"
              id="current-age"
              className="htmlForm-control"
              placeholder="Enter your age"
            />
          </div>
          <div className="htmlForm-group">
            <label htmlFor="current-salary">Salary</label>
            <input
              type="number"
              className="form-control"
              id="current-salary"
              placeholder="Enter your salary"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Calculator;
