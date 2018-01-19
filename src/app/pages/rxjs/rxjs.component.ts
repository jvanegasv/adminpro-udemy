import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {


    this.regresaObservable().retry(2)
    .subscribe(
      numero => console.log('Sub: ', numero),
      error => console.error('Error (segundo intento): ', error),
      () => console.log('Fin del observador')
    );

  }

  ngOnInit() {
  }

  regresaObservable(): Observable<any> {

    return new Observable(
      observer => {

        let contador = 0;
        const intervalo = setInterval( () => {

          contador += 1;

          const salida = {
            valor: contador
          };

          observer.next(salida);
          if (contador === 3) {
            clearInterval(intervalo);
            observer.complete();
          }

          if (contador === 2) {
            // clearInterval(intervalo);
            observer.error('Auxilio...');
          }

        }, 1000);
      }
    )
    .retry(2)
    .map((result: any) => {
      return result.valor + 1;
    });

  }

}
