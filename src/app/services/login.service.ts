import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Clientes } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string) {
    var url = "http://localhost:5098/api/Clientes/login?Usuario=" + usuario + "&Password=" + password;
    return this.http.get<Clientes>(url)
  }
}
