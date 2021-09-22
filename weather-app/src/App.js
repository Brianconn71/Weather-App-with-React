import React, { Component } from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from './components/weather'
import WeatherForm from './components/weatherForm'

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

    this.icon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    }
  }

  // change kelvin to celsius
  getCelsius(temp){
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getWeatherIcon(icons, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.icon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.icon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon: this.icon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.icon.Snow});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.icon.Atmosphere});
        break;
      case rangeId == 800:
        this.setState({icon: this.icon.Clear});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.icon.Clouds});
        break;
      default:
        this.setState({icon:this.icon.Clouds})
    }
  }


  getWeather = async (e) =>{

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)

      const response = await api_call.json();
      
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.getCelsius(response.main.temp),
        temp_max: this.getCelsius(response.main.temp_max),
        temp_min: this.getCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      this.getWeatherIcon(this.icon, response.weather[0].id);
    }else{
      this.setState({error: true});
    }

  };

  render () {
    return (
      <div className="App">
        <WeatherForm
        loadWeather={this.getWeather}
        error={this.state.error} />
        <Weather
        city={this.state.city}
        country={this.state.country}
        celsius={this.state.celsius}
        temp_min={this.state.temp_min}
        temp_max={this.state.temp_max}
        description={this.state.description}
        icon={this.state.icon} />
      </div>
    );
  }
}

export default App;
