import { Component } from '@angular/core';
import { TiendasService } from '../services/tiendas.service';
import { HttpResponse } from '@angular/common/http';
import { Tiendas } from '../models/tiendas';

@Component({
  selector: 'app-admin-tienda',
  templateUrl: './admin-tienda.component.html',
  styleUrls: ['./admin-tienda.component.css']
})
export class AdminTiendaComponent {
  tiendas: Array<Tiendas> = [];
  modalTitle = "Añadir tienda";
  tiendaSelected: Tiendas = {
    direccion: '',
    sucursal: '',
  };
  imagenSelected: any = {};
  eliminarSelected: any;

  constructor(private tiendasService: TiendasService) {
  }
  ngOnInit() {
    this.getAlltiendas();
  }

  setModalData(title: string) {
    if (title == '')
      this.modalTitle = title;
    else {
      this.modalTitle = title;
    }
  }

  async getAlltiendas() {
    await this.tiendasService.getAllTiendas().subscribe(
      (data: Array<Tiendas>) => {
        this.tiendas = data;
      }
    )
  };

  async eliminartienda(){
    await this.tiendasService.deleteTienda(this.eliminarSelected).subscribe(
      (data: any) => {
        this.getAlltiendas();
      }
    );
  };

  setEliminartienda(id: any) {
    this.modalTitle = "¿Eliminar tienda?";
    this.eliminarSelected = id;
  }

  async creartienda() {
    if (this.modalTitle == 'Añadir tienda') {
      console.log(this.tiendaSelected);
      await this.tiendasService.postTienda(this.tiendaSelected).subscribe(
        (data: Tiendas) => {
          this.emptyData();
          this.getAlltiendas();
        }
      )
    }
    else {
      await this.tiendasService.putTienda(this.tiendaSelected).subscribe(
        (data: Tiendas) => {
          this.emptyData();
          this.getAlltiendas();
        }
      )
    }
    
  }

  async editartienda(id: any) {
    this.modalTitle = "Editar tienda"
    var artSelected = this.tiendas.filter(art => {
      return art.id == id
    });


    this.tiendaSelected.direccion = artSelected[0].direccion;
    this.tiendaSelected.id = artSelected[0].id;
    this.tiendaSelected.sucursal = artSelected[0].sucursal;
  };

  emptyData() {
    this.imagenSelected = {}
    this.tiendaSelected.direccion = '';
    this.tiendaSelected.sucursal = '';
  }

}
