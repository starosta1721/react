import React from 'react';
import {Component} from 'react';
import WeatherDisplayForecast from './WeatherDisplayForecast';

export default class WeatherDisplay extends Component {
    constructor(props) {
      super(props);
      this.state = {
        weatherData: null,
        weatherForecast: null,
      }
    }
  
    componentDidMount() {
      const openWeatherApiKey = 'c792484ade42380886f51003cfcaf04d';
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
    }
    
    render() {
      const weatherData = this.state.weatherData;
      const weatherForecast = this.state.weatherForecast
      const forecast = [];
  
      if (!weatherData) return <div>Loading</div>;
      if (!weatherForecast) return <div>Loading</div>;
      weatherForecast.list.forEach( elem => {
        if(elem.dt_txt.indexOf("09:00:00") !== -1) {
        forecast.push(elem);
        }
      });

      const showComp = forecast.map( (item) => {
           return  <WeatherDisplayForecast
                key={item.dt}
                forecast={item}
            />
        
      });

      return (
        <div>
            <img src={`${this.props.logo}`} alt = {`лого Вашего города`}></img>
            <p className = "weaterHeader">{"Today Weather"}</p>
            <p>{"Weather: " + weatherData.weather[0].description}</p>
            <p>{"Wind speed: " + weatherData.wind.speed + ' m/hr'}</p>
            <p>{"Current temperature: " + weatherData.main.temp.toFixed(1)+ ' Celsius'}</p>
            <p>{"Humidity: " + weatherData.main.humidity + ' %'}</p>
            <hr></hr>
            <p className = "_5Day">{"5-Day Forecast "}</p>
            <hr></hr>
            {showComp}
        </div>
      )
    }
  }