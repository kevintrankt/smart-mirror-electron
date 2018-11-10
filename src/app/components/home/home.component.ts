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
  activeUser;

  ngOnInit() {
    this.data.getConfig();
  }

  isReady() {
    return this.data.loaded;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '0' && !this.loggedIn) {
      this.data.setActiveUser(this.data.config.users[0]);
      this.activeUser = this.data.activeUser;
      this.loggedIn = true;
    }

    if (event.key === '1' && !this.loggedIn) {
      this.data.setActiveUser(this.data.config.users[1]);
      this.activeUser = this.data.activeUser;

      this.loggedIn = true;
    }

    if (event.key === ' ') {
      this.loggedIn = false;
    }
  }
}
