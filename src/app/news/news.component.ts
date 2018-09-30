import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news$;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.data
      .getNews()
      .subscribe(
        data => (this.news$ = data),
        error => console.log(error),
        () => console.log('news:', this.news$)
      );
  }
}
