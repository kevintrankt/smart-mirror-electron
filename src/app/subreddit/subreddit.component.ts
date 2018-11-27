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
    this.data.getSubreddit().subscribe(
      data => {
        this.subData = data;
      },
      error => console.log(error),
      () => {
        this.posts = this.subData.data.children.slice(0, 8);

        console.log(this.posts);

        // Convert numbers larger than 10,000
        this.posts.map(x => {
          let score = x.data.score;
          if (score > 10000) {
            score = (score / 1000).toFixed(2) + 'k';
          }
          return (x.data.score = score);
        });

        // Shorten posts
        // this.posts.map(x => (x.data.selftext = x.data.selftext.substring(0, 100)));
      }
    );
  }
}
