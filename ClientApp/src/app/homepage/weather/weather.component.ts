import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  chosencityID: string = 'Manchester,GB';
  weatherDescription: any;
  icon: any;

  constructor() { }

  ngOnInit(): void {
    this.weatherData = { main: {}};
    this.showWeatherData(this.chosencityID);
  }

  getWeatherData(chosenCityID: string) {
    var address = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var api = '&APPID=0e1b3709b6a617e669dc0e11f9447a30';
    return fetch(address + chosenCityID + api)
  }

    async setWeatherData(data: any) {
    this.weatherData = data;
    this.weatherData.temperature = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherDescription = this.weatherData.weather[0].main;
    this.weatherData.city = (this.weatherData.name);
    this.weatherData.country = (this.weatherData.sys.country);
    let currentDate = new Date();
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    const iconName = this.weatherData.weather[0].icon;
    const iconApi = await fetch('http://openweathermap.org/img/w/' + iconName + '.png');
    this.icon = iconApi.url;
  }

  showWeatherData(chosenCityID: string){
  this.getWeatherData(chosenCityID)
    .then(response => response.json())
    .then(data => {
      this.setWeatherData(data);
    });
  }
}
