import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient
  ) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl + '/cards');
  }

  addCard(card: Card) {
    return this.http.post(this.apiUrl + '/cards', card);
  }
}
