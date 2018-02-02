import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;

  constructor(
    public _medicosService: MedicoService
  ) { }

  ngOnInit() {

    this.cargarMedicos();
  }

  cargarMedicos() {

    this._medicosService.cargarMedicos(this.desde).subscribe( medicos => this.medicos = medicos);

  }

  buscarMedico(termino: string) {

    if (termino.length === 0) {

      this.cargarMedicos();
      return;
    }

    this._medicosService.buscarMedicos(termino).subscribe( medicos => this.medicos = medicos);
  }

  borrarMedico(medico: Medico) {

    swal({
      title: 'Esta seguro',
      text: 'Esta a punto de eliminar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this._medicosService.borrarMedico(medico._id).subscribe(() => {
          this.cargarMedicos();
        });
      }
    });

  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;

    if (desde < 0 || desde >= this._medicosService.totalMedicos) {
      return;
    }
    this.desde = desde;

    this.cargarMedicos();
  }

}
