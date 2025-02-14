import { Component } from '@angular/core';
import { ArticulosService } from '../services/articulos.service';
import { TiendasService } from '../services/tiendas.service';
import { HttpResponse } from '@angular/common/http';
import { Articulos } from '../models/articulos';
import { Tiendas } from '../models/tiendas';

@Component({
  selector: 'app-admin-articulo',
  templateUrl: './admin-articulo.component.html',
  styleUrls: ['./admin-articulo.component.css']
})
export class AdminArticuloComponent {
  articulos: Array<Articulos> = [];
  tiendas: Array<Tiendas> = []
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

  constructor(private articulosService: ArticulosService, private tiendasService: TiendasService) {
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
        this.tiendaSelected = data[0].id;
        this.getAllArticulos();
      }
    );
    
  };

  async getAllArticulos() {
    await this.articulosService.getAllArticulos(this.tiendaSelected).subscribe(
      (data: Array<Articulos>) => {
        this.articulos = data;
      }
    )
    
  };

  async eliminarArticulo(){
    await this.articulosService.deleteArticulo(this.eliminarSelected, this.tiendaSelected).subscribe(
      (data: any) => {
        this.getAllArticulos();
      }
    );
  };

  setEliminarArticulo(id: any) {
    this.modalTitle = "¿Eliminar articulo?";
    this.eliminarSelected = id;
  }

  async crearArticulo() {
    if (this.modalTitle == 'Añadir Articulo') {
      await this.articulosService.postArticulo(this.articuloSelected, this.tiendaSelected).subscribe(
        (data: Articulos) => {
          this.emptyData();
          this.getAllArticulos();
        }
      )
    }
    else {
      await this.articulosService.putArticulo(this.articuloSelected).subscribe(
        (data: Articulos) => {
          this.emptyData();
          this.getAllArticulos();
        }
      )
    }
    
  }

  async editarArticulo(id: any) {
    this.modalTitle = "Editar Articulo"
    var artSelected = this.articulos.filter(art => {
      return art.id == id
    });


    this.articuloSelected.descripcion = artSelected[0].descripcion;
    this.articuloSelected.id = artSelected[0].id;
    this.articuloSelected.imagen = artSelected[0].imagen;
    this.articuloSelected.nombre = artSelected[0].nombre;
    this.articuloSelected.precio = artSelected[0].precio;
    this.articuloSelected.stock = artSelected[0].stock;
    
  };

  selectedFile(event: any) {
    var files = event.target.files;
    const file: File | null = files.item(0);
    this.toBase64(file).then( data => {
      this.articuloSelected.imagen = data
      this.imagenSelected = data
    });
  };

  toBase64(file:any) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = error => reject(error)
    })
  }

  emptyData() {
    this.imagenSelected = {}
    this.articuloSelected.descripcion = '';
    this.articuloSelected.imagen = '';
    this.articuloSelected.nombre = '';
    this.articuloSelected.precio = 0;
    this.articuloSelected.stock = 0;
  }

  dataURLToFile(dataurl: any){
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], 'arhivo', {type:mime});
  }
}
