import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado';

      if(error.error instanceof ErrorEvent){

        errorMessage = `Error: ${error.error.message}`;
      }else{
        errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
      }

      console.error(errorMessage);
      return throwError(() => new Error(errorMessage)) 
    })
  );
};
