import { Component } from '@angular/core';
import { Pedidos } from '../models/pedidos';
import { Articulos } from '../models/articulos';
import { Tiendas } from '../models/tiendas';
import { ClienteArticulo } from '../models/clienteArticulo';
import { ArticulosService } from '../services/articulos.service';
import { TiendasService } from '../services/tiendas.service';
import { ArticuloClienteService } from '../services/articulo-cliente.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  articulos: Array<Articulos> = [];
  tiendas: Array<Tiendas> = [];
  clienteArticulo: Array<ClienteArticulo> = [];
  pedidos: Array<Pedidos> = [];
  totalCompra: number = 0;
  nombreCliente = '';
  disabled = false;

  constructor(private articulosService: ArticulosService, private tiendasService: TiendasService,
    private articuloClienteService: ArticuloClienteService,
  ) {    
  }

  ngOnInit() {
    this.setTiendas();
  }

  async setArticulos() {
    this.tiendas.forEach(element => {
      this.articulosService.getAllArticulos(element.id).subscribe(
        (dataArt: Array<Articulos>) => {
          dataArt.forEach(art => {
            this.articulos.push(art);
          });
          this.setPedidos();
        }
      )
    });
  }

  async setTiendas() {
    await this.tiendasService.getAllTiendas().subscribe(
      (data: Array<Tiendas>) => {
        this.tiendas = data;
        this.setArticulos();
      }
    )
  }

  comprar() {
    var idCompra = crypto.randomUUID();
    this.clienteArticulo.forEach(element => {
      var compra: ClienteArticulo = {
        cantidad: element.cantidad,
        total: element.total,
        idCompra: idCompra,
        articuloId: element.articuloId,
        clienteId: element.clienteId,
      };
      this.articuloClienteService.postArticulo(compra).subscribe(
        e => {
          localStorage.removeItem('carrito');
        }
      );
    })
  }

  setPedidos() {
    var carrito = JSON.parse(localStorage['carrito']);
    this.clienteArticulo = carrito;
    this.clienteArticulo.forEach(element => {
      var articulo = this.articulos.filter(e => {
        return e.id == element.articuloId;
      })
      this.pedidos.push({
        articulo: {
          descripcion: articulo[0].descripcion,
          imagen: articulo[0].imagen,
          nombre: articulo[0].nombre,
          precio: articulo[0].precio,
          stock: articulo[0].stock,
          id: articulo[0].id,
        },
        clienteArticulo: {
          cantidad: element.cantidad,
          fecha: element.fecha,
          total: element.total,
          articuloId: element.articuloId,
          clienteId: element.clienteId,
          id: element.id,
          idCompra: ''
        }
      });
      this.totalCompra += element.total;
      this.nombreCliente = localStorage['nombre'];
      this.disabled = true;
    });
  }

  removeItem(id: any, index: any){
    this.clienteArticulo.splice(index,1);
    localStorage.setItem('carrito', JSON.stringify(this.clienteArticulo));
    this.pedidos = [];
    this.setPedidos();
  }

}
