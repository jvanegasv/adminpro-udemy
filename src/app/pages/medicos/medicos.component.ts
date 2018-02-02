import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicosService: MedicoService
  ) { }

  ngOnInit() {

    this.cargarMedicos();
  }

  cargarMedicos() {

    this._medicosService.cargarMedicos().subscribe( medicos => this.medicos = medicos);

  }

  buscarMedico() {

  }

  crearMedico() {

  }

  editarMedico() {

  }

  borrarMedico() {
    
  }
}
