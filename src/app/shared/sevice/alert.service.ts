import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertService {

  constructor(public alertController: AlertController) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
    }
}