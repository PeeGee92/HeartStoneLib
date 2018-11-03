import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

    private loader: HTMLIonLoadingElement;

    constructor(private loadingCtrl: LoadingController) {}

    public async presentLoading(): Promise<HTMLIonLoadingElement> {
        this.loader = await this.loadingCtrl.create({
            message: 'Loading',
            translucent: true
        });
      
        this.loader.present();
    
        return this.loader;
    }

    public async dismissLoading() {
        if (this.loader) {
            this.loader.dismiss();
        }
    }

}