import { Component } from '@angular/core';
import { FavoriteCardStore } from '../shared/card-favorite.store';
import { Subscription } from 'rxjs';
import { Card } from '../shared/card.model';

@Component({
    selector: 'app-card-favorite',
    templateUrl: './card-favorite.page.html',
    styleUrls: ['../card-listing/card-listing.page.scss']
})

export class CardFavoritePage {

    favoriteCardList:Card[] = [];

    favoriteCardSub: Subscription

    constructor (private favoriteStore: FavoriteCardStore) {
        this.favoriteCardSub = this.favoriteStore.favoriteCards.subscribe(
            (favoriteCards: any) => {
              this.favoriteCardList = this.getFavoriteCardList(favoriteCards);
              console.log(this.favoriteCardList);
            }
          );
    }

    private getFavoriteCardList(favoriteCards: any): Card[] {
        if (favoriteCards) {
            return Object.keys(favoriteCards)
                         .filter(key => favoriteCards[key])
                         .map(key => favoriteCards[key]);
        }
        
        return [];
    }

    ionViewDidLeave() {
        if(this.favoriteCardSub && !this.favoriteCardSub.closed) {
          this.favoriteCardSub.unsubscribe();
        }
    }

    favoriteCard(card: Card) {
        this.favoriteStore.toggleCard(card);
    }
}