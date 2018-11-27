import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {
  constructor(private data: DataService) {}

  response;
  destinationData;
  duration;
  route;
  distance;
  location;
  name;
  loaded = false;

  ngOnInit() {
    this.initializeWidget(20 * 60);
  }

  /*-------------------------------------------------------------------------|
  | Initializes the widget to populate the DOM with data from data.service.  |
  | -----------------------------------------------------------------------  |
  | @param {number} reload Number of seconds before the widget reloads       |
  |-------------------------------------------------------------------------*/
  initializeWidget(reload) {
    this.getDuration();
    setInterval(() => {
      this.getDuration();
    }, reload * 1000);
  }

  /*-------------------------------------------------------------------------|
  | Fetches data from API by subscribing to data.service methods             |
  |-------------------------------------------------------------------------*/
  getDuration() {
    this.data.getDuration().subscribe(
      data => {
        this.response = data;
      },
      error => console.log(error),
      () => {
        this.destinationData = this.response.extractorData.data[0].group;
        this.duration = this.destinationData[0].Duration[0].text;
        this.route = this.destinationData[0].Route[0].text;
        this.distance = this.destinationData[0].Distance[0].text;
        this.location = this.destinationData[0].Location[0].text;
        this.loaded = true;
      }
    );
    this.name = this.data.activeUser.destination_name;
  }
}
