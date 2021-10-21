import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  showSuccess(message: string)
  {
    this._snackBar.open(message, '', {
      duration: 5000,
      panelClass: 'green-snackbar',
   });
  }

  showError(message: string) {
    this._snackBar.open(message, '', {
      duration: 5000,
      panelClass: 'red-snackbar',
   });
  }

  showInfo(message: string) {
    this._snackBar.open(message)
  }

  showWarning(message: string) {
    this._snackBar.open(message)
  }
}
