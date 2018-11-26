import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private data: DataService) {}
  loggedIn = false;
  showLogin = true;
  activeUser;
  loginClass = 'animated fadeIn';
  widgetClass;

  ngOnInit() {
    this.data.getConfig();
  }

  isReady() {
    return this.data.loaded;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const eventKey = parseInt(event.key, 10);

    if ((eventKey >= 0 || eventKey <= 9) && !this.loggedIn && this.data.config.users[eventKey]) {
      this.loginClass = 'animated fadeOut';
      this.widgetClass = 'animated fadeIn delay-3s';
      this.data.setActiveUser(this.data.config.users[eventKey]);
      this.activeUser = this.data.activeUser;
      this.loggedIn = true;
    }

    if (event.key === ' ') {
      this.loginClass = 'animated fadeIn delay-1s';
      this.widgetClass = 'animated fadeOut';

      setTimeout(() => {
        this.loggedIn = false;
      }, 2000);
    }

    if (event.key === 'l') {
      this.showLogin = !this.showLogin;
      if (this.showLogin) {
        this.loginClass = 'animated fadeIn';
      } else {
        this.loginClass = 'animated fadeOut';
      }
    }
  }
}
