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
    this.data.getWeather().subscribe(
      data => {
        this.weather$ = data;
      },
      error => console.log(error),
      () => {
        console.log('weather:', this.weather$);
        this.temp = Math.round(this.weather$.main.temp);
        console.log('temp:', this.temp);

        this.desc = this.weather$.weather[0].main;
        console.log('desc:', this.desc);

        this.name = this.weather$.name;
        console.log('name:', this.name);

        const hour = new Date().getHours();
        console.log('hour', hour);

        if (this.desc === 'Clouds') {
          this.icon = 'cloud';
        } else if (this.desc === 'Mist' || this.desc === 'Haze') {
          this.icon = 'water';
        } else if (this.desc === 'Clear' && ((hour >= 17 && hour > 6) || hour <= 6)) {
          this.icon = 'moon';
        } else if (this.desc === 'Clear' && (hour > 6 && hour < 17)) {
          this.icon = 'sun';
        }
      }
    );
  }
}
