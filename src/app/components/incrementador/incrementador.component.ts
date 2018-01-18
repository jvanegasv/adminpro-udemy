import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number) {

    if ((this.progreso + valor) > 100 || (this.progreso + valor) < 0) {
      return;
    }
    this.progreso += valor;
    this.cambioValor.emit(this.progreso);

  }

  onChange( newValue: number) {

    // const elementHTML: any = document.getElementsByName('progreso')[0];


    if (newValue >= 100) {
      newValue = 100;
    }
    if (newValue <= 0) {
      newValue = 0;
    }
    this.progreso = newValue;

    // elementHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }

}
