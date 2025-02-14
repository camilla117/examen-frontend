import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {

  constructor() { }

  catchBadResponse: (errorResponse: any) => Observable<any> = (
    errorResponse: any
  ) => {
    let res = <HttpErrorResponse>errorResponse;
    let err = res;
    let emsg = err
      ? err.error
        ? err.error
        : JSON.stringify(err)
      :res.statusText || 'unkown error';
      return of(emsg);
  };
}
