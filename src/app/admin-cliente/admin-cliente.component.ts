import { Component } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { HttpResponse } from '@angular/common/http';
import { Clientes } from '../models/clientes';

@Component({
  selector: 'app-admin-cliente',
  templateUrl: './admin-cliente.component.html',
  styleUrls: ['./admin-cliente.component.css']
})
export class AdminClienteComponent {
  clientes: Array<Clientes> = [];
  modalTitle = "Añadir Cliente";
  clienteselected: Clientes = {
    apellidos: '',
    direccion: '',
    nombre: '',
    password: '',
    usuario: ''
  };
  imagenSelected: any = {};
  eliminarSelected: any;

  constructor(private clientesService: ClientesService) {
  }
  ngOnInit() {
    this.getAllclientes();
  }

  setModalData(title: string) {
    if (title == '')
      this.modalTitle = title;
    else {
      this.modalTitle = title;
    }
  }

  async getAllclientes() {
    await this.clientesService.getAllClientes().subscribe(
      (data: Array<Clientes>) => {
        this.clientes = data;
      }
    )
  };

  async eliminarCliente(){
    await this.clientesService.deleteCliente(this.eliminarSelected).subscribe(
      (data: any) => {
        this.getAllclientes();
      }
    );
  };

  setEliminarCliente(id: any) {
    this.modalTitle = "¿Eliminar Cliente?";
    this.eliminarSelected = id;
  }

  async crearCliente() {
    if (this.modalTitle == 'Añadir Cliente') {
      console.log(this.clienteselected);
      await this.clientesService.postCliente(this.clienteselected).subscribe(
        (data: Clientes) => {
          this.emptyData();
          this.getAllclientes();
        }
      )
    }
    else {
      await this.clientesService.putCliente(this.clienteselected).subscribe(
        (data: Clientes) => {
          this.emptyData();
          this.getAllclientes();
        }
      )
    }
  }

  async editarCliente(id: any) {
    this.modalTitle = "Editar Cliente"
    var artSelected = this.clientes.filter(art => {
      return art.id == id
    });


    this.clienteselected.apellidos = artSelected[0].apellidos;
    this.clienteselected.id = artSelected[0].id;
    this.clienteselected.direccion = artSelected[0].direccion;
    this.clienteselected.nombre = artSelected[0].nombre;
    this.clienteselected.password = artSelected[0].password;
    this.clienteselected.usuario = artSelected[0].usuario;
    
  };

  emptyData() {
    this.imagenSelected = {}
    this.clienteselected.apellidos = '';
    this.clienteselected.direccion = '';
    this.clienteselected.nombre = '';
    this.clienteselected.password = '';
    this.clienteselected.usuario = '';
  };

}
