import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Clientes } from '../models/clientes';
import { Observable } from 'rxjs';
import * as myGlobals from '../globals'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  readonly url = myGlobals.APIUrl + "Clientes/";
  constructor(private http: HttpClient) { }

  getAllClientes() {
    
    return this.http.get<Array<Clientes>>(this.url)
  }

  public getCliente(id: string) {
    return this.http.get<Clientes>(this.url + id);
  }

  public postCliente(data: Clientes): Observable<any> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Clientes>(this.url, data, httpOptions);
  }

  putCliente(data: Clientes) {
    return this.http.put<Clientes>(this.url, data);
  }

  deleteCliente(id: string) {
    return this.http.delete<Clientes>(this.url + id);
  }
}
