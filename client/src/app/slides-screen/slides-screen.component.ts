import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'dzc-slides-screen',
  templateUrl: './slides-screen.component.html',
  styleUrls: ['./slides-screen.component.scss']
})
export class SlidesScreenComponent implements OnInit {

  slidesToShow = [];

  config = {
    width: '100vw',
    height: '100vh',
    autoPlay: true,
    delay: 10000
  };

  constructor(private api: ApiService) { }


  ngOnInit() {
    // load slides from the server
    this.api.getSlides().subscribe((r: any[]) => {
      r.forEach(s => {
        this.slidesToShow.push({
          image: '/api/slide/' + s.filename,
          title: ''
        });
      });
    });
  }

}
