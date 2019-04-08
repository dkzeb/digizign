import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveScreenComponent } from './live-screen/live-screen.component';
import { SlidesScreenComponent } from './slides-screen/slides-screen.component';
import { SetupScreenComponent } from './setup-screen/setup-screen.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { YtStreamComponent } from './yt-stream/yt-stream.component';

const routes: Routes = [

  { path: '', component: AppContainerComponent, children: [
    {
      path: '', component: SetupScreenComponent
    },
    {
      path: 'client', children: [
        { path: 'slides', component: SlidesScreenComponent },
        { path: 'live', component: LiveScreenComponent },
        { path: 'ytstream/:streamID', component: YtStreamComponent }
      ]
     // path: 'slides', component: SlidesScreenComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
