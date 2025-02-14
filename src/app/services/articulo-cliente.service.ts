import { Injectable } from '@angular/core';
import { ClienteArticulo } from '../models/clienteArticulo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as myGlobals from '../globals'

@Injectable({
  providedIn: 'root'
})
export class ArticuloClienteService {
  readonly url = myGlobals.APIUrl + "ClienteArticulo/";
  constructor(private http: HttpClient) { }

  getAllArticulos(id: any) {
    
    return this.http.get<Array<ClienteArticulo>>(this.url + "list/" + id)
  }

  public getArticulo(id: string) {
    return this.http.get<ClienteArticulo>(this.url + id);
  }

  public postArticulo(data: ClienteArticulo): Observable<any> {
    console.log(data);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<ClienteArticulo>(this.url, data, httpOptions);
  }

  putArticulo(data: ClienteArticulo) {
    return this.http.put<ClienteArticulo>(this.url, data);
  }

  deleteArticulo(id: string, idTienda: any) {
    return this.http.delete<ClienteArticulo>(this.url);
  }
}
