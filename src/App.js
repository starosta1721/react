import React from 'react';
import kharkiv from './kharkiv.jpg';
import kyiv from './Kyiv.svg';
import lviv from './Lviv.png';
import './App.css';
import {Component} from 'react';
import WeatherDisplay from './WeatherDisplay';

const PLACES = [
  {name: "Kharkiv", zip: '61000', logo: kharkiv},
  {name: "Kyiv", zip: '01000', logo: kyiv},
  {name: "Lviv", zip: '79007', logo: lviv},
];

class App extends Component {
  state = {
    activePlace: 0,
    hasError: false,
  };
  
  componentDidCatch (error, info) {
    this.setState({hasError: true})
    console.log(error);
    console.log(info);
  }

  render() {
    const activePlace = this.state.activePlace;
    if (this.state.hasError) {
      console.log("ошибка");
      return (
        <div>
          <p>OOOps! There is mistake.</p>
          <p>Please, coming later!</p>
        </div>
      )   
    } else {
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
    }

  };
}


export default App;
