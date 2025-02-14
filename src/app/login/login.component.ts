import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ClientesService } from '../services/clientes.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Clientes } from '../models/clientes';
import { catchError, map, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showError = false;
  clienteselected: Clientes = {
    apellidos: '',
    direccion: '',
    nombre: '',
    password: '',
    usuario: '',
  }
  constructor(private loginService: LoginService, private clientesService: ClientesService, private router: Router) {
  }
  ngOnInit() {
  }

  async iniciarSesion(usuario:string, password:string){
    var clienteLogged;
    if (usuario == 'admin' && password == 'admin') {
      localStorage.setItem('userLogged', 'admin')
      this.router.navigate(['admin']);
    }
    else {
      
        await this.loginService.login(usuario, password).subscribe(
          (data: Clientes) => {
            console.log(data.nombre);
            if (data.nombre != undefined) {
              clienteLogged = { ...data};
              localStorage.setItem('userLogged', clienteLogged.usuario);
              localStorage.setItem('clienteId', clienteLogged.id ? clienteLogged.id : '');
              localStorage.setItem('nombre', clienteLogged.nombre + " " + clienteLogged.apellidos)
              this.router.navigate(['principal']);
            }
            else{
              this.showError = true;
            }          
          }
        )
    }
  }

  async crearCliente() {
    await this.clientesService.postCliente(this.clienteselected).subscribe(
      (data: Clientes) => {
        this.emptyData();
      }
    ) 
  }

  emptyData() {
    this.clienteselected.apellidos = '';
    this.clienteselected.direccion = '';
    this.clienteselected.nombre = '';
    this.clienteselected.password = '';
    this.clienteselected.usuario = '';
  };
}
