import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Clientes } from '../models/clientes';
import { Observable, catchError, finalize, map } from 'rxjs';
import { ExceptionService } from './exception.service';
import * as myGlobals from '../globals'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private exceptionService: ExceptionService) { }

  login(usuario: string, password: string) {
    var url = myGlobals.APIUrl + "Clientes/login?Usuario=" + usuario + "&Password=" + password;

    return <Observable<Clientes>>(
      this.http.get(url).pipe(
        map((res: any) => <Clientes>res),
        catchError(this.exceptionService.catchBadResponse),
        finalize(() => console.log('done'))
      )
    );

    // return this.http.get<Clientes>(url)
  }
}
