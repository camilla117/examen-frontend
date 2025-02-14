import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-nagevation',
  templateUrl: './barra-nagevation.component.html',
  styleUrls: ['./barra-nagevation.component.css']
})
export class BarraNagevationComponent implements OnInit {
  isLoggedIn = false;
  showAdminBoard = false;
  username: string = "";

  constructor(private router: Router) {    
  }

  pedidosPendientes() : number{
    return 5;
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('userLogged') || '';

    if(this.username == 'admin') this.showAdminBoard = true;
    else if(this.username != '') this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('clienteId');
    localStorage.removeItem('carrito');
    localStorage.removeItem('nombre');
    this.router.navigate([''])
  }
}
