import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

import { fadeInUpOnEnterAnimation, bounceInUpOnEnterAnimation } from 'angular-animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dzc-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.scss'],
  animations: [
    fadeInUpOnEnterAnimation(),
    bounceInUpOnEnterAnimation()
  ]
})
export class AppContainerComponent implements OnInit {


  showAnnouncement = false;
  announcementTitle = '';
  announcementHTML = '';

  constructor(private socket: Socket, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('App was initated!');

    this.socket.fromEvent('message').subscribe((r: string) => {
      console.log('We got message from server', r);
      // handle "location" commands
      if (r.indexOf('location:') > -1) {
        const newLocation = r.split('location: ')[1];
        console.log('we are currently at', this.router.url);

        if (newLocation.indexOf('ytstream') >= 0 && this.router.url.indexOf('ytstream') >= 0) {
          // if we are already on stream return and do nothing
          return;
        }

        if (newLocation !== this.router.url) {
          this.router.navigateByUrl(newLocation);
        } else {
          console.log('Already at location, abort navigation');
        }

      }

      if (r.indexOf('reload: ') > -1) {
        console.log('Reload command requested');
        window.location.reload();
      }

      if (r.indexOf('announce: ') === 0) {
        let announceObj: any = r.replace('announce: ', '');
        announceObj = JSON.parse(announceObj);
        console.log('AnnounceObj', announceObj);
        this.announcementTitle = announceObj.title;
        this.announcementHTML = announceObj.content;
        this.showAnnouncement = true;
        setTimeout(() => {
          this.showAnnouncement = false;
        }, parseInt(announceObj.duration, 10) * 1000);
      }
    });

  }

}
