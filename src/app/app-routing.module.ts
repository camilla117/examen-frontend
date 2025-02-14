import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoDetallesComponent } from './producto-detalles/producto-detalles.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { AdminArticuloComponent } from './admin-articulo/admin-articulo.component';
import { AdminClienteComponent } from './admin-cliente/admin-cliente.component';
import { AdminTiendaComponent } from './admin-tienda/admin-tienda.component';
import { AdminPrincipalComponent } from './admin-principal/admin-principal.component';
import { authGuard } from './guards/modulo.guard';
import { authAdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent, canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'catalogo',
        pathMatch: 'full',
      },
      {
        path: 'catalogo',
        component: ProductosComponent,
        canActivate: [authGuard]
      },
      {
        path: 'producto-detalle/:id',
        component: ProductoDetallesComponent,
        canActivate: [authGuard]
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        canActivate: [authGuard]
      }
      
    ]
  },
  { path: 'admin', component: AdminPrincipalComponent,
    canActivate: [authAdminGuard],
    children: [
      { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: 'admin', redirectTo: 'settings', pathMatch: 'full' },
      { path: 'settings', component: AdminBoardComponent,
        canActivate: [authAdminGuard]},
      { path: 'articulo', component: AdminArticuloComponent,
        canActivate: [authAdminGuard] },
      { path: 'cliente', component: AdminClienteComponent,
        canActivate: [authAdminGuard] },
      { path: 'tienda', component: AdminTiendaComponent,
        canActivate: [authAdminGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
