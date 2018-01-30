import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token);

    this.usuario = usuario;
    this.token = token;

  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.cargarStorage();

    this.router.navigate(['/login']);

  }

  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token: token}).map( (resp: any) => {
      this.guardarStorage(resp._id, resp.token, resp.usuario);
      return true;
    });

  }

  estaLogueado() {

    return (this.token.length > 5) ? true : false;
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario).map( (resp: any) => {
      this.guardarStorage(resp._id, resp.token, resp.usuario);
      return true;
    });

  }

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
    .map( (resp: any) => {
      swal('ERROR', resp.mensaje, 'error');
      return resp.usuario;
    });
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    console.log(url);

    return this.http.put(url, usuario).map((resp: any) => {

      const usuarioDB = resp.usuario;
      this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
      swal('Usuario actualizado', usuario.nombre, 'success');

      return true;
    });
  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
    .then((resp: any) => {
      console.log(resp);
      this.usuario.img = resp.usuarioActualizado.img;
      this.guardarStorage(id, this.token, this.usuario);
      swal('Imagen actualizada', this.usuario.nombre, 'success');
    })
    .catch((resp) => {
      console.log(resp);
    });
  }

  cargarUsuarios(desde: number = 0) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);

  }

}
