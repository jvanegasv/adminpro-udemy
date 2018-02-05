import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {
  }

  canActivate(): Promise<boolean> | boolean {

    console.log('tokengard...');

    const token = this._usuarioService.token;

    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }



    console.log(payload);
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();

      // fecha dentro de 4 horas
      ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000));

      console.log('fecha de token: ', tokenExp);
      console.log('dentro de 4 horas: ', ahora);

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renuevaToken().subscribe(() => {
          resolve(true);
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
        });
      }

      resolve(true);
    });
  }

  expirado(fechaExp: number) {

    const ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }

  }
}
