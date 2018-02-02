import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class MedicoService {

  public totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url).map( (resp: any) => {

      this.totalMedicos = resp.total;
      return resp.medicos;
    });
  }

  buscarMedicos(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
    .map( (resp: any) => resp.medicos);
  }

  borrarMedico(id: string) {

    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
    .map( (resp: any) => {

      swal('Medico borrado', 'El medico a sido eliminado', 'success');
      return true;
    });

  }

}
