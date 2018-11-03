import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './shared/sevice/fcm.service';
import { ToastService } from './shared/sevice/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcmService: FcmService,
    private toastService: ToastService
  ) {
    this.initializeApp();
    this.notificationSetup();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private notificationSetup() {
    this.fcmService.getToken();
    this.fcmService.onNotifications().subscribe(
      (msg) => {
        this.toastService.presentToast(msg.body);
      }
    );
  }
}
