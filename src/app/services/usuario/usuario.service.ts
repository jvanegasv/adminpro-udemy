import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor(public http: HttpClient) {  }

  login(usuario: Usuario, recordar: boolean = false) {

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario);

  }

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
    .map( (resp: any) => {
      swal('ERROR', resp.mensaje, 'error');
      return resp.usuario;
    });
  }

}
