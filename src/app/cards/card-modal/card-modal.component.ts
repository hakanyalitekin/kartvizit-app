import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      name: ['', Validators.max(50)],
      title: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      address: ''
    });
  }

  addCard(): void {
    // console.log(this.cardForm.value);
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res: any) => {
        // console.log(res);
        this._snackBar.open(res ? 'Kayıt Başarılı' : 'Kaydetme başarısız.', '', {
          duration: 4000
        });
        this.dialogRef.close(true);
      });
  }

}
