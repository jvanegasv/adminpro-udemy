import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;
  desde: number = 0;
  imagenCargada;

  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) {

    this._modalUploadService.notificacion.subscribe((resp) => this.cargaHospitales());
  }

  ngOnInit() {
    this.cargaHospitales();
  }

  cargaHospitales() {

    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe( (resp: any) => {
      this.hospitales = resp;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;

    if (desde < 0 || desde >= this._hospitalService.totalHospitales) {
      return;
    }
    this.desde = desde;

    this.cargaHospitales();
  }

  buscarHospital(termino: string) {

    if (termino.length === 0) {
      this.cargaHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital(termino).subscribe( (resp: any) => {
      console.log(resp);
      this.hospitales = resp;
      this.cargando = false;
    });
  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: 'Esta seguro',
      text: 'Esta a punto de eliminar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      console.log(borrar);
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id).subscribe( (borrado: boolean) => {
          console.log(borrado);
          this.cargaHospitales();
        });
      }
    });

  }

  guardarHospital(hospital: Hospital) {

    if (hospital.nombre.length === 0) {
      swal('Error', 'El nombre del hospital no puede ser vacio', 'error');
      this.cargaHospitales();
      return;
    }

    this.cargando = true;
    console.log(hospital);
    this._hospitalService.actualizarHospital(hospital).subscribe( (resp) => {
      this.cargaHospitales();
    });
  }

  mostrarModal(id: string) {

    this._modalUploadService.mostarModal('hospitales', id);
  }

  crearHospital() {

    swal('Nombre del hospital', {
      content: 'input',
    })
    .then((value) => {
      this._hospitalService.crearHospital(value).subscribe((resp) => {
        this.cargaHospitales();
      });
    });
  }

}
