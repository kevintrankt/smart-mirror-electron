import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather$;
  temp;
  desc;
  name;
  icon;

  constructor(private data: DataService) {}
  ngOnInit() {
    this.initializeWidget(60);
  }

  /*-------------------------------------------------------------------------|
  | Initializes the widget to populate the DOM with data from data.service.  |
  | -----------------------------------------------------------------------  |
  | @param {number} reload Number of seconds before the widget reloads       |
  |-------------------------------------------------------------------------*/
  initializeWidget(reload) {
    this.getWeather();
    setInterval(() => {
      this.getWeather();
    }, reload * 1000);
  }

  /*-------------------------------------------------------------------------|
  | Fetches data from API by subscribing to data.service methods             |
  |-------------------------------------------------------------------------*/
  getWeather() {
    this.data.getWeather().subscribe(
      data => {
        this.weather$ = data;
      },
      error => console.log(error),
      () => {
        this.temp = Math.round(this.weather$.main.temp);
        this.desc = this.weather$.weather[0].main;
        this.name = this.weather$.name;

        const hour = new Date().getHours();

        // Select icons for certain weather type
        if (this.desc === 'Clouds') {
          this.icon = 'cloud';
        } else if (this.desc === 'Mist' || this.desc === 'Haze' || this.desc === 'Fog') {
          this.icon = 'water';
        } else if (this.desc === 'Clear' && ((hour >= 17 && hour > 6) || hour <= 6)) {
          this.icon = 'moon';
        } else if (this.desc === 'Clear' && (hour > 6 && hour < 17)) {
          this.icon = 'sun';
        } else if (this.desc === 'Rain') {
          this.icon = 'cloud-rain';
        }
      }
    );
  }
}
