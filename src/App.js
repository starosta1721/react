import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Component} from 'react';

const PLACES = [
  {name: "Kharkiv", zip: '61000'},
  {name: "Kyiv", zip: '01000'},
  {name: "Lviv", zip: '79007'},
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
          zip={PLACES[activePlace].zip}
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
    }
  }

  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
    zip +
    "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    const data = JSON.stringify(weatherData);
    const data1 = weatherData;
    if (!weatherData) return <div>Loading</div>;
    return (
    <div>
    <p>{"Weather: " + data1.weather[0].description}</p>
    <p>{"Wind speed: " + data1.wind.speed + ' m/hr'}</p>
    </div>  
    )
  }
}
export default App;
