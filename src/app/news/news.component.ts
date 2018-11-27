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
    this.getNews();

    setInterval(() => {
      this.getNews();
    }, 1800000);
  }

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
