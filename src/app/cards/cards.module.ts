import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { MatCardModule } from '@angular/material/card';
import { CardItemComponent } from './card-item/card-item.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CardModalComponent } from './card-modal/card-modal.component';


@NgModule({
  declarations: [
    CardsComponent,
    CardItemComponent,
    CardModalComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class CardsModule { }
