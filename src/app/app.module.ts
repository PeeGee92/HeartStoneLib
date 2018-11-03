import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './shared/sevice/fcm.service';
import { ToastService } from './shared/sevice/toast.service';

const config = {
  apiKey: "AIzaSyDDAUc-4niUBV50D8JsNYIDjyAXc8YOSWA",
  authDomain: "heartstonelib-eb82a.firebaseapp.com",
  databaseURL: "https://heartstonelib-eb82a.firebaseio.com",
  projectId: "heartstonelib-eb82a",
  storageBucket: "heartstonelib-eb82a.appspot.com",
  messagingSenderId: "617796222221"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    FcmService,
    ToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
