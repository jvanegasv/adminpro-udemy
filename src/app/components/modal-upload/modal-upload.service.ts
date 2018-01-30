import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal() {

    this.id = null;
    this.tipo = null;
    this.oculto = 'oculto';
  }

  mostarModal(tipo: string, id: string) {

    this.id = id;
    this.tipo = tipo;
    this.oculto = '';
  }

}
