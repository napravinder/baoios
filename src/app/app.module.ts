import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';

import { HttpClientModule } from '@angular/common/http';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalPageModule } from './modal/modal.module';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { IntroSliderComponent } from './intro-slider/intro-slider.component';
import Swiper from 'swiper';




@NgModule({
  declarations: [AppComponent,IntroSliderComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalPageModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClientModule,
    VideoPlayer,
    InAppBrowser,
    Camera,File,Keyboard,

  ],
  bootstrap: [AppComponent,],
})
export class AppModule { }
