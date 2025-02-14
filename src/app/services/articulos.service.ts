import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Articulos } from '../models/articulos';
import { Observable } from 'rxjs';
import * as myGlobals from '../globals'

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  readonly url = myGlobals.APIUrl + "Articulos/";
  constructor(private http: HttpClient) { }

  getAllArticulos(id: any) {
    
    return this.http.get<Array<Articulos>>(this.url + "list/" + id)
  }

  public getArticulo(id: string) {
    return this.http.get<Articulos>(this.url + id);
  }

  public postArticulo(data: Articulos, id: any): Observable<any> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Articulos>(this.url + id, data, httpOptions);
  }

  putArticulo(data: Articulos) {
    return this.http.put<Articulos>(this.url, data);
  }

  deleteArticulo(id: string, idTienda: any) {
    return this.http.delete<Articulos>(this.url + id + "/" + idTienda);
  }
}
