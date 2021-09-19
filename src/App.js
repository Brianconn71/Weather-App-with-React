import React, { Component } from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from './components/weather'

// api key and call
const API_KEY = "0e8101f4eef5859e4e6770d8c591a76e"

class App extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: "",
      error: false
    };
    this.getWeather();
  }

  // change kelvin to celsius
  getCelsius(temp){
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getWeather = async () =>{
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)

    const response = await api_call.json();

    console.log(response)
    this.setState({
      city: response.name,
      country: response.sys.country,
      celsius: this.getCelsius(response.main.temp),
      temp_max: this.getCelsius(response.main.temp_max),
      temp_min: this.getCelsius(response.main.temp_min),
      description: response.weather[0].description,
    })
  }

  render () {
    return (
      <div className="App">
        <Weather
        city={this.state.city}
        country={this.state.country}
        celsius={this.state.celsius}
        temp_min={this.state.temp_min}
        temp_max={this.state.temp_max}
        description={this.state.description} />
      </div>
    );
  }
}

export default App;
