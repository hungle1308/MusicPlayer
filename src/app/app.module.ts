import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Media } from '@ionic-native/media/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';
firebase.initializeApp({
  apiKey: "AIzaSyAklpm3QQH7f7I-B3OoEv3a_3tURldX4fw",
    authDomain: "grandviewapp-fd2b5.firebaseapp.com",
    databaseURL: "https://grandviewapp-fd2b5.firebaseio.com",
    projectId: "grandviewapp-fd2b5",
    storageBucket: "grandviewapp-fd2b5.appspot.com",
    messagingSenderId: "877631005570",
    appId: "1:877631005570:web:818c21ba3ed6b475"
});


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Chooser,
    File, FileChooser, Media, InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
