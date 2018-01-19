import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {


    this.subscription = this.regresaObservable().retry(2)
    .subscribe(
      numero => console.log('Sub: ', numero),
      error => console.error('Error (segundo intento): ', error),
      () => console.log('Fin del observador')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
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
          // if (contador === 3) {
          //   clearInterval(intervalo);
          //   observer.complete();
          // }

          // if (contador === 2) {
          //   clearInterval(intervalo);
          //   observer.error('Auxilio...');
          // }

        }, 500);
      }
    )
    .retry(2)
    .map((result: any) => {
      return result.valor;
    })
    .filter( (valor, index) => {

      if ((valor % 2) === 1) {
        // impar
        return true;
      } else {
        return false;
      }
    });

  }

}
