import { Component } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent {

  constructor(
    private cardService: CardService
  ) { }


  search(searchText: string): void {
    searchText = searchText.toLowerCase();
    this.cardService.filteredCards = this.cardService.cards.filter( (card) =>{
      // Yada koşulunda, name'in istisnası olduğu için öncesi varmı diye kontrol ettik. 
      //istisnasıda şu, name model içerisinde ? boş geçilebilir diye işaretli.
        return card.title.toLowerCase().indexOf(searchText) > -1 || (card.name && card.name.toLocaleLowerCase().indexOf(searchText) > -1);
    })
  }
}
