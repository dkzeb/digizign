import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dzc-yt-stream',
  templateUrl: './yt-stream.component.html',
  styleUrls: ['./yt-stream.component.scss']
})
export class YtStreamComponent implements OnInit {

  embedId = 'M2xg1ghgJTE';
  streamURL;

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.embedId = this.route.snapshot.paramMap.get('streamID');

    this.streamURL = 'https://www.youtube.com/embed/' + this.embedId + '?controls=0&autoplay=1';
  }

}
