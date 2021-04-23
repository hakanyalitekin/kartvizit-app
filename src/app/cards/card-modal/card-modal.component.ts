import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) { }

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [this.data?.title || '', Validators.required],
      phone: [this.data?.phone || '', Validators.required, Validators.maxLength(20)],
      email: [this.data?.email || '', Validators.email],
      address: this.data?.address || ''
    });
  }

  addCard(): void {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value)
      .subscribe(
        (res: any) => {
          this.getSuccess(res ? 'Kayıt başarılı ID->' + res.id : 'Kaydetme başarısız.');
        },
        (err: any) => {
          this.getError(err.message || 'Bir hata oluştu.');
        });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value, this.data.id)
      .subscribe(
        (res: any) => {
          this.getSuccess(res ? 'Güncelleme işlemi başarılı' : 'Güncelleme işlemi başarısız');
        },
        (err: any) => {
          this.getError(err.message || 'Bir hata oluştu.');
        });
  }

  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.data.id)
      .subscribe(
        (res: any) => {
          this.getSuccess(res ? 'Silme işlemi başarılı' : 'Silme işlemi başarısız');
        },
        (err: any) => {
          this.getError(err.message || 'Bir hata oluştu.');
        });
  }

  getSuccess(message: string): void {
    // this._snackBar.open(message, 'Kapat', {
    //   duration: 4000
    // });
    this.snackbarService.createSnacbar('success',message);
    this.showSpinner = false;
    this.cardService.getCards();
    this.dialogRef.close();
  }

  getError(message: string) {   
     this.snackbarService.createSnacbar('error', message);

    this.showSpinner = false;
  }
}
