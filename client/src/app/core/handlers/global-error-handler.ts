import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackbarService } from "@app/core/services/snackbar.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 400:{
        this.snackbarService.error(error.error);
        break;
      }
      case 404: {
        this.router.navigate(['/404']);
        break;
      }
      default: {
        this.snackbarService.error('Unknown Error');
        console.error(error);
        break;
      }
    }
  }
}
