import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

import 'rxjs/add/operator/map';

@Injectable()
export class HospitalService {

  public totalHospitales: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospitales() {

    const url = URL_SERVICIOS + '/hospital';

    return this.http.get(url)
    .map( (resp: any) => {
      console.log(resp);
      this.totalHospitales = resp.total;
      return resp.hospitales;
    });

  }

  obtenerHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url);
  }

  borrarHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
    .map( (resp: any) => {

      swal('Hospital borrado', 'El hospital a sido eliminado', 'success');
      return true;
    });
  }

  crearHospital(nombre: string) {

    const url = URL_SERVICIOS + '/hospital/?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre})
    .map( (resp) => {

      swal('Hospital creado', 'El hospital a sido creado', 'success');
      return true;
    });
  }

  buscarHospital(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url);
  }

  actualizarHospital(hospital: Hospital) {

    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital);
  }

}
