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
    this.data.getDuration().subscribe(
      data => {
        this.response = data;
      },
      error => console.log(error),
      () => {
        console.log(this.response);
        this.destinationData = this.response.extractorData.data[0].group;
        console.log(this.destinationData);

        this.duration = this.destinationData[0].Duration[0].text;
        this.route = this.destinationData[0].Route[0].text;
        this.distance = this.destinationData[0].Distance[0].text;
        this.location = this.destinationData[0].Location[0].text;
        this.loaded = true;

        console.log(this.duration);
        console.log(this.route);
        console.log(this.distance);
        console.log(this.location);
      }
    );
    this.name = this.data.activeUser.destination_name;
  }
}
