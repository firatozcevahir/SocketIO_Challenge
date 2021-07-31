import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";


@Injectable({ providedIn: 'root' })
export class SnackbarService {

  private config: MatSnackBarConfig = {
    duration: 2000,
    verticalPosition: 'bottom',
    horizontalPosition: 'end'
  };

  constructor(
    private snackbar: MatSnackBar,
    private zone: NgZone
  ) { }

  public error(msg: string): void {
    this.config.panelClass =  ['error-snackbar'];
    this.open(msg);
  }

  public success(msg: string): void {
    this.config.panelClass =  ['success-snackbar'];
    this.open(msg);
  }

  private open(msg: string): void {
    this.zone.run(() =>{
      this.snackbar.open(msg, undefined, this.config);
    });
  }
}
