import React from 'react'
import './App.css';

import 'weather-icons/css/weather-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from './components/weather'

// api key and call
const API_KEY = "0e8101f4eef5859e4e6770d8c591a76e"

class App extends React.Component (
  constructor(){
    super();
    this.state = {};
    this.getWeather();
  }

  getWeather = async () =>{
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`)

    const response = await api_call.json();

    console.log(response)
  }

  render () {
    return (
      <div className="App">
        <Weather />
      </div>
    );
  }
)

export default App;
