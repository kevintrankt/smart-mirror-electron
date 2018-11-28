import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.scss']
})
export class SubredditComponent implements OnInit {
  constructor(private data: DataService) {}
  subData;
  posts;
  sub = this.data.activeUser.subreddit;
  showScore = false;

  ngOnInit() {
    this.initializeWidget(60);
  }
  /*-------------------------------------------------------------------------|
  | Initializes the widget to populate the DOM with data from data.service.  |
  | -----------------------------------------------------------------------  |
  | @param {number} reload Number of seconds before the widget reloads       |
  |-------------------------------------------------------------------------*/
  initializeWidget(reload) {
    this.getSubreddit();
    setInterval(() => {
      this.getSubreddit();
    }, reload * 1000);
  }

  /*-------------------------------------------------------------------------|
  | Fetches data from API by subscribing to data.service methods             |
  |-------------------------------------------------------------------------*/
  getSubreddit() {
    this.data.getSubreddit().subscribe(
      data => {
        this.subData = data;
      },
      error => console.log(error),
      () => {
        this.posts = this.subData.data.children.slice(0, 8);

        // Convert numbers larger than 10,000
        this.posts.map(x => {
          let score = x.data.score;
          if (score > 10000) {
            score = (score / 1000).toFixed(2) + 'k';
          }
          return (x.data.score = score);
        });
      }
    );
  }
}
