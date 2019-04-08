import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../services/api.service';
import { Socket } from 'ngx-socket-io';


import { environment } from '../../environments/environment';

@Component({
  selector: 'dzc-live-screen',
  templateUrl: './live-screen.component.html',
  styleUrls: ['./live-screen.component.scss']
})
export class LiveScreenComponent implements OnInit {

  tags: Tag[] = [
    {
      image: 'http://zebweb.dk/old/auhack/img/twitter.png',
      tagText: '#auhack19'
    }
  ];

  apiTime;

  eventTitle = environment.eventTitle;
  currentTime;
  tweets = [];

  activeTweet: any = {};

  constructor(private api: ApiService) { }

  ngOnInit() {

    this.api.getTime().subscribe((r: any) => {
      this.apiTime = moment(r.currentDateTime);
      console.log('Current Time', this.apiTime);
    });
    // timer
    setInterval(() => {
      this.currentTime = this.apiTime.add(1, 'seconds').format('dddd, Do MMMM YYYY, HH:mm:ss');
    }, 1000);

    // hent tweets fra serveren
    this.api.getTweets().subscribe((r: any) => {
      console.log('Tweets', r);
      this.tweets = r;
      const firstIndex = Math.floor(Math.random() * r.length);
      this.activeTweet = this.tweets[firstIndex];
    });

    setInterval(() => {
      if(this.tweets.length > 0) {
        const index = Math.floor(Math.random() * this.tweets.length);
        this.activeTweet = this.tweets[index];
      }
    }, 10000);
  }

}
