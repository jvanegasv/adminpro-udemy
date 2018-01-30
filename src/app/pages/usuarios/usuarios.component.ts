import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.cargarUsuarios();
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe((resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;

    if (desde < 0 || desde >= this.totalRegistros) {
      return;
    }
    this.desde = desde;

    this.cargarUsuarios();
  }

  buscarUsuario(temrino: string) {

    if (temrino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    console.log(temrino);
    this._usuarioService.buscarUsuarios(temrino)
    .subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {

    console.log(usuario);
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No te puedes borrar tu mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro',
      text: 'Esta a punto de eliminar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      console.log(borrar);
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe( (borrado: boolean) => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });
  }

}
