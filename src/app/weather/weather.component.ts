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

  constructor(private data: DataService) {}

  ngOnInit() {
    // this.data.getWeather().subscribe(
    //   data => {
    //     this.weather$ = data;
    //   },
    //   error => console.log(error),
    //   () => {
    //     console.log('weather:', this.weather$);
    //     this.temp = this.weather$.main.temp;
    //     console.log('temp:', this.temp);

    //     this.desc = this.weather$.weather[0].main;
    //     console.log('desc:', this.desc);

    //     this.name = this.weather$.name;
    //     console.log('name:', this.name);
    //   }
    // );

    this.temp = 60.1;
    this.desc = 'Clear';
    this.name = 'San Jose';
  }
}
