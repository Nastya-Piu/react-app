import React from 'react';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './UserInfo.scss';

const easternHoroscope = [];

class UserInfo extends React.Component {

  state = { day: '', month: '', year: '', result: null };

  submitCount = (event) => {
    event.preventDefault();
    var { day, month, year } = this.state;
    ++month;
    const destinyNumber = this.countDigets(this.countDigets(day) + this.countDigets(month) + this.countDigets(year));
    const digits = this.splitDigets(year).concat(this.splitDigets(day)).concat(this.splitDigets(month));

    const firstNumber = digits.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    // check if this is 10, 11, 12
    // get second Number
    // concat digits
    const secondNumber = firstNumber - (day.toString().charAt(0) * 2);
    const thirdNumber = this.countDigets(secondNumber);

    var allDigits = digits.concat(this.splitDigets(firstNumber)).concat(this.splitDigets(secondNumber)).concat([destinyNumber, thirdNumber]);

    this.setState({ result: {destinyNumber: destinyNumber, piphagore: _.groupBy(allDigits)}});
  }

  countDigets(number) {
    return (number - 1) % 9 + 1;
  }

  splitDigets(number) {
    const sNumber = number.toString(), output = [];
    for(var i = 0, len = sNumber.length; i < len; i++ ) {
      output.push(+sNumber.charAt(i));
    }
    return output;
  }

  renderSquare = (array) => {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return digits.map((digit) => {
      return (
        <div key={digit}>{array[digit]}</div>
      )
    })
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui breadcrumb">
          <Link to="/" className="section">Home</Link>
          <div className="divider"> / </div>
          <div className="active section">User info</div>
        </div>
        <div className="ui one column stackable center aligned page grid">
          <form onSubmit={this.submitCount}>
            <div className="text-muted text-center">
              <i className="ui icon birthday cake"></i>
              <label>Enter your date of birth</label>
            </div>
            <div className="ui input">
              <YearPicker
                  defaultValue={'Select year'}
                  reverse
                  required={true}
                  value={this.state.year}
                  onChange={(year) => {
                    this.setState({ year: +year });
                  }}
                  id={'year'}
                  name={'year'}
                  classes={'custom-input'}
                  optionClasses={'option classes'}
              />
            </div>
            <div className="ui input">
              <MonthPicker
                  defaultValue={'Select month'}
                  year={this.state.year}
                  required={true}
                  value={this.state.month}
                  onChange={(month) => {
                    this.setState({ month: +month });
                  }}
                  id={'month'}
                  name={'month'}
                  classes={'custom-input'}
                  optionClasses={'option classes'}
              />
            </div>
            <div className="ui input">
              <DayPicker
                  defaultValue={'Select day'}
                  year={this.state.year}
                  month={this.state.month}
                  required={true}
                  value={this.state.day}
                  onChange={(day) => {
                    this.setState({ day: +day });
                  }}
                  id={'day'}
                  name={'day'}
                  classes={'custom-input'}
                  optionClasses={'option classes'}
              />
            </div><br/><br/>
            <div className="d-flex justify-content-center">
              <button className="ui teal button">Count</button>
            </div>
          </form>
        </div>
        {this.state.result && <div>
          <h4>Result:</h4>
          <div>
            <div>Destiny number: {this.state.result && this.state.result.destinyNumber}</div>
            <div>Piphagore square: { this.state.result && this.state.result.piphagore && this.renderSquare(this.state.result.piphagore)}</div>
          </div>
        </div>}
      </div>
    )
  };
}

export default UserInfo;