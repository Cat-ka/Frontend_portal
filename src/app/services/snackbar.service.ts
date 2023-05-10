import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  //ak bude error tak sa zobrazí black-snackbar a ak bude hociaká iná akcia tak sa zobrazí green-snackbar do ktorých 
  //pošleme nejakú správu

  openSnackBar(message: string, action: string) {
    if (action === 'error') {
      this.snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['black-snackbar']
        //black/snackbar sme vybrali zo suboru style.css
      });
    } else {
      this.snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['green-snackbar']
      });
    }
  }
}
