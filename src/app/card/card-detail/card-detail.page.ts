import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../shared/card.model';
import { CardService } from '../shared/card.service';
import { LoaderService } from '../../shared/sevice/loader.service';
import { AlertService } from '../../shared/sevice/alert.service';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.page.html',
    styleUrls: ['./card-detail.page.scss']
})

export class CardDetailPage {
    cardId: string;
    card: Card;

    constructor(private route: ActivatedRoute, 
                private cardService: CardService, 
                private loaderService: LoaderService,
                private alertService: AlertService) {}

    ionViewWillEnter() {
        this.cardId = this.route.snapshot.paramMap.get('cardId');

        this.loaderService.presentLoading();
        this.cardService.getCardById(this.cardId).subscribe(
            (card: Card[]) => {
                this.card = card.map((card:Card) => {
                    card.text = this.cardService.replaceCardTextLine(card.text);

                    return card;
                })[0];

                this.loaderService.dismissLoading();

                // this.alertService.presentAlert('Success', 'Card Found!');
            }
        );
    }

    updateImage(event) {
        this.card.img = 'assets/images/DefaultCard.png';
    }
}
