import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiKeyNews = '91279cebdc2b475e882b39c3fdddfc72';
  private apiKeyWeather = '3d8f7518c1741667d8504e582c155583';

  config;
  loaded = false;
  activeUser;

  constructor(private http: HttpClient) {}

  setActiveUser(user) {
    this.activeUser = user;
  }

  getConfig() {
    const parent = this;
    return this.http.get('assets/config.json').subscribe(data => {
      parent.config = data;
      parent.loaded = true;
    });
  }
  getNews() {
    const url =
      'https://newsapi.org/v2/top-headlines?' +
      'country=us&' +
      'apiKey=' +
      this.config.apiKeys.news;

    return this.http.get(url);
  }

  getWeather() {
    const location = this.activeUser.location;
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&APPID=${
      this.config.apiKeys.weather
    }`;
    return this.http.get(url);
  }

  getCalendar() {
    const client_id = this.config.apiKeys.cal_client;
    const api_key = this.config.apiKeys.cal;
  }
}
