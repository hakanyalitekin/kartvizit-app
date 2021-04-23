import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) { }

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.max(50)],
      title: [this.data?.title || '', Validators.required],
      phone: [this.data?.phone || '', Validators.required],
      email: [this.data?.email || '', Validators.email],
      address: this.data?.address || ''
    });
  }

  addCard(): void {
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res: any) => {
        this._snackBar.open(res ? 'Kayıt başarılı ID->' + res.id : 'Kaydetme başarısız.', '', {
          duration: 4000
        });
        this.cardService.getCards();
        this.dialogRef.close();
      });
  }

  updateCard(): void {

    this.cardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe((res: any) => {
        this._snackBar.open(res ? 'Güncelleme başarılı' : 'Güncelleme başarısız.', '', {
          duration: 4000
        });
        this.cardService.getCards();
        this.dialogRef.close();
      });
  }

}
