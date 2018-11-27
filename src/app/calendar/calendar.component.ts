import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(private data: DataService) {}

  response;
  events = [];

  ngOnInit() {
    this.initializeWidget(20 * 60);
  }

  /*-------------------------------------------------------------------------|
  | Initializes the widget to populate the DOM with data from data.service.  |
  | -----------------------------------------------------------------------  |
  | @param {number} reload Number of seconds before the widget reloads       |
  |-------------------------------------------------------------------------*/
  initializeWidget(reload) {
    this.getCalendar();
    setInterval(() => {
      this.events = [];
      this.getCalendar();
    }, reload * 1000);
  }

  /*-------------------------------------------------------------------------|
  | Fetches data from API by subscribing to data.service methods             |
  |-------------------------------------------------------------------------*/
  getCalendar() {
    this.data.getCalendar().subscribe(
      data => {
        this.response = data;
      },
      error => console.log(error),
      () => {
        for (const event of this.response.extractorData.data[0].group) {
          const eventData = {};
          // Select only events that have a time
          if ((eventData['time'] = event.time[0].text !== 'All day')) {
            eventData['time'] = event.time[0].text;
          }
          eventData['title'] = event.title[0].text;
          this.events.push(eventData);
        }
      }
    );
  }
}
