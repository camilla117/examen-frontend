import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { BarraNagevationComponent } from './barra-nagevation/barra-nagevation.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoDetallesComponent } from './producto-detalles/producto-detalles.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { AdminTiendaComponent } from './admin-tienda/admin-tienda.component';
import { AdminArticuloComponent } from './admin-articulo/admin-articulo.component';
import { AdminClienteComponent } from './admin-cliente/admin-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { AdminPrincipalComponent } from './admin-principal/admin-principal.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BarraNagevationComponent,
    PrincipalComponent,
    ProductosComponent,
    ProductoDetallesComponent,
    PedidosComponent,
    AdminBoardComponent,
    AdminTiendaComponent,
    AdminArticuloComponent,
    AdminClienteComponent,
    AdminPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
