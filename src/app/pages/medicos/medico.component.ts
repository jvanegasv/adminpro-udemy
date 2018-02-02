import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {

    this._hospitalService.cargarHospitales().subscribe( hospitales => this.hospitales = hospitales);
  }

  guardarMedico(f: NgForm) {
    console.log(f);

    if (!f.valid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe( medico => {
      console.log(medico);
    });

  }
}
