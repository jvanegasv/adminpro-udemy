import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class MedicoService {

  public totalMedicos: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url).map( (resp: any) => {

      this.totalMedicos = resp.total;
      return resp.medicos;
    });
  }

}
