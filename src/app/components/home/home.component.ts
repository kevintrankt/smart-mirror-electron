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

  ngOnInit() {
    this.data.getConfig();
  }

  isReady() {
    return this.data.loaded;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const eventKey = parseInt(event.key, 10);

    if (
      (eventKey >= 0 || eventKey <= 9) &&
      !this.loggedIn &&
      this.data.config.users[eventKey]
    ) {
      this.data.setActiveUser(this.data.config.users[eventKey]);
      this.activeUser = this.data.activeUser;
      this.loggedIn = true;
    }

    if (event.key === ' ') {
      this.loggedIn = false;
    }

    if (event.key === 'l') {
      this.showLogin = !this.showLogin;
    }
  }
}
