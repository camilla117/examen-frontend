import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Tiendas } from '../models/tiendas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendasService {
  readonly url = "http://localhost:5098/api/Tienda/"
  constructor(private http: HttpClient) { }

  getAllTiendas() {
    
    return this.http.get<Array<Tiendas>>(this.url)
  }

  public getTienda(id: string) {
    return this.http.get<Tiendas>(this.url + id);
  }

  public postTienda(data: Tiendas): Observable<any> {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Tiendas>(this.url, data, httpOptions);
  }

  putTienda(data: Tiendas) {
    return this.http.put<Tiendas>(this.url, data);
  }

  deleteTienda(id: string) {
    return this.http.delete<Tiendas>(this.url + id);
  }
}
