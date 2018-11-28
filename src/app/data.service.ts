import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
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
    const url = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=' + this.config.apiKeys.news;

    return this.http.get(url);
  }

  getWeather() {
    const location = this.activeUser.location;
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&APPID=${
      this.config.apiKeys.weather
    }`;
    return this.http.get(url);
  }

  getForecast() {
    const location = this.activeUser.location;
    const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${location},us&units=imperial
      &APPID=${this.config.apiKeys.weather}`;
    return this.http.get(url);
  }

  getSubreddit() {
    const sub = this.activeUser.subreddit;
    const url = `https://www.reddit.com/r/${sub}/hot/.json?count=5`;
    return this.http.get(url);
  }

  getNBA() {
    const apiKey = this.config.apiKeys.importio;
    const url = `https://extraction.import.io/query/extractor/10160086-45ae-4adb-a8a2-0053d8243d16?_apikey=
    ${apiKey}&url=http%3A%2F%2Fwww.espn.com%2Fnba%2Fscoreboard`;
  }

  getDuration() {
    const apiKey = this.config.apiKeys.importio;
    const destination = this.activeUser.destination;
    const url = `https://extraction.import.io/query/extractor/4f2527f9-d915-40c1-b157-2db7bb62299e?_apikey=${apiKey}&url=${destination}`;
    return this.http.get(url);
  }

  getCalendar() {
    const apiKey = this.config.apiKeys.importio;
    const cal = this.activeUser.calendar;
    const path = `https://kevintrankt.com/smart-mirror-cal-redirect/?cal=${cal}`;
    const url = `https://extraction.import.io/query/extractor/70608df1-74dd-4806-8a7d-41a6030ad1ad?_apikey=${apiKey}&url=${path}`;
    console.log(url);
    return this.http.get(url);
  }
}
