import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  renuevaToken() {

    const url = URL_SERVICIOS + '/login/renuevatoken?token=' + this.token;

    return this.http.get(url)
    .map( (resp: any) => {

      this.token = resp.token;
      localStorage.setItem('token', this.token);

      return true;
    })
    .catch( err => {
      console.log('token no pudo ser renovado');
      this.router.navigate(['/login']);
      swal('No se pudo renovar token', 'No fue posible renovar el token', 'error');
      return Observable.throw(err);
    });
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.menu = JSON.parse( localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.cargarStorage();

    this.router.navigate(['/login']);

  }

  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token: token}).map( (resp: any) => {
      console.log('login google', resp);
      this.guardarStorage(resp._id, resp.token, resp.usuario, resp.role);
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

    return this.http.post(url, usuario)
    .map( (resp: any) => {
      console.log('login normal', resp);
      this.guardarStorage(resp._id, resp.token, resp.usuario, resp.role);
      return true;
    })
    .catch( err => {
      console.log(err.error.mensaje);
      swal('Login error', err.error.mensaje, 'error');
      return Observable.throw(err);
    });

  }

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
    .map( (resp: any) => {
      swal('ERROR', resp.mensaje, 'error');
      return resp.usuario;
    })
    .catch( err => {
      console.log(err.error.mensaje);
      swal(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
    });
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    console.log(url);

    return this.http.put(url, usuario).map((resp: any) => {

      if (usuario._id === this.usuario._id) {

        const usuarioDB = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);

      }

      swal('Usuario actualizado', usuario.nombre, 'success');

      return true;
    })
    .catch( err => {
      console.log(err.error.mensaje);
      swal(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
    });
  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
    .then((resp: any) => {
      console.log(resp);
      this.usuario.img = resp.usuarioActualizado.img;
      this.guardarStorage(id, this.token, this.usuario, this.menu);
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

  buscarUsuarios(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url)
          .map( (resp: any) => resp.usuarios);
  }

  borrarUsuario(id: string) {

    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url)
    .map( resp => {
      swal('Usuario borrado', 'El usuario a sido eliminado', 'success');
      return true;
    });
  }

}
