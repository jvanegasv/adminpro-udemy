import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor: number) {

    if ((this.progreso + valor) > 100 || (this.progreso + valor) < 0) {
      return;
    }
    this.progreso += valor;
  }

}
