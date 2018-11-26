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

  ngOnInit() {
    this.data.getSubreddit().subscribe(
      data => {
        this.subData = data;
      },
      error => console.log(error),
      () => {
        this.posts = this.subData.data.children.slice(0, 8);
        console.log(this.posts);
      }
    );
  }
}
