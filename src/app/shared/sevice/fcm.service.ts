import { Injectable } from "@angular/core";
import { Firebase } from "@ionic-native/firebase/ngx";
import { AngularFirestore } from "@angular/fire/firestore";
import { Platform } from "@ionic/angular";

@Injectable()
export class FcmService {
    constructor(private firebase: Firebase,
                private angularFirestore: AngularFirestore,
                private platform: Platform) {}

    async getToken() {
        let token;
            
        if (this.platform.is('android')) {
            token = await this.firebase.getToken();
        }

        if (this.platform.is('ios')) {
            token = await this.firebase.getToken();
            await this.firebase.grantPermission();
        }

        this.saveToken(token);
    }

    saveToken(token) {
        if (!token) return;

        const devicesRef = this.angularFirestore.collection('devices');

        const data = {
            token,
            userId: 'testId'
        };

        return devicesRef.doc(token).set(data);
    }

    onNotifications() {
        return this.firebase.onNotificationOpen();
    }
}