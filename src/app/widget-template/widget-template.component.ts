import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-template',
  templateUrl: './widget-template.component.html',
  styleUrls: ['./widget-template.component.scss']
})
export class WidgetTemplateComponent implements OnInit {
  public formattedDate;
  public hours;
  public minutes;
  public period;

  // TODO: Create config file to hold timeFormat
  private timeFormat;

  constructor() {
    // TODO: Create config file to hold timeFormat
    this.timeFormat = '12hr';

    // Update time every second
    setInterval(() => {
      // Get current date
      let now = new Date();
      this.formattedDate = now.toLocaleDateString('en-US');

      // Get current hours
      this.hours = now.getHours();

      if (this.timeFormat == '12hr') {
        // 12 hr clock mode
        if (this.hours > 12) {
          this.period = 'PM';
          this.hours = this.hours - 12;
        } else {
          this.period = 'AM';
        }
      } else if (this.timeFormat == '24hr') {
        // 24 hr clock mode
        this.period = '';
      }

      // Get current minutes
      this.minutes = now.getMinutes();
    }, 1);
  }

  ngOnInit() {}
}
