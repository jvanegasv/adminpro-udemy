import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('', '', '', '');

  constructor(
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {

    activatedRoute.params.subscribe( (params) => {

      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {

    this._hospitalService.cargarHospitales().subscribe( hospitales => this.hospitales = hospitales);
  }

  cargarMedico(id: string) {

    this._medicoService.cargarMedico(id).subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });

  }

  guardarMedico(f: NgForm) {

    if (!f.valid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico).subscribe( medico => {
      console.log(medico);
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });

  }

  cambioHospital(id: string) {

    console.log(id);
    this._hospitalService.obtenerHospital(id).subscribe( hospital => this.hospital = hospital);
  }
}
