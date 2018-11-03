import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';
import { Card } from '../shared/card.model';
import { LoaderService } from '../../shared/sevice/loader.service';
import { ToastService } from '../../shared/sevice/toast.service';
import { Storage } from '@ionic/storage';
import { FavoriteCardStore } from '../shared/card-favorite.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage {
  cardDeckGroup: string;
  cardDeck: string;
  cards: Card[] = [];
  copyOfCards: Card[] = [];

  favoriteCards: any = {};

  isLoading: boolean = false;

  favoriteCardSub: Subscription;

  constructor(private route:ActivatedRoute, 
              private cardService: CardService, 
              private loaderService: LoaderService,
              private toastService: ToastService,
              private storage: Storage,
              private favoriteStore: FavoriteCardStore) {

    this.favoriteCardSub = this.favoriteStore.favoriteCards.subscribe(
      (favoriteCards: any) => {
        this.favoriteCards = favoriteCards;
      }
    );

  }

  ionViewDidLeave() {
    if(this.favoriteCardSub && !this.favoriteCardSub.closed) {
      this.favoriteCardSub.unsubscribe();
    }
  }

  private getCards() {
    this.loaderService.presentLoading();

    this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck).subscribe(
      (cards: Card[]) => {
        this.cards = cards.map((card:Card) => {
          card.text = this.cardService.replaceCardTextLine(card.text);
          card.favortie = this.isCardFavorite(card.cardId);
          
          return card;
        });

        this.copyOfCards = Array.from(this.cards);

        this.loaderService.dismissLoading();
      }, () => {
        this.loaderService.dismissLoading();
        this.toastService.presentErrorToast("Oops card couldn\'t be loaded, try to refresh the page");
      }
    )
  }

  private isCardFavorite(cardId: string): boolean {
    const card = this.favoriteCards[cardId];

    return card ? true : false;
  }

  ionViewWillEnter() {
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck');

    if (this.cards && this.cards.length === 0) this.getCards();
  }

  doRefresh(event) {
    this.getCards();
    event.target.complete();
  }

  hydrateCards(cards: Card[]) {
    this.cards = cards;
    this.isLoading = false;
  }

  handleSpinner() {
    this.isLoading = true;
  }

  favoriteCard(card: Card) {
    this.favoriteStore.toggleCard(card);
  }
}
