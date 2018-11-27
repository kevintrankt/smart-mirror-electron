import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-template',
  templateUrl: './widget-template.component.html',
  styleUrls: ['./widget-template.component.scss']
})
export class WidgetTemplateComponent implements OnInit {
  public formattedDate;
  public month;
  public day;
  public weekDay;
  public hours;
  public minutes;
  public period;

  private timeFormat;

  constructor() {}
  ngOnInit() {
    this.initializeWidget(1);
  }

  /*-------------------------------------------------------------------------|
  | Initializes the widget to populate the DOM with data from data.service.  |
  | -----------------------------------------------------------------------  |
  | @param {number} reload Number of seconds before the widget reloads       |
  |-------------------------------------------------------------------------*/
  initializeWidget(reload) {
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, reload * 1000);
  }

  /*-------------------------------------------------------------------------|
  | Fetches data from API by subscribing to data.service methods             |
  |-------------------------------------------------------------------------*/
  getTime() {
    this.timeFormat = '12hr';

    // Get current date
    const now = new Date();
    const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.formattedDate = now.toLocaleDateString('en-US');

    // Get month #
    this.month = monthArr[now.getMonth()];

    // Get day #
    this.day = now.getDate();

    // Get  weekday #
    this.weekDay = dayArr[now.getDay()];

    // Get current hours
    this.hours = now.getHours();

    // Format Hours
    if (this.timeFormat === '12hr') {
      // 12 hr clock mode
      if (this.hours > 12) {
        this.period = 'PM';
        this.hours = this.hours - 12;
      } else {
        this.period = 'AM';
      }
    } else if (this.timeFormat === '24hr') {
      // 24 hr clock mode
      this.period = '';
    }

    if (this.hours === 0) {
      this.hours = 12;
    }

    // Get current minutes
    this.minutes = now.getMinutes();

    // Format Minutes
    if (this.minutes < 10) {
      this.minutes = '0' + this.minutes;
    }
  }
}
