import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

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

}
