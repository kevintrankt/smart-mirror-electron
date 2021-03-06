import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news$;
  articles;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.initializeWidget(60);
  }

  /*-------------------------------------------------------------------------|
  | Initializes the widget to populate the DOM with data from data.service.  |
  | -----------------------------------------------------------------------  |
  | @param {number} reload Number of seconds before the widget reloads       |
  |-------------------------------------------------------------------------*/
  initializeWidget(reload) {
    this.getNews();
    setInterval(() => {
      this.getNews();
    }, reload * 1000);
  }

  /*-------------------------------------------------------------------------|
  | Fetches data from API by subscribing to data.service methods             |
  |-------------------------------------------------------------------------*/
  getNews() {
    this.data.getNews().subscribe(
      data => {
        this.news$ = data;
      },
      error => console.log(error),
      () => {
        this.articles = this.news$.articles.slice(0, 6);
      }
    );
  }
}
