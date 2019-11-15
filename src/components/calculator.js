import React, { Component } from 'react';
import { connect } from 'react-redux';

import { runCalculator } from '../store/chart';
import SavingsChart from './savingsChart';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 25,
      salary: 50000,
      salaryGrowth: 2,
      expenses: 3000,
      expensesGrowth: 1,
      retirementAge: 65,
      status: 'single',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler(evt) {
    const { name, value } = evt.target;
    if (name === 'status') {
      this.setState({ [name]: value });
    } else if (!isNaN(Number(value))) {
      this.setState({ [name]: Number(value) });
    }
  }
  submitHandler(evt) {
    evt.preventDefault();
    if (
      this.state.age &&
      this.state.salary &&
      this.state.salaryGrowth &&
      this.state.expenses &&
      this.state.expensesGrowth &&
      this.state.retirementAge &&
      this.state.age < this.state.retirementAge
    ) {
      this.props.calculate(this.state);
    }
  }
  disableBtnHelper() {
    if (
      this.state.age &&
      this.state.salary &&
      this.state.salaryGrowth &&
      this.state.expenses &&
      this.state.expensesGrowth &&
      this.state.retirementAge &&
      this.state.age < this.state.retirementAge
    ) {
      return false;
    } else return true;
  }
  render() {
    const isDisabled = this.disableBtnHelper();
    return (
      <div id="calculator">
        <h1 className="view-title">Retirement Calculator</h1>
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="age" className="input-description">
              <strong>Current Age:</strong>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min={0}
              max={100}
              className="htmlForm-control"
              onChange={this.changeHandler}
              value={this.state.age}
              required
            />
            {!this.state.age && (
              <label className="validation">Must enter a valid age</label>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="salary" className="input-description">
              <strong>Salary:</strong>
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              min={0}
              className="htmlForm-control"
              onChange={this.changeHandler}
              value={this.state.salary}
              required
            />
            {!this.state.salary && (
              <label className="validation">Must enter a valid salary</label>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="salaryGrowth" className="input-description">
              <strong>Salary Growth Rate:</strong>
            </label>
            <input
              type="number"
              id="salaryGrowth"
              name="salaryGrowth"
              min={0}
              max={100}
              className="htmlForm-control"
              onChange={this.changeHandler}
              value={this.state.salaryGrowth}
              required
            />
            {!this.state.salaryGrowth && (
              <label className="validation">
                Must enter a valid growth rate
              </label>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="expenses" className="input-description">
              <strong>Expenses:</strong>
            </label>
            <input
              type="number"
              id="expenses"
              name="expenses"
              min={0}
              className="htmlForm-control"
              onChange={this.changeHandler}
              value={this.state.expenses}
              required
            />
            {!this.state.expenses && (
              <label className="validation">
                Must enter a valid expenses amount
              </label>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="expensesGrowth" className="input-description">
              <strong>Expenses Growth Rate:</strong>
            </label>
            <input
              type="number"
              id="expensesGrowth"
              name="expensesGrowth"
              min={0}
              className="htmlForm-control"
              onChange={this.changeHandler}
              value={this.state.expensesGrowth}
              required
            />
            {!this.state.expensesGrowth && (
              <label className="validation">
                Must enter a valid expenses growth rate
              </label>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="retirementAge" className="input-description">
              <strong>Retirement Age:</strong>
            </label>
            <input
              type="number"
              id="retirementAge"
              name="retirementAge"
              min={0}
              max={100}
              className="htmlForm-control"
              onChange={this.changeHandler}
              value={this.state.retirementAge}
              required
            />
            {(!this.state.retirementAge ||
              this.state.retirementAge <= this.state.age) && (
              <label className="validation">
                Must enter a valid retirement age
              </label>
            )}
          </div>
          <div className="form-group input-group mb-3">
            <label htmlFor="status" className="input-description">
              <strong>Filling Status:</strong>
            </label>
            <select
              className="htmlForm-control"
              id="inputGroupSelect01"
              name="status"
              value="single"
              onChange={this.changeHandler}
            >
              <option value="single">Single</option>
              <option value="joint">Married, filling jointly</option>
              <option value="separate">Married, filling separately</option>
              <option value="head">Head of household</option>
            </select>
            {!this.state.status && (
              <label className="validation">
                Must enter a valid filling status
              </label>
            )}
          </div>
          <button type="submit" disabled={isDisabled}>
            Run Calculator
          </button>
        </form>
        {this.props.data.length && (
          <SavingsChart data={this.props.data} labels={this.props.labels} />
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    data: state.chart.data,
    labels: state.chart.labels,
  };
};

const mapDispatch = dispatch => {
  return {
    calculate: inputs => dispatch(runCalculator(inputs)),
  };
};

export default connect(mapState, mapDispatch)(Calculator);
