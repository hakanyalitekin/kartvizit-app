import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  createSnacbar(type:string, message:string, duration:number = 4000){
    this.snackBar.open(message, '', {
      duration: duration,
      panelClass: type
    });
  }
}
