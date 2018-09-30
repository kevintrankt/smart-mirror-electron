import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiKey = '91279cebdc2b475e882b39c3fdddfc72';

  constructor(private http: HttpClient) {}
  getNews() {
    const url =
      'https://newsapi.org/v2/top-headlines?' +
      'country=us&' +
      'apiKey=91279cebdc2b475e882b39c3fdddfc72';

    console.log(url);
    return this.http.get(url);
  }
}
