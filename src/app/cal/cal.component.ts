import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.scss']
})
export class CalComponent implements OnInit {
  calendarOptions: Options;
  data;
  @ViewChild(CalendarComponent)
  ucCalendar: CalendarComponent;
  constructor() {}
  ngOnInit() {
    this.calendarOptions = {
      defaultView: 'listWeek',
      editable: false,
      header: {
        left: '',
        center: 'title',
        right: ''
      },
      events: this.data
    };
  }
}
