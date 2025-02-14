import { Component } from '@angular/core';
import { Tiendas } from '../models/tiendas';
import { TiendasService } from '../services/tiendas.service';
import { ArticulosService } from '../services/articulos.service';
import { Articulos } from '../models/articulos';
import { ClienteArticulo } from '../models/clienteArticulo';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  clienteArticulos: Array<ClienteArticulo> =[];
  articulosCarrito: Array<Articulos> = [];
  articulos: Array<Articulos> = [];
  tiendas: Array<Tiendas> = [];
  modalTitle = "Añadir Articulo";
  articuloSelected: Articulos = {
    descripcion: '',
    imagen: '',
    nombre: '',
    precio: 0,
    stock: 0
  };
  imagenSelected: any = {};
  eliminarSelected: any;
  tiendaSelected? = 'asd';
  cantidadArticulo: Array<number> = [];

  
  constructor(private tiendasService: TiendasService, private articulosService: ArticulosService) {
  }

  ngOnInit() {
    this.getAlltiendas();
  }
  
  async getAlltiendas() {
    await this.tiendasService.getAllTiendas().subscribe(
      (data: Array<Tiendas>) => {
        this.tiendas = data;
        this.tiendaSelected = data[0].id;
        this.getAllArticulos();
      }
    );
  };

  anadirCarrito(id: any, index: any) {
    var clienteId = localStorage.getItem('clienteId');
    var item = this.articulos.filter(e => {
      return e.id == id
    });
    if (this.cantidadArticulo[index] != 0 && this.cantidadArticulo[index] != undefined) {
      if (this.cantidadArticulo[index] <= item[0].stock) {
        if (this.clienteArticulos.length > 0) {
          var itemExists = this.clienteArticulos.findIndex(e => {
            return e.articuloId == id;
          })
          if (itemExists != -1) {
            if (this.clienteArticulos[itemExists].cantidad + this.cantidadArticulo[index] <= item[0].stock) {
              this.clienteArticulos[itemExists].cantidad += this.cantidadArticulo[index];
              this.clienteArticulos[itemExists].total = this.clienteArticulos[itemExists].cantidad * item[0].precio
            }

          }
          else {
            this.clienteArticulos.push({
              articuloId: item[0].id,
              cantidad: this.cantidadArticulo[index],
              fecha: Date.now().toString(),
              total: this.cantidadArticulo[index] * item[0].precio,
              clienteId: clienteId ? clienteId : '',
              idCompra: '',
            })
          }
          
        }
        else {
          this.clienteArticulos.push({
            articuloId: item[0].id,
            cantidad: this.cantidadArticulo[index],
            fecha: Date.now().toString(),
            total: this.cantidadArticulo[index] * item[0].precio,
            clienteId: clienteId ? clienteId : '',
            idCompra: '',
          })
        }        
      }
      this.cantidadArticulo[index] = 0;
    }
    
    localStorage.setItem('carrito', JSON.stringify(this.clienteArticulos));
  }

  async getAllArticulos() {
    await this.articulosService.getAllArticulos(this.tiendaSelected).subscribe(
      (data: Array<Articulos>) => {
        this.articulos = data;
      }
    )
    
  };
}
