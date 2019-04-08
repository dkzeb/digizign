import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// import icons that we need
import { faRetweet, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { AppRoutingModule } from './app-routing.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { LiveScreenComponent } from './live-screen/live-screen.component';
import { SlidesScreenComponent } from './slides-screen/slides-screen.component';
import { NgxSlidesModule } from 'ngx-slides';
import { SetupScreenComponent } from './setup-screen/setup-screen.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { YtStreamComponent } from './yt-stream/yt-stream.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { environment } from '../environments/environment';
const socketConfig = { url: environment.apiURL + '/sockets/client', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LiveScreenComponent,
    SlidesScreenComponent,
    SetupScreenComponent,
    AppContainerComponent,
    YtStreamComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxSlidesModule,
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faRetweet, faHeart, faTwitter, faInstagram);
  }
}
