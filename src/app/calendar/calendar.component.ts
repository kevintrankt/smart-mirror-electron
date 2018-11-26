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

  loaded = false;

  ngOnInit() {
    this.data.getCalendar().subscribe(
      data => {
        this.response = data;
      },
      error => console.log(error),
      () => {
        console.log(this.response);

        for (const event of this.response.extractorData.data[0].group) {
          console.log(event);
          const eventData = {};
          if ((eventData['time'] = event.time[0].text !== 'All day')) {
            eventData['time'] = event.time[0].text;
          }
          eventData['title'] = event.title[0].text;

          this.events.push(eventData);
          console.log(this.events);
        }

        this.loaded = true;
      }
    );
  }
}
