import React from 'react';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './UserInfo.scss';

const easternHoroscope = [
  {'rat': [["1924-2-5","1925-1-23"], ["1936-1-24", "1937-2-10"], ["1948-2-10", "1949-1-28"], ["1960-1-28", "1961-2-14"], ["1972-2-15", "1973-2-2"], ["1984-2-2", "1985-2-19"], ["1996-2-19","1997-2-6"], ["2008-2-7", "2009-1-25"]]},
  {'ox': []},
  {'tiger': []},
  {'rabbit': []},
  {'dragon': []},
  {'snake': []},
  {'horse': []},
  {'goat': []},
  {'monkey': [1992, 1980, 1968],},
  {'rooster': []},
  {'dog': []},
  {'pig': []}
];



class UserInfo extends React.Component {

  state = { day: '', month: '', year: '', result: null };

  submitCount = (event) => {
    event.preventDefault();
    var { day, month, year } = this.state;
    var date = new Date(year, month, day);
    ++month;
    let destinyNumber = this.countDigets(this.countDigets(day) + this.countDigets(month) + this.countDigets(year));
    const digits = this.splitDigets(year).concat(this.splitDigets(day)).concat(this.splitDigets(month));

    const firstNumber = digits.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    if(this.splitDigets(firstNumber).length > 1) {
      let helpArr = this.splitDigets(firstNumber);
      let result = helpArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      if(this.splitDigets(result).length > 1) destinyNumber = result;
    };
    const secondNumber = firstNumber - (day.toString().charAt(0) * 2);
    const thirdNumber = this.countDigets(secondNumber);

    var allDigits = digits.concat(this.splitDigets(firstNumber)).concat(this.splitDigets(secondNumber))
      .concat(this.splitDigets(destinyNumber)).concat([thirdNumber]);

    const zodiac = this.getZodiac(day, month);
    const easternSign = this.getEasternSign(date);

    this.setState({ result: {destinyNumber: destinyNumber, piphagore: _.groupBy(allDigits), zodiac: zodiac, easternSign: easternSign}});
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


  getZodiac = (day, month) => {
    var zodiac =['', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
    var last_day =['', 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    return (day > last_day[month]) ? zodiac[month*1 + 1] : zodiac[month];
  }

  getEasternSign = (date) => {
    easternHoroscope.forEach((sign) => {
      console.log(sign);
    });
    return 'monkey'
  }

  renderSquare = (array) => {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return digits.map((digit) => {
      return (
        <div key={digit}>{array[digit] ? array[digit]: '-'}</div>
      )
    })
  }

  renderZodiac = (name) => {
    return (
      <>
        <label className="ui label">
          <img src={`/img/zodiac/${name.charAt(0).toLowerCase() + name.slice(1)}.png`} width="40" alt={name}/>&nbsp;&nbsp;
          {name}
        </label>

      </>
    );
  }

  render() {
    return (
      <>
      <div className="galaxy-bg blog-header">
        <div className="ui container">
          <h1 className="header center aligned icon">
            <i className="ui icon studiovinari"></i>
            Your soul
          </h1>
          <div className="blog-description ui center aligned">
            Here you can know something about your character, zodiac, destiny and description of yourself. Just enter your birthday.
          </div>
        </div>
      </div>
      <div className="ui container">
        <small className="text-muted float-right"><a style={{color: '#eee'}}href="https://www.freepik.com/free-photos-vectors/background">Background photo created by rawpixel.com - www.freepik.com</a></small>
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
        {this.state.result && <div className="count-result">
          <div>
            <div><b>Zodiac sign:</b> {this.state.result && this.renderZodiac(this.state.result.zodiac)}</div>
            <div><b>Destiny number:</b> {this.state.result && this.state.result.destinyNumber}</div>
            <div><b>Piphagore square:</b> <div className="piphagore-table">{ this.state.result && this.state.result.piphagore && this.renderSquare(this.state.result.piphagore)}</div></div>
          </div>
        </div>}

      </div>
    </>)
  };
}

export default UserInfo;