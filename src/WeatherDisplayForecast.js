import React from 'react';
import {Component} from 'react';


export default class WeatherDisplayForecast extends Component{
    constructor(props) {
      super(props);
      this.props = props;
    }
    render() {
      const forecast = this.props.forecast;
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