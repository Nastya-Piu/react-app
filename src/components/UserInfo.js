import React from 'react';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import './UserInfo.scss';

const easternHoroscope = [
  {'rat': [["1924-2-5","1925-1-23"], ["1936-1-24", "1937-2-10"], ["1948-2-10", "1949-1-28"], ["1960-1-28", "1961-2-14"], ["1972-2-15", "1973-2-2"], ["1984-2-2", "1985-2-19"], ["1996-2-19","1997-2-6"], ["2008-2-7", "2009-1-25"]]},
  {'ox': [["1925-1-24", "1926-2-12"], ["1937-2-11", "1938-1-30"], ["1949-1-29", "1950-2-16"], ["1961-2-15", "1962-2-4"], ["1973-2-3", "1974-1-22"], ["1985-2-29", "1986-2-8"], ["1997-2-7", "1998-1-27"], ["2009-1-26", "2010-2-13"]]},
  {'tiger': [["1926-2-13", "1927-2-1"], ["1938-1-31", "1939-2-18"], ["1950-2-17", "1951-2-5"], ["1962-2-5", "1963-1-24"], ["1974-1-23", "1975-2-10"], ["1986-2-9", "1987-1-28"], ["1998-1-28", "1999-2-15"], ["2010-2-14", "2011-2-2"]]},
  {'rabbit': [["1927-2-2", "1928-1-22"], ["1939-2-19", "1940-2-7"], ["1951-2-6", "1952-1-26"], ["1963-1-25", "1964-2-12"], ["1975-2-11", "1976-1-30"], ["1987-1-29", "1988-2-16"], ["1999-2-16", "2000-2-4"], ["2011-2-3", "2012-1-22"]]},
  {'dragon': [["1928-1-23", "1929-2-9"], ["1940-2-8", "1941-1-26"], ["1952-1-27", "1953-2-13"], ["1964-2-13", "1965-2-1"], ["1976-1-31", "1977-2-17"], ["1988-2-17", "1989-2-5"], ["2000-2-5", "2001-1-23"], ["2012-1-23", "2013-2-9"]]},
  {'snake': [["1929-2-10", "1930-1-29"], ["1941-1-27", "1942-2-14"], ["1953-2-14", "1954-2-2"], ["1965-2-2", "1966-1-20"], ["1977-2-18", "1978-2-6"], ["1989-2-6", "1990-1-26"], ["2001-1-24", "2002-2-11"], ["2013-2-10", "2014-1-30"]]},
  {'horse': [["1930-1-30", "1931-2-16"], ["1942-2-15", "1943-2-4"], ["1954-2-3", "1955-1-23"], ["1966-1-21", "1967-2-8"], ["1978-2-7", "1979-1-27"], ["1990-1-27", "1991-2-14"], ["2002-2-12", "2003-1-31"], ["2014-1-31", "2015-2-18"]]},
  {'goat': [["1931-2-17", "1932-2-5"], ["1943-2-5", "1944-1-24"], ["1955-1-24", "1956-2-11"], ["1967-2-9", "1968-1-29"], ["1979-1-28", "1980-2-15"], ["1991-2-15", "1992-2-3"], ["2003-2-1", "2004-1-21"], ["2015-2-19", "2016-2-7"]]},
  {'monkey': [["1932-2-6", "1933-1-25"], ["1944-1-25", "1945-2-12"], ["1956-2-12", "1957-1-30"], ["1968-1-30", "1969-2-16"], ["1980-2-16", "1981-2-4"], ["1992-2-4", "1993-1-22"], ["2004-1-22", "2005-2-8"], ["2016-2-8", "2017-1-27"]]},
  {'rooster': [["1933-1-26", "1934-2-13"], ["1945-2-13", "1946-2-1"], ["1957-1-31", "1958-2-17"], ["1969-2-17", "1970-2-5"], ["1981-2-5", "1982-1-24"], ["1993-1-23", "1994-2-9"], ["2005-2-9", "2006-1-28"], ["2017-1-28", "2018-2-15"]]},
  {'dog': [["1934-2-14", "1935-2-3"], ["1946-2-2", "1947-1-21"], ["1958-2-18", "1959-2-7"], ["1970-2-6", "1971-1-26"], ["1982-1-25", "1983-2-12"], ["1994-2-10", "1995-1-30"], ["2006-1-29", "2007-2-17"], ["2018-2-16", "2019-2-4"]]},
  {'pig': [["1935-2-4", "1936-1-23"], ["1947-1-22", "1948-2-9"], ["1959-2-8", "1960-1-27"], ["1971-1-27", "1972-2-14"], ["1983-2-13", "1984-2-1"], ["1995-1-31", "1996-2-18"], ["2007-2-18", "2008-2-6"], ["2019-2-5", "2020-1-24"]]}
];

const easternNames = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];
const virtualNames = ['aristocrat', 'professor', 'leader', 'vector', 'knight', 'joker', 'king']
const virtualSigns = [
  { 'capricorn': [0, 1, 2, 3, 2, 1, 0, 4, 5, 6, 3, 4]},
  { 'aquarius': [4, 3, 1, 2, 0, 2, 1, 0, 4, 3, 6, 5]},
  { 'pisces': [5, 4, 0, 1, 3, 0, 3, 1, 0, 4, 5, 6]},
  { 'aries': [6, 5, 4, 0, 1, 2, 3, 2, 3, 0, 4, 5]},
  { 'taurus': [5, 6, 3, 4, 0, 1, 2, 0, 2, 1, 3, 4]},
  { 'gemini': [4, 3, 6, 5, 4, 0, 1, 3, 0, 2, 1, 0]},
  { 'cancer': [0, 4, 5, 6, 3, 4, 0, 1, 2, 3, 2, 1]},
  { 'leo': [1, 0, 4, 3, 6, 5, 4, 0, 1, 2, 0, 3]},
  { 'virgo': [2, 1, 0, 4, 5, 6, 5, 3, 3, 1, 2, 0]},
  { 'libra': [3, 2, 1, 0, 4, 5, 6, 5, 4, 0, 1, 3]},
  { 'scorpio': [2, 0, 3, 1, 0, 3, 5, 6, 5, 4, 0, 1]},
  { 'sagittarius': [3, 2, 0, 2, 1, 3, 4, 5, 6, 5, 4, 0]}
]

class UserInfo extends React.Component {

  state = { day: '', month: '', year: '', result: null, loading: false };

  submitCount = (event) => {
    this.setState({loading: true});
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
    const virtualSign = this.getVurtualSign(zodiac, easternSign);

    this.setState({ result: {destinyNumber: destinyNumber, piphagore: _.groupBy(allDigits), zodiac: zodiac, easternSign: easternSign, virtualSign: virtualSign}, loading: false});
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
    let result = '';
    loopSigns:
      for(let i = 0; i< easternHoroscope.length; i++) {
        const sign = easternHoroscope[i];
        const signArr = sign[Object.keys(sign)[0]];
        if(signArr.length>0) {
          for(let j = 0; j < signArr.length; j++) {
            const range = signArr[j];
            if(range.length === 2) {
              const from = new Date(range[0]);
              const to = new Date(range[1]);
              if(date > from && date < to) {
                result = Object.keys(sign)[0];
                break loopSigns;
              }
            }
          }
        }
    }

    return result;
  }

  getVurtualSign = (zodiac, eastern) => {
    zodiac = zodiac.charAt(0).toLowerCase() + zodiac.slice(1);
    const easternId = easternNames.findIndex(name => eastern === name);
    const virtualKey = virtualSigns.findIndex(sign => {
      return zodiac === Object.keys(sign)[0];
    });
    const virtualObj= virtualSigns[virtualKey];
    return virtualNames[virtualObj[Object.keys(virtualObj)[0]][easternId]];
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
      <div className="zodiac">
        <img src={`/img/zodiac/${name.charAt(0).toLowerCase() + name.slice(1)}1.png`} width="170" alt={name}/>
      </div>
    );
  }

  renderVirtualSign = (sign) => {
    return (
      <a href={`http://www.xsp.ru/sh/virt/${sign}.php`} className="text-dark text-decoration" target="_blank"><u>{(sign.charAt(0).toUpperCase() + sign.slice(1))}</u></a>
    );
  }

  renderEasternSign = (sign) => {
    return (
      <div>
        <img src={`/img/zodiac/${sign}.png`} width="150" alt={sign} /><br/>
        <i><b>{(sign.charAt(0).toUpperCase() + sign.slice(1))}</b></i>
      </div>
    )
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
        <small className="text-muted float-right"><a style={{color: '#eee'}} href="https://www.freepik.com/free-photos-vectors/background">Background photo created by rawpixel.com - www.freepik.com</a></small>
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
                    this.setState({ year: +year, result: null });
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
                    this.setState({ month: +month, result: null });
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
                    this.setState({ day: +day, result: null });
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
        {this.state.loading && <><br/><div className="ui active centered inline loader"></div></>}
        {this.state.result && <div className="count-result" ref={ (ref) => { ref && ref.scrollIntoView({behavior: 'smooth'})} }>
          <div>
            <div className="row">
              <div className="col-md-6"><b>Zodiac sign:</b> {this.state.result && this.renderZodiac(this.state.result.zodiac)}</div>
              <div className="col-md-6"><b>Eastern sign:</b> {this.state.result && this.renderEasternSign(this.state.result.easternSign)}</div>
            </div>
            <div><b>Virtual sign:</b> {this.state.result && this.renderVirtualSign(this.state.result.virtualSign)}</div>
            <div><b>Destiny number:</b> {this.state.result && this.state.result.destinyNumber}</div>
            <div><b>Piphagore square:</b> <div className="piphagore-table">{ this.state.result && this.state.result.piphagore && this.renderSquare(this.state.result.piphagore)}</div></div>
            <div className="center-block">
              <small className="text-muted"><a href='https://pngtree.com/so/12 constellations'>12 constellations png from pngtree.com</a></small>
              <small className="text-muted"><a href='https://pngtree.com/so/mouse'>mouse png from pngtree.com</a></small>
            </div>
          </div>
        </div>}

      </div>
    </>)
  };
}

export default UserInfo;
