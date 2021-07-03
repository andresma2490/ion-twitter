import { Component, OnInit} from '@angular/core';
import { Tweet } from '@app/tweets/models/tweet';
import { TweetService } from '@app/tweets/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  newTweet = {} as Tweet;
  tweets = [];

  constructor(private tweetService:TweetService){
  }

  ngOnInit(): void {
    this.tweetService.getTweets().subscribe(tweets =>{
      this.tweets = tweets;
    });
  }
}
