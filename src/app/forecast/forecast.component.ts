import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  forecast;
  forecastList;
  filteredForecast = [];

  constructor(private data: DataService) {}
  ngOnInit() {
    this.initializeWidget(30 * 60);
  }

  /*-------------------------------------------------------------------------|
  | Initializes the widget to populate the DOM with data from data.service.  |
  | -----------------------------------------------------------------------  |
  | @param {number} reload Number of seconds before the widget reloads       |
  |-------------------------------------------------------------------------*/
  initializeWidget(reload) {
    this.getForecast();
    setInterval(() => {
      this.getForecast();
    }, reload * 1000);
  }

  /*-------------------------------------------------------------------------|
  | Fetches data from API by subscribing to data.service methods             |
  |-------------------------------------------------------------------------*/
  getForecast() {
    this.data.getForecast().subscribe(
      data => {
        this.forecast = data;
      },
      error => console.log(error),
      () => {
        this.forecastList = this.forecast.list;

        // Convert Kelvin to Fahrenheit
        this.forecastList.map(x => (x['temp'] = this.temperatureConverter(x.main.temp)));
        // Convert string to datetime
        this.forecastList.map(x => (x['day'] = new Date(x.dt_txt).toString().split(' ')[0]));

        // Get Hour
        this.forecastList.map(x => (x['hour'] = new Date(x.dt_txt).getHours()));
        this.filteredForecast = [];
        // Filter for only 5 days
        for (const forecast of this.forecastList) {
          if (forecast.hour === 12) {
            const desc = forecast.weather[0].main;
            if (desc === 'Clouds') {
              forecast.icon = 'cloud';
            } else if (desc === 'Mist' || desc === 'Haze' || desc === 'Fog') {
              forecast.icon = 'water';
              forecast.icon = 'sun';
            } else if (desc === 'Clear') {
              forecast.icon = 'sun';
            } else if (desc === 'Rain') {
              forecast.icon = 'cloud-rain';
            }
            this.filteredForecast.push(forecast);
          }
        }

        console.log(this.filteredForecast);
      }
    );
  }

  temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    return ((valNum - 273.15) * 1.8 + 32).toFixed(0);
  }
}
