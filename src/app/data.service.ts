import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiKeyNews = '91279cebdc2b475e882b39c3fdddfc72';
  private apiKeyWeather = '3d8f7518c1741667d8504e582c155583';

  constructor(private http: HttpClient) {}
  getNews() {
    const url =
      'https://newsapi.org/v2/top-headlines?' +
      'country=us&' +
      'apiKey=' +
      this.apiKeyNews;

    console.log(url);
    return this.http.get(url);
  }

  getWeather() {
    const url =
      'http://api.openweathermap.org/data/2.5/weather?zip=95112,us&units=imperial&APPID=' +
      this.apiKeyWeather;
    console.log(url);
    return this.http.get(url);
  }
}
