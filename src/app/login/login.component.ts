import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpResponse } from '@angular/common/http';
import { Clientes } from '../models/clientes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private loginService: LoginService, private router: Router) {
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
          clienteLogged = { ...data};
          localStorage.setItem('userLogged', clienteLogged.usuario)
          this.router.navigate(['principal']);
        }
      );
    }
  }
}
