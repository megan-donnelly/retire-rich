import React, { Component } from 'react';
import { connect } from 'react-redux';

import { runCalculator } from '../store/calculator';
import SavingsChart from './savingsChart';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 25,
      salary: 50000,
      growthRate: 2,
      retirementAge: 65,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  changeHandler(evt) {
    const newValue = Number(evt.target.value);
    if (!isNaN(newValue)) {
      this.setState({ [evt.target.name]: newValue });
    }
  }
  submitHandler(evt) {
    evt.preventDefault();
    if (
      this.state.age &&
      this.state.salary &&
      this.state.growthRate &&
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
      this.state.growthRate &&
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
              placeholder="Enter your age"
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
              placeholder="Enter your salary"
              onChange={this.changeHandler}
              value={this.state.salary}
              required
            />
            {!this.state.salary && (
              <label className="validation">Must enter a valid salary</label>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="growthRate" className="input-description">
              <strong>Salary Growth Rate:</strong>
            </label>
            <input
              type="number"
              id="growthRate"
              name="growthRate"
              min={0}
              max={100}
              className="htmlForm-control"
              placeholder="Estimated growth rate"
              onChange={this.changeHandler}
              value={this.state.growthRate}
              required
            />
            {!this.state.growthRate && (
              <label className="validation">
                Must enter a valid growth rate
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
              placeholder="Estimated retirement age"
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
          <button type="submit" disabled={isDisabled}>
            Run Calculator
          </button>
        </form>
        <SavingsChart data={this.props.data} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    data: state.data,
  };
};

const mapDispatch = dispatch => {
  return {
    calculate: inputs => dispatch(runCalculator(inputs)),
  };
};

export default connect(mapState, mapDispatch)(Calculator);
