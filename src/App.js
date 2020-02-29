import React from 'react';
import logo from './logo.svg';
import kharkiv from './kharkiv.jpg';
import kyiv from './Kyiv.svg';
import lviv from './Lviv.png';
import './App.css';
import {Component} from 'react';

const PLACES = [
  {name: "Kharkiv", zip: '61000', logo: kharkiv},
  {name: "Kyiv", zip: '01000', logo: kyiv},
  {name: "Lviv", zip: '79007', logo: lviv},
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  };
  
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        {PLACES.map((place, index) => (
          <button
            key={index}
            onClick={() => {
              this.setState({ activePlace: index });
            }}
          >
              {place.name}
          </button>
        ))}
        <WeatherDisplay
          key={activePlace}
          name={PLACES[activePlace].name}
          logo = {PLACES[activePlace].logo}
        />
      </div>
    );
  };
}

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      weatherForecast: null,
    }
  }

  componentDidMount() {
    const openWeatherApiKey = 'c792484ade42380886f51003cfcaf04d';
    // const weatherApiLink = `https://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&units=metric&mode=json&appid=${openWeatherApiKey}`;
    // console.log(this.props, 0000);
    const name = this.props.name;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=" + openWeatherApiKey + "&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
    const URL1 = "http://api.openweathermap.org/data/2.5/forecast?q=" +
    name +
    ",ua&appid=c792484ade42380886f51003cfcaf04d&units=metric";
    fetch(URL1).then(res => res.json()).then(json => {
      this.setState({ weatherForecast: json });
    });
    console.log(URL1, 1);
    console.log(URL, 2);
  }
  
  render() {
    const weatherData = this.state.weatherData;
    const weatherForecast = this.state.weatherForecast
    const data1 = weatherData;
    const data2 = weatherForecast;
    const forecast = [];

    if (!weatherData) return <div>Loading</div>;
    if (!weatherForecast) return <div>Loading</div>;
    console.log(data2.list, 3333);
    console.log(forecast, 4);
    data2.list.forEach( elem => {
      if(elem.dt_txt.indexOf("09:00:00") != -1) {
      forecast.push(elem);
      }
    });

    console.log(forecast[0], 44);
    return (
    <div>
    <img src={`${this.props.logo}`}></img>
    <p className = "weaterHeader">{"Today Weather"}</p>
    <p>{"Weather: " + data1.weather[0].description}</p>
    <p>{"Wind speed: " + data1.wind.speed + ' m/hr'}</p>
    <p>{"Current temperature: " + data1.main.temp.toFixed(1)+ ' Celsius'}</p>
    <p>{"Humidity: " + data1.main.humidity + ' %'}</p>
    <hr></hr>
    <p className = "_5Day">{"5-Day Forecast "}</p>
    <hr></hr>

    <WeatherDisplayForecast
      key={forecast[0].dt}
      forecast={forecast[0]}
    />
    <WeatherDisplayForecast
      key={forecast[1].dt}
      forecast={forecast[1]}
    /> 
    <WeatherDisplayForecast
      key={forecast[2].dt}
      forecast={forecast[2]}
    /> 
    <WeatherDisplayForecast
      key={forecast[3].dt}
      forecast={forecast[3]}
    /> 
    <WeatherDisplayForecast
      key={forecast[4].dt}
      forecast={forecast[4]}
    /> 
    </div>
    )
  }
}

class WeatherDisplayForecast extends Component{
  constructor() {
    super();
  }
  render() {
    const forecast = this.props.forecast;
    console.log(forecast.dt_txt);
    return (
      <div>
          <p className = "weaterHeader">{"Date " + forecast.dt_txt.substring(0, 10)}</p>
          <p>{"Weather: " + forecast.weather[0].description}</p>
          <p>{"Wind speed: " + forecast.wind.speed + ' m/hr'}</p>
          <p>{"Current temperature: " + forecast.main.temp.toFixed(1)+ ' Celsius'}</p>
          <p>{"Humidity: " + forecast.main.humidity + ' %'}</p>
          <hr></hr>
      </div>

    )
  }
}
export default App;
